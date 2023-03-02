import { useModalState } from "hooks/useModal";

import { AppButton } from "components/AppButton";

import { CreateOwnerModal } from "./CreateOwnerModal";

function useCreateOwnerWidgetState() {
  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export const CreateOwnerWidget = () => {
  const { isModalOpen, openModal, closeModal } = useCreateOwnerWidgetState();

  return (
    <>
      <AppButton onClick={openModal}>New owner</AppButton>
      <CreateOwnerModal isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
    </>
  );
};
