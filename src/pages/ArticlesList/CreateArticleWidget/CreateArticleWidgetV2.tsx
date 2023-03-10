import { useCallback } from 'react';
import { ArticleForm, useArticleFormOnSubmitHandler, useArticleFormRef } from 'src/experimental/ArticleForm';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useCreateArticleMutation } from './store/createArticle.api';
import { createArticleSelectors } from './store/createArticle.selector';
import { createArticleActions } from './store/createArticle.slice';
import { CreateArticleConfirmModal } from './CreateArticleConfirmModal';

function useCreateArticleModalHandlers() {
  const dispatch = useAppDispatch();

  const openCreateModal = useCallback(() => {
    dispatch(createArticleActions.openCreateModal());
  }, [dispatch]);

  const closeCreateModal = useCallback(() => {
    dispatch(createArticleActions.closeCreateModal());
  }, [dispatch]);

  const beforeCloseCreateModal = useCallback(() => {
    dispatch(createArticleActions.beforeCloseCreateModal());
  }, [dispatch]);

  return {
    openCreateModal,
    closeCreateModal,
    beforeCloseCreateModal,
  };
}

const CreateArticleModalButton = () => {
  const { openCreateModal } = useCreateArticleModalHandlers();

  return <AppButton onClick={openCreateModal}>New article</AppButton>;
};

const useCreateArticleModalState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createArticleSelectors.selectIsCreateModalOpen);

  const { closeCreateModal, beforeCloseCreateModal } = useCreateArticleModalHandlers();

  const { articleFormRef, submitArticleForm } = useArticleFormRef();

  const [createArticleTrigger, { isLoading: isArticleCreating }] = useCreateArticleMutation();

  async function createNewArticle(data) {
    await createArticleTrigger({ data });

    closeCreateModal();
  }

  const { onSubmitHandler } = useArticleFormOnSubmitHandler({
    mainCallback: createNewArticle,
  });

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(createArticleActions.setHasFormChanges(hasChanges));
  }

  return {
    isModalOpen,
    articleFormRef,
    submitArticleForm,
    beforeCloseCreateModal,
    onSubmitHandler,
    onChangeFormValues,
    isArticleCreating,
  };
};

const CreateArticleModal = () => {
  const {
    isModalOpen,
    articleFormRef,
    submitArticleForm,
    beforeCloseCreateModal,
    onSubmitHandler,
    onChangeFormValues,
    isArticleCreating,
  } = useCreateArticleModalState();

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseCreateModal}>
      <Modal.Header title="Create article" />
      <Modal.Main>
        <ArticleForm
          ref={articleFormRef}
          onSubmitHandler={onSubmitHandler}
          onChangeValuesHandler={onChangeFormValues}
        />
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseCreateModal}>Cancel</AppButton>
        <AppButton disabled={isArticleCreating} onClick={submitArticleForm}>
          Create
        </AppButton>
        <CreateArticleConfirmModal />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

export const CreateArticleWidgetV2 = () => {
  return (
    <>
      <CreateArticleModalButton />
      <CreateArticleModal />
    </>
  );
};
