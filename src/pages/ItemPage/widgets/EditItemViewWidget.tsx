import { useItemId } from 'hooks/useItemId';
import { EditItemWidget } from 'widgets/EditItemWidget/EditItemWidget';

export const EditItemViewWidget = () => {
  const itemId = useItemId();

  if (!itemId) {
    return null;
  }

  return <EditItemWidget itemId={itemId} />;
};
