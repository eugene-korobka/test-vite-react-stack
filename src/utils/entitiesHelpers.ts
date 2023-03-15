import type { ArticleType } from "sharedTypes/article.types";
import type { EntityIdType } from "sharedTypes/common.types";
import type { OwnerType } from "sharedTypes/owner.types";

export function reduceEntitiesToRecordByBelongsTo(entities?: Array<ArticleType | OwnerType>) {
  if (!entities?.length) {
    return {};
  }

  return entities.reduce((acc: Record<EntityIdType, boolean>, entity) => {
    acc[entity._id] = !!entity?.belongsTo;

    return acc;
  }, {});
}

export function mapEntitiesToIdsByBelongsTo(entities?: Array<ArticleType | OwnerType>) {
  if (!entities?.length) {
    return [];
  }

  return entities.reduce((acc: EntityIdType[], entity) => {
    if (entity?.belongsTo) {
      acc.push(entity._id);
    }

    return acc;
  }, []);
}

export function areTwoIdsArraysDifferent(firstIds: Array<EntityIdType>, secondIds: Array<EntityIdType>) {
  return firstIds.length !== secondIds.length || firstIds.some((id) => !secondIds.includes(id));
}
