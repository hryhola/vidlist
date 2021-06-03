import { createSelector } from 'reselect'
import { RootState } from '../../store/rootReducer'
 
const addVideoSelector = (state: RootState) => state.addVideoForm;
 
export const sliceSelector = createSelector(
  addVideoSelector,
  (slice) => slice
);
