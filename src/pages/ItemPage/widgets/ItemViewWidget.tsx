import { useParams } from 'react-router-dom';
import { useFetchItemByIdQuery } from 'sharedApi/item.fetchById.api';
import { useFetchOwnerByIdQuery } from 'sharedApi/owner.fetchById.api';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

export const ItemViewWidget = () => {
  const { itemId: routeItemId } = useParams();
  const itemId = Number(routeItemId);

  const { data: itemById, isFetching: isFetchingItemById } = useFetchItemByIdQuery({ itemId }, { skip: !itemId });

  const { data: ownerById, isFetching: isFetchingOwnerById } = useFetchOwnerByIdQuery(
    { ownerId: itemById?.ownerId as number },
    { skip: !itemId || !itemById?.ownerId },
  );

  if (isFetchingItemById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="font-bold">Title:</div>
      <div>{itemById?.title}</div>
      <div className="font-bold">Description:</div>
      <div>{itemById?.description}</div>
      <br />
      <div className="font-bold">Owner:</div>
      <div>{isFetchingOwnerById ? 'Loading...' : getOwnerFullName(ownerById)}</div>
    </div>
  );
};
