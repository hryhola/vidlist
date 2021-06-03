import { createSlice } from "@reduxjs/toolkit";
import { QueueType } from "../../types";

export interface VideolistState {
  queueType: QueueType;
  basePriceForMinute: number;
}

const initialState = { 
    queueType: "geometric",
    basePriceForMinute: 25,
 } as VideolistState;

const settingsSlice = createSlice({
  name: "videolist",
  initialState,
  reducers: {},
});

// export const { } = settingsSlice.actions;
export default settingsSlice.reducer;
