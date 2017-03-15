export default class ChannelsRegistry {
    constructor(genres) {
        this.registry = {};
        addBranchToRegistry(genres, this.registry);
    }

    getChannelDescriptor(channelId) {
        return this.registry[channelId];
    }
}

function addBranchToRegistry(dataBranch, registry, parentId) {
    dataBranch.forEach(item => {
        const id = concatParentIdAndId(parentId, item.title);
        if (item.children) {
            addBranchToRegistry(item.children, registry, id);
            registry[id] = makeChannelDescriptor(id, item);
        } else {
            registry[id] = makeChannelDescriptor(id, item);
        }
    });
}

function concatParentIdAndId(parentId, id) {
    return parentId ? `${parentId}\\${id}` : id;
}

function makeChannelDescriptor(id, channelData) {
    return {
        title: channelData.title,
        keywords: channelData.keywords,
        childrenIds: channelData.children ? getAllChildrenIdsAsFlatArray(id, channelData.children) : undefined,
    };
}

function getAllChildrenIdsAsFlatArray(parentId, children) {
    const ids = [];
    children.forEach(child => {
        const childId = concatParentIdAndId(parentId, child.title);
        putAllChildrenIdsToArray(childId, child, ids);
    });
    return ids;
}

function putAllChildrenIdsToArray(id, item, result) {
    result.push(id);
    if (item.children) {
        item.children.forEach(child => {
            const childId = concatParentIdAndId(id, child.title);
            putAllChildrenIdsToArray(childId, child, result)
        });
    }
}