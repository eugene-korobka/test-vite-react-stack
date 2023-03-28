import type { ArticleIdType } from 'sharedTypes/article.types';

import { AppButton } from 'components/AppButton';

import { useEditArticleModalHandlers } from './hooks';

type EditArticleModalButtonProps = {
  articleId: ArticleIdType;
};

export const EditArticleModalButton = (props: EditArticleModalButtonProps) => {
  const { articleId } = props;

  const { openEditArticleModal } = useEditArticleModalHandlers(articleId);

  return <AppButton onClick={openEditArticleModal}>Edit</AppButton>;
};
