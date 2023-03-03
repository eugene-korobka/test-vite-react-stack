import { useCallback, useState } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useConfirmModalState } from 'hooks/useModal';
import { useFetchOwnerByIdQuery } from 'sharedApi/owner.fetchById.api';
import { appEventOwnerRemoved } from 'sharedTypes/event.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { emailInputName } from 'sharedTypes/owner.types';
import { OwnerForm, useOwnerFormOnSubmitHandler, useOwnerFormRef } from 'src/experimental/OwnerForm';
import { RemoveOwnerWithEvent } from 'widgets/RemoveOwnerWithEvent.widget';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';
import { SaveChangesConfirmModal } from 'components/SaveChangesConfirmModal';

import { useUpdateOwnerMutation } from './store/owner.update.api';

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
    closeModal,
    beforeCloseModal,
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
    closeModal,
    beforeCloseModal,
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
        <SaveChangesConfirmModal isConfirmOpen={isConfirmOpen} onConfirm={closeModal} onCancel={closeConfirmModal} />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};
