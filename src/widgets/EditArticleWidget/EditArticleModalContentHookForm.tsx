import { useCallback, useEffect, useId } from 'react';
import { useSubscribeToAppEvent } from 'hooks/useAppEvents';
import { useFetchArticleByIdQuery } from 'sharedApi/fetchArticleById.api';
import type { ArticleIdType } from 'sharedTypes/article.types';
import { appEventArticleRemoved } from 'sharedTypes/event.types';
import { RemoveArticleWithEvent } from 'widgets/RemoveArticle/RemoveArticleWithEvent';

import { AppButton, AppSubmitButton } from 'components/AppButton';
import { ArticleHookForm } from 'components/ArticleHookForm';
import { Modal } from 'components/ModalComponents';
import { OwnersCheckableList, useAvailableOwnersList } from 'components/OwnersCheckableList';

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

  const hasArticleById = !isFetchingArticleById && !!articleById;

  const onChangeFormValues = useCallback(
    (hasChanges: boolean) => {
      dispatch(editArticleActions.setHasFormChanges(hasChanges));
    },
    [dispatch],
  );

  const { beforeCloseEditArticleModal, closeEditArticleModal } = useEditArticleModalHandlers(articleId);

  const { isFetchingOwners, noOwners, hasOwners, availableOwners, checkedOwnerIds, onOwnerClick, hasOwnersChanges } =
    useAvailableOwnersList({ articleId, skipQuery: !isModalOpen });

  useEffect(() => {
    onChangeFormValues(hasOwnersChanges);
  }, [hasOwnersChanges, onChangeFormValues]);

  const [updateArticleTrigger, { isLoading: isUpdatingArticle }] = useUpdateArticleMutation();

  async function updateArticle(data) {
    try {
      await updateArticleTrigger({
        articleId,
        data: {
          ...data,
          ...(hasOwnersChanges ? { ownerIds: checkedOwnerIds } : {}),
        },
      });

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
    hasArticleById,
    isUpdatingArticle,
    isModalOpen,
    formId,
    onChangeFormValues,
    updateArticle,
    beforeCloseEditArticleModal,
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    onOwnerClick,
  };
}

export const EditArticleModalContentHookForm = (props: EditArticleModalContentHookFormProps) => {
  const {
    articleId,
    articleById,
    isFetchingArticleById,
    hasArticleById,
    isUpdatingArticle,
    formId,
    onChangeFormValues,
    updateArticle,
    beforeCloseEditArticleModal,
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    onOwnerClick,
  } = useEditArticleModalContentHookFormState(props);

  return (
    <>
      <Modal.Header title="Edit article" />
      <Modal.Main>
        {isFetchingArticleById && <div className="w-full">Loading...</div>}
        {hasArticleById && (
          <ArticleHookForm
            formId={formId}
            initialValues={articleById}
            onSubmitHandler={updateArticle}
            onFormChangeHandler={onChangeFormValues}
          />
        )}
        {hasArticleById && (
          <OwnersCheckableList
            label="Owners"
            isFetchingOwners={isFetchingOwners}
            noOwners={noOwners}
            hasOwners={hasOwners}
            ownersList={availableOwners}
            checkedOwnerIds={checkedOwnerIds}
            onOwnerClick={onOwnerClick}
          />
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseEditArticleModal}>Cancel</AppButton>
        <AppSubmitButton form={formId} disabled={isUpdatingArticle}>
          Save
        </AppSubmitButton>
        <RemoveArticleWithEvent articleId={articleId} />
        <EditArticleConfirmModal />
      </Modal.Footer>
    </>
  );
};
