import { useParams } from 'react-router-dom';
import { useFetchItemByIdQuery } from 'sharedApi/item.fetchById.api';

export const ItemViewWidget = () => {
  const { itemId: routeItemId } = useParams();
  const itemId = Number(routeItemId);

  const { data: itemById, isFetching: isFetchingItemById } = useFetchItemByIdQuery({ itemId }, { skip: !itemId });

  if (isFetchingItemById) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="font-bold">Title:</div>
      <div>{itemById?.title}</div>
      <div className="font-bold">Description:</div>
      <div>{itemById?.description}</div>
    </div>
  );
};
