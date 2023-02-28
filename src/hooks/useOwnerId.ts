import { useParams } from "react-router-dom";
import { OwnerTypeId } from "sharedTypes/owner.types";

export function useOwnerId(ownerId?: OwnerTypeId): OwnerTypeId | null {
  const { ownerId: routeOwnerId } = useParams();

  return ownerId || Number(routeOwnerId) || null;
};
