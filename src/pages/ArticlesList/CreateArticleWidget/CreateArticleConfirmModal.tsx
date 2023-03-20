import { memo } from 'react';

import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { createArticleSelectors } from './store/createArticle.selector';
import { createArticleActions } from './store/createArticle.slice';

function useCreateArticleConfirmModalHandlers() {
  const dispatch = useAppDispatch();

  const openCreateArticleConfirmModal = () => {
    dispatch(createArticleActions.openConfirmCloseModal());
  };

  const closeCreateArticleConfirmModalWithConfirm = () => {
    dispatch(createArticleActions.closeConfirmCloseModalWithConfirm());
  };

  const closeCreateArticleConfirmModalWithCancel = () => {
    dispatch(createArticleActions.closeConfirmCloseModalWithCancel());
  };

  return {
    openCreateArticleConfirmModal,
    closeCreateArticleConfirmModalWithConfirm,
    closeCreateArticleConfirmModalWithCancel,
  };
}

function useCreateArticleConfirmModalState() {
  const isModalOpen = useAppSelector(createArticleSelectors.selectIsConfirmCloseModalOpen);

  const { closeCreateArticleConfirmModalWithConfirm, closeCreateArticleConfirmModalWithCancel } =
    useCreateArticleConfirmModalHandlers();

  return {
    isModalOpen,
    closeCreateArticleConfirmModalWithConfirm,
    closeCreateArticleConfirmModalWithCancel,
  };
}

export const CreateArticleConfirmModal = memo(() => {
  const { isModalOpen, closeCreateArticleConfirmModalWithConfirm, closeCreateArticleConfirmModalWithCancel } =
    useCreateArticleConfirmModalState();

  return (
    <ExitWithChangesConfirmModal
      isConfirmOpen={isModalOpen}
      onConfirm={closeCreateArticleConfirmModalWithConfirm}
      onCancel={closeCreateArticleConfirmModalWithCancel}
    />
  );
});
