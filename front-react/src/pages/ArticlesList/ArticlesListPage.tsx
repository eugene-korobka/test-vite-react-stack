import { FilteredArticlesListWidget } from 'pages/ArticlesList/FilteredArticlesListWidget/FilteredArticlesListWidget';

import { PageContainer } from 'components/PageContainer';
import { PageHeader } from 'components/PageHeader';

import { CreateArticleWidgetHookForm } from './CreateArticleWidget/CreateArticleWidgetHookForm';
import { ArticlesListTitleFilter } from './FilteredArticlesListWidget/components/ArticlesListTitleFilter';

export const ArticlesListPage = () => {
  return (
    <PageContainer>
      <PageHeader>Articles List Page</PageHeader>
      <div className="flex justify-between items-center mb-4">
        <ArticlesListTitleFilter />
        <CreateArticleWidgetHookForm />
      </div>
      <FilteredArticlesListWidget />
    </PageContainer>
  );
};
