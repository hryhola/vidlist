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
    addVideo(state, { payload }: PayloadAction<Omit<Video, "positionInQueue">>) {
      if (state.videos.some((v) => v.queue === payload.queue && v.youtubeId === payload.youtubeId)) {
        throw new Error("Already in the list");
      }

      const queueVideos = state.videos.filter((v) => v.queue === payload.queue);

      const lastPostitionInQueue = queueVideos.length ? queueVideos[queueVideos.length - 1].positionInQueue : 0;

      state.videos.push({ ...payload, positionInQueue: lastPostitionInQueue + 1});
      
      state.videos.sort((a, b) => b.queue - a.queue);
    },
    removeVideo(state, { payload }: PayloadAction<VideoKey>) {
      state.videos = state.videos.filter((v) => !(v.queue === payload.queue && v.youtubeId === payload.youtubeId));

      let queueIndex = state.videos.findIndex((v) => v.queue === payload.queue);

      if (queueIndex !== -1) {
        for (let newIndex = 1; state.videos[queueIndex] && state.videos[queueIndex].queue === payload.queue; queueIndex++, newIndex++) {
          state.videos[queueIndex].positionInQueue = newIndex;
        }
      }
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
