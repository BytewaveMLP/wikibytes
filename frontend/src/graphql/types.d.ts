export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
};

export type Article = {
  __typename?: 'Article';
  body: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of CreateArticle */
export type CreateArticleInput = {
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

/** Autogenerated return type of CreateArticle */
export type CreateArticlePayload = {
  __typename?: 'CreateArticlePayload';
  article?: Maybe<Article>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of EditArticle */
export type EditArticleInput = {
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

/** Autogenerated return type of EditArticle */
export type EditArticlePayload = {
  __typename?: 'EditArticlePayload';
  article?: Maybe<Article>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<CreateArticlePayload>;
  editArticle?: Maybe<EditArticlePayload>;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationEditArticleArgs = {
  input: EditArticleInput;
};

export type Query = {
  __typename?: 'Query';
  article: Article;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};

export type ArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', title: string, body: string } };

export type ArticleFormQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArticleFormQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string | number, title: string, body: string } };

export type EditArticleMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type EditArticleMutation = { __typename?: 'Mutation', editArticle?: Maybe<{ __typename?: 'EditArticlePayload', errors?: Maybe<Array<string>>, article?: Maybe<{ __typename?: 'Article', id: string | number }> }> };

export type CreateArticleMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: Maybe<{ __typename?: 'CreateArticlePayload', errors?: Maybe<Array<string>>, article?: Maybe<{ __typename?: 'Article', id: string | number }> }> };

export type ArticleFormFragment = { __typename?: 'Article', title: string, body: string };