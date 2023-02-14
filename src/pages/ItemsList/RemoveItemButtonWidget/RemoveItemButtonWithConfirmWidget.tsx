import { useAppDispatch } from 'store/hooks';

import { removeItemActions } from './store/removeItem.slice';
import { ItemTypeId } from './store/types';
import { RemoveItemConfirmModal } from './RemoveItemConfirmModal';

type RemoveItemButtonProps = {
  itemId: ItemTypeId;
}

const useRemoveItemButtonWithConfirmWidgetState = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const dispatch = useAppDispatch();

  const openConfirmModal = () => {
    dispatch(removeItemActions.openConfirmRemoveModal({ modalId: itemId }));
  };

  return {
    itemId,
    openConfirmModal,
  };
};

export const RemoveItemButtonWithConfirmWidget = (props: RemoveItemButtonProps) => {
  const { itemId, openConfirmModal } = useRemoveItemButtonWithConfirmWidgetState(props);

  return (
    <>
      <button
        className="p-2 shrink-0 border border-solid border-red-400 rounded-md text-red-400"
        onClick={openConfirmModal}
      >
        Remove
      </button>
      <RemoveItemConfirmModal itemId={itemId} />
    </>
  );
};
