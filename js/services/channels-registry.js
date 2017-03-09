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
            const idForBigChannel = concatParentIdAndId(id, "All");
            registry[idForBigChannel] = makeChannelDescriptor(item);
        } else {
            registry[id] = makeChannelDescriptor(item);
        }
    });
}

function concatParentIdAndId(parentId, id) {
    return parentId ? `${parentId}\\${id}` : id;
}

function makeChannelDescriptor(channelData) {
    return {
        title: channelData.title,
        query: `${channelData.title} music`
    }
}