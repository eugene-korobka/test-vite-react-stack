import { ItemTypeId } from "./store/types";
import { useEditItemModalHandlers } from "./hooks";

type EditItemModalButtonProps = {
  itemId: ItemTypeId;
};

export const EditItemModalButton = (props: EditItemModalButtonProps) => {
  const { itemId } = props;

  const { openEditItemModal } = useEditItemModalHandlers(itemId);

  return (
    <button className="p-2 shrink-0 border border-solid border-gray-400 rounded-md" onClick={openEditItemModal}>
      Edit item
    </button>
  );
};
