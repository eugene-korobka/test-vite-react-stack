import type { ItemIdType } from 'sharedTypes/item.types';

import { Modal } from 'components/ModalComponents';

import { EditItemModalContent } from './EditItemModalContent';
import { useEditItemModalHandlers, useIsEditItemModalOpen } from './hooks';

type EditItemModalProps = {
  itemId: ItemIdType;
};

function useEditItemModalState(props: EditItemModalProps) {
  const { itemId } = props;

  const isModalOpen = useIsEditItemModalOpen(itemId);

  const { beforeCloseEditItemModal } = useEditItemModalHandlers(itemId);

  return {
    itemId,
    isModalOpen,
    beforeCloseEditItemModal,
  };
}

export const EditItemModal = (props: EditItemModalProps) => {
  const { itemId, isModalOpen, beforeCloseEditItemModal } = useEditItemModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseEditItemModal}>
      <EditItemModalContent itemId={itemId} />
    </Modal.BaseModal>
  );
};
