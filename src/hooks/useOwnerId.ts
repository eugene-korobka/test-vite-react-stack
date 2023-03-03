import { useParams } from "react-router-dom";
import type { OwnerIdType } from "sharedTypes/owner.types";

export function useOwnerId(ownerId?: OwnerIdType): OwnerIdType | null {
  const { ownerId: routeOwnerId } = useParams();

  return ownerId || Number(routeOwnerId) || null;
};
