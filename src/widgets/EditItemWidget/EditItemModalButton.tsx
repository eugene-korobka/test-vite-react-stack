import { ItemTypeId } from 'sharedTypes/item.types';

import { AppButton } from 'components/AppButton';

import { useEditItemModalHandlers } from './hooks';

type EditItemModalButtonProps = {
  itemId: ItemTypeId;
};

export const EditItemModalButton = (props: EditItemModalButtonProps) => {
  const { itemId } = props;

  const { openEditItemModal } = useEditItemModalHandlers(itemId);

  return <AppButton onClick={openEditItemModal}>Edit</AppButton>;
};
