import cors from '@fastify/cors';
import Fastify from 'fastify';

import { articleRoutes } from './routes/articleRoutes';
import { ownerRoutes } from './routes/ownerRoutes';
import { ownersAndArticlesRoutes } from './routes/ownersAndArticles';
import { dbConnector, mockDatabase } from './db-connector';

const server = Fastify({
  logger: true
});

server.register(cors, {
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
