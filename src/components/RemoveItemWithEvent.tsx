import { useState } from 'react';
import { dispatchAppEvent } from 'hooks/useAppEvents';
import { useItemId } from 'hooks/useItemId';
import { useRemoveItemMutation } from 'sharedApi/items.remove.api';
import { appEventItemRemoved } from 'sharedTypes/event.types';
import type { ItemIdType } from 'sharedTypes/item.types';

import { RemoveItemButtonWithConfirmModal } from './RemoveItemButtonWithConfirmModal';

type RemoveItemWithEventProps = {
  itemId?: ItemIdType;
};

function useConfirmModalState() {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const openConfirmModal = () => {
    setConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmOpen(false);
  };

  return {
    isConfirmOpen,
    openConfirmModal,
    closeConfirmModal,
  };
}

export const RemoveItemWithEvent = (props: RemoveItemWithEventProps) => {
  const { itemId: propsItemId } = props;

  const itemId = useItemId(propsItemId);

  const [removeItemTrigger, { isLoading: isRemovingItem }] = useRemoveItemMutation();

  const isConfirmButtonDisabled = !itemId || isRemovingItem;

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const confirmRemove = () => {
    if (!itemId) {
      return;
    }

    removeItemTrigger({ itemId })
      .unwrap()
      .then(() => {
        dispatchAppEvent(appEventItemRemoved, { itemId });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeConfirmModal();
      });
  };

  if (!itemId) {
    return null;
  }

  return (
    <RemoveItemButtonWithConfirmModal
      isOpen={isConfirmOpen}
      onButtonClick={openConfirmModal}
      onCancel={closeConfirmModal}
      onConfirm={confirmRemove}
      isConfirmButtonDisabled={isConfirmButtonDisabled}
    />
  );
};
