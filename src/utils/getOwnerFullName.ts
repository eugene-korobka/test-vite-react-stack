import { OwnerType } from "sharedTypes/owner.types";

export function getOwnerFullName(owner?: OwnerType) {
  if (owner?.firstName || owner?.lastName) {
    return `${owner.firstName} ${owner.lastName}`;

  }

  return '--';
}
