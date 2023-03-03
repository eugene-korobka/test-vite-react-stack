import { useParams } from "react-router-dom";
import type { ItemIdType } from "sharedTypes/item.types";

export function useItemId(itemId?: ItemIdType): ItemIdType | null {
  const { itemId: routeItemId } = useParams();

  return itemId || Number(routeItemId) || null;
};
