import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ArticleIdType } from "sharedTypes/article.types";

const initialState: {
  isConfirmRemoveModalOpen: boolean;
  currentModalId: ArticleIdType | '';
} = {
  isConfirmRemoveModalOpen: false,
  currentModalId: '',
};

export const removeArticleSlice = createSlice({
  name: 'removeArticle',
  initialState,
  reducers: {
    openConfirmRemoveModal(state, action: PayloadAction<{ modalId: ArticleIdType }>) {
      state.isConfirmRemoveModalOpen = true;
      state.currentModalId = action.payload.modalId;
    },
    closeConfirmRemoveModalWithConfirm() {
      return initialState;
    },
    closeConfirmRemoveModalWithCancel() {
      return initialState;
    },
  },
});

export const removeArticleActions = removeArticleSlice.actions;

export const removeArticleReducer = removeArticleSlice.reducer;
