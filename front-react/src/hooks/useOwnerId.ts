import { useParams } from "react-router-dom";
import type { OwnerIdType } from "sharedTypes/owner.types";

export function useOwnerId(ownerId?: OwnerIdType): OwnerIdType {
  const { ownerId: routeOwnerId } = useParams();

  return ownerId || routeOwnerId || '';
};
