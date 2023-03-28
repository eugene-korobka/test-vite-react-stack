import { memo } from 'react';

import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';

import { useAppSelector } from 'store/hooks';

import { editArticleSelectors } from './store/editArticle.selector';
import { useEditArticleConfirmModalHandlers } from './hooks';

function useEditArticleConfirmModalState() {
  const isModalOpen = useAppSelector(editArticleSelectors.selectIsConfirmCloseModalOpen);

  const { closeEditArticleConfirmModalWithConfirm, closeEditArticleConfirmModalWithCancel } =
    useEditArticleConfirmModalHandlers();

  return {
    isModalOpen,
    closeEditArticleConfirmModalWithConfirm,
    closeEditArticleConfirmModalWithCancel,
  };
}

export const EditArticleConfirmModal = memo(() => {
  const { isModalOpen, closeEditArticleConfirmModalWithConfirm, closeEditArticleConfirmModalWithCancel } =
    useEditArticleConfirmModalState();

  return (
    <ExitWithChangesConfirmModal
      isConfirmOpen={isModalOpen}
      onConfirm={closeEditArticleConfirmModalWithConfirm}
      onCancel={closeEditArticleConfirmModalWithCancel}
    />
  );
});
