import { useFetchOwnerItemsQuery } from 'sharedApi/fetchOwnerItems.api';
import { OwnerIdType } from 'sharedTypes/owner.types';

import { EditOwnerItemsWidget } from './EditOwnerItems.widget';

type OwnerItemsListPropsType = {
  ownerId: OwnerIdType;
};

function useOwnerItemsListState(props: OwnerItemsListPropsType) {
  const { ownerId } = props;

  const { data: ownerItems, isFetching: isFetchingOwnerItems } = useFetchOwnerItemsQuery({ ownerId });

  const noItems = !isFetchingOwnerItems && !ownerItems?.length;
  const hasItems = !isFetchingOwnerItems && !!ownerItems?.length;

  return {
    ownerId,
    isFetchingOwnerItems,
    noItems,
    hasItems,
    ownerItems,
  };
}

export const OwnerItemsList = (props: OwnerItemsListPropsType) => {
  const { ownerId, isFetchingOwnerItems, hasItems, noItems, ownerItems } = useOwnerItemsListState(props);

  return (
    <div>
      <div className="flex items-center">
        <div className="mr-4 font-bold">Items</div>
        <EditOwnerItemsWidget ownerId={ownerId} />
      </div>

      {isFetchingOwnerItems && <div>Loading...</div>}
      {noItems && <div>No items</div>}
      {hasItems && (
        <ul>
          {ownerItems?.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
