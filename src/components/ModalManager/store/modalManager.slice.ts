import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  modalId: string;
  isOpen: boolean;
  modals: Record<string, boolean>;
} = {
  modalId: '',
  isOpen: false,
  modals: {},
}

export const modalManagerSlice = createSlice({
  name: 'modalManager',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
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

export const modalManagerReducer = modalManagerSlice.reducer;
