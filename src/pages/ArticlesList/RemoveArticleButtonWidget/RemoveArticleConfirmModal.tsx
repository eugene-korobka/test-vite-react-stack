import { memo } from 'react';
import { useRemoveArticleMutation } from 'sharedApi/articles.remove.api';
import type { ArticleIdType } from 'sharedTypes/article.types';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useIsRemoveArticleConfirmModal, useRemoveArticleConfirmModalHandlers } from './hooks';

type RemoveArticleConfirmModalProps = {
  articleId: ArticleIdType;
};

function useRemoveArticleConfirmModal(props: RemoveArticleConfirmModalProps) {
  const { articleId } = props;

  const { closeRemoveArticleConfirmModalWithConfirm, closeRemoveArticleConfirmModalWithCancel } =
    useRemoveArticleConfirmModalHandlers(articleId);

  const [removeArticleTrigger, { isLoading: isArticleRemoving }] = useRemoveArticleMutation();

  const confirmRemove = () => {
    removeArticleTrigger({ articleId })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeRemoveArticleConfirmModalWithConfirm();
      });
  };

  const isConfirmButtonDisabled = !articleId || isArticleRemoving;

  const isModalOpen = useIsRemoveArticleConfirmModal(articleId);

  return {
    isModalOpen,
    isConfirmButtonDisabled,
    closeRemoveArticleConfirmModalWithCancel,
    confirmRemove,
  };
}

export const RemoveArticleConfirmModal = memo((props: RemoveArticleConfirmModalProps) => {
  const { isModalOpen, isConfirmButtonDisabled, closeRemoveArticleConfirmModalWithCancel, confirmRemove } =
    useRemoveArticleConfirmModal(props);

  return (
    <Modal.ConfirmModal isOpen={isModalOpen}>
      <Modal.Header title="Confirm remove" />
      <Modal.Main>Are you sure you want to remove article?</Modal.Main>
      <Modal.Footer>
        <AppButton onClick={closeRemoveArticleConfirmModalWithCancel}>Cancel</AppButton>
        <AppButton disabled={isConfirmButtonDisabled} onClick={confirmRemove}>
          Confirm
        </AppButton>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
});
