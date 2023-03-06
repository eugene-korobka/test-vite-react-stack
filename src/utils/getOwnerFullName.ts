import { OwnerType } from "sharedTypes/owner.types";

export function getOwnerFullName(owner: OwnerType) {
  return `${owner.firstName} ${owner.lastName}`;
}
