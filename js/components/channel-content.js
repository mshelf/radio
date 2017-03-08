import React, { PropTypes } from "react";

export default class ChannelContent extends React.PureComponent {

    getChannelNameById(channelId) {
        return channelId.replace(/\\/g, " / ");
    }

    render() {
        const channelId = this.props.channelId;
        if (!channelId) {
            return null;
        }
        return (
            <div className="app-content">
                <h1 className="app-content-header">{this.getChannelNameById(channelId)}</h1>
            </div>
        )
    }
}

ChannelContent.propTypes = {
    channelId: PropTypes.string,
};
