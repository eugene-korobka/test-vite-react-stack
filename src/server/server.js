import cors from '@fastify/cors';
import Fastify from 'fastify';

import { articleRoutes } from './routes/articleRoutes.js';
import { ownerRoutes } from './routes/ownerRoutes.js';
import { ownersAndArticlesRoutes } from './routes/ownersAndArticles.js';
import { dbConnector, mockDatabase } from './db-connector.js';

const server = Fastify({
  logger: true
})

await server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
});

server.register(dbConnector);

server.register(mockDatabase);

server.register(articleRoutes);

server.register(ownerRoutes);

server.register(ownersAndArticlesRoutes);

server.get('/', async () => {
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start();
