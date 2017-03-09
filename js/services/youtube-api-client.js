import axios from "axios";

const API_KEY = "AIzaSyDpQHUScIP1XnEoY6PdqgNRNGRRN5kO5vE";
const URL_BASE = "https://www.googleapis.com/youtube/v3";

export default class YoutubeApiClient {
    search(query) {
        const url = `${URL_BASE}/search?part=snippet&key=${API_KEY}&type=video&maxResults=50&q=${encodeURIComponent(query)}`;
        return axios.get(url).then(r => r.data);
    }
}
