import type { EntityIdType } from "./common.types";
import { OwnerType } from "./owner.types";

export type ItemType = {
  id: EntityIdType;
  title: string;
  description: string;
  ownerId: EntityIdType | null;
  owner?: OwnerType;
};

export type ItemIdType = EntityIdType;
