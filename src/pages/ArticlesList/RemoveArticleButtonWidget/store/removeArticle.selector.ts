import { createSelector } from "@reduxjs/toolkit"

import { selectRootState, selectSelectorParams } from "store/store";

import { removeArticleSlice } from "./removeArticle.slice";

const selectRemoveArticleDomain = createSelector(selectRootState, (state) => state[removeArticleSlice.name]);

const selectIsConfirmRemoveModalOpen = createSelector(selectRemoveArticleDomain, (state) => state.isConfirmRemoveModalOpen);

const selectCurrentModalId = createSelector(selectRemoveArticleDomain, (state) => state.currentModalId);

const selectIsModalOpenById = createSelector(selectRemoveArticleDomain, selectSelectorParams, (state, articleId) => {
  return Boolean(state.currentModalId && state.currentModalId === articleId && state.isConfirmRemoveModalOpen);
});

export const removeArticleSelectors = {
  selectRemoveArticleDomain,
  selectIsConfirmRemoveModalOpen,
  selectCurrentModalId,
  selectIsModalOpenById,
};
