import { useCallback, useId } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useFetchArticleByIdQuery } from 'sharedApi/fetchArticleById.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { appEventArticleRemoved } from 'sharedTypes/event.types';
import { RemoveArticleWithEvent } from 'widgets/RemoveArticle/RemoveArticleWithEvent';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ArticleHookForm } from 'components/ArticleHookForm';
import { Modal } from 'components/ModalComponents';

import { useAppDispatch } from 'store/hooks';

import { editArticleActions } from './store/editArticle.slice';
import { useUpdateArticleMutation } from './store/updateArticle.api';
import { EditArticleConfirmModal } from './EditArticleConfirmModal';
import { useEditArticleModalHandlers, useIsEditArticleModalOpen } from './hooks';

type EditArticleModalContentHookFormProps = {
  articleId: ArticleIdType;
};

function useEditArticleModalContentHookFormState(props: EditArticleModalContentHookFormProps) {
  const { articleId } = props;

  const dispatch = useAppDispatch();

  const isModalOpen = useIsEditArticleModalOpen(articleId);

  const { data: articleById, isFetching: isFetchingArticleById } = useFetchArticleByIdQuery(
    { articleId },
    { skip: !isModalOpen },
  );

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(editArticleActions.setHasFormChanges(hasChanges));
  }

  const { beforeCloseEditArticleModal, closeEditArticleModal } = useEditArticleModalHandlers(articleId);

  const [updateArticleTrigger, { isLoading: isArticleUpdating }] = useUpdateArticleMutation();

  async function updateArticle(data) {
    try {
      await updateArticleTrigger({ articleId, data });

      closeEditArticleModal();
    } catch (error) {
      console.error(error);
    }
  }

  const onRemoveArticle = useCallback(() => {
    closeEditArticleModal();
  }, [closeEditArticleModal]);

  useSubscribeToAppEvent(appEventArticleRemoved, onRemoveArticle);

  const formId = useId();

  return {
    articleId,
    articleById,
    isFetchingArticleById,
    isArticleUpdating,
    isModalOpen,
    formId,
    onChangeFormValues,
    updateArticle,
    beforeCloseEditArticleModal,
  };
}

export const EditArticleModalContentHookForm = (props: EditArticleModalContentHookFormProps) => {
  const {
    articleId,
    articleById,
    isFetchingArticleById,
    isArticleUpdating,
    formId,
    onChangeFormValues,
    updateArticle,
    beforeCloseEditArticleModal,
  } = useEditArticleModalContentHookFormState(props);

  return (
    <>
      <Modal.Header title="Edit article" />
      <Modal.Main>
        {isFetchingArticleById && <div className="w-full">Loading...</div>}
        {!isFetchingArticleById && articleById && (
          <ArticleHookForm
            formId={formId}
            initialValues={articleById}
            onSubmitHandler={updateArticle}
            onFormChangeHandler={onChangeFormValues}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseEditArticleModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isArticleUpdating}>
          Save
        </AppSubmitButton>
        <RemoveArticleWithEvent articleId={articleId} />
        <EditArticleConfirmModal />
      </Modal.Footer>
    </>
  );
};
