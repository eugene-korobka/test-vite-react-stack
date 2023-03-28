import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ArticleIdType } from 'sharedTypes/article.types';

const initialState: {
  isEditModalOpen: boolean;
  currentModalId: ArticleIdType | '';
  isConfirmCloseModalOpen: boolean;
  hasFormChanges: boolean;
} = {
  isEditModalOpen: false,
  currentModalId: '',
  isConfirmCloseModalOpen: false,
  hasFormChanges: false,
};

export const editArticleSlice = createSlice({
  name: 'editArticle',
  initialState,
  reducers: {
    openEditModal(state, action: PayloadAction<{ modalId: ArticleIdType }>) {
      state.isEditModalOpen = true;
      state.currentModalId = action.payload.modalId;
    },
    closeEditModal() {
      return initialState;
    },
    openConfirmCloseModal(state) {
      state.isConfirmCloseModalOpen = true;
    },
    closeConfirmCloseModalWithConfirm() {
      return initialState;
    },
    closeConfirmCloseModalWithCancel(state) {
      state.isConfirmCloseModalOpen = false;
    },
    setHasFormChanges(state, action: PayloadAction<boolean>) {
      state.hasFormChanges = action.payload;
    },
  },
});

const beforeCloseEditModal = () => (dispatch, getState) => {
  const sliceState = getState()[editArticleSlice.name];

  const hasFormChanges = sliceState.hasFormChanges;

  if (hasFormChanges) {
    dispatch(editArticleSlice.actions.openConfirmCloseModal());
  } else {
    dispatch(editArticleSlice.actions.closeEditModal());
  }
};

export const editArticleActions = {
  ...editArticleSlice.actions,
  beforeCloseEditModal,
};
