import { useCallback } from 'react';
import { useConfirmModalState, useModalState } from 'hooks/useModal';
import { useUpdateOwnerArticlesListMutation } from 'sharedApi/updateOwnerArticlesList.api';
import { OwnerIdType } from 'sharedTypes/owner.types';

import { AppButton } from 'components/AppButton';
import { ArticlesCheckableList, useAvailableArticlesList } from 'components/ArticlesCheckableList';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';

type EditOwnerArticlesModalPropsType = {
  ownerId: OwnerIdType;
  isModalOpen: boolean;
  closeModal: () => void;
};

function useEditOwnerArticlesModalBaseState(props: EditOwnerArticlesModalPropsType) {
  const { ownerId, isModalOpen, closeModal } = props;

  const {
    isFetchingArticles,
    noArticles,
    hasArticles,
    availableArticles,
    checkedArticleIds,
    onArticleClick,
    hasArticlesChanges,
  } = useAvailableArticlesList({ ownerId, skipQuery: !isModalOpen });

  const [updateOwnerArticlesListTrigger] = useUpdateOwnerArticlesListMutation();

  const updateArticlesOwner = useCallback(async () => {
    try {
      if (hasArticlesChanges) {
        await updateOwnerArticlesListTrigger({ ownerId, articleIds: checkedArticleIds });
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }, [ownerId, hasArticlesChanges, checkedArticleIds, updateOwnerArticlesListTrigger, closeModal]);

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    if (hasArticlesChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [hasArticlesChanges, openConfirmModal, closeModal]);

  const confirmExit = useCallback(() => {
    closeConfirmModal();
    closeModal();
  }, [closeConfirmModal, closeModal]);

  return {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    isFetchingArticles,
    noArticles,
    hasArticles,
    availableArticles,
    checkedArticleIds,
    onArticleClick,
    updateArticlesOwner,
    isConfirmOpen,
    confirmExit,
    closeConfirmModal,
  };
}

const EditOwnerArticlesModalBase = (props: EditOwnerArticlesModalPropsType) => {
  const {
    isModalOpen,
    beforeCloseModal,
    isFetchingArticles,
    noArticles,
    hasArticles,
    availableArticles,
    checkedArticleIds,
    onArticleClick,
    updateArticlesOwner,
    isConfirmOpen,
    confirmExit,
    closeConfirmModal,
  } = useEditOwnerArticlesModalBaseState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Edit owner articles" />
      <Modal.Main>
        {isFetchingArticles && <div>Loading...</div>}
        {noArticles && <div>No articles</div>}
        {hasArticles && (
          <ArticlesCheckableList
            isFetchingArticles={isFetchingArticles}
            noArticles={noArticles}
            hasArticles={hasArticles}
            articlesList={availableArticles}
            checkedArticleIds={checkedArticleIds}
            onArticleClick={onArticleClick}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppButton onClick={updateArticlesOwner}>Save</AppButton>
        <ExitWithChangesConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={confirmExit}
          onCancel={closeConfirmModal}
        />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

const EditOwnerArticlesModal = (props: EditOwnerArticlesModalPropsType) => {
  const { isModalOpen } = props;

  return (
    <Modal.Mount isOpen={isModalOpen}>
      <EditOwnerArticlesModalBase {...props} />
    </Modal.Mount>
  );
};

type EditOwnerArticlesWidgetPropsType = {
  ownerId: OwnerIdType;
};

function useEditOwnerArticlesWidgetState(props: EditOwnerArticlesWidgetPropsType) {
  const { ownerId } = props;

  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    ownerId,
    isModalOpen,
    openModal,
    closeModal,
  };
}

export const EditOwnerArticlesWidget = (props: EditOwnerArticlesWidgetPropsType) => {
  const { ownerId, isModalOpen, openModal, closeModal } = useEditOwnerArticlesWidgetState(props);

  return (
    <>
      <AppButton onClick={openModal}>Edit</AppButton>
      <EditOwnerArticlesModal ownerId={ownerId} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
