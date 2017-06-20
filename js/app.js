import "../style/app.scss";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, withRouter } from "react-router-dom";

import Menu from "./components/menu";
import TopBar from "./components/top-bar";
import ChannelContent from "./components/channel-content";

import channels from "./data/channels";
import ChannelsRegistry from "./services/channels-registry";
import TracksLoader from "./services/tracks-loader";
import PlayingQueue from "./services/playing-queue";
import FavoritesStore from "./services/favorites-store";


window.initApp = function () {
    if (document.readyState !== "loading") {
        renderApp();
    } else {
        document.addEventListener('DOMContentLoaded', () => { renderApp(); });
    }
};

function renderApp() {
    ReactDOM.render(
        (
            <HashRouter>
                <Route path="/:channelId?" component={withRouter(RadioApp)}/>
            </HashRouter>
        ),
        document.getElementById("app")
    );

}

class RadioApp extends React.Component {
    constructor() {
        super();
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.handleSelectChannel = this.handleSelectChannel.bind(this);
        this.state = {
            isMenuForceShow: false,
        };

        this.channelsRegistry = new ChannelsRegistry(channels);
        this.favoritesStore = new FavoritesStore(this.channelsRegistry);

        const trackLoader = new TracksLoader(this.channelsRegistry);
        this.playingQueue = new PlayingQueue(trackLoader);
    }

    handleToggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isMenuForceShow: !this.state.isMenuForceShow });
    }

    handleSelectChannel(channelId) {
        if (this.props.match.params.channelId !== channelId) {
            this.props.history.push(channelId);
            this.setState({ isMenuForceShow: false });
        }
    }

    render() {
        const channelId = this.props.match.params.channelId;
        return (
            <div>
                <TopBar
                    onToggleMenu={this.handleToggleMenu}
                />
                <Menu
                    channelId={channelId}
                    channelsRegistry={this.channelsRegistry}
                    favoritesStore={this.favoritesStore}
                    isForceShow={this.state.isMenuForceShow}
                    onSelectChannel={this.handleSelectChannel}
                />
                <ChannelContent
                    channelId={channelId}
                    favoritesStore={this.favoritesStore}
                    playingQueue={this.playingQueue}
                />
            </div>
        )
    }
}

RadioApp.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
