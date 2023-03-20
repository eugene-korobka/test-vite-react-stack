import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  modals: Record<string, boolean>;
} = {
  modals: {},
}

export const modalManagerSlice = createSlice({
  name: 'modalManager',
  initialState,
  reducers: {
    openModalById(state, action: PayloadAction<{ modalId: string }>) {
      const { modalId } = action.payload;

      state.modals[modalId] = true;
    },
    closeModalById(state, action) {
      const { modalId } = action.payload;

      state.modals[modalId] = false;
    },
  },
});

export const modalManagerActions = modalManagerSlice.actions;
