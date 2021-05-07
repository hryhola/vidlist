import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video, VideoKey } from "../../types";

export interface VideolistState {
  videos: Video[];
}

const initialState = { videos: [] } as VideolistState;

const videolistSlice = createSlice({
  name: "videolist",
  initialState,
  reducers: {
    addVideo(state, { payload }: PayloadAction<Video>) {
      if (state.videos.some((v) => v.queue === payload.queue && v.youtubeId === payload.youtubeId)) {
        throw new Error("Already in the list");
      }
      state.videos.push(payload);
      state.videos.sort((a, b) => a.queue - b.queue);
    },
    removeVideo(state, { payload }: PayloadAction<VideoKey>) {
      state.videos = state.videos.filter((v) => !(v.queue === payload.queue && v.youtubeId === payload.youtubeId));
    },
    increaseWatchTime(state, { payload }: PayloadAction<VideoKey & { increaseTime: number }>) {
      if (payload.increaseTime < 0) throw new Error("Increase time can't be negative!")

      const video = state.videos.find((v) => v.youtubeId === payload.youtubeId && v.queue === payload.queue)

      if (!video) throw new Error("Video is not in the list!")

      video.watchTime += payload.increaseTime;
    }
  },
});

export const { addVideo, removeVideo, increaseWatchTime } = videolistSlice.actions;
export default videolistSlice.reducer;
