import { concatChannelIds } from "./utils";

test("concat channels", () => {
    expect(concatChannelIds("channel1", "channel2")).toBe("channel1\\channel2");
    expect(concatChannelIds("", "channel")).toBe("channel");
});