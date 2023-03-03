import { memo } from 'react';

import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';

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
    <ExitWithChangesConfirmModal
      isConfirmOpen={isModalOpen}
      onConfirm={closeEditItemConfirmModalWithConfirm}
      onCancel={closeEditItemConfirmModalWithCancel}
    />
  );
});
