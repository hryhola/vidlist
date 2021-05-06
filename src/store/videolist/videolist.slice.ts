import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../../types";

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
    removeVideo(state, { payload }: PayloadAction<Pick<Video, "queue" | "youtubeId">>) {
      state.videos = state.videos.filter((v) => !(v.queue === payload.queue && v.youtubeId === payload.youtubeId));
      state.videos.sort((a, b) => a.queue - b.queue);
    },
  },
});

export const { addVideo, removeVideo } = videolistSlice.actions;
export default videolistSlice.reducer;
