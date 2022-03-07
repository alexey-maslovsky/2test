import { createReducer } from '@reduxjs/toolkit';
import { closeSafePlacePopup, openSafePlacePopup } from './ActionCreators';
import IPopupManagementState from './Type';

const initialState: IPopupManagementState = {
  isCreateSafePlacePopupOpen: false,
};

const popupManagementReducer = createReducer(initialState, (builder) => {
  builder.addCase(openSafePlacePopup, (state) => {
    state.isCreateSafePlacePopupOpen = true;
  });

  builder.addCase(closeSafePlacePopup, (state) => {
    state.isCreateSafePlacePopupOpen = false;
  });
});

export default popupManagementReducer;
