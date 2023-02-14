import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from 'src/assets/close-icon.svg';
import { ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from "src/experimental/ItemForm";
import { areObjectEqualsByValues } from "src/utils/areObjectsEqualByValues";

import { RemoveItemButtonWithConfirmWidget } from 'pages/ItemsList/RemoveItemButtonWidget/RemoveItemButtonWithConfirmWidget';

import { useAppDispatch, useAppSelector } from "store/hooks";

import { editItemSelectors } from "./store/editItem.selector";
import { editItemActions } from "./store/editItem.slice";
import { useFetchItemByIdQuery, useUpdateItemMutation } from "./store/items.edit.api";
import { ItemTypeId } from "./store/types";
import { EditItemConfirmModal, useEditItemConfirmModalHandlers } from "./EditItemConfirmModal";

type EditItemModalButtonProps = {
  itemId: ItemTypeId;
}

const EditItemModalButton = (props: EditItemModalButtonProps) => {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const openEditModal = () => {
    dispatch(editItemActions.openEditModal({ modalId: itemId }));
  };

  return (
    <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openEditModal}>
      Edit item
    </button>
  );
};

type EditItemModalProps = {
  itemId: ItemTypeId;
};

function useEditItemModalState(props: EditItemModalProps) {
  const { itemId } = props;

  const isEditModalOpen = useAppSelector(editItemSelectors.selectIsEditModalOpen);
  const currentModalId = useAppSelector(editItemSelectors.selectCurrentModalId);
  const shouldMountModal = Boolean(currentModalId && currentModalId === itemId && isEditModalOpen);

  const { data: itemById, isFetching: isFetchingItemById } = useFetchItemByIdQuery({ itemId }, { skip: !shouldMountModal });

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

  const { openEditItemConfirmModal } = useEditItemConfirmModalHandlers();

  const onCloseModal = () => {
    const formValues = getFormValues() ?? {};

    if (areObjectEqualsByValues(formValues, formData)) {
      closeEditModal();

      return;
    }

    openEditItemConfirmModal();
  };

  const [updateItemFn, { isLoading: isItemUpdating }] = useUpdateItemMutation();

  async function updateItem(data) {
    await updateItemFn({ itemId, data });

    closeEditModal();
  }

  const { onSubmitHandler } = useItemFormOnSubmitHandler({
    mainCallback: updateItem,
  });

  return {
    itemId,
    itemById,
    isFetchingItemById,
    isItemUpdating,
    shouldMountModal,
    itemFormRef,
    onSubmitHandler,
    submitItemForm,
    onCloseModal,
  };
};

const EditItemModal = (props: EditItemModalProps) => {
  const {
    itemId,
    itemById,
    isFetchingItemById,
    isItemUpdating,
    shouldMountModal,
    itemFormRef,
    onSubmitHandler,
    submitItemForm,
    onCloseModal,
  } = useEditItemModalState(props);

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
            {isFetchingItemById && <div className="w-full">Loading...</div>}
            {!isFetchingItemById && itemById && (
              <ItemForm ref={itemFormRef} initialValues={itemById} onSubmitHandler={onSubmitHandler} />
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
              disabled={isItemUpdating}
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
