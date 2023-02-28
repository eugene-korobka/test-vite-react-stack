import React from "react";

import { AppButton } from "./AppButton";
import { Modal } from "./ModalComponents";

type RemoveItemButtonWithConfirmModalProps = {
  isOpen: boolean;
  onButtonClick?: React.MouseEventHandler;
  onConfirm?: React.MouseEventHandler;
  onCancel?: React.MouseEventHandler;
  isConfirmButtonDisabled?: boolean;
};

export const RemoveItemButtonWithConfirmModal = (props: RemoveItemButtonWithConfirmModalProps) => {
  const {
    isOpen,
    onButtonClick,
    onConfirm,
    onCancel,
    isConfirmButtonDisabled,
} = props;

  return (
    <>
      <AppButton
        variant="danger"
        onClick={onButtonClick}
      >
        Remove
      </AppButton>
      <Modal.ConfirmModal isOpen={isOpen}>
        <Modal.Header title="Confirm remove" />
        <Modal.Main>Are you sure you want to remove item?</Modal.Main>
        <Modal.Footer>
          <button
            className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="p-2 shrink-0 mr-4 last:mr-0 border border-solid border-gray-400 rounded-md"
            disabled={isConfirmButtonDisabled}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal.ConfirmModal>
    </>
  );
};
