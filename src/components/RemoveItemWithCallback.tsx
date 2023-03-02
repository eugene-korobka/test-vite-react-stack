import { useState } from 'react';
import { useItemId } from 'hooks/useItemId';
import { useRemoveItemMutation } from 'sharedApi/items.remove.api';
import { ItemTypeId } from 'sharedTypes/item.types';

import { RemoveItemButtonWithConfirmModal } from './RemoveItemButtonWithConfirmModal';

type RemoveItemButtonWithConfirmModalProps = {
  itemId?: ItemTypeId;
  onRemove?: () => void;
};

export const RemoveItemWithCallback = (props: RemoveItemButtonWithConfirmModalProps) => {
  const { itemId: propsItemId, onRemove } = props;

  const itemId = useItemId(propsItemId);

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const openConfirmModal = () => {
    setConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmOpen(false);
  };

  const [removeItemTrigger, { isLoading: isRemovingItem }] = useRemoveItemMutation();

  const isConfirmButtonDisabled = !itemId || isRemovingItem;

  const confirmRemove = () => {
    if (!itemId) {
      return;
    }

    removeItemTrigger({ itemId })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setConfirmOpen(false);

        if (onRemove) {
          onRemove();
        }
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
