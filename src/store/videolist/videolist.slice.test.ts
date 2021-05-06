import { Video } from "../../types";
import videolistReducer, { addVideo, removeVideo, VideolistState } from "./videolist.slice";

const getVideo = (): Video =>
  Object.freeze({
    queue: 1,
    youtubeId: "E8V6zAuUCYs",
  });

describe("Videolist slice", () => {
  it("return the initial state", () => {
    const defaultState: VideolistState = {
      videos: [],
    };

    expect(videolistReducer(undefined, { type: "" })).toEqual(defaultState);
  });

  it("handle video add", () => {
    expect(videolistReducer(undefined, addVideo(getVideo()))).toEqual({
      videos: [getVideo()],
    });
  });

  it("handle same video add", () => {
    expect(() => videolistReducer({ videos: [getVideo()] }, addVideo(getVideo()))).toThrow(new Error("Already in the list"));
  });

  it("sort list after videos add", () => {
    const video1 = { queue: 1, youtubeId: "a1" };
    const video2 = { queue: 2, youtubeId: "a2" };
    const video3 = { queue: 3, youtubeId: "a3" };

    expect(
      videolistReducer(
        {
          videos: [video1, video3],
        },
        addVideo(video2)
      )
    ).toEqual({
      videos: [video1, video2, video3],
    });

    expect(
      videolistReducer(
        {
          videos: [video2, video3],
        },
        addVideo(video1)
      )
    ).toEqual({
      videos: [video1, video2, video3],
    });
  });

  it("keep state if trying to remove video that is not in the list", () => {
    const video1 = { queue: 1, youtubeId: "a1" };
    const video2 = { queue: 2, youtubeId: "a2" };
    const video3 = { queue: 3, youtubeId: "a3" };

    const state = {
      videos: [video1, video3],
    };

    expect(videolistReducer(state, removeVideo(video2))).toEqual(state);
    expect(videolistReducer(undefined, removeVideo(video2))).toEqual({ videos: [] });
  });

  it("remove videos", () => {
    const video1 = { queue: 1, youtubeId: "a1" };
    const video2 = { queue: 2, youtubeId: "a2" };

    const state = {
      videos: [video1, video2],
    };

    expect(videolistReducer(state, removeVideo(video2)).videos).not.toContainEqual(video2)
  });

  it("sort videos after remove", () => {
    const video1 = { queue: 1, youtubeId: "a1" };
    const video2 = { queue: 2, youtubeId: "a2" };
    const video3 = { queue: 3, youtubeId: "a3" };

    const state = {
      videos: [video3, video2, video1],
    };

    expect(videolistReducer(state, removeVideo(video2)).videos).toEqual([video1, video3])
  })
});
