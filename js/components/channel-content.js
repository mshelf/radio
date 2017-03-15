import React, { PropTypes } from "react";
import loadTracks from "../services/tracks-loader";

export default class ChannelContent extends React.PureComponent {
    constructor() {
        super();
        this.state = {};
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
            this.setState({ url: null });
            return;
        }

        loadTracks(this.props.channelsRegistry, channelId).then(track => {
            this.setState({ url: track });
        });
    }

    getChannelNameById(channelId) {
        return channelId.replace(/\\/g, " / ");
    }

    render() {
        const channelId = this.props.channelId;
        const url = this.state.url;
        if (!channelId) {
            return null;
        }
        return (
            <div className="app-content">
                <h1 className="app-content-header">{this.getChannelNameById(channelId)}</h1>
                {
                    url ? <p><a href={url} target="_blank">{url}</a></p> : null
                }
            </div>
        )
    }
}

ChannelContent.propTypes = {
    channelId: PropTypes.string,
    channelsRegistry: PropTypes.object,
};
