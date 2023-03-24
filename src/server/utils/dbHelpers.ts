import { type FastifyInstance } from 'fastify';
import { OwnersCollectionType } from 'types';

import { getDbCollections } from '../db-connector';

import { toObjectIds, toStringIds } from './convertId';

export async function addArticleToOwnersByIds(
  ownersCollection: OwnersCollectionType,
  { articleId, ownerIds }: { articleId: string; ownerIds: string[] },
) {
  if (ownerIds.length) {
    try {
      const addedOwnerObjectIds = toObjectIds(ownerIds);

      const result = await ownersCollection.updateMany(
        {
          _id: { $in: addedOwnerObjectIds },
        },
        {
          $push: { articles: articleId },
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  return undefined;
}

export async function removeArticleFromOwnersByIds(
  ownersCollection: OwnersCollectionType,
  { articleId, ownerIds }: { articleId: string; ownerIds: string[] },
) {
  if (ownerIds.length) {
    try {
      const removedOwnerObjectIds = toObjectIds(ownerIds);

      const result = await ownersCollection.updateMany(
        {
          _id: { $in: removedOwnerObjectIds },
        },
        {
          $pull: { articles: articleId },
        },
      );

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  return undefined;
}

export async function updateArticleOwners(
  instance: FastifyInstance,
  { articleId, ownerIds }: { articleId: string; ownerIds: string[] },
) {
  const { ownersCollection } = getDbCollections(instance);

  const ownersByArticleId = await ownersCollection.find({ articles: articleId }).toArray();

  const ownerIdsByArticleId = ownersByArticleId.map(({ _id }) => toStringIds(_id));

  const addedOwnerIds = ownerIds.filter((id) => !ownerIdsByArticleId.includes(id));

  if (addedOwnerIds.length) {
    await addArticleToOwnersByIds(ownersCollection, { articleId, ownerIds: addedOwnerIds });
  }

  const removedOwnerIds = ownerIdsByArticleId.filter((id) => !ownerIds.includes(id));

  if (removedOwnerIds.length) {
    await removeArticleFromOwnersByIds(ownersCollection, { articleId, ownerIds: removedOwnerIds });
  }
}

export async function removeArticleFromAllOwners(
  ownersCollection: OwnersCollectionType,
  { articleId }: { articleId: string },
) {
  try {
    const result = await ownersCollection.updateMany(
      {
        articles: articleId,
      },
      {
        $pull: { articles: articleId },
      },
    );

    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
