import { useCallback, useEffect, useRef, useState } from "react";
import { useRemoveItemMutation } from "sharedApi/items.remove.api";
import { ItemTypeId } from "sharedTypes/item.types";
import { useItemId } from "src/hooks/useItemId";

import { RemoveItemButtonWithConfirmModal } from "./RemoveItemButtonWithConfirmModal";

type RemoveItemWithEventProps = {
  itemId?: ItemTypeId;
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
};

const removeItemEventType = 'removeItemEvent';

function createAndDispatchRemoveItemEvent(payload?: { itemId: ItemTypeId }) {
  const event = new CustomEvent(removeItemEventType, {
    detail: payload,
  });

  window.dispatchEvent(event);
}

export function useSubscribeToRemoveItemEvent(handler) {
  const handlerRef = useRef<() => void>();
  handlerRef.current = handler;

  const innerHandler = useCallback(() => {
    handlerRef.current?.();
  }, []);

  useEffect(() => {
    window.addEventListener(removeItemEventType, innerHandler);

    return () => {
      window.removeEventListener(removeItemEventType, innerHandler);
    };
  }, [innerHandler]);
};

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
        createAndDispatchRemoveItemEvent({ itemId });
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
