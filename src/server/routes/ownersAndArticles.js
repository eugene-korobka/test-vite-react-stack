import { ObjectId } from "@fastify/mongodb";

import { apiUrl } from "../apiUrl.js";
import { getDbCollections } from "../db-connector.js";
import { articleCreatedEvent, articleRemovedEvent, ServerEventBus } from "../eventEmitter.js";
import { mapIdsToObjectIds, mapObjectIdsToIds } from "../utils/convertId.js";

const ownerArticlesPatchBodyJsonSchema = {
  type: 'object',
  properties: {
    articleIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['articleIds'],
}

const patchOwnerArticlesOptions = {
  schema: {
    body: ownerArticlesPatchBodyJsonSchema,
  },
};

const getArticlesAvailableOptions = {
  querystring: {
    ownerId: { type: 'string' },
  },
};

const getOwnersAvailableOptions = {
  querystring: {
    articleId: { type: 'string' },
  },
};

const articleOwnersPutBodyJsonSchema = {
  type: 'object',
  properties: {
    ownerIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['ownerIds'],
}

const putArticleOwnersOptions = {
  schema: {
    body: articleOwnersPutBodyJsonSchema,
  },
};

export async function updateArticleOwners(instance, { articleId, ownerIds }) {
  const { ownersCollection } = getDbCollections(instance);

  const ownersByArticleId = await ownersCollection.find({ articles: articleId }).toArray();

  const ownerIdsByArticleId = ownersByArticleId.map(({ _id }) => mapObjectIdsToIds(_id));

  const addedOwnerIds = ownerIds.filter((id) => !ownerIdsByArticleId.includes(id));

  if (addedOwnerIds.length) {
    const addedOwnerObjectIds = mapIdsToObjectIds(addedOwnerIds);

    await ownersCollection.updateMany({
      _id: { $in: addedOwnerObjectIds },
    }, {
      $push: { articles: articleId },
    });
  }

  const removedOwnerIds = ownerIdsByArticleId.filter((id) => !ownerIds.includes(id));

  if (removedOwnerIds.length) {
    const removedOwnerObjectIds = mapIdsToObjectIds(removedOwnerIds);

    await ownersCollection.updateMany({
      _id: { $in: removedOwnerObjectIds },
    }, {
      $pull: { articles: articleId },
    });
  }
}

export async function ownersAndArticlesRoutes(instance) {
  const { articlesCollection, ownersCollection } = getDbCollections(instance);

  instance.get(apiUrl.ownerByIdArticles, async (request) => {
    try {
      const ownerId = ObjectId(request.params.ownerId);

      const owner = await ownersCollection.findOne({ _id: ownerId });

      const ownerArticles = owner.articles?.map((id) => ObjectId(id)) || [];

      const result = await articlesCollection.find({ _id: { $in: ownerArticles } }).toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get(apiUrl.articleByIdOwners, async (request) => {
    try {
      const articleId = request.params.articleId;

      const result = await ownersCollection.find({ articles: articleId }).toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.patch(apiUrl.ownerByIdArticles, patchOwnerArticlesOptions, async (request) => {
    try {
      const ownerId = ObjectId(request.params.ownerId);

      const changes = { articles: request.body.articleIds };

      const result = await ownersCollection.updateOne({ _id: ObjectId(ownerId) }, { $set: changes });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get(apiUrl.articlesAvailable, getArticlesAvailableOptions, async (request) => {
    try {
      const ownerId = ObjectId(request.query.ownerId);

      const owner = await ownersCollection.findOne({ _id: ownerId });

      const ownerArticleIds = owner.articles || [];

      const articles = await articlesCollection.find().toArray();

      const result = articles.map((article) => {
        return {
          ...article,
          belongsTo: ownerArticleIds.includes(article._id.toString()),
        };
      });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get(apiUrl.ownersAvailable, getOwnersAvailableOptions, async (request) => {
    try {
      const articleId = request.query.articleId;

      const owners = await ownersCollection.find().toArray();

      const result = owners.map((owner) => {
        return {
          ...owner,
          belongsTo: !!owner?.articles?.includes(articleId),
        };
      });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.put(apiUrl.articleByIdOwners, putArticleOwnersOptions, async (request) => {
    try {
      const articleId = request.params.articleId;
      const ownerIds = request.body.ownerIds;

      await updateArticleOwners(instance, { articleId, ownerIds });

      return {}
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  async function addCreatedArticleToOwners({ articleId, ownerIds }) {
    if (!ownerIds?.length) {
      return;
    }

    try {
      await ownersCollection.updateMany({
        _id: { $in: ownerIds?.map((id) => ObjectId(id)) },
      }, {
        $push: { articles: articleId.toString() },
      });
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  ServerEventBus.on(articleCreatedEvent, addCreatedArticleToOwners);

  async function removeArticleFromOwners({ articleId }) {
    try {
      await ownersCollection.updateMany({
        articles: articleId,
      }, {
        $pull: { articles: articleId },
      });
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  ServerEventBus.on(articleRemovedEvent, removeArticleFromOwners);

};
