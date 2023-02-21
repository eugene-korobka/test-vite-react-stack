import { memo } from "react";

import { Modal } from "components/ModalComponents";

import { useRemoveItemMutation } from "./store/items.remove.api";
import { ItemTypeId } from "./store/types";
import { useIsRemoveItemConfirmModal, useRemoveItemConfirmModalHandlers } from "./hooks";

type RemoveItemConfirmModalProps = {
  itemId: ItemTypeId;
};

function useRemoveItemConfirmModal(props: RemoveItemConfirmModalProps) {
  const { itemId } = props;

  const { closeRemoveItemConfirmModalWithConfirm, closeRemoveItemConfirmModalWithCancel } = useRemoveItemConfirmModalHandlers(itemId);

  const [removeItemFn, { isLoading: isItemRemoving }] = useRemoveItemMutation();

  const confirmRemove = () => {
    removeItemFn({ itemId })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeRemoveItemConfirmModalWithConfirm();
      });
  };

  const isConfirmButtonDisabled = !itemId || isItemRemoving;

  const isModalOpen = useIsRemoveItemConfirmModal(itemId);

  return {
    isModalOpen,
    isConfirmButtonDisabled,
    closeRemoveItemConfirmModalWithCancel,
    confirmRemove,
  };
};

export const RemoveItemConfirmModal = memo((props: RemoveItemConfirmModalProps) => {
  const { isModalOpen, isConfirmButtonDisabled, closeRemoveItemConfirmModalWithCancel, confirmRemove } =
    useRemoveItemConfirmModal(props);

  return (
    <Modal.ConfirmModal isOpen={isModalOpen}>
      <Modal.Header title="Confirm remove" />
      <Modal.Main>Are you sure you want to remove item?</Modal.Main>
      <Modal.Footer>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={closeRemoveItemConfirmModalWithCancel}
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
  );
});
