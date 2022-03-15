import { createAsyncThunk } from '@reduxjs/toolkit';
import PlacesApi from '../../api/Places';
import PlaceDetailsActionType from './ActionType';

const placesApi = new PlacesApi();

export const getPlaceDetails = createAsyncThunk(PlaceDetailsActionType.GetPlaceDetails, (id: string) => {
  return placesApi.getById(id);
});

export const likePlace = createAsyncThunk(PlaceDetailsActionType.Like, (id: string) => {
  return placesApi.like(id);
});

export const dislikePlace = createAsyncThunk(PlaceDetailsActionType.Dislike, (id: string) => {
  return placesApi.dislike(id);
});
