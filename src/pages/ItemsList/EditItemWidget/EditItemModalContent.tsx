import { useCallback } from "react";
import { useFetchItemByIdQuery, useUpdateItemMutation } from "sharedApi/items.edit.api";
import { appEventItemRemoved } from "sharedTypes/event.types";
import { ItemTypeId } from "sharedTypes/item.types";
import { ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from "src/experimental/ItemForm";
import { useSubscribeToAppEvent } from "src/hooks/useAppEvents";

import { Modal } from "components/ModalComponents";
import { RemoveItemWithEvent } from "components/RemoveItemWithEvent";

import { useAppDispatch } from "store/hooks";

import { editItemActions } from "./store/editItem.slice";
import { EditItemConfirmModal } from "./EditItemConfirmModal";
import { useEditItemModalHandlers, useIsEditItemModalOpen } from "./hooks";

type EditItemModalContentProps = {
  itemId: ItemTypeId;
};

function useEditItemModalContentState(props: EditItemModalContentProps) {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const isModalOpen = useIsEditItemModalOpen(itemId);

  const { data: itemById, isFetching: isFetchingItemById } = useFetchItemByIdQuery({ itemId }, { skip: !isModalOpen });

  const { itemFormRef, submitItemForm } = useItemFormRef();

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(editItemActions.setHasFormChanges(hasChanges));
  }

  const { beforeCloseEditItemModal, closeEditItemModal } = useEditItemModalHandlers(itemId);

  const [updateItemFn, { isLoading: isItemUpdating }] = useUpdateItemMutation();

  async function updateItem(data) {
    await updateItemFn({ itemId, data });

    closeEditItemModal();
  }

  const { onSubmitHandler } = useItemFormOnSubmitHandler({
    mainCallback: updateItem,
  });

  const onRemoveItem = useCallback(() => {
    closeEditItemModal();
  }, [closeEditItemModal]);

  useSubscribeToAppEvent(appEventItemRemoved, onRemoveItem);

  return {
    itemId,
    itemById,
    isFetchingItemById,
    isItemUpdating,
    isModalOpen,
    itemFormRef,
    onChangeFormValues,
    onSubmitHandler,
    submitItemForm,
    beforeCloseEditItemModal,
    closeEditItemModal,
  };
}

export const EditItemModalContent = (props: EditItemModalContentProps) => {
  const {
    itemId,
    itemById,
    isFetchingItemById,
    isItemUpdating,
    itemFormRef,
    onChangeFormValues,
    onSubmitHandler,
    submitItemForm,
    beforeCloseEditItemModal,
    // closeEditItemModal,
  } = useEditItemModalContentState(props);

  return (
    <>
      <Modal.Header title="Edit item" />
      <Modal.Main>
        {isFetchingItemById && <div className="w-full">Loading...</div>}
        {!isFetchingItemById && itemById && (
          <ItemForm
            ref={itemFormRef}
            initialValues={itemById}
            onSubmitHandler={onSubmitHandler}
            onChangeValuesHandler={onChangeFormValues}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <button
          className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
          onClick={beforeCloseEditItemModal}
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
        {/* <RemoveItemButtonWithConfirmModal itemId={itemId} onRemove={closeEditItemModal} /> */}
        <RemoveItemWithEvent itemId={itemId} />
        <EditItemConfirmModal />
      </Modal.Footer>
    </>
  );
};
