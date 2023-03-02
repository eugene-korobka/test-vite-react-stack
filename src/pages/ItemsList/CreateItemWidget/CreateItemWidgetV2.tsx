import { useCallback } from 'react';
import { ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from 'src/experimental/ItemForm';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { createItemSelectors } from './store/createItem.selector';
import { createItemActions } from './store/createItem.slice';
import { useCreateItemMutation } from './store/items.create.api';
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

  const [createItemFn, { isLoading: isItemCreating }] = useCreateItemMutation();

  async function createNewItem(data) {
    await createItemFn({ data });

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
        <button
          className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
          onClick={beforeCloseCreateModal}
        >
          Cancel
        </button>
        <button
          className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
          disabled={isItemCreating}
          onClick={submitItemForm}
        >
          Create
        </button>
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
