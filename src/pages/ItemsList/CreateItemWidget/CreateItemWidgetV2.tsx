import { defaultFormValues, ItemForm, useItemFormOnSubmitHandler, useItemFormRef } from "src/experimental/ItemForm";
import { areObjectEqualsByValues } from "src/utils/areObjectsEqualByValues";

import { Modal } from "components/ModalComponents";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { createItemSelectors } from "./store/createItem.selector";
import { createItemActions } from "./store/createItem.slice";
import { useCreateItemMutation } from "./store/items.create.api";
import { CreateItemConfirmModal, useCreateItemConfirmModalHandlers } from "./CreateItemConfirmModal";

const CreateItemModalButton = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(createItemActions.saveFormData({ form: defaultFormValues }));

    dispatch(createItemActions.openCreateModal());
  };

  return (
    <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openModal}>
      New item
    </button>
  );
};

const useCreateItemModalState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createItemSelectors.selectIsCreateModalOpen);

  const closeCreateModal = () => {
    dispatch(createItemActions.closeCreateModal());
  };

  const formData = useAppSelector(createItemSelectors.selectFormData);

  const { itemFormRef, getFormValues, submitItemForm } = useItemFormRef();

  const { openCreateItemConfirmModal } = useCreateItemConfirmModalHandlers();

  const onCloseModal = () => {
    const formValues = getFormValues() ?? {};

    if (areObjectEqualsByValues(formValues, formData)) {
      closeCreateModal();

      return;
    }

    openCreateItemConfirmModal();
  };

  const [createItemFn, { isLoading: isItemCreating }] = useCreateItemMutation();

  async function createNewItem(data) {
    await createItemFn({ data });

    closeCreateModal();
  };

  const { onSubmitHandler } = useItemFormOnSubmitHandler({
    mainCallback: createNewItem,
  });

  return {
    isModalOpen,
    itemFormRef,
    submitItemForm,
    onCloseModal,
    onSubmitHandler,
    isItemCreating,
  };
};

const CreateItemModal = () => {
  const { isModalOpen, itemFormRef, submitItemForm, onCloseModal, onSubmitHandler, isItemCreating } =
    useCreateItemModalState();

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={onCloseModal}>
      <Modal.Header title="Create item" />
      <Modal.Main>
        <ItemForm ref={itemFormRef} onSubmitHandler={onSubmitHandler} />
      </Modal.Main>
      <Modal.Footer>
        <button className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md" onClick={onCloseModal}>
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
