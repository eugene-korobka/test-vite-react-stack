import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';
import { defaultFormValues, ItemForm, useItemFormRef } from "src/experimental/ItemForm";
import { areObjectEqualsByValues } from "src/utils/areObjectsEqualByValues";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { createItemSelectors } from "./store/createItem.selector";
import { createItemActions } from "./store/createItem.slice";
import { useCreateItemMutation } from "./store/items.create.api";

const CreateItemModalButton = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(createItemActions.saveFormData({ form: defaultFormValues }));

    dispatch(createItemActions.openCreateModal());
  };

  return (
    <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openModal}>
      New item
    </button>
  );
};

const useCreateItemConfirmModalState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createItemSelectors.selectIsConfirmCloseModalOpen);

  const shouldMountModal = isModalOpen;

  const closeModalConfirm = () => {
    dispatch(createItemActions.closeConfirmCloseModalWithConfirm());
  };

  const closeModalCancel = () => {
    dispatch(createItemActions.closeConfirmCloseModalWithCancel());
  };

  return {
    shouldMountModal,
    closeModalConfirm,
    closeModalCancel,
  };
};

const CreateItemConfirmModal = () => {
  const { shouldMountModal, closeModalConfirm, closeModalCancel } = useCreateItemConfirmModalState();

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
              onClick={closeModalCancel}
            >
              Cancel
            </button>
            <button
              className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
              onClick={closeModalConfirm}
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
};

const CreateItemModal = () => {
  const dispatch = useAppDispatch();

  const isCreateModalOpen = useAppSelector(createItemSelectors.selectIsCreateModalOpen);

  const closeCreateModal = () => {
    dispatch(createItemActions.closeCreateModal());
  };

  const formData = useAppSelector(createItemSelectors.selectFormData);

  const {
    itemFormRef,
    getFormValues,
    submitItemForm,
  } = useItemFormRef();

  const onCloseModal = () => {
    const formValues = getFormValues() ?? {};

    if (areObjectEqualsByValues(formValues, formData)) {
      closeCreateModal();

      return;
    }

    dispatch(createItemActions.openConfirmCloseModal());
  };

  const [createItemFn, { isLoading }] = useCreateItemMutation();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formdata = new FormData(event.target);

    const data = Object.fromEntries(formdata.entries());

    try {
      await createItemFn({ data });

      closeCreateModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (isCreateModalOpen) {
    return createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-black/10">
        <div className="max-w-175 w-9/10 p-6 border border-solid border-gray-400 rounded-lg bg-white text-center">
          <header className="relative mb-4 text-xl text-center font-bold">
            <div>Create item</div>
            <button className="absolute top-0 right-0" onClick={onCloseModal}>
              <CloseIcon className="w-4 h-4" />
            </button>
            <CreateItemConfirmModal />
          </header>
          <main className="text-start">
            <ItemForm ref={itemFormRef} onSubmitHandler={onSubmitHandler} />
          </main>
          <footer className="flex justify-center items-center">
            <button
              className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
              onClick={onCloseModal}
            >
              Cancel
            </button>
            <button
              className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
              disabled={isLoading}
              onClick={submitItemForm}
            >
              Create
            </button>
          </footer>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
};

export const CreateItemWidgetV2 = () => {
  return (
    <>
      <CreateItemModalButton />
      <CreateItemModal />
    </>
  );
};
