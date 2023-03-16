import { useCallback } from 'react';
import { useConfirmModalState, useModalState } from 'hooks/useModal';
import { useUpdateArticleOwnersListMutation } from 'sharedApi/updateArticleOwnersList.api';
import type { ArticleIdType } from 'sharedTypes/article.types';

import { AppButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';
import { OwnersCheckableList, useAvailableOwnersList } from 'components/OwnersCheckableList';

type EditArticleOwnersModalPropsType = {
  articleId: ArticleIdType;
  isModalOpen: boolean;
  closeModal: () => void;
};

function useEditArticleOwnersModalState(props: EditArticleOwnersModalPropsType) {
  const { articleId, isModalOpen, closeModal } = props;

  const { isFetchingOwners, noOwners, hasOwners, availableOwners, checkedOwnerIds, onOwnerClick, hasOwnersChanges } =
    useAvailableOwnersList({ articleId, skipQuery: !isModalOpen });

  const [updateArticleOwnersListTrigger] = useUpdateArticleOwnersListMutation();

  const updateArticleOwners = useCallback(async () => {
    try {
      if (hasOwnersChanges) {
        await updateArticleOwnersListTrigger({ articleId, ownerIds: checkedOwnerIds });
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }, [articleId, hasOwnersChanges, checkedOwnerIds, updateArticleOwnersListTrigger, closeModal]);

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    if (hasOwnersChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [hasOwnersChanges, openConfirmModal, closeModal]);

  const confirmExit = useCallback(() => {
    closeConfirmModal();
    closeModal();
  }, [closeConfirmModal, closeModal]);

  return {
    isModalOpen,
    beforeCloseModal,
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    onOwnerClick,
    updateArticleOwners,
    isConfirmOpen,
    closeConfirmModal,
    confirmExit,
  };
}

const EditArticleOwnersModal = (props: EditArticleOwnersModalPropsType) => {
  const {
    isModalOpen,
    beforeCloseModal,
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    onOwnerClick,
    updateArticleOwners,
    isConfirmOpen,
    closeConfirmModal,
    confirmExit,
  } = useEditArticleOwnersModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Edit article owners" />
      <Modal.Main>
        <OwnersCheckableList
          isFetchingOwners={isFetchingOwners}
          noOwners={noOwners}
          hasOwners={hasOwners}
          ownersList={availableOwners}
          checkedOwnerIds={checkedOwnerIds}
          onOwnerClick={onOwnerClick}
        />
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppButton onClick={updateArticleOwners}>Save</AppButton>
        <ExitWithChangesConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={confirmExit}
          onCancel={closeConfirmModal}
        />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

type EditArticleOwnersWidgetPropsType = {
  articleId: ArticleIdType;
};

function useEditArticleOwnersWidgetState(props: EditArticleOwnersWidgetPropsType) {
  const { articleId } = props;

  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    articleId,
    isModalOpen,
    openModal,
    closeModal,
  };
}

export const EditArticleOwnersWidget = (props: EditArticleOwnersWidgetPropsType) => {
  const { articleId, isModalOpen, openModal, closeModal } = useEditArticleOwnersWidgetState(props);

  return (
    <>
      <AppButton onClick={openModal}>Edit</AppButton>
      <EditArticleOwnersModal articleId={articleId} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
