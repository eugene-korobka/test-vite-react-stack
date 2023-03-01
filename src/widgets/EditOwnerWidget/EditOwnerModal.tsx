import { useCallback, useState } from 'react';
import { useFetchOwnerByIdQuery } from 'sharedApi/owner.fetchById.api';
import { appEventOwnerRemoved } from 'sharedTypes/event.types';
import { emailInputName, OwnerTypeId } from 'sharedTypes/owner.types';
import { OwnerForm, useOwnerFormOnSubmitHandler, useOwnerFormRef } from 'src/experimental/OwnerForm';
import { useSubscribeToAppEvent } from 'src/hooks/useAppEvents';
import { useConfirmModalState } from 'src/hooks/useModal';

import { Modal } from 'components/ModalComponents';
import { RemoveOwnerWithEvent } from 'components/RemoveOwnerWithEvent';
import { SaveChangesConfirmModal } from 'components/SaveChangesConfirmModal';

import { useUpdateOwnerMutation } from './store/owner.update.api';

const disabledFields = [emailInputName];

type EditOwnerModalProps = {
  ownerId: OwnerTypeId;
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
        <button
          className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md"
          onClick={beforeCloseModal}
        >
          Cancel
        </button>
        <button
          className="mr-6 last:mr-0 p-2 border border-solid border-gray-400 rounded-md disabled:opacity-50"
          disabled={isUpdatingOwner}
          onClick={submitOwnerForm}
        >
          Save
        </button>
        <RemoveOwnerWithEvent ownerId={ownerId} />
        <SaveChangesConfirmModal isConfirmOpen={isConfirmOpen} onConfirm={closeModal} onCancel={closeConfirmModal} />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};
