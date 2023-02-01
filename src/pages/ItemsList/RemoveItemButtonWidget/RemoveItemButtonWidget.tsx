import { ReactComponent as TrashIcon } from 'src/assets/trash-icon.svg';

import { useRemoveItemMutation } from 'pages/ItemsList/RemoveItemButtonWidget/store/items.remove.api';

import { ItemType } from 'store/types';

interface RemoveItemButtonProps {
  id: ItemType['id'];
}

const useRemoveItemButtonWidgetState = (props: RemoveItemButtonProps) => {
  const { id } = props;

  const [removeItemFn, { isLoading }] = useRemoveItemMutation();

  const isDisabled = !id || isLoading;

  const onClick = () => {
    removeItemFn({ id });
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
