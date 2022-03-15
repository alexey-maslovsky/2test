import { createReducer } from '@reduxjs/toolkit';
import { dislikePlace, getPlaceDetails, likePlace } from './ActionCreators';
import IPlaceDetailsState from './Type';

const initialState: IPlaceDetailsState = {
};

const placeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPlaceDetails.fulfilled, (state, action) => {
    state[action.meta.arg] = action.payload;
  });

  builder.addCase(likePlace.pending, (state, action) => {
    if (state[action.meta.arg]) {
      state[action.meta.arg]!.likes += 1; // typescript doesn't work here for some reasons
      state[action.meta.arg]!.isLiked = true;
    }
  });

  builder.addCase(likePlace.rejected, (state, action) => {
    if (state[action.meta.arg]) {
      state[action.meta.arg]!.likes -= 1;
      state[action.meta.arg]!.isLiked = false;
    }
  });

  builder.addCase(dislikePlace.pending, (state, action) => {
    if (state[action.meta.arg]) {
      state[action.meta.arg]!.likes -= 1;
      state[action.meta.arg]!.isLiked = false;
    }
  });

  builder.addCase(dislikePlace.rejected, (state, action) => {
    if (state[action.meta.arg]) {
      state[action.meta.arg]!.likes += 1;
      state[action.meta.arg]!.isLiked = true;
    }
  });
});

export default placeDetailsReducer;
