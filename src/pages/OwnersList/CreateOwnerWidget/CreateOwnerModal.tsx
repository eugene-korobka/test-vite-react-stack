import { useCallback, useState } from 'react';
import { useConfirmModalState } from 'hooks/useModal';
import { OwnerForm, useOwnerFormOnSubmitHandler, useOwnerFormRef } from 'src/experimental/OwnerForm';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';
import { SaveChangesConfirmModal } from 'components/SaveChangesConfirmModal';

import { useCreateOwnerMutation } from './store/owner.create.api';

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
  }

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
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppButton disabled={isCreatingOwner} onClick={submitOwnerForm}>
          Create
        </AppButton>
        <SaveChangesConfirmModal isConfirmOpen={isConfirmOpen} onConfirm={closeModal} onCancel={closeConfirmModal} />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};
