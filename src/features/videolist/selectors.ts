import { createSelector } from 'reselect'
import { RootState } from '../../store/rootReducer'
 
const videolistSelector = (state: RootState) => state.videolist
 
export const videosSelector = createSelector(
  videolistSelector,
  (videolist) => videolist.videos
);
 
export const currentVideoQueuesSelector = createSelector(
   videosSelector,
  (videos) => Array.from(new Set(videos.map((v) => v.queue)))
);
