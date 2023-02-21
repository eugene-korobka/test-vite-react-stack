import { ItemTypeId } from './store/types';
import { useRemoveItemConfirmModalHandlers } from './hooks';
import { RemoveItemConfirmModal } from './RemoveItemConfirmModal';

type RemoveItemButtonProps = {
  itemId: ItemTypeId;
}

const useRemoveItemButtonWithConfirmWidgetState = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const { openRemoveItemConfirmModal } = useRemoveItemConfirmModalHandlers(itemId);

  return {
    itemId,
    openRemoveItemConfirmModal,
  };
};

export const RemoveItemButtonWithConfirmWidget = (props: RemoveItemButtonProps) => {
  const { itemId, openRemoveItemConfirmModal } = useRemoveItemButtonWithConfirmWidgetState(props);

  return (
    <>
      <button
        className="p-2 shrink-0 border border-solid border-red-400 rounded-md text-red-400"
        onClick={openRemoveItemConfirmModal}
      >
        Remove
      </button>
      <RemoveItemConfirmModal itemId={itemId} />
    </>
  );
};
