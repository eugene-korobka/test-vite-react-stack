import { useCallback, useState } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useConfirmModalState } from 'hooks/useModal';
import { useFetchOwnerByIdQuery } from 'sharedApi/fetchOwnerById.api';
import { emailInputName } from 'sharedTypes/constants';
import { appEventOwnerRemoved } from 'sharedTypes/event.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { OwnerForm, useOwnerFormOnSubmitHandler, useOwnerFormRef } from 'src/experimental/OwnerForm';
import { RemoveOwnerWithEvent } from 'widgets/RemoveOwnerWithEvent.widget';

import { AppButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';

import { useUpdateOwnerMutation } from './store/updateOwner.api';

const disabledFields = [emailInputName];

type EditOwnerModalProps = {
  ownerId: OwnerIdType;
  isModalOpen: boolean;
  closeModal: () => void;
};

function useEditOwnerModalState(props: EditOwnerModalProps) {
  const { ownerId, isModalOpen, closeModal } = props;

  const [hasFormChanges, setHasFormChanges] = useState(false);

  const { data: ownerById, isFetching: isFetchingOwnerById } = useFetchOwnerByIdQuery(
    { ownerId },
    { skip: !isModalOpen },
  );

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

  const [updateOwnerTrigger, { isLoading: isUpdatingOwner }] = useUpdateOwnerMutation();

  async function updateOwner(data) {
    await updateOwnerTrigger({ ownerId, data });

    closeModal();
  }

  const { onSubmitHandler } = useOwnerFormOnSubmitHandler({
    mainCallback: updateOwner,
  });

  const onRemoveOwner = useCallback(() => {
    closeModal();
  }, [closeModal]);

  useSubscribeToAppEvent(appEventOwnerRemoved, onRemoveOwner);

  const { ownerFormRef, submitOwnerForm } = useOwnerFormRef();

  const onChangeFormValues = useCallback((hasChanges: boolean) => {
    setHasFormChanges(hasChanges);
  }, []);

  return {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    confirmExit,
    isFetchingOwnerById,
    ownerById,
    ownerFormRef,
    submitOwnerForm,
    onSubmitHandler,
    onChangeFormValues,
    isUpdatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  };
}

export const EditOwnerModal = (props: EditOwnerModalProps) => {
  const {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    confirmExit,
    isFetchingOwnerById,
    ownerById,
    ownerFormRef,
    submitOwnerForm,
    onSubmitHandler,
    onChangeFormValues,
    isUpdatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  } = useEditOwnerModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Edit owner" />
      <Modal.Main>
        {isFetchingOwnerById && <div className="w-full">Loading...</div>}
        {!isFetchingOwnerById && ownerById && (
          <OwnerForm
            ref={ownerFormRef}
            initialValues={ownerById}
            onSubmitHandler={onSubmitHandler}
            onChangeValuesHandler={onChangeFormValues}
            disabledFields={disabledFields}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppButton disabled={isUpdatingOwner} onClick={submitOwnerForm}>
          Save
        </AppButton>
        <RemoveOwnerWithEvent ownerId={ownerId} />
        <ExitWithChangesConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={confirmExit}
          onCancel={closeConfirmModal}
        />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};
