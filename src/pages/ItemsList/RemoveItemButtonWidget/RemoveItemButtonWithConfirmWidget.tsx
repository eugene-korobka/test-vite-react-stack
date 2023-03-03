import type { ItemIdType } from 'sharedTypes/item.types';

import { AppButton } from 'components/AppButton';

import { useRemoveItemConfirmModalHandlers } from './hooks';
import { RemoveItemConfirmModal } from './RemoveItemConfirmModal';

type RemoveItemButtonProps = {
  itemId: ItemIdType;
};

const useRemoveItemButtonWithConfirmWidgetState = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const { openRemoveItemConfirmModal } = useRemoveItemConfirmModalHandlers(itemId);

  return {
    itemId,
    openRemoveItemConfirmModal,
  };
};

export const RemoveItemButtonWithConfirmWidget = (props: RemoveItemButtonProps) => {
  const { itemId, openRemoveItemConfirmModal } = useRemoveItemButtonWithConfirmWidgetState(props);

  return (
    <>
      <AppButton variant="danger" onClick={openRemoveItemConfirmModal}>
        Remove
      </AppButton>
      <RemoveItemConfirmModal itemId={itemId} />
    </>
  );
};
