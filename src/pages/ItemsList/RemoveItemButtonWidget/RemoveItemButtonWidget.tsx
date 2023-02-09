import { ReactComponent as TrashIcon } from 'src/assets/trash-icon.svg';

import { useRemoveItemMutation } from 'pages/ItemsList/RemoveItemButtonWidget/store/items.remove.api';
import { ItemTypeId } from 'pages/ItemsList/RemoveItemButtonWidget/store/types';

interface RemoveItemButtonProps {
  itemId: ItemTypeId;
}

const useRemoveItemButtonWidgetState = (props: RemoveItemButtonProps) => {
  const { itemId } = props;

  const [removeItemFn, { isLoading }] = useRemoveItemMutation();

  const isDisabled = !itemId || isLoading;

  const onClick = () => {
    removeItemFn({ itemId })
      .catch((error) => {
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
    <button className='h-4 w-4 align-text-bottom' title="Remove item" disabled={isDisabled} onClick={onClick}>
      <TrashIcon />
    </button>
  );
};
