import { useItemId } from 'hooks/useItemId';
import { EditItemWidgetHookForm } from 'widgets/EditItemWidget/EditItemWidgetHookForm';

export const EditItemViewWidget = () => {
  const itemId = useItemId();

  if (!itemId) {
    return null;
  }

  return <EditItemWidgetHookForm itemId={itemId} />;
};
