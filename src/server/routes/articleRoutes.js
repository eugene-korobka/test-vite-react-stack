import { ObjectId } from "@fastify/mongodb";

import {apiUrl} from '../apiUrl.js';
import { getDbCollections } from "../db-connector.js";
import { articleCreatedEvent, articleRemovedEvent, ServerEventBus } from "../eventEmitter.js";
import { peekDefinedPropertiesByTemplate } from "../utils/peekDefinedPropertiesByTemplate.js";

import { updateArticleOwners } from "./ownersAndArticles.js";

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
}

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
}

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

function getArticleDto(body) {
  const articleDoc = peekDefinedPropertiesByTemplate(body, properties);

  return articleDoc;
}

export async function articleRoutes(instance) {
  const { articlesCollection } = getDbCollections(instance);

  instance.get(apiUrl.articles, async (request, reply) => {
    try {
      const result = await articlesCollection.find().toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get(apiUrl.articleById, async (request, reply) => {
    try {
      const result = await articlesCollection.findOne({ _id: ObjectId(request.params.articleId) });

      if (result === null) {
        return reply.status(404).send({ message: 'Not Found' });
      }

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.delete(apiUrl.articleById, async (request, reply) => {
    try {
      const result = await articlesCollection.findOneAndDelete({ _id: ObjectId(request.params.articleId) });

      ServerEventBus.emit(articleRemovedEvent, { articleId: request.params.articleId });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.patch(apiUrl.articleById, patchArticleOptions, async (request, reply) => {
    try {
      const articleId = request.params.articleId;

      const changes = getArticleDto(request.body);

      const result = await articlesCollection.updateOne({ _id: ObjectId(articleId) }, { $set: changes });

      const ownerIds = request.body.ownerIds;

      if (ownerIds) {
        await updateArticleOwners(instance, { articleId, ownerIds });
      }

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.post(apiUrl.articles, postArticleOptions, async (request, reply) => {
    try {
      const newArticle = getArticleDto(request.body);

      const result = await articlesCollection.insertOne(newArticle);

      const ownerIds = request.body.ownerIds;

      if (ownerIds.length) {
        ServerEventBus.emit(articleCreatedEvent, { articleId: result.insertedId, ownerIds });
      }

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

};
