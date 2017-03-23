import React, { PropTypes } from "react";

export default class Menu extends React.PureComponent {

    constructor() {
        super();
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.state = {
            expandedPath: {},
        }
    }

    componentWillMount() {
        this.setState({ expandedPath: this.getExpandedPathByPathId(this.props.channelId) });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.channelId !== this.props.channelId) {
            const expandedPath = this.getExpandedPathByPathId(nextProps.channelId);
            this.setState({ expandedPath });
        }
    }

    handleMenuItemClick(e) {
        const path = e.target.getAttribute("data-path");
        const channelId = e.target.getAttribute("data-channel-id");
        if (channelId) {
            this.props.onSelectChannel(channelId);
        } else {
            const isExpanded = e.target.className.includes("expanded");
            if (isExpanded) {
                const parts = path.split("\\");
                parts.pop();
                this.setState({ expandedPath: this.getExpandedPathByParts(parts) });
            } else {
                const expandedPath = this.getExpandedPathByPathId(path);
                this.setState({ expandedPath });
            }
        }
    }

    getExpandedPathByPathId(id) {
        if (typeof id === "undefined") {
            return {};
        }
        const parts = id.split("\\");
        return this.getExpandedPathByParts(parts);
    }

    getExpandedPathByParts(parts) {
        var pathItem = "";
        const expandedPath = {};
        for (var i = 0; i < parts.length; i++) {
            pathItem = this.concatParentIdAndId(pathItem, parts[i]);
            expandedPath[pathItem] = true;
        }
        return expandedPath;
    }

    concatParentIdAndId(parentId, id) {
        return parentId ? `${parentId}\\${id}` : id;
    }

    renderChannel(channelId, title, path, isSelected) {
        return (
            <li
                key={channelId}
                data-channel-id={channelId}
                data-path={path}
                className={isSelected ? "channel expanded"  : "channel"}
                onClick={this.handleMenuItemClick}
            >
                {title}
            </li>
        )
    }

    renderFolder(title, path, isExpanded, children) {
        return (
            <li
                key={path}
                data-path={path}
                className={isExpanded ? "folder expanded"  : "folder"}
                onClick={this.handleMenuItemClick}
            >
                {title}
                <ul className={isExpanded ? "submenu expanded"  : "submenu"}>
                    {children}
                </ul>
            </li>
        )
    }

    renderGenresBranch(data, parentId) {
        const result = [];
        const expandedPath = this.state.expandedPath;
        for (var key in data) {
            const item = data[key];
            const path = this.concatParentIdAndId(parentId, item.title);
            if (!item.children) {
                const channelId = path; // todo: change
                result.push(this.renderChannel(channelId, item.title, path, path === this.props.channelId));
            } else {
                const children = this.renderGenresBranch(item.children, path);
                result.push(this.renderFolder(item.title, path, expandedPath[path], children));
            }
        }
        return result;
    }

    render() {
        const genres = this.props.genres;
        const className = this.props.isForceShow ? "app-menu force-show" : "app-menu";
        return (
            <div className={className}>
                <ul className="root">
                    {this.renderGenresBranch(genres, "")}
                </ul>
            </div>
        )
    }
}

Menu.propTypes = {
    channelId: PropTypes.string,
    onSelectChannel: PropTypes.func,
};
