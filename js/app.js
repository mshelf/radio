import "../style/app.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";

import Menu from "./components/menu";
import TopBar from "./components/top-bar";
import ChannelContent from "./components/channel-content";

import genres from "./data/genres";

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
            <Router history={hashHistory}>
                <Route path="(:channelId)" component={RadioApp}/>
            </Router>
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
    }

    handleToggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isMenuForceShow: !this.state.isMenuForceShow });
    }

    handleSelectChannel(channelId) {
        if (this.props.params.channelId !== channelId) {
            this.context.router.push(channelId);
            this.setState({ isMenuForceShow: false })
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
                />
            </div>
        )
    }
}

RadioApp.contextTypes = {
    router: React.PropTypes.object.isRequired,
}
