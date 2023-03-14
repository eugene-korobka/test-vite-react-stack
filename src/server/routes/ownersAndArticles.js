import { ObjectId } from "@fastify/mongodb";
import { getDbCollections } from "../db-connector.js";

const urlArticleOwners = '/articles/:articleId/owners';
// const urlArticleOwnersAvailable = '/articles/:articleId/owners/available';
const urlOwnerArticles = '/owners/:ownerId/articles';
const urlOwnerArticlesAvailable = '/owners/:ownerId/articles/available';

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

export async function ownersAndArticlesRoutes(instance) {
  const { articlesCollection, ownersCollection } = getDbCollections(instance);

  instance.get(urlOwnerArticles, async (request, reply) => {
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

  instance.get(urlArticleOwners, async (request, reply) => {
    try {
      const articleId = request.params.articleId;

      const result = await ownersCollection.find({ articles: articleId }).toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.patch(urlOwnerArticles, patchOwnerArticlesOptions, async (request, reply) => {
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

  instance.get(urlOwnerArticlesAvailable, async (request, reply) => {
    try {
      const ownerId = ObjectId(request.params.ownerId);

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

};
