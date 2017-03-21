import "../style/app.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";

import Menu from "./components/menu";
import TopBar from "./components/top-bar";
import ChannelContent from "./components/channel-content";

import genres from "./data/genres";
import ChannelsRegistry from "./services/channels-registry";
import TracksLoader from "./services/tracks-loader";
import PlayingQueue from "./services/playing-queue";


window.initApp = function () {
    if (document.readyState !== "loading") {
        renderApp();
    } else {
        document.addEventListener('DOMContentLoaded', () => { renderApp(); });
    }
};

function renderApp() {
    setTimeout(() => {
        document.getElementsByTagName("body")[0].className = "";
        document.getElementsByClassName("cover")[0].remove();
        setTimeout(() => {
            ReactDOM.render(
                (
                    <Router history={hashHistory}>
                        <Route path="(:channelId)" component={RadioApp}/>
                    </Router>
                ),
                document.getElementById("app")
            );
        }, 500)
    }, 1000);

}

class RadioApp extends React.Component {
    constructor() {
        super();
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.handleSelectChannel = this.handleSelectChannel.bind(this);
        this.state = {
            isMenuForceShow: false,
        };

        const channelsRegistry = new ChannelsRegistry(genres);
        const trackLoader = new TracksLoader(channelsRegistry);
        this.playingQueue = new PlayingQueue(trackLoader);
    }

    handleToggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isMenuForceShow: !this.state.isMenuForceShow });
    }

    handleSelectChannel(channelId) {
        if (this.props.params.channelId !== channelId) {
            this.context.router.push(channelId);
            this.setState({ isMenuForceShow: false });
        }
    }

    render() {
        const channelId = this.props.params.channelId;
        return (
            <div>
                <TopBar
                    onToggleMenu={this.handleToggleMenu}
                />
                <Menu
                    channelId={channelId}
                    genres={genres}
                    isForceShow={this.state.isMenuForceShow}
                    onSelectChannel={this.handleSelectChannel}
                />
                <ChannelContent
                    channelId={channelId}
                    playingQueue={this.playingQueue}
                />
            </div>
        )
    }
}

RadioApp.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
