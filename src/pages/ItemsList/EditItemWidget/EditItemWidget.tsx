import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';
import { ItemForm, useItemFormRef } from "src/experimental/ItemForm";
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

  const {
    itemFormRef,
    getFormValues,
    submitItemForm,
  } = useItemFormRef();

  const formData = useAppSelector(editItemSelectors.selectFormData);

  const onCloseModal = () => {
    const formValues = getFormValues() ?? {};

    if (areObjectEqualsByValues(formValues, formData)) {
      closeEditModal();

      return;
    }

    dispatch(editItemActions.openConfirmCloseModal());
  };

  const [updateItemFn, { isLoading }] = useUpdateItemMutation();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formdata = new FormData(event.target);

    const data = Object.fromEntries(formdata.entries());

    try {
      await updateItemFn({ itemId, data });

      closeEditModal();
    } catch (error) {
      console.error(error);
    }
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
            {isFetching && <div className="w-full">Loading...</div>}
            {!isFetching && item && (
              <ItemForm ref={itemFormRef} initialValues={item} onSubmitHandler={onSubmitHandler} />
            )}
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
              onClick={submitItemForm}
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
