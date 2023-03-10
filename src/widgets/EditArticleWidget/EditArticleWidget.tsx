import type { ArticleIdType } from 'sharedTypes/article.types';

import { EditArticleModal } from './EditArticleModal';
import { EditArticleModalButton } from './EditArticleModalButton';

type EditArticleWidgetProps = {
  articleId: ArticleIdType;
};

export const EditArticleWidget = (props: EditArticleWidgetProps) => {
  const { articleId } = props;

  return (
    <>
      <EditArticleModalButton articleId={articleId} />
      <EditArticleModal articleId={articleId} />
    </>
  );
};
