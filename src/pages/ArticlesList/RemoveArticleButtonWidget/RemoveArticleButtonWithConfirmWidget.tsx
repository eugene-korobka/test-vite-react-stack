import type { ArticleIdType } from 'sharedTypes/article.types';

import { AppButton } from 'components/AppButton';

import { useRemoveArticleConfirmModalHandlers } from './hooks';
import { RemoveArticleConfirmModal } from './RemoveArticleConfirmModal';

type RemoveArticleButtonProps = {
  articleId: ArticleIdType;
};

const useRemoveArticleButtonWithConfirmWidgetState = (props: RemoveArticleButtonProps) => {
  const { articleId } = props;

  const { openRemoveArticleConfirmModal } = useRemoveArticleConfirmModalHandlers(articleId);

  return {
    articleId,
    openRemoveArticleConfirmModal,
  };
};

export const RemoveArticleButtonWithConfirmWidget = (props: RemoveArticleButtonProps) => {
  const { articleId, openRemoveArticleConfirmModal } = useRemoveArticleButtonWithConfirmWidgetState(props);

  return (
    <>
      <AppButton variant="danger" onClick={openRemoveArticleConfirmModal}>
        Remove
      </AppButton>
      <RemoveArticleConfirmModal articleId={articleId} />
    </>
  );
};
