export default class PlayingQueue {
    constructor(tracksLoader) {
        this.tracksLoader = tracksLoader;
        this.onChangeHandler = null;

        this.track = null;
    }

    setOnChangeHandler(handler) {
        this.onChangeHandler = handler;
    }

    loadTracks(channelId) {
        this.tracksLoader.loadTracks(channelId).then(track => {
            this.track = track;
            if (this.onChangeHandler) {
                this.onChangeHandler();
            }
        });
    }

    getNextTrack() {
        return this.track;
    }
}

