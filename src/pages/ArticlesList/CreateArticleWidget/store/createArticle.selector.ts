import { createSelector } from "@reduxjs/toolkit"

import { createArticleSlice } from 'pages/ArticlesList/CreateArticleWidget/store/createArticle.slice';

import { selectRootState } from "store/store";

const selectCreateArticleDomain = createSelector(selectRootState, (state) => state[createArticleSlice.name]);

const selectIsCreateModalOpen = createSelector(selectCreateArticleDomain, (state) => state.isCreateModalOpen);

const selectFormData = createSelector(selectCreateArticleDomain, (state) => state.formData);

const selectIsConfirmCloseModalOpen = createSelector(selectCreateArticleDomain, (state) => state.isConfirmCloseModalOpen);

export const createArticleSelectors = {
  selectCreateArticleDomain,
  selectIsCreateModalOpen,
  selectFormData,
  selectIsConfirmCloseModalOpen,
};
