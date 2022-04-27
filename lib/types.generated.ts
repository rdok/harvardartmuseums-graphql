import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FilterBy = {
  hasImages: InputMaybe<Scalars['Boolean']>;
  verificationLevel: InputMaybe<VerificationLevel>;
};

export type ObjectResource = {
  __typename?: 'ObjectResource';
  id: Scalars['String'];
  imageCount: Scalars['Int'];
  primaryImageUrl: Maybe<Scalars['String']>;
  rank: Scalars['Int'];
};

export type Objects = {
  __typename?: 'Objects';
  currentPage: Scalars['Int'];
  data: Array<ObjectResource>;
  itemsPerPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ObjectsInput = {
  filterBy: InputMaybe<FilterBy>;
  hasImage: InputMaybe<Scalars['Boolean']>;
  orderBy: InputMaybe<SortBy>;
  pageNumber: InputMaybe<Scalars['Int']>;
  pageSize: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  healthCheck: Maybe<Scalars['String']>;
  objects: Maybe<Objects>;
};


export type QueryObjectsArgs = {
  input: ObjectsInput;
};

export type SortBy = {
  sortBy: SortByFields;
  sortOrder: SortOrder;
};

export enum SortByFields {
  Rank = 'RANK'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum VerificationLevel {
  Adequate = 'ADEQUATE',
  Best = 'BEST',
  Good = 'GOOD',
  Poor = 'POOR',
  Unchecked = 'UNCHECKED'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FilterBy: FilterBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ObjectResource: ResolverTypeWrapper<ObjectResource>;
  Objects: ResolverTypeWrapper<Objects>;
  ObjectsInput: ObjectsInput;
  Query: ResolverTypeWrapper<{}>;
  SortBy: SortBy;
  SortByFields: SortByFields;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  VerificationLevel: VerificationLevel;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  FilterBy: FilterBy;
  Int: Scalars['Int'];
  ObjectResource: ObjectResource;
  Objects: Objects;
  ObjectsInput: ObjectsInput;
  Query: {};
  SortBy: SortBy;
  String: Scalars['String'];
};

export type ObjectResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ObjectResource'] = ResolversParentTypes['ObjectResource']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  primaryImageUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ObjectsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Objects'] = ResolversParentTypes['Objects']> = {
  currentPage: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data: Resolver<Array<ResolversTypes['ObjectResource']>, ParentType, ContextType>;
  itemsPerPage: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalItems: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  healthCheck: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  objects: Resolver<Maybe<ResolversTypes['Objects']>, ParentType, ContextType, RequireFields<QueryObjectsArgs, 'input'>>;
};

export type Resolvers<ContextType = any> = {
  ObjectResource: ObjectResourceResolvers<ContextType>;
  Objects: ObjectsResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
};

