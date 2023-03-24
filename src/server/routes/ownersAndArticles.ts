import { type FastifyInstance } from "fastify";
import type {
  ArticleByIdOwnersPutBodyType,
  ArticleByIdParamsType,
  ArticleIdQuerystringType,
  OwnerByIdArticlesPutBodyType,
  OwnerByIdParamsType,
  OwnerIdQuerystringType,
} from "types";

import { apiUrl } from "../apiUrl";
import { getDbCollections } from "../db-connector";
import { toObjectIds, toStringIds } from "../utils/convertId";
import { updateArticleOwners } from "../utils/dbHelpers";

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
  schema: {
    querystring: {
      ownerId: { type: 'string' },
    },
  }
};

const getOwnersAvailableOptions = {
  schema: {
    querystring: {
      articleId: { type: 'string' },
    },
  }
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

export async function ownersAndArticlesRoutes(instance: FastifyInstance) {
  const { articlesCollection, ownersCollection } = getDbCollections(instance);

  instance.get<OwnerByIdParamsType>(apiUrl.ownerByIdArticles, async (request) => {
    try {
      const ownerObjectId = toObjectIds(request.params.ownerId);

      const owner = await ownersCollection.findOne({ _id: ownerObjectId });

      const ownerArticleObjectIds = toObjectIds(owner?.articles || []);

      const result = await articlesCollection.find({ _id: { $in: ownerArticleObjectIds } }).toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get<ArticleByIdParamsType>(apiUrl.articleByIdOwners, async (request) => {
    try {
      const articleId = request.params.articleId;

      const result = await ownersCollection.find({ articles: articleId }).toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.put<OwnerByIdParamsType & OwnerByIdArticlesPutBodyType>(apiUrl.ownerByIdArticles, patchOwnerArticlesOptions, async (request) => {
    try {
      const { ownerId } = request.params;
      const ownerObjectId = toObjectIds(ownerId);

      const { articleIds } = request.body;

      const changes = { articles: articleIds };

      const result = await ownersCollection.updateOne({ _id: ownerObjectId }, { $set: changes });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get<OwnerIdQuerystringType>(apiUrl.articlesAvailable, getArticlesAvailableOptions, async (request) => {
    try {
      const ownerObjectId = toObjectIds(request.query.ownerId);

      const owner = await ownersCollection.findOne({ _id: ownerObjectId });

      const ownerArticleIds = owner?.articles || [];

      const articles = await articlesCollection.find().toArray();

      const result = articles.map((article) => {
        return {
          ...article,
          belongsTo: ownerArticleIds.includes(toStringIds(article._id)),
        };
      });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get<ArticleIdQuerystringType>(apiUrl.ownersAvailable, getOwnersAvailableOptions, async (request) => {
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

  instance.put<ArticleByIdParamsType & ArticleByIdOwnersPutBodyType>(apiUrl.articleByIdOwners, putArticleOwnersOptions, async (request) => {
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

};
