import type { ItemIdType } from 'sharedTypes/item.types';

import { EditItemModalButton } from './EditItemModalButton';
import { EditItemModalHookForm } from './EditItemModalHookForm';

type EditItemWidgetHookFormProps = {
  itemId: ItemIdType;
};

export const EditItemWidgetHookForm = (props: EditItemWidgetHookFormProps) => {
  const { itemId } = props;

  return (
    <>
      <EditItemModalButton itemId={itemId} />
      <EditItemModalHookForm itemId={itemId} />
    </>
  );
};
