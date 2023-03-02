import { dispatchAppEvent } from 'hooks/useAppEvents';
import { useConfirmModalState } from 'hooks/useModal';
import { useOwnerId } from 'hooks/useOwnerId';
import { useRemoveOwnerMutation } from 'sharedApi/owner.remove.api';
import { appEventOwnerRemoved } from 'sharedTypes/event.types';
import { OwnerTypeId } from 'sharedTypes/owner.types';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

type RemoveOwnerWithEventProps = {
  ownerId?: OwnerTypeId;
};

export const RemoveOwnerWithEvent = (props: RemoveOwnerWithEventProps) => {
  const { ownerId: propsOwnerId } = props;

  const ownerId = useOwnerId(propsOwnerId);

  const [removeOwnerTrigger, { isLoading: isRemovingOwner }] = useRemoveOwnerMutation();

  const isConfirmButtonDisabled = !ownerId || isRemovingOwner;

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const confirmRemove = () => {
    if (!ownerId) {
      return;
    }

    removeOwnerTrigger({ ownerId })
      .unwrap()
      .then(() => {
        dispatchAppEvent(appEventOwnerRemoved, { ownerId });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        closeConfirmModal();
      });
  };

  if (!ownerId) {
    return null;
  }

  return (
    <>
      <AppButton variant="danger" onClick={openConfirmModal}>
        Remove
      </AppButton>
      <Modal.ConfirmModal isOpen={isConfirmOpen}>
        <Modal.Header title="Confirm remove" />
        <Modal.Main>Are you sure you want to remove owner?</Modal.Main>
        <Modal.Footer>
          <button
            className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
            onClick={closeConfirmModal}
          >
            Cancel
          </button>
          <button
            className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
            disabled={isConfirmButtonDisabled}
            onClick={confirmRemove}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal.ConfirmModal>
    </>
  );
};
