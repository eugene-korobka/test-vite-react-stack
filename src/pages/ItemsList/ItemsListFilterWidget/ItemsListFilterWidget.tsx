import { useMemo } from 'react';

import { itemsListFilterSelectors } from 'pages/ItemsList/ItemsListFilterWidget/store/itemsListFilter.selector';
import {
  itemsListFilterActions,
  titleFilterInitialValue,
} from 'pages/ItemsList/ItemsListFilterWidget/store/itemsListFilter.slice';
import { useFetchItemsQuery } from 'pages/ItemsList/ItemsListWidget/store/items.api';

import { useAppDispatch, useAppSelector } from 'store/hooks';

const useItemListFilterWidgetState = () => {
  const dispatch = useAppDispatch();

  const { data } = useFetchItemsQuery(undefined);

  const filterOptions = useMemo(() => {
    if (!data?.length) {
      return [titleFilterInitialValue];
    }

    return Array.from(new Set([titleFilterInitialValue, ...data.map((item) => item.title)]));
  }, [data]);

  const onChangeOption = (e) => {
    const newFilter = e.target.value;

    dispatch(itemsListFilterActions.setTitleFilter(newFilter));
  };

  const titleFilter = useAppSelector(itemsListFilterSelectors.selectTitleFilter);

  const isClearButtonVisible = titleFilter !== titleFilterInitialValue;

  const onClearFilter = () => {
    dispatch(itemsListFilterActions.resetTitleFilter());
  };

  return {
    titleFilter,
    filterOptions,
    onChangeOption,
    isClearButtonVisible,
    onClearFilter,
  };
};

export const ItemsListFilterWidget = () => {
  const { titleFilter, filterOptions, onChangeOption, isClearButtonVisible, onClearFilter } =
    useItemListFilterWidgetState();

  return (
    <div className="w-full">
      <label htmlFor="titleFilter" className="flex items-center mb-4">
        <span className="mr-3">Filter by title:</span>
        <select
          id="titleFilter"
          className="w-50 mr-3 p-2 pr-5 border-b-2 border-b-black outline-none cursor-pointer"
          value={titleFilter}
          onChange={onChangeOption}
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {isClearButtonVisible && (
          <button className="text-symbol" onClick={onClearFilter}>
            &#9587;
          </button>
        )}
      </label>
    </div>
  );
};
