import { useCallback, useId } from 'react';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ItemHookForm } from 'components/ItemHookForm';
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

const useCreateItemModalHookFormState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createItemSelectors.selectIsCreateModalOpen);

  const { closeCreateModal, beforeCloseCreateModal } = useCreateItemModalHandlers();

  const [createItemTrigger, { isLoading: isItemCreating }] = useCreateItemMutation();

  async function createItem(data) {
    try {
      await createItemTrigger({ data });

      closeCreateModal();
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(createItemActions.setHasFormChanges(hasChanges));
  }

  const formId = useId();

  return {
    isModalOpen,
    beforeCloseCreateModal,
    formId,
    createItem,
    onChangeFormValues,
    isItemCreating,
  };
};

const CreateItemModalHookForm = () => {
  const { isModalOpen, beforeCloseCreateModal, formId, createItem, onChangeFormValues, isItemCreating } =
    useCreateItemModalHookFormState();

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseCreateModal}>
      <Modal.Header title="Create item" />
      <Modal.Main>
        <ItemHookForm formId={formId} onSubmitHandler={createItem} onFormChangeHandler={onChangeFormValues} />
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseCreateModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isItemCreating}>
          Create
        </AppSubmitButton>
        <CreateItemConfirmModal />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

export const CreateItemWidgetHookForm = () => {
  return (
    <>
      <CreateItemModalButton />
      <CreateItemModalHookForm />
    </>
  );
};
