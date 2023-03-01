export type OwnerType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type OwnerTypeId = OwnerType['id'];

export const firstNameInputName = 'firstName';

export const lastNameInputName = 'lastName';

export const emailInputName = 'email';
