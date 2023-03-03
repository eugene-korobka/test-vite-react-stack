import { memo } from 'react';

import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { createItemSelectors } from './store/createItem.selector';
import { createItemActions } from './store/createItem.slice';

export function useCreateItemConfirmModalHandlers() {
  const dispatch = useAppDispatch();

  const openCreateItemConfirmModal = () => {
    dispatch(createItemActions.openConfirmCloseModal());
  };

  const closeCreateItemConfirmModalWithConfirm = () => {
    dispatch(createItemActions.closeConfirmCloseModalWithConfirm());
  };

  const closeCreateItemConfirmModalWithCancel = () => {
    dispatch(createItemActions.closeConfirmCloseModalWithCancel());
  };

  return {
    openCreateItemConfirmModal,
    closeCreateItemConfirmModalWithConfirm,
    closeCreateItemConfirmModalWithCancel,
  };
}

function useCreateItemConfirmModalState() {
  const isModalOpen = useAppSelector(createItemSelectors.selectIsConfirmCloseModalOpen);

  const { closeCreateItemConfirmModalWithConfirm, closeCreateItemConfirmModalWithCancel } =
    useCreateItemConfirmModalHandlers();

  return {
    isModalOpen,
    closeCreateItemConfirmModalWithConfirm,
    closeCreateItemConfirmModalWithCancel,
  };
}

export const CreateItemConfirmModal = memo(() => {
  const { isModalOpen, closeCreateItemConfirmModalWithConfirm, closeCreateItemConfirmModalWithCancel } =
    useCreateItemConfirmModalState();

  return (
    <ExitWithChangesConfirmModal
      isConfirmOpen={isModalOpen}
      onConfirm={closeCreateItemConfirmModalWithConfirm}
      onCancel={closeCreateItemConfirmModalWithCancel}
    />
  );
});
