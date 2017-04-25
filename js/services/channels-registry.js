export default class ChannelsRegistry {
    constructor(channels) {
        this.registry = {};
        addBranchToRegistry(channels, this.registry, this.tree);
        this.tree = channels;
    }

    getChannelDescriptor(channelId) {
        return this.registry[channelId];
    }
}

function addBranchToRegistry(dataBranch, registry, tree, parentId) {
    dataBranch.forEach(item => {
        const id = concatParentIdAndId(parentId, item.title);
        item.id = id;

        if (!item.isJustContainer) {
            const channelDescriptor = makeChannelDescriptor(id, item);
            registry[id] = channelDescriptor;
        }

        if (item.children) {
            addBranchToRegistry(item.children, registry, tree, id);
        }
    });
}

function concatParentIdAndId(parentId, id) {
    return parentId ? `${parentId}\\${id}` : id;
}

function makeChannelDescriptor(id, channelData) {
    const descriptor = Object.assign({ id }, channelData);
    if (!channelData.isFolder && channelData.children) {
        descriptor.childrenIds = getAllChildrenIdsAsFlatArray(id, channelData.children);
    }
    return descriptor;
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