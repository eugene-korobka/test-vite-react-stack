import { useCallback, useState } from "react";

export function useConfirmModalState() {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const openConfirmModal = useCallback(() => {
    setConfirmOpen(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmOpen(false);
  }, []);

  return {
    isConfirmOpen,
    openConfirmModal,
    closeConfirmModal,
  };
};

export function useModalState() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
