import { ObjectId } from "@fastify/mongodb";
import { peekDefinedPropertiesByTemplate } from "../utils/peekDefinedPropertiesByTemplate.js";

const urlOwners = '/owners';
const urlOwnerById = '/owners/:ownerId';

const properties = {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string' },
};

const ownerPostBodyJsonSchema = {
  type: 'object',
  properties,
  required: ['firstName', 'lastName', 'email'],
}

const ownerPatchBodyJsonSchema = {
  type: 'object',
  properties,
  required: [],
}

function getOwnerDto(body) {
  const ownerDoc = peekDefinedPropertiesByTemplate(body, properties);

  return ownerDoc;
}

export async function ownerRoutes(instance) {
  const collection = instance.mongo.db.collection('owners');

  instance.get(urlOwners, async (request, reply) => {
    const result = await collection.find().toArray();

    return result
  })

  instance.get(urlOwnerById, async (request, reply) => {
    try {
      const result = await collection.findOne({ _id: ObjectId(request.params.ownerId) });

      if (result === null) {
        return reply.status(404).send({ message: 'Not Found' });
      }

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  })

  instance.delete(urlOwnerById, async (request, reply) => {
    const result = await collection.findOneAndDelete({ _id: ObjectId(request.params.ownerId) });

    return result
  })

  const patchSchema = {
    body: ownerPatchBodyJsonSchema,
  }

  instance.patch(urlOwnerById, { schema: patchSchema }, async (request, reply) => {
    const changes = getOwnerDto(request.body);

    const result = await collection.updateOne({ _id: ObjectId(request.params.ownerId) }, { $set: changes });

    return result
  })

  const postSchema = {
    body: ownerPostBodyJsonSchema,
  }

  instance.post(urlOwners, { schema: postSchema }, async (request, reply) => {
    const newOwner = getOwnerDto(request.body);

    const result = await collection.insertOne(newOwner);

    return result
  })};
