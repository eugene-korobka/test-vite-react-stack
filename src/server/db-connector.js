import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function mongoConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/reactStackDb',
    forceClose: true,
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export const dbConnector = fastifyPlugin(mongoConnector);

const articlesCollectionName = 'articles';
const ownersCollectionName = 'owners';

export function getDbCollections(instance) {
  const db = instance.mongo.db;

  return {
    articlesCollection: db.collection(articlesCollectionName),
    ownersCollection: db.collection(ownersCollectionName),
  };
}

export async function mockDatabase(instance) {
  const db = instance.mongo.db;

  const articlesCollection = db.collection(articlesCollectionName);

  const articlesCount = await articlesCollection.estimatedDocumentCount();

  if (articlesCount < 1) {
    articlesCollection.insertMany([
      { title: 'Article 1', description: 'Description 1' },
      { title: 'Article 2', description: 'Description 2' },
      { title: 'Article 3', description: 'Description 3' },
      { title: 'Article 4', description: 'Description 4' },
      { title: 'Article 5', description: 'Description 5' },
    ]);
  }

  const ownersCollection = db.collection(ownersCollectionName);

  const ownersCount = await ownersCollection.estimatedDocumentCount();

  if (ownersCount < 1) {
    ownersCollection.insertMany([
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@some.mail' },
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@some.mail' },
      { firstName: 'Mister', lastName: 'Nobody', email: 'mister.nobody@some.mail' },
    ]);
  }
}
