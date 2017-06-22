import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { randomIntFromInterval, debugLog } from "../services/utils";
import { EMOJI_REGEX } from "../services/utils";

const YOUTUBE_PLAYER_OPTS = {
    playerVars: {
        autoplay: 1
    }
};

const REGEX_REMOVE_TITLE_POSTFIX = /(\(|\[)(Official|HD).*(\)|\])/i;

export default class ChannelContent extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            track: null,
            trackName: null,
            error: false,
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePlayerStateChange = this.handlePlayerStateChange.bind(this);
        this.autoChangeTrackTimeoutId = 0;
        this.checkCurrentTrackIntervalId = 0;

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
        this.props.favoritesStore.channelWasOpened(channelId);
        this.loadNextTrack();
    }

    loadNextTrack() {
        this.props.tracksLoader.loadTracks(this.props.channelId)
            .then(track => {
                this.props.favoritesStore.trackWasStarted(this.props.channelId);
                this.setTrack(track);
            })
            .catch(() => {
                this.setError();
            })
    }

    setTrack(track) {
        debugLog("Set track");
        debugLog(track);
        this.isStarted = false;
        const trackName = track
            ? track.title
                .replace(EMOJI_REGEX, "")
                .replace(REGEX_REMOVE_TITLE_POSTFIX, "").trim()
            : null;
        this.setState({ track, trackName, error: false });
    }

    setError() {
        this.setState({
            track: null,
            trackName: null,
            error: true,
        });
    }

    checkCurrentTrack(player) {
        const trackList = this.state.track.tracklist;
        const time = player.getCurrentTime();
        const track = trackList.getTrackByTime(time);
        if (!track) {
            debugLog(`Warning! Cannot select track by time ${time}`);
            debugLog(trackList.tracks);
            return;
        }
        if (track.title !== this.state.trackName) {
            debugLog(`Set new track name: ${track.title}`);
            this.setState({ trackName: track.title });
        }
    }

    handleNextClick() {
        this.setState({ error: false }, () => {
            this.loadNextTrack();
        });
    }

    handlePlayerStateChange(e) {
        clearTimeout(this.autoChangeTrackTimeoutId);
        clearInterval(this.checkCurrentTrackIntervalId);

        const track = this.state.track;
        if (!track || e.target.getPlayerState() !== 1) {
            return;
        }

        const duration = e.target.getDuration();
        const channel = track.sourceData.channel;
        const maxTrackDuration = channel.maxTrackDuration ? channel.maxTrackDuration : 1000;
        const isLong = duration > maxTrackDuration;
        const hasTrackList = track.tracklist.hasTracks();

        // start new video
        if (!this.isStarted) {
            this.isStarted = true;
            // start long track from random position
            if (isLong) {
                const startTime = hasTrackList
                    ? track.tracklist.getNearestStartTrackTime(randomIntFromInterval(0, duration - maxTrackDuration))
                    : randomIntFromInterval(0, duration - maxTrackDuration);
                debugLog(`Start new long video since ${startTime}`);
                e.target.seekTo(startTime);
                return;
            }
        }

        // set auto-change for long track
        if (isLong) {
            const currentTime = Math.floor(e.target.getCurrentTime());
            const endTime = hasTrackList > 0
                ? track.tracklist.getNearestStartTrackTime(currentTime + maxTrackDuration)
                : currentTime + maxTrackDuration;

            this.autoChangeTrackTimeoutId = setTimeout(() => {
                this.loadNextTrack();
            }, (endTime - currentTime) * 1000);
        }

        // start watcher for change current track title
        if (hasTrackList) {
            this.checkCurrentTrack(e.target);
            this.checkCurrentTrackIntervalId = setInterval(() => { this.checkCurrentTrack(e.target); }, 3000);
        }
    }

    getChannelNameById(channelId) {
        return channelId.replace(/\\/g, " / ");
    }

    renderSearchButtons(queryForSearch) {
        if (queryForSearch) {
            return (
                <div className="app-player-controls__search-buttons">
                    <a
                        className="app-button app-button--blue shadow app-player-controls__button app-player-controls__button--search"
                        href={`https://vk.com/search?c%5Bq%5D=${queryForSearch}&c%5Bsection%5D=audio`}
                        target="_blank">
                        VK
                    </a>

                    <a
                        className="app-button app-button--blue shadow app-player-controls__button app-player-controls__button--search"
                        href={`https://music.yandex.ru/search?text=${queryForSearch}`}
                        target="_blank">
                        Yandex
                    </a>
                </div>
            )
        }
        return null;
    }

    renderError() {
        return (
            <div className="app-error-message shadow">
                <h2>Error</h2>
                <p>Unfortunately, we cannot load the track.</p>
                <p>
                    <button onClick={this.handleNextClick} className="app-button app-button--blue shadow">Try again</button>
                </p>
            </div>
        )
    }

    renderPlayer() {
        const { track, trackName, error } = this.state;
        if (error) {
            return this.renderError();
        }

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
                <div className="app-current-track-name">
                    {trackName}
                </div>
                <div className="app-player-controls">
                    <button
                        className="app-button shadow app-player-controls__button"
                        onClick={this.handleNextClick}>Next Track >>
                    </button>
                    {this.renderSearchButtons(trackName)}
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
    tracksLoader: PropTypes.object.isRequired,
    favoritesStore: PropTypes.object.isRequired,
};
