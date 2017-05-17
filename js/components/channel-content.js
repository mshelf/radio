import React, { PropTypes } from "react";
import YouTube from "react-youtube";
import { getNearestTime } from "../services/tracklist-parser";
import { randomIntFromInterval } from "../services/utils";

const YOUTUBE_PLAYER_OPTS = {
    playerVars: {
        autoplay: 1
    }
};

export default class ChannelContent extends React.PureComponent {
    constructor() {
        super();
        this.state = { isStarted: false };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePlayerStateChange = this.handlePlayerStateChange.bind(this);
        this.autoChangeTrackTimeoutId = 0;

        this.isStarted = false;
    }

    componentDidMount() {
        if (this.props.channelId) {
            this.setChannel(this.props.channelId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.channelId !== this.props.channelId) {
            this.setChannel(nextProps.channelId);
        }
    }

    setChannel(channelId) {
        if (!channelId) {
            this.setTrack(null);
            return;
        }

        const playingQueue = this.props.playingQueue;
        this.props.playingQueue.setOnChangeHandler(() => {
            this.props.favoritesStore.trackWasStarted(this.props.channelId);
            const track = playingQueue.getNextTrack();
            this.setTrack(track);
        });

        playingQueue.loadTracks(channelId);
        this.props.favoritesStore.channelWasOpened(channelId);
    }

    setTrack(track) {
        this.isStarted = false;
        this.setState({ track });
    }

    handleNextClick() {
        this.props.playingQueue.loadTracks(this.props.channelId);
    }

    handlePlayerStateChange(e) {
        clearTimeout(this.autoChangeTrackTimeoutId);

        const track = this.state.track;
        if (!track || e.target.getPlayerState() !== 1) {
            return;
        }

        const duration = e.target.getDuration();
        const channel = track.sourceData.channel;
        const maxTrackDuration = channel.maxTrackDuration ? channel.maxTrackDuration : 1000;
        const isLong = duration > maxTrackDuration;

        // start new video
        if (!this.isStarted) {
            this.isStarted = true;
            // start long track from random position
            if (isLong) {
                const startTime = track.tracklist.length > 0
                    ? getNearestTime(track.tracklist, randomIntFromInterval(0, duration - maxTrackDuration))
                    : randomIntFromInterval(0, duration - maxTrackDuration);
                e.target.seekTo(startTime);
                return;
            }
        }

        // set auto-change for long track
        if (isLong) {
            const currentTime = Math.floor(e.target.getCurrentTime());
            const endTime = track.tracklist.length > 0
                ? getNearestTime(track.tracklist, currentTime + maxTrackDuration)
                : currentTime + maxTrackDuration;

            this.autoChangeTrackTimeoutId = setTimeout(() => {
                this.props.playingQueue.loadTracks(this.props.channelId);
            }, (endTime - currentTime) * 1000);
        }
    }

    getChannelNameById(channelId) {
        return channelId.replace(/\\/g, " / ");
    }

    renderPlayer() {
        const track = this.state.track;
        if (!track) {
            return null;
        }
        return (
            <div>
                <div className="app-player-container">
                    <YouTube
                        opts={YOUTUBE_PLAYER_OPTS}
                        className="app-youtube-player"
                        videoId={track.id}
                        onEnd={this.handleNextClick}
                        onStateChange={this.handlePlayerStateChange}
                    />
                </div>
                <div className="app-player-buttons">
                    <button onClick={this.handleNextClick}>Next Track >></button>
                </div>
            </div>
        )
    }

    render() {
        const channelId = this.props.channelId;
        if (!channelId) {
            return null;
        }
        return (
            <div className="app-content">
                <h1 className="app-content-header">{this.getChannelNameById(channelId)}</h1>
                {this.renderPlayer()}
            </div>
        )
    }
}

ChannelContent.propTypes = {
    channelId: PropTypes.string,
    playingQueue: PropTypes.object.isRequired,
    favoritesStore: PropTypes.object.isRequired,
};
