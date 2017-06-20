import React, { PropTypes } from "react";

export default class TopBar extends React.Component {
    render() {
        return (
            <div className="app-top-bar shadow">
                <div className="app-menu-toggle-button" onClick={this.props.onToggleMenu}>
                    <svg viewBox="0 0 32 32">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                </div>
                <div className="app-header">
                    <div className="app-logo"></div>
                    <div className="app-header-text">Music Shelf Radio</div>
                </div>
            </div>
        )
    }
}

TopBar.propTypes = {
    onToggleMenu: PropTypes.func,
};