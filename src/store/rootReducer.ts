import { combineReducers } from "@reduxjs/toolkit";

import videolistReducer from "../features/videolist/slice";
import settingsReducer from "./settings/settings.slice";
import addVideoReducer from "../features/addVideoForm/slice";

const store = { videolist: videolistReducer, settings: settingsReducer, addVideoForm: addVideoReducer };

export let rootReducer = combineReducers({
  ...store,
});

export default function createReducer(injectedReducers = {}) {
  rootReducer = combineReducers({
    ...store,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<typeof rootReducer>;
