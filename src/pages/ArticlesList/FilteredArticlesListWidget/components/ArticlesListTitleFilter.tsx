import { articlesListFilterSelectors } from 'pages/ArticlesList/FilteredArticlesListWidget/store/articlesListFilter.selector';
import {
  articlesListFilterActions,
  titleFilterInitialValue,
} from 'pages/ArticlesList/FilteredArticlesListWidget/store/articlesListFilter.slice';

import { useAppDispatch, useAppSelector } from 'store/hooks';

const useArticlesListTitleFilterState = () => {
  const dispatch = useAppDispatch();

  const titleFilter = useAppSelector(articlesListFilterSelectors.selectTitleFilter);

  const isClearButtonVisible = titleFilter !== titleFilterInitialValue;

  const titleFilterOptions = useAppSelector(articlesListFilterSelectors.selectTitleFilterOptions);

  const onChangeOption = (event) => {
    const newFilter = event.target.value;

    dispatch(articlesListFilterActions.setTitleFilter(newFilter));
  };

  const onClearFilter = () => {
    dispatch(articlesListFilterActions.resetTitleFilter());
  };

  return {
    titleFilter,
    titleFilterOptions,
    onChangeOption,
    isClearButtonVisible,
    onClearFilter,
  };
};

export const ArticlesListTitleFilter = () => {
  const { titleFilter, titleFilterOptions, onChangeOption, isClearButtonVisible, onClearFilter } =
    useArticlesListTitleFilterState();

  return (
    <label htmlFor="titleFilter" className="flex items-center">
      <span className="mr-3">Filter by title:</span>
      <select
        id="titleFilter"
        className="w-50 mr-3 p-2 pr-5 border-b-2 border-b-black outline-none cursor-pointer"
        value={titleFilter}
        onChange={onChangeOption}
      >
        {titleFilterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {isClearButtonVisible && (
        <button className="text-symbol" title="Clear filter" onClick={onClearFilter}>
          &#9587;
        </button>
      )}
    </label>
  );
};
