import { ObjectId } from "@fastify/mongodb";

export function mapIdsToObjectIds(ids) {
  if (Array.isArray(ids)) {
    return ids.map((id) => ObjectId(id));
  }

  return ObjectId(ids);
}

export function mapObjectIdsToIds(ids) {
  if (Array.isArray(ids)) {
    return ids.map((id) => id.toString());
  }

  return ids.toString();
}
