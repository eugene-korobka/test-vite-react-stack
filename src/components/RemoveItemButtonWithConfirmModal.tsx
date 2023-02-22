import { useState } from "react";
import { useRemoveItemMutation } from "sharedApi/items.remove.api";
import { ItemTypeId } from "sharedTypes/item.types";
import { useItemId } from "src/hooks/useItemId";

import { ConfirmRemoveItemModal } from "./ConfirmRemoveItemModal";

type RemoveItemButtonWithConfirmModalProps = {
  itemId?: ItemTypeId;
  onRemove?: () => void;
};

export const RemoveItemButtonWithConfirmModal = (props: RemoveItemButtonWithConfirmModalProps) => {
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
    <>
      <button
        className="p-2 shrink-0 border border-solid border-red-400 rounded-md text-red-400"
        onClick={openConfirmModal}
      >
        Remove
      </button>
      <ConfirmRemoveItemModal
        isOpen={isConfirmOpen}
        onCancel={closeConfirmModal}
        onConfirm={confirmRemove}
        isConfirmButtonDisabled={isConfirmButtonDisabled}
      />
    </>
  );
};
