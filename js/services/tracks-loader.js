import ArtistsApiClient from "./artists-api-client";
import YoutubeApiClient from "./youtube-api-client";

export default class TracksLoader {
    constructor(channelsRegistry) {
        this.channelsRegistry = channelsRegistry;
        this.artistsApiClient = new ArtistsApiClient();
        this.youtubeApiClient = new YoutubeApiClient();
    }

    loadTracks(channelId) {
        let channel = this.channelsRegistry.getChannelDescriptor(channelId);
        if (channel.childrenIds && (randomInt(2) % 2 == 0)) {
            channel = this.channelsRegistry.getChannelDescriptor(randomArrayItem(channel.childrenIds));
        }

        return this.artistsApiClient.hasArtists(channel.id).then(hasArtists => {
            const useKeywords = !hasArtists || (!channel.noUseKeywords && (randomInt(5) % 5 === 0));
            if (useKeywords) {
                return this._searchByKeywords(channel);
            } else {
                return this._searchByArtists(channel);
            }
        });
    }

    _searchByArtists(channel) {
        return this.artistsApiClient.getRandomArtist(channel.id).then(artist => {
            const query = `${artist} album`;
            return this._getSearchResult(query, artist);
        }).then(track => track === null ? this._searchByKeywords(channel) : track);
    }

    _searchByKeywords(channel) {
        const query = makeSearchQueryByKeywords(channel);
        return this._getSearchResult(query);
    }

    _getSearchResult(query, filterForTitle = null) {
        return this.youtubeApiClient.search(query, filterForTitle).then(
            resultSet => this._getRandomTrackFromResultSet(resultSet, item => item.id)
        );
    }

    _getRandomTrackFromResultSet(resultSet, getIdFromItem) {
        if (resultSet.items.length > 0) {
            const num = Math.floor(Math.random() * resultSet.items.length);
            const id = getIdFromItem(resultSet.items[num]);
            if (id.kind === "youtube#video") {
                return id.videoId;
            } else {
                return this.youtubeApiClient.getPlaylistItems(id.playlistId).then(
                    resultSetInner => this._getRandomTrackFromResultSet(resultSetInner, item => item.snippet.resourceId)
                );
            }
        } else {
            return null;
        }
    }
}


function makeSearchQueryByKeywords(channel) {
    // get keywords config from channel data
    let keywordsConfig = channel.keywords ? channel.keywords : `${channel.title} music`;
    if ((typeof keywordsConfig === "object") && Array.isArray(keywordsConfig)) {
        keywordsConfig = randomArrayItem(keywordsConfig);
    }
    if (typeof keywordsConfig === "string") {
        return `${keywordsConfig}`;
    }

    // get base query
    let query;
    switch (typeof keywordsConfig.query) {
        case "undefined":
            query = `${channel.title} music`;
            break;
        case "object":
            // is array
            query = randomArrayItem(keywordsConfig.query);
            break;
        case "string":
            query = keywordsConfig.query;
            break;
    }

    // add postfix to query and return
    switch (randomInt(3) % 3) {
        case 0:
            return query;
        case 1:
            if (keywordsConfig.yearPostfix) {
                const year = randomIntFromInterval(keywordsConfig.yearPostfix, new Date().getFullYear() + 1);
                return `${query} ${year}`;
            } else {
                return query;
            }
        case 2:
            if (keywordsConfig.epochPostfix) {
                const epoch = getRandomEpoch(keywordsConfig.epochPostfix);
                return `${query} ${epoch}`;
            } else {
                return query;
            }
    }
}

function getRandomTrackFromResultSet(resultSet, getIdFromItem) {
    if (resultSet.items.length > 0) {
        const num = Math.floor(Math.random() * resultSet.items.length);
        const id = getIdFromItem(resultSet.items[num]);
        if (id.kind === "youtube#video") {
            return id.videoId;
        } else {
            return youtubeApiPlaylist(id.playlistId).then(
                resultSetInner => getRandomTrackFromResultSet(resultSetInner, item => item.snippet.resourceId)
            );
        }

    } else {
        return null;
    }
}

function randomInt(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomArrayItem(items) {
    return items[randomInt(items.length)];
}

function getRandomEpoch(start) {
    const year = new Date().getFullYear();
    const currentEpoch = year - (year % 10);
    const randomEpoch = start + randomInt(1 + Math.floor((currentEpoch - start) / 10)) * 10;
    return `${randomEpoch}s`;
}