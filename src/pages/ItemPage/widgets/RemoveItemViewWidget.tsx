import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemId } from 'hooks/useItemId';
import { AppRoutes } from 'src/routes';
import { RemoveItemWithCallback } from 'widgets/RemoveItem/RemoveItemWithCallback';
import { RemoveItemWithEvent } from 'widgets/RemoveItem/RemoveItemWithEvent';

export const RemoveItemViewCallbackWidget = () => {
  const navigate = useNavigate();

  const onRemove = useCallback(() => {
    navigate(AppRoutes.itemsList());
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
