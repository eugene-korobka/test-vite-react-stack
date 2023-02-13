import { useRef } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';
import { EditItemForm, EditItemFormReturnedRef } from "src/experimental/EditItemForm";
import { areObjectEqualsByValues } from "src/utils/areObjectsEqualByValues";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { RemoveItemButtonWithConfirmWidget } from "../RemoveItemButtonWidget/RemoveItemButtonWithConfirmWidget";

import { editItemSelectors } from "./store/editItem.selector";
import { editItemActions } from "./store/editItem.slice";
import { useFetchItemByIdQuery, useUpdateItemMutation } from "./store/items.edit.api";
import { ItemTypeId } from "./store/types";

type EditItemModalButtonProps = {
  itemId: ItemTypeId;
}

const EditItemModalButton = (props: EditItemModalButtonProps) => {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const openEditModal = () => {
    dispatch(editItemActions.openEditModal({ itemId }));
  };

  return (
    <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openEditModal}>
      Edit item
    </button>
  );
};

const useEditItemConfirmModalState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(editItemSelectors.selectIsConfirmCloseModalOpen);

  const shouldMountModal = isModalOpen;

  const closeModalConfirm = () => {
    dispatch(editItemActions.closeConfirmCloseModalWithConfirm());
  };

  const closeModalCancel = () => {
    dispatch(editItemActions.closeConfirmCloseModalWithCancel());
  };

  return {
    shouldMountModal,
    closeModalConfirm,
    closeModalCancel,
  };
};

const EditItemConfirmModal = () => {
  const {
    shouldMountModal,
    closeModalConfirm,
    closeModalCancel,
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

type EditItemModalProps = {
  itemId: ItemTypeId;
};

const EditItemModal = (props: EditItemModalProps) => {
  const { itemId } = props;

  const isEditModalOpen = useAppSelector(editItemSelectors.selectIsEditModalOpen);
  const editedItemId = useAppSelector(editItemSelectors.selectEditedItemId);
  const shouldMountModal = Boolean(editedItemId && editedItemId === itemId && isEditModalOpen);

  const { data: item, isFetching } = useFetchItemByIdQuery({ itemId }, { skip: !shouldMountModal });

  const dispatch = useAppDispatch();

  const closeEditModal = () => {
    dispatch(editItemActions.closeEditModal());
  };

  const formData = useAppSelector(editItemSelectors.selectFormData);

  const formRef = useRef<EditItemFormReturnedRef>(null);

  const onCloseModal = () => {
    const formValues = formRef.current?.getFormValues() ?? {};

    if (areObjectEqualsByValues(formValues, formData)) {
      closeEditModal();

      return;
    }

    dispatch(editItemActions.openConfirmCloseModal());
  };

  const [updateItemFn, { isLoading }] = useUpdateItemMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formdata = new FormData(event.target);

    const data = Object.fromEntries(formdata.entries());

    try {
      await updateItemFn({ itemId, data });

      closeEditModal();

      // event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = () => {
    formRef.current?.submitForm();
  };

  if (shouldMountModal) {
    return createPortal(
      <div className="fixed top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-black/10">
        <div className="max-w-175 w-9/10 p-6 border border-solid border-gray-400 rounded-lg bg-white text-center">
          <header className="relative mb-4 text-xl text-center font-bold">
            <div>Edit item</div>
            <button className="absolute top-0 right-0" onClick={onCloseModal}>
              <CloseIcon className="w-4 h-4" />
            </button>
            <EditItemConfirmModal />
          </header>
          <main className="text-start">
            {/* <form method="dialog" onSubmit={onSubmit}>
              <label htmlFor={titleInputId} className="block mb-6">
                <span className="block mb-2">Title</span>
                <input
                  className="block w-full p-2 border border-solid border-gray-400 rounded-md"
                  id={titleInputId}
                  name="title"
                  type="text"
                  required
                  autoFocus
                />
              </label>
              <label htmlFor={descriptionInputId} className="block mb-6">
                <span className="block mb-2">Description</span>
                <textarea
                  className="block w-full p-2 border border-solid border-gray-400 rounded-md resize-none"
                  id={descriptionInputId}
                  name="description"
                  rows={5}
                  required
                />
              </label>
              <div className="flex justify-center">
                <button
                  className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
                  type="reset"
                  value="cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </button>
                <RemoveItemButtonWithConfirmWidget itemId={itemId} />
              </div>
            </form> */}
            {isFetching && <div className="w-full">Loading...</div>}
            {!isFetching && item && <EditItemForm ref={formRef} initialValues={item} onSubmit={onSubmit} />}
          </main>
          <footer>
            <button
              className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
              onClick={onCloseModal}
            >
              Cancel
            </button>
            <button
              className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
              disabled={isLoading}
              onClick={submitForm}
            >
              Save
            </button>
            <RemoveItemButtonWithConfirmWidget itemId={itemId} />
          </footer>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
};

type EditItemWidgetProps = {
  itemId: ItemTypeId;
};

export const EditItemWidget = (props: EditItemWidgetProps) => {
  const { itemId } = props;

  return (
    <>
      <EditItemModalButton itemId={itemId} />
      <EditItemModal itemId={itemId} />
    </>
  );
};
