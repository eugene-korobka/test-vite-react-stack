import { useModalState } from 'hooks/useModal';

import { AppButton } from 'components/AppButton';

import { CreateOwnerModalHookForm } from './CreateOwnerModalHookForm';

function useCreateOwnerWidgetHookFormState() {
  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}

export const CreateOwnerWidgetHookForm = () => {
  const { isModalOpen, openModal, closeModal } = useCreateOwnerWidgetHookFormState();

  return (
    <>
      <AppButton onClick={openModal}>New owner</AppButton>
      <CreateOwnerModalHookForm isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
    </>
  );
};
