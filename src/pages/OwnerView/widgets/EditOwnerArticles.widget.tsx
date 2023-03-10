import { useCallback, useEffect, useState } from 'react';
import { useConfirmModalState, useModalState } from 'hooks/useModal';
import { useFetchArticlesForOwnerQuery } from 'sharedApi/fetchArticlesForOwner.api';
import { useUpdateArticlesOwnerMutation } from 'sharedApi/updateArticlesOwner.api';
import { ArticleType } from 'sharedTypes/article.types';
import { OwnerIdType } from 'sharedTypes/owner.types';

import { AppButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';

function mapArticlesToOwnerRecord(articles?: ArticleType[]) {
  if (!articles?.length) {
    return {};
  }

  return articles.reduce((acc, article) => {
    acc[article._id] = article.ownerId;

    return acc;
  }, {});
}

const emptyArticles: ArticleType[] = [];

type EditOwnerArticlesModalPropsType = {
  ownerId: OwnerIdType;
  isModalOpen: boolean;
  closeModal: () => void;
};

function useEditOwnerArticlesModalState(props: EditOwnerArticlesModalPropsType) {
  const { ownerId, isModalOpen, closeModal } = props;

  const { data: initialArticles = emptyArticles, isFetching: isFetchingArticles } = useFetchArticlesForOwnerQuery(
    { ownerId },
    { skip: !isModalOpen },
  );

  const noArticles = !isFetchingArticles && !initialArticles?.length;
  const hasArticles = !isFetchingArticles && !!initialArticles?.length;

  const [updatedArticles, setUpdatedArticles] = useState(initialArticles);

  useEffect(() => {
    setUpdatedArticles(initialArticles);
  }, [initialArticles]);

  const getChangedArticles = useCallback(() => {
    const articlesRecord = mapArticlesToOwnerRecord(initialArticles);

    const diff = updatedArticles.filter((article) => {
      return article.ownerId !== articlesRecord[article._id];
    });

    return diff;
  }, [updatedArticles, initialArticles]);

  const onArticleClick = useCallback(
    (event) => {
      const { value, checked } = event.target;

      setUpdatedArticles((prev) => {
        const newList = prev.map((article) =>
          article._id === value ? { ...article, ownerId: checked ? ownerId : '' } : article,
        );

        return newList;
      });
    },
    [ownerId],
  );

  const [updateArticlesOwnerTrigger] = useUpdateArticlesOwnerMutation();

  const updateArticlesOwner = useCallback(async () => {
    const changedArticles = getChangedArticles();

    try {
      if (changedArticles.length) {
        await updateArticlesOwnerTrigger(changedArticles);
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }, [getChangedArticles, updateArticlesOwnerTrigger, closeModal]);

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    const hasChanges = !!getChangedArticles()?.length;

    if (hasChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [getChangedArticles, openConfirmModal, closeModal]);

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
    updatedArticles,
    onArticleClick,
    updateArticlesOwner,
    isConfirmOpen,
    confirmExit,
    closeConfirmModal,
  };
}

const EditOwnerArticlesModal = (props: EditOwnerArticlesModalPropsType) => {
  const {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    isFetchingArticles,
    noArticles,
    hasArticles,
    updatedArticles,
    onArticleClick,
    updateArticlesOwner,
    isConfirmOpen,
    confirmExit,
    closeConfirmModal,
  } = useEditOwnerArticlesModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Edit owner articles" />
      <Modal.Main>
        {isFetchingArticles && <div>Loading...</div>}
        {noArticles && <div>No articles</div>}
        {hasArticles && (
          <ul>
            {updatedArticles?.map((article) => (
              <li key={article._id} className="mb-2 flex items-center">
                <input
                  className="w-4 h-4 mr-2 cursor-pointer"
                  id={`owner-article-${article._id}`}
                  type="checkbox"
                  checked={article.ownerId === ownerId}
                  value={article._id}
                  onChange={onArticleClick}
                />
                <label className="cursor-pointer" htmlFor={`owner-article-${article._id}`}>
                  {article.title}
                </label>
              </li>
            ))}
          </ul>
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
