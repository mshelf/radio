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
        this.setState({ expandedPath: this.getExpandedPathById(this.props.channelId) });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.channelId !== this.props.channelId) {
            const expandedPath = this.getExpandedPathById(nextProps.channelId);
            console.log(expandedPath);
            this.setState({ expandedPath });
        }
    }

    handleMenuItemClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const id = e.target.getAttribute("data-id");
        const isFolder = e.target.getAttribute("data-type") === "folder";
        if (isFolder) {
            const isExpanded = e.target.className.includes("expanded");
            if (isExpanded) {
                const parts = id.split("\\");
                parts.pop();
                this.setState({ expandedPath: this.getExpandedPathByParts(parts) });
            } else {
                const expandedPath = this.getExpandedPathById(id);
                this.setState({ expandedPath });
            }
        } else {
            this.props.onSelectChannel(id);
        }
    }

    getExpandedPathById(id) {
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

    renderItem(id, title, type, isCurrent) {
        return (
            <li
                key={id}
                data-id={id}
                data-type={type}
                onClick={this.handleMenuItemClick}
                className={isCurrent ? `${type} current` : type}
            >
                {title}
            </li>
        )
    }

    renderGenresBranch(data, parentId) {
        const result = [];
        const expandedPath = this.state.expandedPath;
        for (var key in data) {
            const genre = data[key];
            const id = this.concatParentIdAndId(parentId, genre.title);
            if (!genre.children) {
                result.push(this.renderItem(id, genre.title, "channel", id === this.props.channelId))
            } else {
                const className = expandedPath[id] ? "expanded" : "";
                const idForAll = this.concatParentIdAndId(id, "All");
                result.push((
                    <li
                        key={id}
                        data-id={id}
                        data-type="folder"
                        onClick={this.handleMenuItemClick} className={`folder ${className}`}
                    >
                        {genre.title}

                        <ul className={`submenu ${className}`}>
                            {this.renderItem(idForAll, `All ${genre.title}`, "channel", this.props.channelId === idForAll)}
                            {this.renderGenresBranch(genre.children, id)}
                        </ul>
                    </li>
                ))
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
