import { useModalState } from 'hooks/useModal';
import type { OwnerIdType } from 'sharedTypes/owner.types';

import { AppButton } from 'components/AppButton';

import { EditOwnerModal } from './EditOwnerModal';

type EditOwnerWidgetProps = {
  ownerId: OwnerIdType;
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
