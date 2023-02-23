import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { RemoveItemWithEvent, useSubscribeToRemoveItemEvent } from "components/RemoveItemWithEvent";

export const RemoveItemViewWidget = () => {
  const navigate = useNavigate();

  const onRemoveItem = useCallback(() => {
    console.log('RemoveItemViewWidget-onRemoveItem');
    navigate('/items-list');
  }, [navigate]);

  useSubscribeToRemoveItemEvent(onRemoveItem);

  return <RemoveItemWithEvent />;
};
