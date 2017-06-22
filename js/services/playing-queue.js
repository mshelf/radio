export default class PlayingQueue {
    constructor(tracksLoader) {
        this.tracksLoader = tracksLoader;
        this.onChangeHandler = null;
        this.onLoadErrorHandler = null;
        this.track = null;
    }

    setOnChangeHandler(handler) {
        this.onChangeHandler = handler;
    }

    setOnLoadErrorHandler(handler) {
        this.onLoadErrorHandler = handler;
    }

    loadTracks(channelId) {
        this.tracksLoader.loadTracks(channelId)
            .then(track => {
                this.track = track;
                if (this.onChangeHandler) {
                    this.onChangeHandler();
                }
            })
            .catch(err => {
                if (this.onLoadErrorHandler) {
                    this.onLoadErrorHandler(err);
                }
            });
    }

    getNextTrack() {
        return this.track;
    }
}

