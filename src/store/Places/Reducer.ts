import { createReducer } from '@reduxjs/toolkit';
import { getPlaces } from './ActionCreators';
import IPlacesState from './Type';

const initialState: IPlacesState = {
  items: undefined,
};

const placesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPlaces.fulfilled, (state, action) => {
    state.items = action.payload;
  });

  builder.addCase(getPlaces.rejected, (state) => {
    state.items = [];
  });
});

export default placesReducer;
