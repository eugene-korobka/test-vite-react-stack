import { ObjectId } from "@fastify/mongodb";

export function toObjectIds(ids) {
  if (Array.isArray(ids)) {
    return ids.map((id) => ObjectId(id));
  }

  return ObjectId(ids);
}

export function toStringIds(ids) {
  if (Array.isArray(ids)) {
    return ids.map((id) => id.toString());
  }

  return ids.toString();
}
