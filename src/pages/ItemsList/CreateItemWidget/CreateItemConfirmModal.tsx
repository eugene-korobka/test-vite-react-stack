import { memo } from "react";
import { createPortal } from "react-dom";

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
};

function useCreateItemConfirmModalState() {
  const isModalOpen = useAppSelector(createItemSelectors.selectIsConfirmCloseModalOpen);
  const shouldMountModal = isModalOpen;

  const {
    closeCreateItemConfirmModalWithConfirm,
    closeCreateItemConfirmModalWithCancel,
  } = useCreateItemConfirmModalHandlers();

  return {
    shouldMountModal,
    closeCreateItemConfirmModalWithConfirm,
    closeCreateItemConfirmModalWithCancel,
  };
};

export const CreateItemConfirmModal = memo(() => {
  const {
    shouldMountModal,
    closeCreateItemConfirmModalWithConfirm,
    closeCreateItemConfirmModalWithCancel,
  } = useCreateItemConfirmModalState();

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
          </footer>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
});
