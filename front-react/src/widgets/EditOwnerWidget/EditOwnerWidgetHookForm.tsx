import { useModalState } from 'hooks/useModal';
import type { OwnerIdType } from 'sharedTypes/owner.types';

import { AppButton } from 'components/AppButton';

import { EditOwnerModalHookForm } from './EditOwnerModalHookForm';

type EditOwnerWidgetHookFormProps = {
  ownerId: OwnerIdType;
};

function useEditOwnerWidgetHookFormState(props: EditOwnerWidgetHookFormProps) {
  const { ownerId } = props;

  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    ownerId,
    isModalOpen,
    openModal,
    closeModal,
  };
}

export const EditOwnerWidgetHookForm = (props: EditOwnerWidgetHookFormProps) => {
  const { ownerId, isModalOpen, openModal, closeModal } = useEditOwnerWidgetHookFormState(props);

  return (
    <>
      <AppButton onClick={openModal}>Edit</AppButton>
      <EditOwnerModalHookForm ownerId={ownerId} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
