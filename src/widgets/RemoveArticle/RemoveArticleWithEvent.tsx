import { useState } from 'react';
import { dispatchAppEvent } from 'hooks/useAppEvents';
import { useArticleId } from 'hooks/useArticleId';
import { useRemoveArticleMutation } from 'sharedApi/removeArticle.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { appEventArticleRemoved } from 'sharedTypes/event.types';

import { RemoveArticleButtonWithConfirmModal } from './RemoveArticleButtonWithConfirmModal';

type RemoveArticleWithEventProps = {
  articleId?: ArticleIdType;
};

function useConfirmModalState() {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const openConfirmModal = () => {
    setConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmOpen(false);
  };

  return {
    isConfirmOpen,
    openConfirmModal,
    closeConfirmModal,
  };
}

export const RemoveArticleWithEvent = (props: RemoveArticleWithEventProps) => {
  const { articleId: propsArticleId } = props;

  const articleId = useArticleId(propsArticleId);

  const [removeArticleTrigger, { isLoading: isRemovingArticle }] = useRemoveArticleMutation();

  const isConfirmButtonDisabled = !articleId || isRemovingArticle;

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const confirmRemove = () => {
    if (!articleId) {
      return;
    }

    removeArticleTrigger({ articleId })
      .unwrap()
      .then(() => {
        dispatchAppEvent(appEventArticleRemoved, { articleId });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeConfirmModal();
      });
  };

  if (!articleId) {
    return null;
  }

  return (
    <RemoveArticleButtonWithConfirmModal
      isOpen={isConfirmOpen}
      onButtonClick={openConfirmModal}
      onCancel={closeConfirmModal}
      onConfirm={confirmRemove}
      isConfirmButtonDisabled={isConfirmButtonDisabled}
    />
  );
};
