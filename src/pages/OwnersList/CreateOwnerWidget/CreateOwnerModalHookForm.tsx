import { useCallback, useId, useState } from 'react';
import { useConfirmModalState } from 'hooks/useModal';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';
import { OwnerHookForm } from 'components/OwnerHookForm';

import { useCreateOwnerMutation } from './store/owner.create.api';

type CreateOwnerModalHookFormProps = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useCreateOwnerModalHookFormState = (props: CreateOwnerModalHookFormProps) => {
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
    closeModal,
    beforeCloseModal,
    formId,
    createOwner,
    onChangeHandler,
    isCreatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  };
};

export const CreateOwnerModalHookForm = (props: CreateOwnerModalHookFormProps) => {
  const {
    isModalOpen,
    closeModal,
    beforeCloseModal,
    formId,
    createOwner,
    onChangeHandler,
    isCreatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  } = useCreateOwnerModalHookFormState(props);

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
          onConfirm={closeModal}
          onCancel={closeConfirmModal}
        />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};
