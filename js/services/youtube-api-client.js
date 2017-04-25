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
            return resultPromise.then(resultSet => filterResultSetByTitle(resultSet, filterForTitle));
        } else {
            return resultPromise;
        }
    }

    getPlaylistItems(playlistId) {
        const url = `${URL_BASE}/playlistItems?part=snippet&key=${API_KEY}&maxResults=30&playlistId=${playlistId}&fields=items(snippet/resourceId)`;
        return axios.get(url).then(r => r.data);
    }

    // https://www.googleapis.com/youtube/v3/videos?part=snippet&id={VIDEO_ID}&fields=items/snippet/title,items/snippet/description&key={YOUR_API_KEY}
}

function filterResultSetByTitle(resultSet, filterForTitle) {
    filterForTitle = slug(filterForTitle);
    return {
        items: resultSet.items.filter(item => slug(item.snippet.title).startsWith(filterForTitle))
    }
}
