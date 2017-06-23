const KEY = "favorites";

export default class FavoritesStore {
    constructor(channelsRegistry) {
        this.isCacheValid = false;
        this.channelsRegistry = channelsRegistry;
    }

    channelWasOpened(channelId) {
        const data = this._plusPointsAndGetData(channelId, 5);
        this._saveData(data);
    }

    trackWasStarted(channelId) {
        const data = this._plusPointsAndGetData(channelId, 1);
        this._saveData(data);
    }

    getFavoritesChannels() {
        if (!this.isCacheValid) {
            const data = this._getData();
            const channels = Object.entries(data)
                .sort(comparator)
                .slice(0, 5)
                .map(entry => {
                    const channelId = entry[0];
                    const channel = this.channelsRegistry.getChannelDescriptor(channelId);
                    return {
                        id: channelId,
                        title: channel.title,
                    }
                });
            this.cache = channels;
            this.isCacheValid = true;
        }

        return this.cache;
    }

    _getData() {
        const json = localStorage.getItem(KEY);
        return json ? JSON.parse(json) : {};
    }

    _saveData(data) {
        this.isCacheValid = false;
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    _plusPointsAndGetData(channelId, points) {
        const data = this._getData();
        if (typeof data[channelId] === "undefined") {
            data[channelId] = 0;
        }

        data[channelId] += points;

        if (data[channelId] >= 300) {
            for (var key in data) {
                data[key] = Math.floor(data[key] / 2);
            }
        }

        return data;
    }
}

function comparator(a, b) {
    if (a[1] < b[1]) {
        return 1;
    }
    if (a[1] > b[1]) {
        return -1;
    }
    return 0;
}
