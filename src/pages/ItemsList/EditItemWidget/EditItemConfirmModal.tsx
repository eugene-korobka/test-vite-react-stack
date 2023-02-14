import { memo } from "react";
import { createPortal } from "react-dom";

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
  const shouldMountModal = isModalOpen;

  const {
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  } = useEditItemConfirmModalHandlers();

  return {
    shouldMountModal,
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  };
};

export const EditItemConfirmModal = memo(() => {
  const {
    shouldMountModal,
    closeEditItemConfirmModalWithConfirm,
    closeEditItemConfirmModalWithCancel,
  } = useEditItemConfirmModalState();

  if (shouldMountModal) {
    return createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-black/10">
        <div className="max-w-175 p-6 border border-solid border-gray-400 rounded-lg bg-white">
          <header className="mb-4 text-center">Confirm exit</header>
          <main className="mb-4 text-center">
            Your changes are not saved.
            <br />
            Are you sure you want to exit?
          </main>
          <footer className="flex justify-center items-center">
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
          </footer>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
});
