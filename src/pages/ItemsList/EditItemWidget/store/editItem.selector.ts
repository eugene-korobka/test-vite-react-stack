import { createSelector } from "@reduxjs/toolkit"

import { RootState } from "store/store";

import { editItemSlice } from "./editItem.slice";

const selectEditItemDomain = createSelector((state: RootState) => state, (state) => state[editItemSlice.name]);

const selectIsEditModalOpen = createSelector(selectEditItemDomain, (state) => state.isEditModalOpen);

const selectEditedItemId = createSelector(selectEditItemDomain, (state) => state.editedItemId);

const selectFormData = createSelector(selectEditItemDomain, (state) => state.formData);

const selectIsConfirmCloseModalOpen = createSelector(selectEditItemDomain, (state) => state.isConfirmCloseModalOpen);

export const editItemSelectors = {
  selectEditItemDomain,
  selectIsEditModalOpen,
  selectEditedItemId,
  selectFormData,
  selectIsConfirmCloseModalOpen,
};
