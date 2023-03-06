import { useCallback, useId } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useFetchItemByIdQuery } from 'sharedApi/item.fetchById.api';
import { appEventItemRemoved } from 'sharedTypes/event.types';
import type { ItemIdType } from 'sharedTypes/item.types';
import { RemoveItemWithEvent } from 'widgets/RemoveItem/RemoveItemWithEvent';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ItemHookForm } from 'components/ItemHookForm';
import { Modal } from 'components/ModalComponents';

import { useAppDispatch } from 'store/hooks';

import { editItemActions } from './store/editItem.slice';
import { useUpdateItemMutation } from './store/item.update.api';
import { EditItemConfirmModal } from './EditItemConfirmModal';
import { useEditItemModalHandlers, useIsEditItemModalOpen } from './hooks';

type EditItemModalContentHookFormProps = {
  itemId: ItemIdType;
};

function useEditItemModalContentHookFormState(props: EditItemModalContentHookFormProps) {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const isModalOpen = useIsEditItemModalOpen(itemId);

  const { data: itemById, isFetching: isFetchingItemById } = useFetchItemByIdQuery({ itemId }, { skip: !isModalOpen });

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(editItemActions.setHasFormChanges(hasChanges));
  }

  const { beforeCloseEditItemModal, closeEditItemModal } = useEditItemModalHandlers(itemId);

  const [updateItemTrigger, { isLoading: isItemUpdating }] = useUpdateItemMutation();

  async function updateItem(data) {
    try {
      await updateItemTrigger({ itemId, data });

      closeEditItemModal();
    } catch (error) {
      console.error(error);
    }
  }

  const onRemoveItem = useCallback(() => {
    closeEditItemModal();
  }, [closeEditItemModal]);

  useSubscribeToAppEvent(appEventItemRemoved, onRemoveItem);

  const formId = useId();

  return {
    itemId,
    itemById,
    isFetchingItemById,
    isItemUpdating,
    isModalOpen,
    formId,
    onChangeFormValues,
    updateItem,
    beforeCloseEditItemModal,
  };
}

export const EditItemModalContentHookForm = (props: EditItemModalContentHookFormProps) => {
  const {
    itemId,
    itemById,
    isFetchingItemById,
    isItemUpdating,
    formId,
    onChangeFormValues,
    updateItem,
    beforeCloseEditItemModal,
  } = useEditItemModalContentHookFormState(props);

  return (
    <>
      <Modal.Header title="Edit item" />
      <Modal.Main>
        {isFetchingItemById && <div className="w-full">Loading...</div>}
        {!isFetchingItemById && itemById && (
          <ItemHookForm
            formId={formId}
            initialValues={itemById}
            onSubmitHandler={updateItem}
            onFormChangeHandler={onChangeFormValues}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseEditItemModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isItemUpdating}>
          Save
        </AppSubmitButton>
        <RemoveItemWithEvent itemId={itemId} />
        <EditItemConfirmModal />
      </Modal.Footer>
    </>
  );
};
