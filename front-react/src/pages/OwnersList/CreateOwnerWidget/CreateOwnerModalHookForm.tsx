import { useCallback, useId, useState } from 'react';
import { useConfirmModalState } from 'hooks/useModal';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';
import { OwnerHookForm } from 'components/OwnerHookForm';

import { useCreateOwnerMutation } from './store/createOwner.api';

type CreateOwnerModalHookFormProps = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useCreateOwnerModalHookFormBaseState = (props: CreateOwnerModalHookFormProps) => {
  const { isModalOpen, closeModal } = props;

  const [hasFormChanges, setHasFormChanges] = useState(false);

  const onChangeHandler = (hasChanges) => {
    setHasFormChanges(hasChanges);
  };

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    if (hasFormChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [hasFormChanges, openConfirmModal, closeModal]);

  const confirmExit = useCallback(() => {
    closeConfirmModal();
    closeModal();
  }, [closeConfirmModal, closeModal]);

  const [createOwnerTrigger, { isLoading: isCreatingOwner }] = useCreateOwnerMutation();

  async function createOwner(data) {
    try {
      await createOwnerTrigger({ data });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  const formId = useId();

  return {
    isModalOpen,
    beforeCloseModal,
    confirmExit,
    formId,
    createOwner,
    onChangeHandler,
    isCreatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  };
};

const CreateOwnerModalHookFormBase = (props: CreateOwnerModalHookFormProps) => {
  const {
    isModalOpen,
    beforeCloseModal,
    confirmExit,
    formId,
    createOwner,
    onChangeHandler,
    isCreatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  } = useCreateOwnerModalHookFormBaseState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Create owner" />
      <Modal.Main>
        <OwnerHookForm formId={formId} onSubmitHandler={createOwner} onFormChangeHandler={onChangeHandler} />
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isCreatingOwner}>
          Create
        </AppSubmitButton>
        <ExitWithChangesConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={confirmExit}
          onCancel={closeConfirmModal}
        />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

export const CreateOwnerModalHookForm = (props: CreateOwnerModalHookFormProps) => {
  const { isModalOpen } = props;

  return (
    <Modal.Mount isOpen={isModalOpen}>
      <CreateOwnerModalHookFormBase {...props} />
    </Modal.Mount>
  );
};
