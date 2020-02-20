import { SchemaObject } from './interfaces';

export const usersCreateSchema: SchemaObject = {
  $id: '/users/create',
  additionalProperties: false,
  properties: {
    email: {
      format: 'email',
      type: 'string',
    },
    familyName: {
      type: 'string',
    },
    givenName: {
      type: 'string',
    },
  },
  required: [ 'familyName', 'givenName', 'email' ],
  type: 'object',
};

export const usersUpdateSchema: SchemaObject = {
  $id: '/users/update',
  additionalProperties: false,
  minProperties: 1,
  properties: {
    email: {
      format: 'email',
      type: 'string',
    },
    familyName: {
      type: 'string',
    },
    givenName: {
      type: 'string',
    },
  },
  type: 'object',
};
