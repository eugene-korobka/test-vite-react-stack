import type { ArticleIdType } from 'sharedTypes/article.types';

import { EditArticleModalButton } from './EditArticleModalButton';
import { EditArticleModalHookForm } from './EditArticleModalHookForm';

type EditArticleWidgetHookFormProps = {
  articleId: ArticleIdType;
};

export const EditArticleWidgetHookForm = (props: EditArticleWidgetHookFormProps) => {
  const { articleId } = props;

  return (
    <>
      <EditArticleModalButton articleId={articleId} />
      <EditArticleModalHookForm articleId={articleId} />
    </>
  );
};
