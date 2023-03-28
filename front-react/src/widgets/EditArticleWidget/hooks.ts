import { useCallback } from "react";
import type { ArticleIdType } from 'sharedTypes/article.types';

import { useAppDispatch, useAppSelector } from "store/hooks";

import { editArticleSelectors } from "./store/editArticle.selector";
import { editArticleActions } from "./store/editArticle.slice";

export function useIsEditArticleModalOpen(articleId) {
  const isModalOpen = useAppSelector(editArticleSelectors.selectIsModalOpenById, articleId);

  return isModalOpen;
}

export function useEditArticleModalHandlers(articleId: ArticleIdType) {
  const dispatch = useAppDispatch();

  const openEditArticleModal = useCallback(() => {
    dispatch(editArticleActions.openEditModal({ modalId: articleId }));
  }, [dispatch, articleId]);

  const closeEditArticleModal = useCallback(() => {
    dispatch(editArticleActions.closeEditModal());
  }, [dispatch]);

  const beforeCloseEditArticleModal = useCallback(() => {
    dispatch(editArticleActions.beforeCloseEditModal());
  }, [dispatch]);

  return {
    openEditArticleModal,
    closeEditArticleModal,
    beforeCloseEditArticleModal,
  };
}

export function useEditArticleConfirmModalHandlers() {
  const dispatch = useAppDispatch();

  const openEditArticleConfirmModal = useCallback(() => {
    dispatch(editArticleActions.openConfirmCloseModal());
  }, [dispatch]);

  const closeEditArticleConfirmModalWithConfirm = useCallback(() => {
    dispatch(editArticleActions.closeConfirmCloseModalWithConfirm());
  }, [dispatch]);

  const closeEditArticleConfirmModalWithCancel = useCallback(() => {
    dispatch(editArticleActions.closeConfirmCloseModalWithCancel());
  }, [dispatch]);

  return {
    openEditArticleConfirmModal,
    closeEditArticleConfirmModalWithConfirm,
    closeEditArticleConfirmModalWithCancel,
  };
};
