import { useRemoveItemMutation } from 'sharedApi/removeItem.api';
import type { ItemIdType } from 'sharedTypes/item.types';
import { ReactComponent as TrashIcon } from 'src/assets/trash-icon.svg';

interface RemoveItemButtonProps {
  itemId: ItemIdType;
}

const useRemoveItemButtonWidgetState = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const [removeItemTrigger, { isLoading }] = useRemoveItemMutation();

  const isDisabled = !itemId || isLoading;

  const onClick = () => {
    removeItemTrigger({ itemId }).catch((error) => {
      console.error(error);
    });
  };

  return {
    isDisabled,
    onClick,
  };
};

export const RemoveItemButtonWidget = (props: RemoveItemButtonProps) => {
  const { isDisabled, onClick } = useRemoveItemButtonWidgetState(props);

  return (
    <button className="h-4 w-4 align-text-bottom" title="Remove item" disabled={isDisabled} onClick={onClick}>
      <TrashIcon />
    </button>
  );
};
