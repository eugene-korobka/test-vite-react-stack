import { memo } from "react";

import { Modal } from "components/ModalComponents";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { useRemoveItemMutation } from "./store/items.remove.api";
import { removeItemSelectors } from "./store/removeItem.selector";
import { removeItemActions } from "./store/removeItem.slice";
import { ItemTypeId } from "./store/types";

type RemoveItemConfirmModalProps = {
  itemId: ItemTypeId;
};

function useIsModalOpen(itemId) {
  const isOpen = useAppSelector(removeItemSelectors.selectIsConfirmRemoveModalOpen);

  const currentModalId = useAppSelector(removeItemSelectors.selectCurrentModalId);

  const isModalOpen = Boolean(currentModalId && currentModalId === itemId && isOpen);

  return isModalOpen;
};

function useRemoveItemConfirmModal(props: RemoveItemConfirmModalProps) {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(removeItemActions.closeConfirmRemoveModal());
  };

  const [removeItemFn, { isLoading: isItemRemoving }] = useRemoveItemMutation();

  const confirmRemove = () => {
    removeItemFn({ itemId })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeModal();
      });
  };

  const isConfirmButtonDisabled = !itemId || isItemRemoving;

  const isModalOpen = useIsModalOpen(itemId);

  return {
    isModalOpen,
    isConfirmButtonDisabled,
    closeModal,
    confirmRemove,
  };
};

export const RemoveItemConfirmModal = memo((props: RemoveItemConfirmModalProps) => {
  const { isModalOpen, isConfirmButtonDisabled, closeModal, confirmRemove } = useRemoveItemConfirmModal(props);

  return (
    <Modal.ConfirmModal isOpen={isModalOpen}>
      <Modal.Header title="Confirm remove" />
      <Modal.Main>Are you sure you want to remove item?</Modal.Main>
      <Modal.Footer>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={closeModal}
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
