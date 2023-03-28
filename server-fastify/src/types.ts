import { Collection } from 'mongodb';

export type EntityIdType = string;

export type ArticleType = {
  title: string;
  description: string;
};

export type OwnerType = {
  firstName: string;
  lastName: string;
  email: string;
  articles?: EntityIdType[];
};

export type ArticleDbType = {
  title: string;
  description: string;
};

export type OwnerDbType = {
  firstName: string;
  lastName: string;
  email: string;
  articles?: EntityIdType[];
};

export type ArticlesCollectionType = Collection<ArticleDbType>;

export type OwnersCollectionType = Collection<OwnerDbType>;

type ArticleIdFieldType = { articleId: EntityIdType };

export type ArticleIdQuerystringType = { Querystring: ArticleIdFieldType };

export type ArticleByIdParamsType = { Params: ArticleIdFieldType };

export type ArticlePostBodyType = { Body: ArticleType & { ownerIds?: EntityIdType[] } };

export type ArticlePatchBodyType = { Body: ArticleType & { ownerIds: EntityIdType[] } };

export type ArticleByIdOwnersPutBodyType = { Body: { ownerIds: EntityIdType[] } };

type OwnerIdFieldType = { ownerId: EntityIdType };

export type OwnerIdQuerystringType = { Querystring: OwnerIdFieldType };

export type OwnerByIdParamsType = { Params: OwnerIdFieldType };

export type OwnerPostBodyType = { Body: OwnerType };

export type OwnerPatchBodyType = { Body: OwnerType };

export type OwnerByIdArticlesPutBodyType = { Body: { articleIds: EntityIdType[] } };
