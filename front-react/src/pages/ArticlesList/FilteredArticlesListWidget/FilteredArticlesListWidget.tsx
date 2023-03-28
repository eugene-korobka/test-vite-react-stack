import { useMemo } from 'react';

import { articlesListFilterSelectors } from 'pages/ArticlesList/FilteredArticlesListWidget/store/articlesListFilter.selector';
import { titleFilterInitialValue } from 'pages/ArticlesList/FilteredArticlesListWidget/store/articlesListFilter.slice';

import { useAppSelector } from 'store/hooks';

import { ArticlesTable } from './components/ArticlesTable';
import { useFetchArticlesQuery } from './store/fetchArticles.api';

const initialArticles = [];

const useFilteredArticlesListWidgetState = () => {
  const { data, isFetching } = useFetchArticlesQuery(undefined);

  const titleFilter = useAppSelector(articlesListFilterSelectors.selectTitleFilter);

  const filteredArticles = useMemo(() => {
    if (!data?.length) {
      return initialArticles;
    }

    if (titleFilter === titleFilterInitialValue) {
      return data;
    }

    return data.filter((article) => article.title === titleFilter);
  }, [data, titleFilter]);

  return {
    articles: filteredArticles,
    isFetching,
  };
};

export const FilteredArticlesListWidget = () => {
  const { articles, isFetching } = useFilteredArticlesListWidgetState();

  return (
    <section className="w-full">
      <ArticlesTable isLoading={isFetching} articles={articles} />
    </section>
  );
};
