import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticleId } from 'hooks/useArticleId';
import { AppRoutes } from 'src/routes';
import { RemoveArticleWithCallback } from 'widgets/RemoveArticle/RemoveArticleWithCallback';
import { RemoveArticleWithEvent } from 'widgets/RemoveArticle/RemoveArticleWithEvent';

export const RemoveArticleViewCallbackWidget = () => {
  const navigate = useNavigate();

  const onRemove = useCallback(() => {
    navigate(AppRoutes.articlesList());
  }, [navigate]);

  return <RemoveArticleWithCallback onRemove={onRemove} />;
};

export const RemoveArticleViewEventWidget = () => {
  const articleId = useArticleId();

  if (!articleId) {
    return null;
  }

  return <RemoveArticleWithEvent articleId={articleId} />;
};
