import { ItemTypeId } from "./store/types";
import { EditItemModal } from "./EditItemModal";
import { EditItemModalButton } from "./EditItemModalButton";

type EditItemWidgetProps = {
  itemId: ItemTypeId;
};

export const EditItemWidget = (props: EditItemWidgetProps) => {
  const { itemId } = props;

  return (
    <>
      <EditItemModalButton itemId={itemId} />
      <EditItemModal itemId={itemId} />
    </>
  );
};
