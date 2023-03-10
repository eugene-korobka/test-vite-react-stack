import { useCallback } from "react";
import type { ArticleIdType } from 'sharedTypes/article.types';

import { useAppDispatch, useAppSelector } from "store/hooks";

import { removeArticleSelectors } from "./store/removeArticle.selector";
import { removeArticleActions } from "./store/removeArticle.slice";

export function useIsRemoveArticleConfirmModal(articleId: ArticleIdType) {
  const isModalOpen = useAppSelector(removeArticleSelectors.selectIsModalOpenById, articleId);

  return isModalOpen;
};

export function useRemoveArticleConfirmModalHandlers(articleId: ArticleIdType) {
  const dispatch = useAppDispatch();

  const openRemoveArticleConfirmModal = useCallback(() => {
    dispatch(removeArticleActions.openConfirmRemoveModal({ modalId: articleId }));
  }, [dispatch, articleId]);

  const closeRemoveArticleConfirmModalWithConfirm = useCallback(() => {
    dispatch(removeArticleActions.closeConfirmRemoveModalWithConfirm());
  }, [dispatch]);

  const closeRemoveArticleConfirmModalWithCancel = useCallback(() => {
    dispatch(removeArticleActions.closeConfirmRemoveModalWithCancel());
  }, [dispatch]);

  return {
    openRemoveArticleConfirmModal,
    closeRemoveArticleConfirmModalWithConfirm,
    closeRemoveArticleConfirmModalWithCancel,
  };
};
