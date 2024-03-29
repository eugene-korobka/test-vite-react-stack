import fastifyMongo from '@fastify/mongodb';
import { type FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import type { ArticleDbType, OwnerDbType } from './types';

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function mongoConnector(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/reactStackDb',
    forceClose: true,
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export const dbConnector = fastifyPlugin(mongoConnector);

const articlesCollectionName = 'articles';
const ownersCollectionName = 'owners';

export function getDbCollections(instance: FastifyInstance) {
  const db = instance.mongo.db;

  return {
    articlesCollection: db?.collection<ArticleDbType>(articlesCollectionName)!,
    ownersCollection: db?.collection<OwnerDbType>(ownersCollectionName)!,
  };
}

export async function mockDatabase(instance: FastifyInstance) {
  const db = instance.mongo.db;

  const articlesCollection = db?.collection(articlesCollectionName);

  const articlesCount = (await articlesCollection?.estimatedDocumentCount()) || 0;

  if (articlesCount < 1) {
    articlesCollection?.insertMany([
      { title: 'Article 1', description: 'Description 1' },
      { title: 'Article 2', description: 'Description 2' },
      { title: 'Article 3', description: 'Description 3' },
      { title: 'Article 4', description: 'Description 4' },
      { title: 'Article 5', description: 'Description 5' },
    ]);
  }

  const ownersCollection = db?.collection(ownersCollectionName);

  const ownersCount = (await ownersCollection?.estimatedDocumentCount()) || 0;

  if (ownersCount < 1) {
    ownersCollection?.insertMany([
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@some.mail', articles: [] },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@some.mail', articles: [] },
      { firstName: 'Mister', lastName: 'Nobody', email: 'mister.nobody@some.mail', articles: [] },
    ]);
  }
}
