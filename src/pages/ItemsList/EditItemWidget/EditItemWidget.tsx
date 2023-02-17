import { ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from "src/experimental/ItemForm";
import { areObjectEqualsByValues } from "src/utils/areObjectsEqualByValues";

import { RemoveItemButtonWithConfirmWidget } from 'pages/ItemsList/RemoveItemButtonWidget/RemoveItemButtonWithConfirmWidget';

import { Modal } from "components/ModalComponents";

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

function useIsEditItemModalOpen(itemId) {
  const isEditModalOpen = useAppSelector(editItemSelectors.selectIsEditModalOpen);
  const currentModalId = useAppSelector(editItemSelectors.selectCurrentModalId);
  const isModalOpen = Boolean(currentModalId && currentModalId === itemId && isEditModalOpen);

  return isModalOpen;
};

function useEditItemModalState(props: EditItemModalProps) {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const closeEditModal = () => {
    dispatch(editItemActions.closeEditModal());
  };

  const isModalOpen = useIsEditItemModalOpen(itemId);

  const { data: itemById, isFetching: isFetchingItemById } = useFetchItemByIdQuery({ itemId }, { skip: !isModalOpen });

  const { itemFormRef, getFormValues, submitItemForm } = useItemFormRef();

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
    isModalOpen,
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
    isModalOpen,
    itemFormRef,
    onSubmitHandler,
    submitItemForm,
    onCloseModal,
  } = useEditItemModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={onCloseModal}>
      <Modal.Header title="Edit item" />
      <Modal.Main>
        {isFetchingItemById && <div className="w-full">Loading...</div>}
        {!isFetchingItemById && itemById && (
          <ItemForm ref={itemFormRef} initialValues={itemById} onSubmitHandler={onSubmitHandler} />
        )}
      </Modal.Main>
      <Modal.Footer>
        <button className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md" onClick={onCloseModal}>
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
        <EditItemConfirmModal />
      </Modal.Footer>
    </Modal.BaseModal>
  );
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
