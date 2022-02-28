import { createReducer } from '@reduxjs/toolkit';
import { getPlaceDetails } from './ActionCreators';
import IPlaceDetailsState from './Type';

const initialState: IPlaceDetailsState = {
};

const placeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPlaceDetails.fulfilled, (state, action) => {
    state[action.meta.arg] = action.payload;
  });
});

export default placeDetailsReducer;
