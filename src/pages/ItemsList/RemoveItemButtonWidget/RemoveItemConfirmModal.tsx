import { memo } from 'react';
import { useRemoveItemMutation } from 'sharedApi/items.remove.api';
import type { ItemIdType } from 'sharedTypes/item.types';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useIsRemoveItemConfirmModal, useRemoveItemConfirmModalHandlers } from './hooks';

type RemoveItemConfirmModalProps = {
  itemId: ItemIdType;
};

function useRemoveItemConfirmModal(props: RemoveItemConfirmModalProps) {
  const { itemId } = props;

  const { closeRemoveItemConfirmModalWithConfirm, closeRemoveItemConfirmModalWithCancel } =
    useRemoveItemConfirmModalHandlers(itemId);

  const [removeItemTrigger, { isLoading: isItemRemoving }] = useRemoveItemMutation();

  const confirmRemove = () => {
    removeItemTrigger({ itemId })
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
}

export const RemoveItemConfirmModal = memo((props: RemoveItemConfirmModalProps) => {
  const { isModalOpen, isConfirmButtonDisabled, closeRemoveItemConfirmModalWithCancel, confirmRemove } =
    useRemoveItemConfirmModal(props);

  return (
    <Modal.ConfirmModal isOpen={isModalOpen}>
      <Modal.Header title="Confirm remove" />
      <Modal.Main>Are you sure you want to remove item?</Modal.Main>
      <Modal.Footer>
        <AppButton onClick={closeRemoveItemConfirmModalWithCancel}>Cancel</AppButton>
        <AppButton disabled={isConfirmButtonDisabled} onClick={confirmRemove}>
          Confirm
        </AppButton>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
});
