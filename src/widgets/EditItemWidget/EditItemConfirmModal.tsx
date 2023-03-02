import { memo } from 'react';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useAppSelector } from 'store/hooks';

import { editItemSelectors } from './store/editItem.selector';
import { useEditItemConfirmModalHandlers } from './hooks';

function useEditItemConfirmModalState() {
  const isModalOpen = useAppSelector(editItemSelectors.selectIsConfirmCloseModalOpen);

  const { closeEditItemConfirmModalWithConfirm, closeEditItemConfirmModalWithCancel } =
    useEditItemConfirmModalHandlers();

  return {
    isModalOpen,
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  };
}

export const EditItemConfirmModal = memo(() => {
  const { isModalOpen, closeEditItemConfirmModalWithConfirm, closeEditItemConfirmModalWithCancel } =
    useEditItemConfirmModalState();

  return (
    <Modal.ConfirmModal isOpen={isModalOpen}>
      <Modal.Header title="Confirm exit" />
      <Modal.Main>
        Your changes are not saved.
        <br />
        Are you sure you want to exit?
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={closeEditItemConfirmModalWithCancel}>Cancel</AppButton>
        <AppButton onClick={closeEditItemConfirmModalWithConfirm}>Confirm</AppButton>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
});
