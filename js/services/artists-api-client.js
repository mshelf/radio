import axios from "axios";

export default class ArtistsApiClient {
    constructor() {
        this.metadata = null;
        this.cache = null;
    }

    hasArtists(channelId) {
        return this._getMetadata().then(metadata => Boolean(metadata[channelId]));
    }

    getRandomArtist(channelId) {
        const filesCount = this.metadata[channelId];
        const fileName = getFileName(channelId, Math.floor(Math.random() * filesCount) + 1);
        return this._getArtistsByFile(fileName).then(artists => artists[Math.floor(Math.random() * artists.length)]);
    }

    _getMetadata() {
        return this.metadata
            ? Promise.resolve(this.metadata)
            : axios.get("data/artists/metadata.json").then(r => {
                this.metadata = r.data;
                return r.data;
            });
    }

    _getArtistsByFile(fileName) {
        return this.cache && this.cache[fileName]
            ? Promise.resolve(this.cache[fileName])
            : axios.get(`data/artists/${fileName}`).then(r => {
                this.cache = {};
                this.cache[fileName] = r.data;
                return r.data;
            });
    }
}

function getFileName(channelId, num) {
    return channelId.toLowerCase().replace(/[\\,\s]/g, "_") + "_" + num + ".json";
}