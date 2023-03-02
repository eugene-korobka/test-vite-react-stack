import { useCallback } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useFetchItemByIdQuery } from 'sharedApi/item.fetchById.api';
import { appEventItemRemoved } from 'sharedTypes/event.types';
import { ItemTypeId } from 'sharedTypes/item.types';
import { ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from 'src/experimental/ItemForm';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';
import { RemoveItemWithEvent } from 'components/RemoveItemWithEvent';

import { useAppDispatch } from 'store/hooks';

import { editItemActions } from './store/editItem.slice';
import { useUpdateItemMutation } from './store/item.update.api';
import { EditItemConfirmModal } from './EditItemConfirmModal';
import { useEditItemModalHandlers, useIsEditItemModalOpen } from './hooks';

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
        <AppButton onClick={beforeCloseEditItemModal}>Cancel</AppButton>
        <AppButton disabled={isItemUpdating} onClick={submitItemForm}>
          Save
        </AppButton>
        <RemoveItemWithEvent itemId={itemId} />
        <EditItemConfirmModal />
      </Modal.Footer>
    </>
  );
};
