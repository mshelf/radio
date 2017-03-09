import React, { PropTypes } from "react";
import YoutubeApiClient from "../services/youtube-api-client";

export default class ChannelContent extends React.PureComponent {
    constructor() {
        super();
        this.apiClient = new YoutubeApiClient();
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

        const query = this.props.channelsRegistry.getChannelDescriptor(channelId).query;
        this.apiClient.search(query).then(searchResult => {
            if (searchResult.items.length > 0) {
                const num = Math.floor(Math.random() * searchResult.items.length);
                const videoId = searchResult.items[num].id.videoId;
                this.setState({ url: `https://youtube.com/watch?v=${videoId}` });
            } else {
                this.setState({ url: null });
            }
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
