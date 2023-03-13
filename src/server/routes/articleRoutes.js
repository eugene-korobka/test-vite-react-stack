import { ObjectId } from "@fastify/mongodb";
import { peekDefinedPropertiesByTemplate } from "../utils/peekDefinedPropertiesByTemplate.js";

const urlArticles = '/articles';
const urlArticleById = '/articles/:articleId';

const properties = {
  title: { type: 'string' },
  description: { type: 'string' },
};

const articlePostBodyJsonSchema = {
  type: 'object',
  properties,
  required: ['title', 'description'],
}

const articlePatchBodyJsonSchema = {
  type: 'object',
  properties,
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
  const collection = instance.mongo.db.collection('articles');

  instance.get(urlArticles, async (request, reply) => {
    try {
      const result = await collection.find().toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get(urlArticleById, async (request, reply) => {
    try {
      const result = await collection.findOne({ _id: ObjectId(request.params.articleId) });

      if (result === null) {
        return reply.status(404).send({ message: 'Not Found' });
      }

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.delete(urlArticleById, async (request, reply) => {
    try {
      const result = await collection.findOneAndDelete({ _id: ObjectId(request.params.articleId) });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.patch(urlArticleById, patchArticleOptions, async (request, reply) => {
    try {
      const changes = getArticleDto(request.body);

      const result = await collection.updateOne({ _id: ObjectId(request.params.articleId) }, { $set: changes });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.post(urlArticles, postArticleOptions, async (request, reply) => {
    try {
      const newArticle = getArticleDto(request.body);

      const result = await collection.insertOne(newArticle);

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });
};
