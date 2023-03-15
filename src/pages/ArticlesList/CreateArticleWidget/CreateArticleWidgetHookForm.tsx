import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useFetchOwnersAvailableQuery } from 'sharedApi/fetchOwnersAvailable.api';
import { EntityIdType } from 'sharedTypes/common.types';
import { OwnerType } from 'sharedTypes/owner.types';
import { areTwoIdsArraysDifferent, mapEntitiesToIdsByBelongsTo } from 'src/utils/entitiesHelpers';
import { getOwnerFullName } from 'src/utils/getOwnerFullName';

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

const emptyOwners: OwnerType[] = [];

function useAvailableOwners({ isModalOpen }) {
  const { data: availableOwners = emptyOwners, isFetching: isFetchingOwners } = useFetchOwnersAvailableQuery(
    {},
    { skip: !isModalOpen },
  );

  const noOwners = !isFetchingOwners && !availableOwners?.length;
  const hasOwners = !isFetchingOwners && !!availableOwners?.length;

  const initialOwnerIds = useMemo(() => {
    return mapEntitiesToIdsByBelongsTo(availableOwners);
  }, [availableOwners]);

  const [checkedOwnerIds, setCheckedOwnerIds] = useState<EntityIdType[]>([]);

  const hasOwnersChanges = useMemo(() => {
    return areTwoIdsArraysDifferent(initialOwnerIds, checkedOwnerIds);
  }, [initialOwnerIds, checkedOwnerIds]);

  useEffect(() => {
    setCheckedOwnerIds(initialOwnerIds);
  }, [initialOwnerIds]);

  const onArticleClick = useCallback((event) => {
    const { value, checked } = event.target;

    setCheckedOwnerIds((prev) => {
      const newList = checked ? [...new Set([...prev, value])] : prev.filter((id) => id !== value);

      return newList;
    });
  }, []);

  return {
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    hasOwnersChanges,
    onArticleClick,
  };
}

function useCreateArticleModalHookFormState() {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(createArticleSelectors.selectIsCreateModalOpen);

  const { closeCreateModal, beforeCloseCreateModal } = useCreateArticleModalHandlers();

  const { isFetchingOwners, noOwners, hasOwners, availableOwners, checkedOwnerIds, onArticleClick } =
    useAvailableOwners({ isModalOpen });

  const [createArticleTrigger, { isLoading: isArticleCreating }] = useCreateArticleMutation();

  async function createArticle(data) {
    try {
      await createArticleTrigger({
        data: {
          ...data,
          ownerIds: checkedOwnerIds,
        },
      });

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
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    onArticleClick,
  };
}

const CreateArticleModalHookForm = () => {
  const {
    isModalOpen,
    beforeCloseCreateModal,
    formId,
    createArticle,
    onChangeFormValues,
    isArticleCreating,
    isFetchingOwners,
    noOwners,
    hasOwners,
    availableOwners,
    checkedOwnerIds,
    onArticleClick,
  } = useCreateArticleModalHookFormState();

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseCreateModal}>
      <Modal.Header title="Create article" />
      <Modal.Main>
        <ArticleHookForm formId={formId} onSubmitHandler={createArticle} onFormChangeHandler={onChangeFormValues} />
        <div>
          <div className="mb-2">Owners</div>
          {isFetchingOwners && <div>Loading...</div>}
          {noOwners && <div>No articles</div>}
          {hasOwners && (
            <ul>
              {availableOwners?.map((owner) => (
                <li key={owner._id} className="mb-2 flex items-center">
                  <input
                    className="w-4 h-4 mr-2 cursor-pointer"
                    id={`article-owner-${owner._id}`}
                    type="checkbox"
                    checked={checkedOwnerIds.includes(owner._id)}
                    value={owner._id}
                    onChange={onArticleClick}
                  />
                  <label className="cursor-pointer" htmlFor={`article-owner-${owner._id}`}>
                    {getOwnerFullName(owner)}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
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
