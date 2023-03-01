import { ItemTypeId } from 'sharedTypes/item.types';
import { useModalState } from 'src/hooks/useModal';

import { AppButton } from 'components/AppButton';

import { EditOwnerModal } from './EditOwnerModal';

type EditOwnerWidgetProps = {
  ownerId: ItemTypeId;
};

function useEditOwnerWidgetState(props: EditOwnerWidgetProps) {
  const { ownerId } = props;

  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    ownerId,
    isModalOpen,
    openModal,
    closeModal,
  };
}

export const EditOwnerWidget = (props: EditOwnerWidgetProps) => {
  const { ownerId, isModalOpen, openModal, closeModal } = useEditOwnerWidgetState(props);

  return (
    <>
      <AppButton onClick={openModal}>Edit</AppButton>
      <EditOwnerModal ownerId={ownerId} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
