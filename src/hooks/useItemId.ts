import { useParams } from "react-router-dom";
import { ItemTypeId } from "sharedTypes/item.types";

export function useItemId(itemId?: ItemTypeId): ItemTypeId | null {
  const { itemId: routeItemId } = useParams();

  return itemId || Number(routeItemId) || null;
};
