import React, { PropTypes } from "react";
import YouTube from "react-youtube";

const YOUTUBE_PLAYER_OPTS = {
    // height: "390",
    // width: "640",
    playerVars: {
        autoplay: 1
    }
};

export default class ChannelContent extends React.PureComponent {
    constructor() {
        super();
        this.state = {};
        this.handleNextClick = this.handleNextClick.bind(this);
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
            this.setState({ videoId: null });
            return;
        }

        const playingQueue = this.props.playingQueue;
        this.props.playingQueue.setOnChangeHandler(() => {
            this.setState({ videoId: playingQueue.getNextTrack() });
        });

        playingQueue.loadTracks(channelId);
    }

    handleNextClick() {
        this.props.playingQueue.loadTracks(this.props.channelId);
    }

    getChannelNameById(channelId) {
        return channelId.replace(/\\/g, " / ");
    }

    renderPlayer() {
        const videoId = this.state.videoId;
        if (!videoId) {
            return null;
        }
        return (
            <div>
                <div className="app-player-container">
                    <YouTube
                        opts={YOUTUBE_PLAYER_OPTS}
                        className="app-youtube-player"
                        videoId={videoId}
                        onEnd={this.handleNextClick}
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
    playingQueue: PropTypes.object,
};
