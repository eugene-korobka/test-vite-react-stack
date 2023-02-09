import { memo } from 'react';
import { createPortal } from 'react-dom';

import { useRemoveItemMutation } from 'pages/ItemsList/RemoveItemButtonWidget/store/items.remove.api';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { removeItemSelectors } from './store/removeItem.selector';
import { removeItemActions } from './store/removeItem.slice';
import { ItemTypeId } from './store/types';

type RemoveItemButtonProps = {
  itemId: ItemTypeId;
}

const useRemoveItemConfirmModal = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(removeItemActions.closeConfirmRemoveModal());
  };

  const [removeItemFn, { isLoading }] = useRemoveItemMutation();

  const isConfirmButtonDisabled = !itemId || isLoading;

  const confirmRemove = () => {
    removeItemFn({ itemId })
      .catch((error) => {
      console.error(error);
      })
      .finally(() => {
        closeModal();
      });
  };

  const isModalOpen = useAppSelector(removeItemSelectors.selectIsConfirmRemoveModalOpen);
  const removedItemId = useAppSelector(removeItemSelectors.selectRemovedItemId);

  const shouldMountModal = removedItemId && removedItemId === itemId && isModalOpen;

  return {
    shouldMountModal,
    isConfirmButtonDisabled,
    closeModal,
    confirmRemove,
  };

};

const RemoveItemConfirmModal = memo((props: RemoveItemButtonProps) => {
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

const useRemoveItemButtonWithConfirmWidgetState = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const openConfirmModal = () => {
    dispatch(removeItemActions.openConfirmRemoveModal({ itemId }));
  };

  return {
    itemId,
    openConfirmModal,
  };
};

export const RemoveItemButtonWithConfirmWidget = (props: RemoveItemButtonProps) => {
  const { itemId, openConfirmModal } = useRemoveItemButtonWithConfirmWidgetState(props);

  return (
    <>
      <button
        className="p-2 shrink-0 border border-solid border-red-400 rounded-md text-red-400"
        onClick={openConfirmModal}
      >
        Remove
      </button>
      <RemoveItemConfirmModal itemId={itemId} />
    </>
  );
};
