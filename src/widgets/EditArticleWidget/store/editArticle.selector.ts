import { createSelector } from "@reduxjs/toolkit"

import { selectRootState, selectSelectorParams } from "store/store";

import { editArticleSlice } from "./editArticle.slice";

const selectEditArticleDomain = createSelector(selectRootState, (state) => state[editArticleSlice.name]);

const selectIsEditModalOpen = createSelector(selectEditArticleDomain, (state) => state.isEditModalOpen);

const selectCurrentModalId = createSelector(selectEditArticleDomain, (state) => state.currentModalId);

const selectIsConfirmCloseModalOpen = createSelector(selectEditArticleDomain, (state) => state.isConfirmCloseModalOpen);

const selectIsModalOpenById = createSelector(selectEditArticleDomain, selectSelectorParams, (state, articleId) => {
  return Boolean(state.currentModalId && state.currentModalId === articleId && state.isEditModalOpen);
});

export const editArticleSelectors = {
  selectEditArticleDomain,
  selectIsEditModalOpen,
  selectCurrentModalId,
  selectIsConfirmCloseModalOpen,
  selectIsModalOpenById,
};
