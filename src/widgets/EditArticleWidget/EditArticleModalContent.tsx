import { useCallback } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useFetchArticleByIdQuery } from 'sharedApi/fetchArticleById.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { appEventArticleRemoved } from 'sharedTypes/event.types';
import { ArticleForm, useArticleFormOnSubmitHandler, useArticleFormRef } from 'src/experimental/ArticleForm';
import { RemoveArticleWithEvent } from 'widgets/RemoveArticle/RemoveArticleWithEvent';

import { AppButton } from 'components/AppButton';
import { Modal } from 'components/ModalComponents';

import { useAppDispatch } from 'store/hooks';

import { editArticleActions } from './store/editArticle.slice';
import { useUpdateArticleMutation } from './store/updateArticle.api';
import { EditArticleConfirmModal } from './EditArticleConfirmModal';
import { useEditArticleModalHandlers, useIsEditArticleModalOpen } from './hooks';

type EditArticleModalContentProps = {
  articleId: ArticleIdType;
};

function useEditArticleModalContentState(props: EditArticleModalContentProps) {
  const { articleId } = props;

  const dispatch = useAppDispatch();

  const isModalOpen = useIsEditArticleModalOpen(articleId);

  const { data: articleById, isFetching: isFetchingArticleById } = useFetchArticleByIdQuery(
    { articleId },
    { skip: !isModalOpen },
  );

  const { articleFormRef, submitArticleForm } = useArticleFormRef();

  function onChangeFormValues(hasChanges: boolean) {
    dispatch(editArticleActions.setHasFormChanges(hasChanges));
  }

  const { beforeCloseEditArticleModal, closeEditArticleModal } = useEditArticleModalHandlers(articleId);

  const [updateArticleTrigger, { isLoading: isArticleUpdating }] = useUpdateArticleMutation();

  async function updateArticle(data) {
    await updateArticleTrigger({ articleId, data });

    closeEditArticleModal();
  }

  const { onSubmitHandler } = useArticleFormOnSubmitHandler({
    mainCallback: updateArticle,
  });

  const onRemoveArticle = useCallback(() => {
    closeEditArticleModal();
  }, [closeEditArticleModal]);

  useSubscribeToAppEvent(appEventArticleRemoved, onRemoveArticle);

  return {
    articleId,
    articleById,
    isFetchingArticleById,
    isArticleUpdating,
    isModalOpen,
    articleFormRef,
    onChangeFormValues,
    onSubmitHandler,
    submitArticleForm,
    beforeCloseEditArticleModal,
  };
}

export const EditArticleModalContent = (props: EditArticleModalContentProps) => {
  const {
    articleId,
    articleById,
    isFetchingArticleById,
    isArticleUpdating,
    articleFormRef,
    onChangeFormValues,
    onSubmitHandler,
    submitArticleForm,
    beforeCloseEditArticleModal,
  } = useEditArticleModalContentState(props);

  return (
    <>
      <Modal.Header title="Edit article" />
      <Modal.Main>
        {isFetchingArticleById && <div className="w-full">Loading...</div>}
        {!isFetchingArticleById && articleById && (
          <ArticleForm
            ref={articleFormRef}
            initialValues={articleById}
            onSubmitHandler={onSubmitHandler}
            onChangeValuesHandler={onChangeFormValues}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseEditArticleModal}>Cancel</AppButton>
        <AppButton disabled={isArticleUpdating} onClick={submitArticleForm}>
          Save
        </AppButton>
        <RemoveArticleWithEvent articleId={articleId} />
        <EditArticleConfirmModal />
      </Modal.Footer>
    </>
  );
};
