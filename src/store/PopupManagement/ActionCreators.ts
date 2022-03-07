import { createAction } from '@reduxjs/toolkit';
import PopupManagementActionType from './ActionType';

export const openSafePlacePopup = createAction(PopupManagementActionType.OpenSafePlacePopup);

export const closeSafePlacePopup = createAction(PopupManagementActionType.CloseSafePlacePopup);
