import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { appEventArticleRemoved } from 'sharedTypes/event.types';
import { AppRoutes } from 'src/routes';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { ArticleViewWidget } from './widgets/ArticleViewWidget';
import { EditArticleViewWidget } from './widgets/EditArticleViewWidget';
import { RemoveArticleViewEventWidget } from './widgets/RemoveArticleViewWidget';

export const ArticleViewPage = () => {
  const navigate = useNavigate();

  const onRemoveArticle = useCallback(() => {
    navigate(AppRoutes.articlesList());
  }, [navigate]);

  useSubscribeToAppEvent(appEventArticleRemoved, onRemoveArticle);

  return (
    <PageContainer>
      <PageHeader>Article View Page</PageHeader>
      <div className="mb-4 flex justify-between items-center">
        <Link to={AppRoutes.articlesList()} className="text-blue-400">
          &lt; Back to Articles
        </Link>
        <div className="flex gap-4 items-center">
          <EditArticleViewWidget />
          <RemoveArticleViewEventWidget />
        </div>
      </div>
      <ArticleViewWidget />
    </PageContainer>
  );
};
