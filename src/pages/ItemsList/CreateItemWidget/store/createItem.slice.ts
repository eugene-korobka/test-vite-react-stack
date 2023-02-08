import { createSlice } from "@reduxjs/toolkit"

const initialState: {
  isCreateModalOpen: boolean;
} = {
  isCreateModalOpen: false,
};

export const createItemSlice = createSlice({
  name: 'createItem',
  initialState,
  reducers: {
    openCreateModal(state) {
      state.isCreateModalOpen = true;
    },
    closeCreateModal(state) {
      state.isCreateModalOpen = false;
    },
  },
});

export const createItemActions = createItemSlice.actions;

export const createItemReducer = createItemSlice.reducer;
