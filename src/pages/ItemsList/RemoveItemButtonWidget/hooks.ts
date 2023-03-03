import { useCallback } from "react";
import type { ItemIdType } from 'sharedTypes/item.types';

import { useAppDispatch, useAppSelector } from "store/hooks";

import { removeItemSelectors } from "./store/removeItem.selector";
import { removeItemActions } from "./store/removeItem.slice";

export function useIsRemoveItemConfirmModal(itemId: ItemIdType) {
  const isModalOpen = useAppSelector(removeItemSelectors.selectIsModalOpenById, itemId);

  return isModalOpen;
};

export function useRemoveItemConfirmModalHandlers(itemId: ItemIdType) {
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
