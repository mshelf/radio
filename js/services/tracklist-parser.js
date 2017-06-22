const TIMING_REGEX = /(.*?)((\d+):)?(\d{1,2}):(\d{2})(.*)/;
const REMOVE_NUMBER_REGEX = /^\s*\d+(\)|\.|:|(\s*-))+\s*/;
export const REMOVE_EMOJI_REGEX = /[\uE000-\uF8FF]/g;
const REMOVE_EMTY_BRACES_REGEX = /\[\s*\]/g;
const LETTERS_REGEX = /[а-яА-ЯёЁa-zA-Z]+/;

export function parseTracklistTimes(description) {
    const lines = description.split("\n");
    const result = [];
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

        const title = `${preText} ${postText}`;
        if (matches && LETTERS_REGEX.test(title)) {
            result.push({
                time,
                title: title
                    .replace(REMOVE_EMTY_BRACES_REGEX, "")
                    .replace(REMOVE_EMOJI_REGEX, "")
                    .replace(REMOVE_NUMBER_REGEX, "")
                    .trim(),
            });
        }
    }
    return result;
}

export function getNearestTime(tracks, time) {
    var min = 99999999;
    var d;
    var track = tracks[0];
    for (var i = 0; i < tracks.length; i++) {
        d = Math.abs(tracks[i].time - time);
        if (d < min) {
            min = d;
            track = tracks[i];
        }
    }
    return track.time;
}

export function getTrackByTime(tracks, time) {
    for (var i = 0; i < tracks.length; i++) {
        if (time < tracks[i].time) {
            return i > 0 ? tracks[i-1] : null;
        }
    }
    return null;
}