import type { EntityIdType } from "./common.types";

export type ArticleType = {
  _id: EntityIdType;
  title: string;
  description: string;
  ownerId?: EntityIdType;
};

export type ArticleIdType = EntityIdType;
