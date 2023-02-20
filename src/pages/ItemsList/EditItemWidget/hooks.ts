import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { editItemSelectors } from "./store/editItem.selector";
import { editItemActions } from "./store/editItem.slice";
import { ItemTypeId } from "./store/types";

export function useEditItemModalHandlers(itemId: ItemTypeId) {
  const dispatch = useAppDispatch();

  const openEditItemModal = useCallback(() => {
    dispatch(editItemActions.openEditModal({ modalId: itemId }));
  }, [dispatch, itemId]);

  const closeEditItemModal = useCallback(() => {
    dispatch(editItemActions.closeEditModal());
  }, [dispatch]);

  const beforeCloseEditItemModal = useCallback(() => {
    dispatch(editItemActions.beforeCloseEditModal());
  }, [dispatch]);

  return {
    openEditItemModal,
    closeEditItemModal,
    beforeCloseEditItemModal,
  };
}

export function useIsEditItemModalOpen(itemId) {
  const isModalOpen = useAppSelector(editItemSelectors.selectIsModalOpenById, itemId);

  return isModalOpen;
}

export function useEditItemConfirmModalHandlers() {
  const dispatch = useAppDispatch();

  const openEditItemConfirmModal = useCallback(() => {
    dispatch(editItemActions.openConfirmCloseModal());
  }, [dispatch]);

  const closeEditItemConfirmModalWithConfirm = useCallback(() => {
    dispatch(editItemActions.closeConfirmCloseModalWithConfirm());
  }, [dispatch]);

  const closeEditItemConfirmModalWithCancel = useCallback(() => {
    dispatch(editItemActions.closeConfirmCloseModalWithCancel());
  }, [dispatch]);

  return {
    openEditItemConfirmModal,
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  };
};
