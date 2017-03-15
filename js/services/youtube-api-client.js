import axios from "axios";

const API_KEY = "AIzaSyDpQHUScIP1XnEoY6PdqgNRNGRRN5kO5vE";
const URL_BASE = "https://www.googleapis.com/youtube/v3";

export function youtubeApiSearch(query) {
    const url = `${URL_BASE}/search?part=id&key=${API_KEY}&type=video,playlist&maxResults=50&q=${encodeURIComponent(query)}`;
    return axios.get(url).then(r => r.data);
}

export function youtubeApiPlaylist(playlistId) {
    const url = `${URL_BASE}/playlistItems?part=snippet&key=${API_KEY}&maxResults=50&playlistId=${playlistId}`;
    return axios.get(url).then(r => r.data);
}
