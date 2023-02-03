import { useEffect, useMemo } from 'react';

import { useFetchItemsQuery } from 'pages/ItemsList/FilteredItemsListWidget/store/items.api';
import { itemsListFilterSelectors } from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.selector';
import {
  itemsListFilterActions,
  titleFilterInitialValue,
} from 'pages/ItemsList/FilteredItemsListWidget/store/itemsListFilter.slice';

import { useAppDispatch, useAppSelector } from 'store/hooks';

const useItemsListTitleFilterState = () => {
  const dispatch = useAppDispatch();

  const { data } = useFetchItemsQuery(undefined);

  const filterOptions = useMemo(() => {
    if (!data?.length) {
      return [titleFilterInitialValue];
    }

    return Array.from(new Set([titleFilterInitialValue, ...data.map((item) => item.title)]));
  }, [data]);

  const onChangeOption = (event) => {
    const newFilter = event.target.value;

    dispatch(itemsListFilterActions.setTitleFilter(newFilter));
  };

  const titleFilter = useAppSelector(itemsListFilterSelectors.selectTitleFilter);

  const isClearButtonVisible = titleFilter !== titleFilterInitialValue;

  useEffect(() => {
    if (filterOptions.includes(titleFilter)) {
      return;
    }

    dispatch(itemsListFilterActions.resetTitleFilter());
  }, [dispatch, titleFilter, filterOptions]);


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

export const ItemsListTitleFilter = () => {
  const { titleFilter, filterOptions, onChangeOption, isClearButtonVisible, onClearFilter } =
    useItemsListTitleFilterState();

  return (
    <label htmlFor="titleFilter" className="flex items-center">
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
        <button className="text-symbol" title="Clear filter" onClick={onClearFilter}>
          &#9587;
        </button>
      )}
    </label>
  );
};
