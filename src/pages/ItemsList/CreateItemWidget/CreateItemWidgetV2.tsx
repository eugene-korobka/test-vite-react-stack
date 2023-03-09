import { useCallback } from 'react';
import { ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from 'src/experimental/ItemForm';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useCreateItemMutation } from './store/createItem.api';
import { createItemSelectors } from './store/createItem.selector';
import { createItemActions } from './store/createItem.slice';
import { CreateItemConfirmModal } from './CreateItemConfirmModal';

function useCreateItemModalHandlers() {
  const dispatch = useAppDispatch();

  const openCreateModal = useCallback(() => {
    dispatch(createItemActions.openCreateModal());
  }, [dispatch]);

  const closeCreateModal = useCallback(() => {
    dispatch(createItemActions.closeCreateModal());
  }, [dispatch]);

  const beforeCloseCreateModal = useCallback(() => {
    dispatch(createItemActions.beforeCloseCreateModal());
  }, [dispatch]);

  return {
    openCreateModal,
    closeCreateModal,
    beforeCloseCreateModal,
  };
}

const CreateItemModalButton = () => {
  const { openCreateModal } = useCreateItemModalHandlers();

  return <AppButton onClick={openCreateModal}>New item</AppButton>;
};

const useCreateItemModalState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createItemSelectors.selectIsCreateModalOpen);

  const { closeCreateModal, beforeCloseCreateModal } = useCreateItemModalHandlers();

  const { itemFormRef, submitItemForm } = useItemFormRef();

  const [createItemTrigger, { isLoading: isItemCreating }] = useCreateItemMutation();

  async function createNewItem(data) {
    await createItemTrigger({ data });

    closeCreateModal();
  }

  const { onSubmitHandler } = useItemFormOnSubmitHandler({
    mainCallback: createNewItem,
  });

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(createItemActions.setHasFormChanges(hasChanges));
  }

  return {
    isModalOpen,
    itemFormRef,
    submitItemForm,
    beforeCloseCreateModal,
    onSubmitHandler,
    onChangeFormValues,
    isItemCreating,
  };
};

const CreateItemModal = () => {
  const {
    isModalOpen,
    itemFormRef,
    submitItemForm,
    beforeCloseCreateModal,
    onSubmitHandler,
    onChangeFormValues,
    isItemCreating,
  } = useCreateItemModalState();

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseCreateModal}>
      <Modal.Header title="Create item" />
      <Modal.Main>
        <ItemForm ref={itemFormRef} onSubmitHandler={onSubmitHandler} onChangeValuesHandler={onChangeFormValues} />
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseCreateModal}>Cancel</AppButton>
        <AppButton disabled={isItemCreating} onClick={submitItemForm}>
          Create
        </AppButton>
        <CreateItemConfirmModal />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

export const CreateItemWidgetV2 = () => {
  return (
    <>
      <CreateItemModalButton />
      <CreateItemModal />
    </>
  );
};
