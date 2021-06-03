import { Video, YoutubeInfo } from "../../types";
import videolistReducer, { addVideo, removeVideo, increaseWatchTime, VideolistState } from "./slice";

export const getVideoInfo = (): YoutubeInfo =>
  Object.freeze({
    title: "Video",
    channelTitle: "ChTitle",
    publishedAt: new Date("December 17, 1995 03:24:00"),
    thumbnail: "https://i.ytimg.com/vi/kQ-I-VQsvko/maxresdefault.jpg",
    isAgeRestricted: false,
    duration: 120,
  });

describe("Videolist slice", () => {
  it("return the initial state", () => {
    const defaultState: VideolistState = {
      videos: [],
    };

    expect(videolistReducer(undefined, { type: "" })).toEqual(defaultState);
  });

  const getVideo = (q: number, p: number = 1, id: string = `id${q}-${p}`): Video => ({
    queue: q,
    positionInQueue: p,
    start: 0,
    youtubeId: id,
    watchTime: 5566,
    info: {
      channelTitle: "Жмиль Highlights",
      duration: 5566,
      isAgeRestricted: false,
      publishedAt: new Date("December 17, 1995 03:24:00"),
      thumbnail:
        "https://i.ytimg.com/vi/JOPVQKcMbaY/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCFgO6sYhShiUj-Anne29dZGn3xeA",
      title: "Лукашенко оправдывается за свой пранк с самолётом",
    },
  });

  describe("adding videos", () => {
    it("handle video add", () => {
      expect(videolistReducer(undefined, addVideo(getVideo(1)))).toEqual({
        videos: [getVideo(1)],
      });
    });

    it("handle same video add", () => {
      expect(() => videolistReducer({ videos: [getVideo(1)] }, addVideo(getVideo(1)))).toThrow(new Error("Already in the list"));
    });

    it("sort list after videos add", () => {
      expect(
        videolistReducer(
          {
            videos: [getVideo(3), getVideo(1)],
          },
          addVideo(getVideo(2))
        )
      ).toEqual({
        videos: [getVideo(3), getVideo(2), getVideo(1)],
      });

      expect(
        videolistReducer(
          {
            videos: [getVideo(3), getVideo(2)],
          },
          addVideo(getVideo(1))
        )
      ).toEqual({
        videos: [getVideo(3), getVideo(2), getVideo(1)],
      });

      expect(
        videolistReducer(
          {
            videos: [getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2)],
          },
          addVideo(getVideo(1))
        ).videos
      ).toEqual([getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2), getVideo(1)]);

      expect(
        videolistReducer(
          {
            videos: [getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2), getVideo(1), getVideo(1, 2), getVideo(1, 3)],
          },
          addVideo(getVideo(2, 2))
        ).videos
      ).toEqual([getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2), getVideo(2, 2), getVideo(1), getVideo(1, 2), getVideo(1, 3)]);
    });

  });

  describe("removing videos", () => {
    it("keep state if trying to remove video that is not in the list", () => {
      const state = {
        videos: [getVideo(3), getVideo(1)],
      };

      expect(videolistReducer(state, removeVideo(getVideo(2)))).toEqual(state);
      expect(videolistReducer(undefined, removeVideo(getVideo(2)))).toEqual({ videos: [] });
    });

    it("remove videos", () => {
      const state = {
        videos: [getVideo(2), getVideo(1)],
      };

      expect(videolistReducer(state, removeVideo(getVideo(2))).videos).not.toContainEqual(getVideo(2));
    });

    it("keep videos sequence in the queue afrer removing", () => {
      expect(
        videolistReducer(
          {
            videos: [getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2)],
          },
          removeVideo(getVideo(2))
        ).videos
      ).toEqual([getVideo(3), getVideo(3, 2), getVideo(3, 3)]);

      expect(
        videolistReducer(
          {
            videos: [getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2), getVideo(2, 2, "idrem"), getVideo(2, 3, "idkeep"), getVideo(1), getVideo(1, 2)],
          },
          removeVideo(getVideo(2, 2, "idrem"))
        ).videos
      ).toEqual([getVideo(3), getVideo(3, 2), getVideo(3, 3), getVideo(2), getVideo(2, 2, "idkeep"), getVideo(1), getVideo(1, 2)]);


      expect(
        videolistReducer(
          {
            videos: [getVideo(3, 1, "idrem"), getVideo(3, 2, "idkeep"), getVideo(3, 3, "idkeep1"), getVideo(2), getVideo(2, 2), getVideo(2, 3), getVideo(1), getVideo(1, 2)],
          },
          removeVideo(getVideo(3, 1, "idrem"))
        ).videos
      ).toEqual([getVideo(3, 1, "idkeep"), getVideo(3, 2, "idkeep1"), getVideo(2), getVideo(2, 2), getVideo(2, 3), getVideo(1), getVideo(1, 2)]);
    });
  });

  describe("increase video time", () => {
    const state: VideolistState = {
      videos: [getVideo(1)],
    };

    it("change nothing if increase time is zero", () => {
      expect(videolistReducer(state, increaseWatchTime({ ...getVideo(1), increaseTime: 0 }))).toEqual(state);
    });

    it("throw an error if video is not in the list", () => {
      expect(() => videolistReducer(state, increaseWatchTime({ ...getVideo(2), increaseTime: 1 }))).toThrow(new Error("Video is not in the list!"));
    });

    it("throw an error if increase time is negative", () => {
      expect(() => videolistReducer(state, increaseWatchTime({ ...getVideo(1), increaseTime: -1 }))).toThrow(
        new Error("Increase time can't be negative!")
      );
    });

    it("increase video time", () => {
      const video: Video = Object.freeze({
        youtubeId: "x1",
        queue: 1,
        positionInQueue: 1,
        watchTime: 10,
        start: 0,
        info: getVideoInfo(),
      });
      const state: VideolistState = {
        videos: [video],
      };
      expect(videolistReducer(state, increaseWatchTime({ youtubeId: "x1", queue: 1, increaseTime: 10 }))).toEqual({
        videos: [{ ...video, watchTime: 20 }],
      });

      const state2 = {
        videos: [{ ...video, start: 5 }],
      };
      expect(videolistReducer(state2, increaseWatchTime({ youtubeId: "x1", queue: 1, increaseTime: 10 }))).toEqual({
        videos: [{ ...video, start: 5, watchTime: 20 }],
      });
    });
  });
});
