import { useState } from 'react';
import { useArticleId } from 'hooks/useArticleId';
import { useRemoveArticleMutation } from 'sharedApi/removeArticle.api';
import type { ArticleIdType } from 'sharedTypes/article.types';

import { RemoveArticleButtonWithConfirmModal } from './RemoveArticleButtonWithConfirmModal';

type RemoveArticleButtonWithConfirmModalProps = {
  articleId?: ArticleIdType;
  onRemove?: () => void;
};

export const RemoveArticleWithCallback = (props: RemoveArticleButtonWithConfirmModalProps) => {
  const { articleId: propsArticleId, onRemove } = props;

  const articleId = useArticleId(propsArticleId);

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const openConfirmModal = () => {
    setConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmOpen(false);
  };

  const [removeArticleTrigger, { isLoading: isRemovingArticle }] = useRemoveArticleMutation();

  const isConfirmButtonDisabled = !articleId || isRemovingArticle;

  const confirmRemove = () => {
    if (!articleId) {
      return;
    }

    removeArticleTrigger({ articleId })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setConfirmOpen(false);

        if (onRemove) {
          onRemove();
        }
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
