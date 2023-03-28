import { type FastifyInstance } from 'fastify';

import { apiUrl } from '../apiUrl';
import { getDbCollections } from '../db-connector';
import type { ArticleByIdParamsType, ArticlePatchBodyType, ArticlePostBodyType, ArticleType } from '../types';
import { toObjectIds, toStringIds } from '../utils/convertId';
import { addArticleToOwnersByIds, removeArticleFromAllOwners, updateArticleOwners } from '../utils/dbHelpers';
import { peekDefinedPropertiesByTemplate } from '../utils/peekDefinedPropertiesByTemplate';

const properties = {
  title: { type: 'string' },
  description: { type: 'string' },
};

const articlePostBodyJsonSchema = {
  type: 'object',
  properties: {
    ...properties,
    ownerIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['title', 'description'],
};

const articlePatchBodyJsonSchema = {
  type: 'object',
  properties: {
    ...properties,
    ownerIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: [],
};

const patchArticleOptions = {
  schema: {
    body: articlePatchBodyJsonSchema,
  },
};

const postArticleOptions = {
  schema: {
    body: articlePostBodyJsonSchema,
  },
};

function getArticleDto(body: ArticleType): ArticleType {
  const articleDoc = peekDefinedPropertiesByTemplate<ArticleType>(body, properties);

  return articleDoc;
}

export async function articleRoutes(instance: FastifyInstance) {
  const { articlesCollection, ownersCollection } = getDbCollections(instance);

  instance.get(apiUrl.articles, async () => {
    try {
      const result = await articlesCollection.find().toArray();

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get<ArticleByIdParamsType>(apiUrl.articleById, async (request, reply) => {
    try {
      const articleObjectId = toObjectIds(request.params.articleId);

      const result = await articlesCollection.findOne({ _id: articleObjectId });

      if (result === null) {
        return reply.status(404).send({ message: 'Not Found' });
      }

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.delete<ArticleByIdParamsType>(apiUrl.articleById, async (request) => {
    try {
      const articleId = request.params.articleId;
      const articleObjectId = toObjectIds(articleId);

      const result = await articlesCollection.findOneAndDelete({ _id: articleObjectId });

      await removeArticleFromAllOwners(ownersCollection, { articleId });

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.patch<ArticleByIdParamsType & ArticlePatchBodyType>(
    apiUrl.articleById,
    patchArticleOptions,
    async (request) => {
      try {
        const articleId = request.params.articleId;
        const articleObjectId = toObjectIds(articleId);

        const changes = getArticleDto(request.body);

        const result = await articlesCollection.updateOne({ _id: articleObjectId }, { $set: changes });

        const ownerIds = request.body.ownerIds;

        if (ownerIds) {
          await updateArticleOwners(instance, { articleId, ownerIds });
        }

        return result;
      } catch (error) {
        console.error(error);

        throw error;
      }
    },
  );

  instance.post<ArticlePostBodyType>(apiUrl.articles, postArticleOptions, async (request) => {
    try {
      const newArticle = getArticleDto(request.body);

      const result = await articlesCollection.insertOne(newArticle);

      const ownerIds = request.body.ownerIds;

      if (ownerIds) {
        await addArticleToOwnersByIds(ownersCollection, { articleId: toStringIds(result.insertedId), ownerIds });
      }

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });
}
