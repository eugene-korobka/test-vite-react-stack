import type { ItemIdType } from 'sharedTypes/item.types';

import { EditItemModal } from './EditItemModal';
import { EditItemModalButton } from './EditItemModalButton';

type EditItemWidgetProps = {
  itemId: ItemIdType;
};

export const EditItemWidget = (props: EditItemWidgetProps) => {
  const { itemId } = props;

  return (
    <>
      <EditItemModalButton itemId={itemId} />
      <EditItemModal itemId={itemId} />
    </>
  );
};
