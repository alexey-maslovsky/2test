import { configureStore } from '@reduxjs/toolkit'
import placeDetailsReducer from './PlaceDetails/Reducer';
import placesReducer from './Places/Reducer';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    placeDetails: placeDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
