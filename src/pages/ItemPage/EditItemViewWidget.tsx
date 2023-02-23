import { useItemId } from "src/hooks/useItemId";

import { EditItemWidget } from "pages/ItemsList/EditItemWidget/EditItemWidget";

export const EditItemViewWidget = () => {
  const itemId = useItemId();

  if (!itemId) {
    return null;
  }

  return <EditItemWidget itemId={itemId} />
};
