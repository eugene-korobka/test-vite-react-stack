import { apiUrl } from "../apiUrl.js";
import { getDbCollections } from "../db-connector.js";
import { toObjectIds } from "../utils/convertId.js";
import { peekDefinedPropertiesByTemplate } from "../utils/peekDefinedPropertiesByTemplate.js";

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

const patchOwnerOptions = {
  schema: {
    body: ownerPatchBodyJsonSchema,
  },
};

const postOwnerOptions = {
  schema: {
    body: ownerPostBodyJsonSchema,
  },
};

function getOwnerDto(body) {
  const ownerDoc = peekDefinedPropertiesByTemplate(body, properties);

  return ownerDoc;
}

export async function ownerRoutes(instance) {
  const { ownersCollection } = getDbCollections(instance);

  instance.get(apiUrl.owners, async () => {
    try {
      const result = await ownersCollection.find().toArray();

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.get(apiUrl.ownerById, async (request, reply) => {
    try {
      const ownerObjectId = toObjectIds(request.params.ownerId);

      const result = await ownersCollection.findOne({ _id: ownerObjectId });

      if (result === null) {
        return reply.status(404).send({ message: 'Not Found' });
      }

      return result;
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.delete(apiUrl.ownerById, async (request) => {
    try {
      const ownerObjectId = toObjectIds(request.params.ownerId);

      const result = await ownersCollection.findOneAndDelete({ _id: ownerObjectId });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.patch(apiUrl.ownerById, patchOwnerOptions, async (request) => {
    try {
      const ownerObjectId = toObjectIds(request.params.ownerId);

      const changes = getOwnerDto(request.body);

      const result = await ownersCollection.updateOne({ _id: ownerObjectId }, { $set: changes });

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

  instance.post(apiUrl.owners, postOwnerOptions, async (request) => {
    try {
      const newOwner = getOwnerDto(request.body);

      const result = await ownersCollection.insertOne(newOwner);

      return result
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

};
