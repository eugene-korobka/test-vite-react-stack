import type { EntityIdType } from "./common.types";

export type OwnerType = {
  _id: EntityIdType;
  firstName: string;
  lastName: string;
  email: string;
  articles?: EntityIdType[];
};

export type OwnerIdType = EntityIdType;
