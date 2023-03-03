import type { EntityIdType } from "./common.types";

export type OwnerType = {
  id: EntityIdType;
  firstName: string;
  lastName: string;
  email: string;
};

export type OwnerIdType = EntityIdType;

export const firstNameInputName = 'firstName';

export const lastNameInputName = 'lastName';

export const emailInputName = 'email';
