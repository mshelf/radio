import { youtubeApiSearch, youtubeApiPlaylist } from "./youtube-api-client";

export default function loadTracks (channelsRegistry, channelId) {
    let channel = channelsRegistry.getChannelDescriptor(channelId);
    if (channel.childrenIds && (randomInt(2) % 2 == 0)) {
        channel = channelsRegistry.getChannelDescriptor(randomArrayItem(channel.childrenIds));
    }

    const query = makeSearchQueryByKeywords(channel);
    return youtubeApiSearch(query).then(
        resultSet => getRandomTrackFromResultSet(resultSet, item => item.id)
    );
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
            return `https://youtube.com/watch?v=${id.videoId}`;
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