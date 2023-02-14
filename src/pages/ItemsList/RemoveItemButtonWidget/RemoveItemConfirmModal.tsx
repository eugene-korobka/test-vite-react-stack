import { memo } from "react";
import { createPortal } from "react-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { useRemoveItemMutation } from "./store/items.remove.api";
import { removeItemSelectors } from "./store/removeItem.selector";
import { removeItemActions } from "./store/removeItem.slice";
import { ItemTypeId } from "./store/types";

type RemoveItemConfirmModalProps = {
  itemId: ItemTypeId;
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

  const isModalOpen = useAppSelector(removeItemSelectors.selectIsConfirmRemoveModalOpen);
  const currentModalId = useAppSelector(removeItemSelectors.selectCurrentModalId);
  const shouldMountModal = currentModalId && currentModalId === itemId && isModalOpen;

  return {
    shouldMountModal,
    isConfirmButtonDisabled,
    closeModal,
    confirmRemove,
  };
};

export const RemoveItemConfirmModal = memo((props: RemoveItemConfirmModalProps) => {
  const { shouldMountModal, isConfirmButtonDisabled, closeModal, confirmRemove } = useRemoveItemConfirmModal(props);

  if (shouldMountModal) {
    return createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-black/10">
        <div className="max-w-175 p-6 border border-solid border-gray-400 rounded-lg bg-white">
          <header className="mb-4 text-center">Confirm remove</header>
          <main className="mb-4 text-center">Are you sure you want to remove item?</main>
          <footer className="flex justify-center items-center">
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
          </footer>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
});
