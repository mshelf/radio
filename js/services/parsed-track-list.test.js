import ParsedTrackList from "./parsed-track-list";

test("Parse description without track lick", () => {
    const description = "some description.\nNew line."
    const parsedTrackList = new ParsedTrackList(description, {});
    expect(parsedTrackList.tracks.length).toBe(0);
});

test("Parse description with timings in start of lines", () => {
    const description = "some description.\nNew line.\n00:00 track 1\n00:10 track 2\n00:00:20 track 3\n00:01:00 track 4\n01:01:01 track 5\nother text\nother";
    const parsedTrackList = new ParsedTrackList(description, {});

    expect(parsedTrackList.tracks.length).toBe(5);

    expect(parsedTrackList.tracks[0].title).toBe("track 1");
    expect(parsedTrackList.tracks[1].title).toBe("track 2");
    expect(parsedTrackList.tracks[2].title).toBe("track 3");
    expect(parsedTrackList.tracks[3].title).toBe("track 4");
    expect(parsedTrackList.tracks[4].title).toBe("track 5");

    expect(parsedTrackList.tracks[0].time).toBe(0);
    expect(parsedTrackList.tracks[1].time).toBe(10);
    expect(parsedTrackList.tracks[2].time).toBe(20);
    expect(parsedTrackList.tracks[3].time).toBe(60);
    expect(parsedTrackList.tracks[4].time).toBe(3661);
});

test("Parse description with timings in end of lines", () => {
    const description = "some description.\nNew line.\ntrack 1 00:00\ntrack 2 00:10\ntrack 3 00:00:20\ntrack 4 00:01:00\ntrack 5 01:01:01\nother text\nother";
    const parsedTrackList = new ParsedTrackList(description, {});

    expect(parsedTrackList.tracks.length).toBe(5);

    expect(parsedTrackList.tracks[0].title).toBe("track 1");
    expect(parsedTrackList.tracks[1].title).toBe("track 2");
    expect(parsedTrackList.tracks[2].title).toBe("track 3");
    expect(parsedTrackList.tracks[3].title).toBe("track 4");
    expect(parsedTrackList.tracks[4].title).toBe("track 5");

    expect(parsedTrackList.tracks[0].time).toBe(0);
    expect(parsedTrackList.tracks[1].time).toBe(10);
    expect(parsedTrackList.tracks[2].time).toBe(20);
    expect(parsedTrackList.tracks[3].time).toBe(60);
    expect(parsedTrackList.tracks[4].time).toBe(3661);
});

test("Get nearest start track time", () => {
    const description = "some description.\nNew line.\ntrack 1 00:00\ntrack 2 00:10\ntrack 3 00:00:20\ntrack 4 00:01:00\ntrack 5 01:01:01\nother text\nother";
    const parsedTrackList = new ParsedTrackList(description, {});

    expect(parsedTrackList.getNearestStartTrackTime(3)).toBe(0);
    expect(parsedTrackList.getNearestStartTrackTime(10)).toBe(10);
    expect(parsedTrackList.getNearestStartTrackTime(12)).toBe(10);
    expect(parsedTrackList.getNearestStartTrackTime(3600)).toBe(3661);
});

test("Get track by time", () => {
    const description = "some description.\nNew line.\ntrack 1 00:00\ntrack 2 00:10\ntrack 3 00:00:20\ntrack 4 00:01:00\ntrack 5 01:01:01\nother text\nother";
    const parsedTrackList = new ParsedTrackList(description, {});

    expect(parsedTrackList.getTrackByTime(3)).toEqual({ time: 0, title: "track 1" });
    expect(parsedTrackList.getTrackByTime(10)).toEqual({ time: 10, title: "track 2" });
    expect(parsedTrackList.getTrackByTime(12)).toEqual({ time: 10, title: "track 2" });
    expect(parsedTrackList.getTrackByTime(3600)).toEqual({ time: 60, title: "track 4" });
    expect(parsedTrackList.getTrackByTime(13600)).toEqual({ time: 3661, title: "track 5" });
});

test("Get track by time for empty list", () => {
    const parsedTrackList = new ParsedTrackList("", {});
    expect(parsedTrackList.getTrackByTime(3)).toBeNull();
});