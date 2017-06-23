import axios from "axios";
import slug from "slug";
slug.defaults.mode ='my';
slug.defaults.modes['my'] = {
    replacement: '-',
    symbols: false,
    remove: null,
    lower: true,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap,
};

const API_KEY = "AIzaSyDpQHUScIP1XnEoY6PdqgNRNGRRN5kO5vE";
const URL_BASE = "https://www.googleapis.com/youtube/v3";

export default class YoutubeApiClient {
    search(query, filterForTitle = null) {
        const url = `${URL_BASE}/search?part=snippet&key=${API_KEY}&type=video,playlist&maxResults=50&q=${encodeURIComponent(query)}&fields=items(id,snippet/title)`;
        const resultPromise = axios.get(url).then(r => r.data);
        if (filterForTitle) {
            return resultPromise.then(resultSet => filterStartsWith(resultSet, filterForTitle));
        } else {
            return resultPromise;
        }
    }

    getPlaylistItems(playlistId) {
        const url = `${URL_BASE}/playlistItems?part=snippet&key=${API_KEY}&maxResults=30&playlistId=${playlistId}&fields=items(snippet/resourceId)`;
        return axios.get(url).then(r => r.data);
    }

    getVideoInfo(videoId) {
        const url = `${URL_BASE}/videos?part=snippet&id=${videoId}&fields=items(snippet/title,snippet/description)&key=${API_KEY}`;
        return axios.get(url)
            .then(r => r.data.items.length > 0 ? Object.assign({ id: videoId }, r.data.items[0].snippet) : null);
    }
}

function filterStartsWith(resultSet, filterForTitle) {
    filterForTitle = slug(filterForTitle);
    return {
        items: resultSet.items.filter(item => slug(item.snippet.title).startsWith(filterForTitle))
    }
}
