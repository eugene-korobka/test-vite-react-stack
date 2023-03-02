import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: {
  isCreateModalOpen: boolean;
  hasFormChanges: boolean;
  isConfirmCloseModalOpen: boolean;
} = {
  isCreateModalOpen: false,
  hasFormChanges: false,
  isConfirmCloseModalOpen: false,
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
    openConfirmCloseModal(state) {
      state.isConfirmCloseModalOpen = true;
    },
    closeConfirmCloseModalWithConfirm(state) {
      state.isConfirmCloseModalOpen = false;
      state.isCreateModalOpen = false;
    },
    closeConfirmCloseModalWithCancel(state) {
      state.isConfirmCloseModalOpen = false;
    },
    setHasFormChanges(state, action: PayloadAction<boolean>) {
      state.hasFormChanges = action.payload;
    },
  },
});

const beforeCloseCreateModal = () => (dispatch, getState) => {
  const sliceState = getState()[createItemSlice.name];

  const hasFormChanges = sliceState.hasFormChanges;

  if (hasFormChanges) {
    dispatch(createItemSlice.actions.openConfirmCloseModal());
  } else {
    dispatch(createItemSlice.actions.closeCreateModal());
  }
};

export const createItemActions = {
  ...createItemSlice.actions,
  beforeCloseCreateModal,
};

export const createItemReducer = createItemSlice.reducer;
