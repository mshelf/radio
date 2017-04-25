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

export function youtubeApiSearch(query, filterForTitle = null) {
    const url = `${URL_BASE}/search?part=snippet&key=${API_KEY}&type=video,playlist&maxResults=50&q=${encodeURIComponent(query)}&fields=items(id,snippet/title)`;
    const resultPromise = axios.get(url).then(r => r.data);
    if (filterForTitle) {
        filterForTitle = slug(filterForTitle);
        console.log("SLUG FILTER: " + filterForTitle);
        return resultPromise.then(data => {
            return {
                items: data.items.filter(item => slug(item.snippet.title).startsWith(filterForTitle))
            }
        });
    } else {
        return resultPromise;
    }
}

export function youtubeApiPlaylist(playlistId) {
    const url = `${URL_BASE}/playlistItems?part=snippet&key=${API_KEY}&maxResults=30&playlistId=${playlistId}&fields=items(snippet/resourceId)`;
    return axios.get(url).then(r => r.data);
}
