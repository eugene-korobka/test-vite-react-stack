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

export const createArticleSlice = createSlice({
  name: 'createArticle',
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
  const sliceState = getState()[createArticleSlice.name];

  const hasFormChanges = sliceState.hasFormChanges;

  if (hasFormChanges) {
    dispatch(createArticleSlice.actions.openConfirmCloseModal());
  } else {
    dispatch(createArticleSlice.actions.closeCreateModal());
  }
};

export const createArticleActions = {
  ...createArticleSlice.actions,
  beforeCloseCreateModal,
};
