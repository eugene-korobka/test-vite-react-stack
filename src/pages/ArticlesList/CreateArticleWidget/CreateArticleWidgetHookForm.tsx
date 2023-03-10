import { useCallback, useId } from 'react';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ArticleHookForm } from 'components/ArticleHookForm';
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

const useCreateArticleModalHookFormState = () => {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createArticleSelectors.selectIsCreateModalOpen);

  const { closeCreateModal, beforeCloseCreateModal } = useCreateArticleModalHandlers();

  const [createArticleTrigger, { isLoading: isArticleCreating }] = useCreateArticleMutation();

  async function createArticle(data) {
    try {
      await createArticleTrigger({ data });

      closeCreateModal();
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(createArticleActions.setHasFormChanges(hasChanges));
  }

  const formId = useId();

  return {
    isModalOpen,
    beforeCloseCreateModal,
    formId,
    createArticle,
    onChangeFormValues,
    isArticleCreating,
  };
};

const CreateArticleModalHookForm = () => {
  const { isModalOpen, beforeCloseCreateModal, formId, createArticle, onChangeFormValues, isArticleCreating } =
    useCreateArticleModalHookFormState();

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseCreateModal}>
      <Modal.Header title="Create article" />
      <Modal.Main>
        <ArticleHookForm formId={formId} onSubmitHandler={createArticle} onFormChangeHandler={onChangeFormValues} />
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseCreateModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isArticleCreating}>
          Create
        </AppSubmitButton>
        <CreateArticleConfirmModal />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

export const CreateArticleWidgetHookForm = () => {
  return (
    <>
      <CreateArticleModalButton />
      <CreateArticleModalHookForm />
    </>
  );
};
