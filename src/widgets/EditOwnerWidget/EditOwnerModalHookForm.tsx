import { useCallback, useId, useState } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useConfirmModalState } from 'hooks/useModal';
import { useFetchOwnerByIdQuery } from 'sharedApi/fetchOwnerById.api';
import { emailInputName } from 'sharedTypes/constants';
import { appEventOwnerRemoved } from 'sharedTypes/event.types';
import type { OwnerIdType } from 'sharedTypes/owner.types';
import { RemoveOwnerWithEvent } from 'widgets/RemoveOwnerWithEvent.widget';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';
import { OwnerHookForm } from 'components/OwnerHookForm';

import { useUpdateOwnerMutation } from './store/updateOwner.api';

const disabledFields = [emailInputName];

type EditOwnerModalHookFormProps = {
  ownerId: OwnerIdType;
  isModalOpen: boolean;
  closeModal: () => void;
};

function useEditOwnerModalHookFormBaseState(props: EditOwnerModalHookFormProps) {
  const { ownerId, isModalOpen, closeModal } = props;

  const [hasFormChanges, setHasFormChanges] = useState(false);

  const onChangeFormValues = useCallback((hasChanges: boolean) => {
    setHasFormChanges(hasChanges);
  }, []);

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
    try {
      await updateOwnerTrigger({ ownerId, data });

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  const onRemoveOwner = useCallback(() => {
    closeModal();
  }, [closeModal]);

  useSubscribeToAppEvent(appEventOwnerRemoved, onRemoveOwner);

  const formId = useId();

  return {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    confirmExit,
    isFetchingOwnerById,
    ownerById,
    formId,
    updateOwner,
    onChangeFormValues,
    isUpdatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  };
}

const EditOwnerModalHookFormBase = (props: EditOwnerModalHookFormProps) => {
  const {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    confirmExit,
    isFetchingOwnerById,
    ownerById,
    formId,
    updateOwner,
    onChangeFormValues,
    isUpdatingOwner,
    isConfirmOpen,
    closeConfirmModal,
  } = useEditOwnerModalHookFormBaseState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Edit owner" />
      <Modal.Main>
        {isFetchingOwnerById && <div className="w-full">Loading...</div>}
        {!isFetchingOwnerById && ownerById && (
          <OwnerHookForm
            formId={formId}
            initialValues={ownerById}
            onSubmitHandler={updateOwner}
            onFormChangeHandler={onChangeFormValues}
            disabledFields={disabledFields}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isUpdatingOwner}>
          Save
        </AppSubmitButton>
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

export const EditOwnerModalHookForm = (props: EditOwnerModalHookFormProps) => {
  const { isModalOpen } = props;

  return (
    <Modal.Mount isOpen={isModalOpen}>
      <EditOwnerModalHookFormBase {...props} />
    </Modal.Mount>
  );
};
