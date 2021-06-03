import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  
  queue?: number;
  
  donateSum?: number;
  
  watchTime?: number;

  link: string;

  watchTimeStart: string;
}

const initialState = {
  link: "",
  watchTimeStart: "00:00:00",
  queue: undefined,
} as State;

const addVideoSlice = createSlice({
  name: "addVideoForm",
  initialState,
  reducers: {
    setWatchTime(state, { payload }: PayloadAction<number>) {
      state.watchTime = payload;
    },
    setQueue(state, { payload }: PayloadAction<number | undefined>) {
      state.queue = payload;
    },
    setDonateSum(state, { payload }: PayloadAction<number | undefined>) {
      state.donateSum = payload;
    },
    setLink(state, { payload }: PayloadAction<string>) {
      state.link = payload;
    },
    setWatchTimeStart(state, { payload }: PayloadAction<string>) {
      state.watchTimeStart = payload;
    },
  },
});

export const { setWatchTime, setQueue, setDonateSum, setLink, setWatchTimeStart } = addVideoSlice.actions;
export default addVideoSlice.reducer;
