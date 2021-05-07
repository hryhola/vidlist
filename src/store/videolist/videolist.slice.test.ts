import { Video, YoutubeInfo } from "../../types";
import videolistReducer, { addVideo, removeVideo, increaseWatchTime, VideolistState } from "./videolist.slice";

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

  const video1: Video = { queue: 1, youtubeId: "a1", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video1n2: Video = { queue: 1, youtubeId: "a12", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video1n3: Video = { queue: 1, youtubeId: "a13", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video2: Video = { queue: 2, youtubeId: "a2", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video2n2: Video = { queue: 2, youtubeId: "a22", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video2n3: Video = { queue: 2, youtubeId: "a23", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video3: Video = { queue: 3, youtubeId: "a3", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video3n2: Video = { queue: 3, youtubeId: "a32", info: getVideoInfo(), watchTime: 999, start: 0 };
  const video3n3: Video = { queue: 3, youtubeId: "a33", info: getVideoInfo(), watchTime: 999, start: 0 };

  describe("adding videos", () => {
    it("handle video add", () => {
      expect(videolistReducer(undefined, addVideo(video1))).toEqual({
        videos: [video1],
      });
    });

    it("handle same video add", () => {
      expect(() => videolistReducer({ videos: [video1] }, addVideo(video1))).toThrow(new Error("Already in the list"));
    });

    it("sort list after videos add", () => {
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

    it("keep videos sequence in the queue afrer sort", () => {
      expect(
        videolistReducer(
          {
            videos: [video2, video3, video3n2, video3n3],
          },
          addVideo(video1)
        ).videos
      ).toEqual([video1, video2, video3, video3n2, video3n3]);
    
      expect(
        videolistReducer(
          {
            videos: [video1, video1n2, video1n3, video2, video3, video3n2, video3n3],
          },
          addVideo(video2n2)
        ).videos
      ).toEqual([video1, video1n2, video1n3, video2, video2n2, video3, video3n2, video3n3]);
  
      expect(
        videolistReducer(
          {
            videos: [video1n3, video1n2, video1, video2, video3n3, video3n2, video3],
          },
          addVideo(video2n2)
        ).videos
      ).toEqual([video1n3, video1n2, video1, video2, video2n2, video3n3, video3n2, video3]);
  
      expect(
        videolistReducer(
          {
            videos: [video1n3, video1, video1n2, video2n2, video2, video2n3,video3n3, video3n2],
          },
          addVideo(video3)
        ).videos
      ).toEqual([video1n3, video1, video1n2, video2n2, video2, video2n3,video3n3, video3n2, video3]);
  
      expect(
        videolistReducer(
          {
            videos: [video1n3, video1, video1n2, video2n2, video2, video3n3, video3n2, video3],
          },
          addVideo(video2n3)
        ).videos
      ).toEqual([video1n3, video1, video1n2, video2n2, video2, video2n3, video3n3, video3n2, video3]);
    });
  });

  describe("removing videos", () => {
    it("keep state if trying to remove video that is not in the list", () => {
      const state = {
        videos: [video1, video3],
      };

      expect(videolistReducer(state, removeVideo(video2))).toEqual(state);
      expect(videolistReducer(undefined, removeVideo(video2))).toEqual({ videos: [] });
    });

    it("remove videos", () => {
      const state = {
        videos: [video1, video2],
      };

      expect(videolistReducer(state, removeVideo(video2)).videos).not.toContainEqual(video2);
    });

    it("keep videos sequence in the queue afrer removing", () => {
      expect(
        videolistReducer(
          {
            videos: [video2, video3, video3n2, video3n3],
          },
          removeVideo(video2)
        ).videos
      ).toEqual([video3, video3n2, video3n3]);
    
      expect(
        videolistReducer(
          {
            videos: [video1, video1n2, video1n3, video2, video3, video3n2, video3n3],
          },
          removeVideo(video3n2)
        ).videos
      ).toEqual([video1, video1n2, video1n3, video2, video3, video3n3]);
  
      expect(
        videolistReducer(
          {
            videos: [video1n3, video1n2, video1, video2, video3n3, video3n2, video3],
          },
          removeVideo(video1)
        ).videos
      ).toEqual([video1n3, video1n2, video2, video3n3, video3n2, video3]);
    });
  });

  describe("increase video time", () => {
    const state: VideolistState = {
      videos: [video1],
    };

    it("change nothing if increase time is zero", () => {
      expect(videolistReducer(state, increaseWatchTime({ ...video1, increaseTime: 0 }))).toEqual(state);
    });

    it("throw an error if video is not in the list", () => {
      expect(() => videolistReducer(state, increaseWatchTime({ ...video2, increaseTime: 1 }))).toThrow(new Error("Video is not in the list!"));
    });

    it("throw an error if increase time is negative", () => {
      expect(() => videolistReducer(state, increaseWatchTime({ ...video1, increaseTime: -1 }))).toThrow(
        new Error("Increase time can't be negative!")
      );
    });

    it("increase video time", () => {
      const video: Video = Object.freeze({
        youtubeId: "x1",
        queue: 1,
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
