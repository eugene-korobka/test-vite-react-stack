import type { EntityIdType } from "./common.types";

export type ItemType = {
  id: EntityIdType;
  title: string;
  description: string;
};

export type ItemIdType = EntityIdType;
