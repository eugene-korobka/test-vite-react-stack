import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useArrayQueryResult } from 'hooks/useArrayQuery';
import { useFetchArticlesAvailableQuery } from 'sharedApi/fetchArticlesAvailable.api';
import type { ArticleIdType, ArticleType } from 'sharedTypes/article.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { areTwoIdsArraysDifferent, mapEntitiesToIdsByBelongsTo } from 'src/utils/entitiesHelpers';

const emptyArticles: ArticleType[] = [];

export function useAvailableArticlesList({ ownerId, skipQuery }: { ownerId?: OwnerIdType; skipQuery?: boolean }) {
  const {
    data: availableArticles = emptyArticles,
    isFetching: isFetchingArticles,
    noElements: noArticles,
    hasElements: hasArticles,
  } = useArrayQueryResult<ArticleType>(useFetchArticlesAvailableQuery({ ownerId }, { skip: skipQuery }));

  const initialArticleIds = useMemo(() => {
    return mapEntitiesToIdsByBelongsTo(availableArticles);
  }, [availableArticles]);

  const [checkedArticleIds, setCheckedArticleIds] = useState<ArticleIdType[]>([]);

  const hasArticlesChanges = useMemo(() => {
    return areTwoIdsArraysDifferent(initialArticleIds, checkedArticleIds);
  }, [initialArticleIds, checkedArticleIds]);

  useEffect(() => {
    setCheckedArticleIds(initialArticleIds);
  }, [initialArticleIds]);

  const onArticleClick = useCallback((event) => {
    const { value, checked } = event.target;

    setCheckedArticleIds((prev) => {
      const newList = checked ? [...new Set<string>([...prev, value])] : prev.filter((id) => id !== value);

      return newList;
    });
  }, []);

  return {
    isFetchingArticles,
    noArticles,
    hasArticles,
    availableArticles,
    checkedArticleIds,
    hasArticlesChanges,
    onArticleClick,
  };
}

type ArticlesCheckableListPropsType = {
  label?: string;
  isFetchingArticles?: boolean;
  noArticles?: boolean;
  hasArticles?: boolean;
  articlesList: ArticleType[];
  checkedArticleIds: ArticleIdType[];
  onArticleClick: React.ChangeEventHandler;
};

function useArticlesCheckableListState(props: ArticlesCheckableListPropsType) {
  const { label, isFetchingArticles, noArticles, hasArticles, articlesList, checkedArticleIds, onArticleClick } = props;

  return {
    label,
    isFetchingArticles,
    noArticles,
    hasArticles,
    articlesList,
    checkedArticleIds,
    onArticleClick,
  };
}

export const ArticlesCheckableList = (props: ArticlesCheckableListPropsType) => {
  const { label, isFetchingArticles, noArticles, hasArticles, articlesList, checkedArticleIds, onArticleClick } =
    useArticlesCheckableListState(props);

  return (
    <div>
      {label && <div className="mb-2">{label}</div>}
      {isFetchingArticles && <div>Loading...</div>}
      {noArticles && <div>No articles</div>}
      {hasArticles && (
        <ul>
          {articlesList?.map((article) => (
            <li key={article._id} className="mb-2 flex items-center">
              <input
                className="w-4 h-4 mr-2 cursor-pointer"
                id={`checkable-article-${article._id}`}
                type="checkbox"
                checked={checkedArticleIds.includes(article._id)}
                value={article._id}
                onChange={onArticleClick}
              />
              <label className="cursor-pointer" htmlFor={`checkable-article-${article._id}`}>
                {article.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
