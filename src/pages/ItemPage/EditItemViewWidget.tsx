import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { EditItemWidget } from "pages/ItemsList/EditItemWidget/EditItemWidget";

import { useSubscribeToRemoveItemEvent } from "components/RemoveItemWithEvent";

export const EditItemViewWidget = () => {
  const { itemId: routeItemId } = useParams();

  const itemId = Number(routeItemId);

  const navigate = useNavigate();

  const onRemoveItem = useCallback(() => {
    console.log('EditItemViewWidget-onRemoveItem');
    navigate('/items-list');
  }, [navigate]);

  useSubscribeToRemoveItemEvent(onRemoveItem);

  return <EditItemWidget itemId={itemId} />
};
