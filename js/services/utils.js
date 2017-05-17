export function randomInt(maxValue) {
    return Math.floor(Math.random() * maxValue);
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomArrayItem(items) {
    return items[randomInt(items.length)];
}