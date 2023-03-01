import { Modal } from "./ModalComponents";

type SaveChangesConfirmModalProps = {
  isConfirmOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function useSaveChangesConfirmModalState(props: SaveChangesConfirmModalProps) {
  const { isConfirmOpen, onConfirm, onCancel } = props;

  return {
    isConfirmOpen,
    onConfirm,
    onCancel,
  };
}

export const SaveChangesConfirmModal = (props: SaveChangesConfirmModalProps) => {
  const {
    isConfirmOpen,
    onConfirm,
    onCancel,
 } = useSaveChangesConfirmModalState(props);

  return (
    <Modal.ConfirmModal isOpen={isConfirmOpen}>
      <Modal.Header title="Confirm exit" />
      <Modal.Main>
        Your changes are not saved.
        <br />
        Are you sure you want to exit?
      </Modal.Main>
      <Modal.Footer>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal.ConfirmModal>
  );
};
