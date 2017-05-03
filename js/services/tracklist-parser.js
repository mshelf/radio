const REGEX = /(.*?)((\d+):)?(\d{1,2}):(\d{2})(.*)/;

export function parseTracklistTimes(description) {
    const lines = description.split("\n");
    const result = [];
    for (var i = 0; i < lines.length; i++) {
        const matches = lines[i].match(REGEX);
        if (!matches) {
            continue;
        }

        const preText = matches[1].trim();
        const postText = matches[6].trim();
        const time = (matches[3] ? parseInt(matches[2], 10) : 0) * 3600
            + parseInt(matches[4], 10) * 60
            + parseInt(matches[5], 10);

        if (matches) {
            result.push({
                time,
                text: `${preText} ${postText}`.trim(),
            });
        }
    }
    return result;
}
