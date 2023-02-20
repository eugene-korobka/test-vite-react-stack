import { Modal } from "components/ModalComponents";

import { ItemTypeId } from "./store/types";
import { EditItemModalContent } from "./EditItemModalContent";
import { useEditItemModalHandlers, useIsEditItemModalOpen } from "./hooks";

type EditItemModalProps = {
  itemId: ItemTypeId;
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


