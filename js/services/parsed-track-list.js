const TIMING_REGEX = /(.*?)((\d+):)?(\d{1,2}):(\d{2})(.*)/;
const REMOVE_NUMBER_REGEX = /^\s*\d+(\)|\.|:|(\s*-))+\s*/;
export const REMOVE_EMOJI_REGEX = /[\uE000-\uF8FF]/g;
const REMOVE_EMTY_BRACES_REGEX = /\[\s*\]/g;
const LETTERS_REGEX = /[а-яА-ЯёЁa-zA-Z]+/;

export default class ParsedTrackList {
    constructor(description, sourceData) {
        const tracks = [];
        const artist = sourceData.artist ? sourceData.artist.toLowerCase() : null;
        if (description) {
            const lines = description.split("\n");
            for (var i = 0; i < lines.length; i++) {
                const matches = lines[i].match(TIMING_REGEX);
                if (!matches) {
                    continue;
                }

                const preText = matches[1].trim();
                const postText = matches[6].trim();
                const time = (matches[3] ? parseInt(matches[2], 10) : 0) * 3600
                    + parseInt(matches[4], 10) * 60
                    + parseInt(matches[5], 10);

                let title = `${preText} ${postText}`;
                if (matches && LETTERS_REGEX.test(title)) {
                    title = title
                        .replace(REMOVE_EMTY_BRACES_REGEX, "")
                        .replace(REMOVE_EMOJI_REGEX, "")
                        .replace(REMOVE_NUMBER_REGEX, "")
                        .trim();
                    if (sourceData.artist && title.toLowerCase().indexOf(artist) === -1) {
                        title = `${sourceData.artist} - ${title}`;
                    }

                    tracks.push({
                        time,
                        title,
                    });
                }
            }
        }
        this.tracks = tracks;
    }

    getNearestStartTrackTime(time) {
        if (this.tracks.length === 0) {
            return 0;
        }

        var min = 99999999;
        var d;
        var track = this.tracks[0];
        for (var i = 0; i < this.tracks.length; i++) {
            d = Math.abs(this.tracks[i].time - time);
            if (d < min) {
                min = d;
                track = this.tracks[i];
            }
        }
        return track.time;
    }

    getTrackByTime(time) {
        for (var i = 0; i < this.tracks.length; i++) {
            if (time < this.tracks[i].time) {
                return i > 0 ? this.tracks[i-1] : null;
            }
        }
        return null;
    }

    hasTracks() {
        return this.tracks.length > 0;
    }
}