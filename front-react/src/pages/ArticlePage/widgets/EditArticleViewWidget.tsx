import { useArticleId } from 'hooks/useArticleId';
import { EditArticleWidgetHookForm } from 'widgets/EditArticleWidget/EditArticleWidgetHookForm';

export const EditArticleViewWidget = () => {
  const articleId = useArticleId();

  if (!articleId) {
    return null;
  }

  return <EditArticleWidgetHookForm articleId={articleId} />;
};
