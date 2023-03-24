/* eslint-disable no-redeclare */
import { ObjectId } from '@fastify/mongodb';

export function toObjectIds(ids: string): ObjectId;
export function toObjectIds(ids: string[]): ObjectId[];
export function toObjectIds(ids: string | string[]): ObjectId | ObjectId[] {
  if (Array.isArray(ids)) {
    return ids.map((id) => new ObjectId(id));
  }

  return new ObjectId(ids);
}

export function toStringIds(ids: ObjectId): string;
export function toStringIds(ids: ObjectId[]): string[];
export function toStringIds(ids: ObjectId | ObjectId[]): string | string[] {
  if (Array.isArray(ids)) {
    return ids.map((id) => id.toString());
  }

  return ids.toString();
}
