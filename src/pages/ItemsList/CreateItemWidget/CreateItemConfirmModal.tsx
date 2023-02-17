import { memo } from "react";

import { Modal } from "components/ModalComponents";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { createItemSelectors } from "./store/createItem.selector";
import { createItemActions } from "./store/createItem.slice";

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
    <Modal.ConfirmModal isOpen={isModalOpen}>
      <Modal.Header title="Confirm exit" />
      <Modal.Main>
        Your changes are not saved.
        <br />
        Are you sure you want to exit?
      </Modal.Main>
      <Modal.Footer>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={closeCreateItemConfirmModalWithCancel}
        >
          Cancel
        </button>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={closeCreateItemConfirmModalWithConfirm}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
});
