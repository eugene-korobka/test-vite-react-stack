import { useCallback, useEffect, useRef, useState } from "react";
import { useRemoveItemMutation } from "sharedApi/items.remove.api";
import { ItemTypeId } from "sharedTypes/item.types";
import { useItemId } from "src/hooks/useItemId";

import { Modal } from "./ModalComponents";

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
    <>
      <button
        className="p-2 shrink-0 border border-solid border-red-400 rounded-md text-red-400"
        onClick={openConfirmModal}
      >
        Remove
      </button>
      <Modal.ConfirmModal isOpen={isConfirmOpen}>
        <Modal.Header title="Confirm remove" />
        <Modal.Main>Are you sure you want to remove item?</Modal.Main>
        <Modal.Footer>
          <button
            className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
            onClick={closeConfirmModal}
          >
            Cancel
          </button>
          <button
            className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
            disabled={isConfirmButtonDisabled}
            onClick={confirmRemove}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal.ConfirmModal>
    </>
  );
};
