import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useItemId } from "src/hooks/useItemId";

import { RemoveItemWithCallback } from "components/RemoveItemWithCallback";
import { RemoveItemWithEvent } from "components/RemoveItemWithEvent";

export const RemoveItemViewCallbackWidget = () => {
  const navigate = useNavigate();

  const onRemove = useCallback(() => {
    navigate('/items-list');
  }, [navigate]);

  return <RemoveItemWithCallback onRemove={onRemove} />;
};

export const RemoveItemViewEventWidget = () => {
  const itemId = useItemId();

  if (!itemId) {
    return null;
  }

  return <RemoveItemWithEvent itemId={itemId} />;
};
