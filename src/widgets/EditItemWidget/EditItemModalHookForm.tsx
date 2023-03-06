import type { ItemIdType } from 'sharedTypes/item.types';

import { Modal } from 'components/ModalComponents';

import { EditItemModalContentHookForm } from './EditItemModalContentHookForm';
import { useEditItemModalHandlers, useIsEditItemModalOpen } from './hooks';

type EditItemModalHookFormProps = {
  itemId: ItemIdType;
};

function useEditItemModalHookFormState(props: EditItemModalHookFormProps) {
  const { itemId } = props;

  const isModalOpen = useIsEditItemModalOpen(itemId);

  const { beforeCloseEditItemModal } = useEditItemModalHandlers(itemId);

  return {
    itemId,
    isModalOpen,
    beforeCloseEditItemModal,
  };
}

export const EditItemModalHookForm = (props: EditItemModalHookFormProps) => {
  const { itemId, isModalOpen, beforeCloseEditItemModal } = useEditItemModalHookFormState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseEditItemModal}>
      <EditItemModalContentHookForm itemId={itemId} />
    </Modal.BaseModal>
  );
};
