import { useCallback,useState } from "react";
import { OwnerForm,useOwnerFormOnSubmitHandler, useOwnerFormRef } from "src/experimental/OwnerForm";
import { useConfirmModalState } from "src/hooks/useModal";

import { Modal } from "components/ModalComponents";
import { SaveChangesConfirmModal } from "components/SaveChangesConfirmModal";

import { useCreateOwnerMutation } from "./store/owner.create.api";

type CreateOwnerModalProps = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useCreateOwnerModalState = (props: CreateOwnerModalProps) => {
  const { isModalOpen, closeModal } = props;

  const [hasFormChanges, setHasFormChanges] = useState(false);

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    if (hasFormChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [hasFormChanges, openConfirmModal, closeModal]);

  const [createOwnerTrigger, { isLoading: isCreatingOwner }] = useCreateOwnerMutation();

  async function createNewOwner(data) {
    await createOwnerTrigger({ data });

    closeModal();
  };

  const { onSubmitHandler } = useOwnerFormOnSubmitHandler({
    mainCallback: createNewOwner,
  });

  const { ownerFormRef, submitOwnerForm } = useOwnerFormRef();

  const onChangeHandler = (hasChanges) => {
    setHasFormChanges(hasChanges);
  };

  return {
    isModalOpen,
    closeModal,
    ownerFormRef,
    submitOwnerForm,
    beforeCloseModal,
    onSubmitHandler,
    onChangeHandler,
    isCreatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  };
};

export const CreateOwnerModal = (props: CreateOwnerModalProps) => {
  const {
    isModalOpen,
    closeModal,
    ownerFormRef,
    submitOwnerForm,
    beforeCloseModal,
    onSubmitHandler,
    onChangeHandler,
    isCreatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  } = useCreateOwnerModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Create owner" />
      <Modal.Main>
        <OwnerForm ref={ownerFormRef} onSubmitHandler={onSubmitHandler} onChangeValuesHandler={onChangeHandler} />
      </Modal.Main>
      <Modal.Footer>
        <button className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md" onClick={beforeCloseModal}>
          Cancel
        </button>
        <button
          className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
          disabled={isCreatingOwner}
          onClick={submitOwnerForm}
        >
          Create
        </button>
        <SaveChangesConfirmModal isConfirmOpen={isConfirmOpen} onConfirm={closeModal} onCancel={closeConfirmModal} />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};
