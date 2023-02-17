import { memo } from "react";

import { Modal } from "components/ModalComponents";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { editItemSelectors } from "./store/editItem.selector";
import { editItemActions } from "./store/editItem.slice";

export function useEditItemConfirmModalHandlers() {
  const dispatch = useAppDispatch();

  const openEditItemConfirmModal = () => {
    dispatch(editItemActions.openConfirmCloseModal());
  };

  const closeEditItemConfirmModalWithConfirm = () => {
    dispatch(editItemActions.closeConfirmCloseModalWithConfirm());
  };

  const closeEditItemConfirmModalWithCancel = () => {
    dispatch(editItemActions.closeConfirmCloseModalWithCancel());
  };

  return {
    openEditItemConfirmModal,
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  };
};

function useEditItemConfirmModalState() {
  const isModalOpen = useAppSelector(editItemSelectors.selectIsConfirmCloseModalOpen);

  const {
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  } = useEditItemConfirmModalHandlers();

  return {
    isModalOpen,
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  };
};

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
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={closeEditItemConfirmModalWithCancel}
        >
          Cancel
        </button>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={closeEditItemConfirmModalWithConfirm}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
});
