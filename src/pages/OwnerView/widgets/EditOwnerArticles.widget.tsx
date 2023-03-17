import { useCallback, useEffect, useState } from 'react';
import { useConfirmModalState, useModalState } from 'hooks/useModal';
import { useFetchArticlesAvailableQuery } from 'sharedApi/fetchArticlesAvailable.api';
import { useUpdateOwnerArticlesListMutation } from 'sharedApi/updateOwnerArticlesList.api';
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
    acc[article._id] = article.belongsTo;

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

  const { data: initialArticles = emptyArticles, isFetching: isFetchingArticles } = useFetchArticlesAvailableQuery(
    { ownerId },
    { skip: !isModalOpen },
  );

  const noArticles = !isFetchingArticles && !initialArticles?.length;
  const hasArticles = !isFetchingArticles && !!initialArticles?.length;

  const [updatedArticles, setUpdatedArticles] = useState(initialArticles);

  useEffect(() => {
    setUpdatedArticles(initialArticles);
  }, [initialArticles]);

  const getHasChangedArticles = useCallback(() => {
    const articlesRecord = mapArticlesToOwnerRecord(initialArticles);

    const diff = updatedArticles.filter((article) => {
      return article.belongsTo !== articlesRecord[article._id];
    });

    return !!diff.length;
  }, [updatedArticles, initialArticles]);

  const onArticleClick = useCallback((event) => {
    const { value, checked } = event.target;

    setUpdatedArticles((prev) => {
      const newList = prev.map((article) => (article._id === value ? { ...article, belongsTo: checked } : article));

      return newList;
    });
  }, []);

  const [updateOwnerArticlesListTrigger] = useUpdateOwnerArticlesListMutation();

  const updateArticlesOwner = useCallback(async () => {
    const hasChanges = getHasChangedArticles();

    try {
      if (hasChanges) {
        const articleIds = updatedArticles.reduce((acc: string[], article) => {
          if (article.belongsTo) {
            acc.push(article._id);
          }

          return acc;
        }, []);

        await updateOwnerArticlesListTrigger({ ownerId, articleIds });
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }, [ownerId, getHasChangedArticles, updatedArticles, updateOwnerArticlesListTrigger, closeModal]);

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    const hasChanges = getHasChangedArticles();

    if (hasChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [getHasChangedArticles, openConfirmModal, closeModal]);

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
                  checked={article.belongsTo}
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
