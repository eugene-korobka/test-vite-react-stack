import { AppButton } from './AppButton';
import { Modal } from './ModalComponents';

type ExitWithChangesConfirmModalProps = {
  isConfirmOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function useExitWithChangesConfirmModalState(props: ExitWithChangesConfirmModalProps) {
  const { isConfirmOpen, onConfirm, onCancel } = props;

  return {
    isConfirmOpen,
    onConfirm,
    onCancel,
  };
}

export const ExitWithChangesConfirmModal = (props: ExitWithChangesConfirmModalProps) => {
  const { isConfirmOpen, onConfirm, onCancel } = useExitWithChangesConfirmModalState(props);

  return (
    <Modal.ConfirmModal isOpen={isConfirmOpen}>
      <Modal.Header title="Confirm exit" />
      <Modal.Main>
        Your changes are not saved.
        <br />
        Are you sure you want to exit?
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={onCancel}>Cancel</AppButton>
        <AppButton onClick={onConfirm}>Confirm</AppButton>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
};
