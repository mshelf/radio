import React from "react";
import PropTypes from "prop-types";
import { concatChannelIds } from "../services/utils";

export default class Menu extends React.PureComponent {
    constructor() {
        super();
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.noChangeExpandedPath = false;
        this.state = {
            expandedPath: {},
        }
    }

    componentWillMount() {
        let expandedPath;
        const { channelId, favoritesStore } = this.props;
        if (channelId) {
            expandedPath = this.getExpandedPath(channelId);
        } else {
            expandedPath = this.getExpandedPath(
                favoritesStore.getFavoritesChannels().length > 0 ? "Favorites" : "Genres"
            );
        }
        this.setExpandedPath(expandedPath);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.channelId !== this.props.channelId) && !this.noChangeExpandedPath) {
            const expandedPath = this.getExpandedPath(nextProps.channelId);
            this.setExpandedPath(expandedPath);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.noChangeExpandedPath = false;
    }

    setExpandedPath(expandedPath) {
        this.noChangeExpandedPath = false;
        this.setState({ expandedPath });
    }

    handleMenuItemClick(e) {
        e.stopPropagation();
        e.preventDefault();

        const path = e.currentTarget.getAttribute("data-path");
        const channelId = e.currentTarget.getAttribute("data-channel-id");
        if (channelId) {
            this.noChangeExpandedPath = true;
            this.props.onSelectChannel(channelId);
        } else {
            const isExpanded = e.target.className.includes("expanded");
            if (isExpanded) {
                const parts = path.split("\\");
                parts.pop();
                this.setExpandedPath(this.getExpandedPathByParts(parts));
            } else {
                const expandedPath = this.getExpandedPath(path);
                this.setExpandedPath(expandedPath);
            }
        }
    }

    getExpandedPath(path) {
        if (typeof path === "undefined") {
            return {};
        }
        const parts = path.split("\\");
        return this.getExpandedPathByParts(parts);
    }

    getExpandedPathByParts(parts) {
        var pathItem = "";
        const expandedPath = {};
        for (var i = 0; i < parts.length; i++) {
            pathItem = concatChannelIds(pathItem, parts[i]);
            expandedPath[pathItem] = true;
        }
        return expandedPath;
    }

    renderChannel(channelId, title, path, isSelected) {
        return (
            <li
                key={channelId}
                data-channel-id={channelId}
                data-path={path}
                className={isSelected ? "app-menu__item channel expanded"  : "app-menu__item channel"}
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
                className={isExpanded ? "app-menu__item folder expanded"  : "app-menu__item folder"}
                onClick={this.handleMenuItemClick}
            >
                {title}
                <ul className={isExpanded ? "app-menu__submenu expanded"  : "app-menu__submenu"}>
                    {children}
                </ul>
            </li>
        )
    }

    renderBranch(channels, parentId) {
        const result = [];
        const expandedPath = this.state.expandedPath;
        for (var i = 0; i < channels.length; i++) {
            const item = channels[i];
            const path = concatChannelIds(parentId, item.title);
            if (!item.children) {
                const channelId = item.id;
                result.push(this.renderChannel(channelId, item.title, path, channelId === this.props.channelId));
            } else {
                const children = this.renderBranch(item.children, path);
                if (!item.isJustContainer) {
                    const commonChannel = this.renderChannel(item.id, `All ${item.title}`, path, item.id === this.props.channelId);
                    children.unshift(commonChannel);
                }
                result.push(this.renderFolder(item.title, path, expandedPath[path], children));
            }
        }
        return result;
    }

    render() {
        const channels = this.props.channelsRegistry.tree;
        const className = this.props.isForceShow ? "app-menu force-show" : "app-menu";

        const favoritesChannels = this.props.favoritesStore.getFavoritesChannels();
        const favoritesFolder = [{
            title: "Favorites",
            isJustContainer: true,
            children: favoritesChannels,
        }];

        return (
            <div className={className}>
                <ul className="app-menu__submenu app-menu__submenu--root expanded">
                    {favoritesChannels.length > 0 ? this.renderBranch(favoritesFolder, "") : null}
                    {this.renderBranch(channels, "")}
                </ul>
            </div>
        )
    }
}

Menu.propTypes = {
    channelId: PropTypes.string,
    onSelectChannel: PropTypes.func.isRequired,
    channelsRegistry: PropTypes.object.isRequired,
    favoritesStore: PropTypes.object.isRequired,
};
