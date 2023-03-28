import type { EntityIdType } from "./common.types";

export type ArticleType = {
  _id: EntityIdType;
  title: string;
  description: string;
  belongsTo?: boolean;
};

export type ArticleIdType = EntityIdType;
