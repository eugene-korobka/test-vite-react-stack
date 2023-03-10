import { ObjectId } from "@fastify/mongodb";

const urlArticles = '/articles';
const urlArticleById = '/articles/:articleId';

const articlePostBodyJsonSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    // ownerId: { type: 'string' },
  },
  required: ['title', 'description'],
}

const articlePatchBodyJsonSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
  required: [],
}


export async function articleRoutes(instance) {
  const collection = instance.mongo.db.collection('articles');

  instance.get(urlArticles, async (request, reply) => {
    const result = await collection.find().toArray();

    return result
  })

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
  })

  instance.delete(urlArticleById, async (request, reply) => {
    const result = await collection.findOneAndDelete({ _id: ObjectId(request.params.articleId) });

    return result
  })

  const patchSchema = {
    body: articlePatchBodyJsonSchema,
  }

  instance.patch(urlArticleById, { schema: patchSchema }, async (request, reply) => {
    const result = await collection.updateOne({ _id: ObjectId(request.params.articleId) }, { $set: request.body });

    return result
  })

  const postSchema = {
    body: articlePostBodyJsonSchema,
  }

  instance.post(urlArticles, { schema: postSchema }, async (request, reply) => {
    const result = await collection.insertOne(request.body);

    return result
  })};
