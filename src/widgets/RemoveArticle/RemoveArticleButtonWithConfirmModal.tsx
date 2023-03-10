import React from 'react';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

type RemoveArticleButtonWithConfirmModalProps = {
  isOpen: boolean;
  onButtonClick?: React.MouseEventHandler;
  onConfirm?: React.MouseEventHandler;
  onCancel?: React.MouseEventHandler;
  isConfirmButtonDisabled?: boolean;
};

export const RemoveArticleButtonWithConfirmModal = (props: RemoveArticleButtonWithConfirmModalProps) => {
  const { isOpen, onButtonClick, onConfirm, onCancel, isConfirmButtonDisabled } = props;

  return (
    <>
      <AppButton variant="danger" onClick={onButtonClick}>
        Remove
      </AppButton>
      <Modal.ConfirmModal isOpen={isOpen}>
        <Modal.Header title="Confirm remove" />
        <Modal.Main>Are you sure you want to remove article?</Modal.Main>
        <Modal.Footer>
          <AppButton onClick={onCancel}>Cancel</AppButton>
          <AppButton disabled={isConfirmButtonDisabled} onClick={onConfirm}>
            Confirm
          </AppButton>
        </Modal.Footer>
      </Modal.ConfirmModal>
    </>
  );
};
