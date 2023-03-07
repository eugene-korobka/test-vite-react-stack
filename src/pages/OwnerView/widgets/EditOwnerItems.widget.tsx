import { useCallback, useEffect, useMemo, useState } from 'react';
import { useConfirmModalState, useModalState } from 'hooks/useModal';
import { useUpdateItemsOwnerMutation } from 'sharedApi/items.updateOwner.api';
import { ItemType } from 'sharedTypes/item.types';
import { OwnerIdType } from 'sharedTypes/owner.types';

import { useFetchItemsQuery } from 'pages/ItemsList/FilteredItemsListWidget/store/items.fetch.api';

import { AppButton } from 'components/AppButton';
import { ExitWithChangesConfirmModal } from 'components/ExitWithChangesConfirmModal';
import { Modal } from 'components/ModalComponents';

function mapItemsToOwnerRecord(items?: ItemType[]) {
  if (!items?.length) {
    return {};
  }

  return items.reduce((acc, item) => {
    acc[item.id] = item.ownerId;

    return acc;
  }, {});
}

const emptyItems: ItemType[] = [];

type EditOwnerItemsModalPropsType = {
  ownerId: OwnerIdType;
  isModalOpen: boolean;
  closeModal: () => void;
};

function useEditOwnerItemsModalState(props: EditOwnerItemsModalPropsType) {
  const { ownerId, isModalOpen, closeModal } = props;

  const { data: allItems, isFetching: isFetchingItems } = useFetchItemsQuery(undefined, { skip: !isModalOpen });

  const initialItems = useMemo(() => {
    if (!allItems?.length) {
      return emptyItems;
    }

    return allItems.filter((item) => item.ownerId === null || item.ownerId === ownerId);
  }, [allItems, ownerId]);

  const noItems = !isFetchingItems && !initialItems?.length;
  const hasItems = !isFetchingItems && !!initialItems?.length;

  const [updatedItems, setUpdatedItems] = useState(initialItems);

  useEffect(() => {
    setUpdatedItems(initialItems);
  }, [initialItems]);

  const getChangedItems = useCallback(() => {
    const itemsRecord = mapItemsToOwnerRecord(initialItems);

    const diff = updatedItems.filter((item) => {
      return item.ownerId !== itemsRecord[item.id];
    });

    return diff;
  }, [updatedItems, initialItems]);

  const onItemClick = useCallback(
    (event) => {
      const { value, checked } = event.target;

      setUpdatedItems((prev) => {
        const newList = prev.map((item) =>
          item.id.toString() === value ? { ...item, ownerId: checked ? ownerId : null } : item,
        );

        return newList;
      });
    },
    [ownerId],
  );

  const [updateItemsOwnerTrigger] = useUpdateItemsOwnerMutation();

  const updateItemsOwner = useCallback(async () => {
    const changedItems = getChangedItems();

    try {
      if (changedItems.length) {
        await updateItemsOwnerTrigger(changedItems);
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }, [getChangedItems, updateItemsOwnerTrigger, closeModal]);

  const { isConfirmOpen, openConfirmModal, closeConfirmModal } = useConfirmModalState();

  const beforeCloseModal = useCallback(() => {
    const hasChanges = !!getChangedItems()?.length;

    if (hasChanges) {
      openConfirmModal();
    } else {
      closeModal();
    }
  }, [getChangedItems, openConfirmModal, closeModal]);

  const confirmExit = useCallback(() => {
    closeConfirmModal();
    closeModal();
  }, [closeConfirmModal, closeModal]);

  return {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    isFetchingItems,
    noItems,
    hasItems,
    updatedItems,
    onItemClick,
    updateItemsOwner,
    isConfirmOpen,
    confirmExit,
    closeConfirmModal,
  };
}

const EditOwnerItemsModal = (props: EditOwnerItemsModalPropsType) => {
  const {
    ownerId,
    isModalOpen,
    beforeCloseModal,
    isFetchingItems,
    noItems,
    hasItems,
    updatedItems,
    onItemClick,
    updateItemsOwner,
    isConfirmOpen,
    confirmExit,
    closeConfirmModal,
  } = useEditOwnerItemsModalState(props);

  return (
    <Modal.BaseModal isOpen={isModalOpen} onClose={beforeCloseModal}>
      <Modal.Header title="Edit owner items" />
      <Modal.Main>
        {isFetchingItems && <div>Loading...</div>}
        {noItems && <div>No items</div>}
        {hasItems && (
          <ul>
            {updatedItems?.map((item) => (
              <li key={item.id} className="mb-2 flex items-center">
                <input
                  className="w-4 h-4 mr-2 cursor-pointer"
                  id={`owner-item-${item.id}`}
                  type="checkbox"
                  checked={item.ownerId === ownerId}
                  value={item.id}
                  onChange={onItemClick}
                />
                <label className="cursor-pointer" htmlFor={`owner-item-${item.id}`}>
                  {item.title}
                </label>
              </li>
            ))}
          </ul>
        )}
      </Modal.Main>
      <Modal.Footer>
        <AppButton onClick={beforeCloseModal}>Cancel</AppButton>
        <AppButton onClick={updateItemsOwner}>Save</AppButton>
        <ExitWithChangesConfirmModal
          isConfirmOpen={isConfirmOpen}
          onConfirm={confirmExit}
          onCancel={closeConfirmModal}
        />
      </Modal.Footer>
    </Modal.BaseModal>
  );
};

type EditOwnerItemsWidgetPropsType = {
  ownerId: OwnerIdType;
};

function useEditOwnerItemsWidgetState(props: EditOwnerItemsWidgetPropsType) {
  const { ownerId } = props;

  const { isModalOpen, openModal, closeModal } = useModalState();

  return {
    ownerId,
    isModalOpen,
    openModal,
    closeModal,
  };
}

export const EditOwnerItemsWidget = (props: EditOwnerItemsWidgetPropsType) => {
  const { ownerId, isModalOpen, openModal, closeModal } = useEditOwnerItemsWidgetState(props);

  return (
    <>
      <AppButton onClick={openModal}>Edit</AppButton>
      <EditOwnerItemsModal ownerId={ownerId} isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
