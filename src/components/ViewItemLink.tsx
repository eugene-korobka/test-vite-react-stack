import { Link } from "react-router-dom";
import { ItemTypeId } from "sharedTypes/item.types";

type ViewItemLinkProps = {
  itemId: ItemTypeId;
};

export const ViewItemLink = (props: ViewItemLinkProps) => {
  const { itemId } = props;

  return (
    <Link
      to={`/items-list/${itemId}`}
      className="p-2 shrink-0 border border-solid border-blue-400 rounded-md text-blue-400"
    >
      View
    </Link>
  );
};
