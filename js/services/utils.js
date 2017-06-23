export const TIMING_REGEX = /(.*?)((\d+):)?(\d{1,2}):(\d{2})(.*)/;
export const TRACK_NUMBER_REGEX = /^\s*\d+(\)|\.|:|(\s*-)|(\s*\|))+\s*/;
export const EMOJI_REGEX = /[\uE000-\uF8FF]/g;
export const EMPTY_BRACES_REGEX = /(\[\s*\])|(\(\s*\))/g;
export const LETTERS_REGEX = /[а-яА-ЯёЁa-zA-Z]+/;

export function randomInt(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomArrayItem(items) {
    return items[randomInt(items.length)];
}

export function debugLog(msg) {
    if (process.env.NODE_ENV !== "production") {
        console.log(msg);
    }
}

export function concatChannelIds(parentId, id) {
    return parentId ? `${parentId}\\${id}` : id;
}