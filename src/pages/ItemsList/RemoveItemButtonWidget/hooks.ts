import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { removeItemSelectors } from "./store/removeItem.selector";
import { removeItemActions } from "./store/removeItem.slice";
import { ItemTypeId } from "./store/types";

export function useIsRemoveItemConfirmModal(itemId: ItemTypeId) {
  const isModalOpen = useAppSelector(removeItemSelectors.selectIsModalOpenById, itemId);

  return isModalOpen;
};

export function useRemoveItemConfirmModalHandlers(itemId: ItemTypeId) {
  const dispatch = useAppDispatch();

  const openRemoveItemConfirmModal = useCallback(() => {
    dispatch(removeItemActions.openConfirmRemoveModal({ modalId: itemId }));
  }, [dispatch, itemId]);

  const closeRemoveItemConfirmModalWithConfirm = useCallback(() => {
    dispatch(removeItemActions.closeConfirmRemoveModalWithConfirm());
  }, [dispatch]);

  const closeRemoveItemConfirmModalWithCancel = useCallback(() => {
    dispatch(removeItemActions.closeConfirmRemoveModalWithCancel());
  }, [dispatch]);

  return {
    openRemoveItemConfirmModal,
    closeRemoveItemConfirmModalWithConfirm,
    closeRemoveItemConfirmModalWithCancel,
  };
};
