import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFetchOwnersAvailableQuery } from 'sharedApi/fetchOwnersAvailable.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import type { OwnerIdType, OwnerType } from 'sharedTypes/owner.types';
import { areTwoIdsArraysDifferent, mapEntitiesToIdsByBelongsTo } from 'src/utils/entitiesHelpers';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

const emptyOwners: OwnerType[] = [];

export function useAvailableOwnersList({ articleId, skipQuery }: { articleId?: ArticleIdType; skipQuery?: boolean }) {
  const { data: availableOwners = emptyOwners, isFetching: isFetchingOwners } = useFetchOwnersAvailableQuery(
    { articleId },
    { skip: skipQuery },
  );

  const noOwners = !isFetchingOwners && !availableOwners?.length;
  const hasOwners = !isFetchingOwners && !!availableOwners?.length;

  const initialOwnerIds = useMemo(() => {
    return mapEntitiesToIdsByBelongsTo(availableOwners);
  }, [availableOwners]);

  const [checkedOwnerIds, setCheckedOwnerIds] = useState<OwnerIdType[]>([]);

  const hasOwnersChanges = useMemo(() => {
    return areTwoIdsArraysDifferent(initialOwnerIds, checkedOwnerIds);
  }, [initialOwnerIds, checkedOwnerIds]);

  useEffect(() => {
    setCheckedOwnerIds(initialOwnerIds);
  }, [initialOwnerIds]);

  const onOwnerClick = useCallback((event) => {
    const { value, checked } = event.target;

    setCheckedOwnerIds((prev) => {
      const newList = checked ? [...new Set([...prev, value])] : prev.filter((id) => id !== value);

      return newList;
    });
  }, []);

  return {
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    hasOwnersChanges,
    onOwnerClick,
  };
}

type OwnersCheckableListPropsType = {
  label?: string;
  isFetchingOwners?: boolean;
  noOwners?: boolean;
  hasOwners?: boolean;
  ownersList: OwnerType[];
  checkedOwnerIds: OwnerIdType[];
  onOwnerClick: React.ChangeEventHandler;
};

function useOwnersCheckableListState(props: OwnersCheckableListPropsType) {
  const { label, isFetchingOwners, noOwners, hasOwners, ownersList, checkedOwnerIds, onOwnerClick } = props;

  return {
    label,
    isFetchingOwners,
    noOwners,
    hasOwners,
    ownersList,
    checkedOwnerIds,
    onOwnerClick,
  };
}

export const OwnersCheckableList = (props: OwnersCheckableListPropsType) => {
  const { label, isFetchingOwners, noOwners, hasOwners, ownersList, checkedOwnerIds, onOwnerClick } =
    useOwnersCheckableListState(props);

  return (
    <div>
      {label && <div className="mb-2">{label}</div>}
      {isFetchingOwners && <div>Loading...</div>}
      {noOwners && <div>No articles</div>}
      {hasOwners && (
        <ul>
          {ownersList?.map((owner) => (
            <li key={owner._id} className="mb-2 flex items-center">
              <input
                className="w-4 h-4 mr-2 cursor-pointer"
                id={`checkable-owner-${owner._id}`}
                type="checkbox"
                checked={checkedOwnerIds.includes(owner._id)}
                value={owner._id}
                onChange={onOwnerClick}
              />
              <label className="cursor-pointer" htmlFor={`checkable-owner-${owner._id}`}>
                {getOwnerFullName(owner)}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
