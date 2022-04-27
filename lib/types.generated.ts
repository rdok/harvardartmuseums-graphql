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

export type Print = {
  __typename?: 'Print';
  id: Scalars['String'];
};

export type Prints = {
  __typename?: 'Prints';
  currentPage: Scalars['Int'];
  itemsPerPage: Scalars['Int'];
  prints: Array<Print>;
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PrintsFilterBy = {
  hasImages: InputMaybe<Scalars['Boolean']>;
  standardVerification: InputMaybe<StandardVerification>;
};

export type PrintsInput = {
  filterBy: InputMaybe<PrintsFilterBy>;
  orderBy: InputMaybe<PrintsSortBy>;
  pageNumber: InputMaybe<Scalars['Int']>;
  pageSize: InputMaybe<Scalars['Int']>;
};

export enum PrintsSortBy {
  RankAsc = 'RANK_ASC',
  RankDesc = 'RANK_DESC'
}

export type Query = {
  __typename?: 'Query';
  healthCheck: Maybe<Scalars['String']>;
  prints: Maybe<Prints>;
};


export type QueryPrintsArgs = {
  input: PrintsInput;
};

export enum StandardVerification {
  Best = 'BEST'
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
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Print: ResolverTypeWrapper<Print>;
  Prints: ResolverTypeWrapper<Prints>;
  PrintsFilterBy: PrintsFilterBy;
  PrintsInput: PrintsInput;
  PrintsSortBy: PrintsSortBy;
  Query: ResolverTypeWrapper<{}>;
  StandardVerification: StandardVerification;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Print: Print;
  Prints: Prints;
  PrintsFilterBy: PrintsFilterBy;
  PrintsInput: PrintsInput;
  Query: {};
  String: Scalars['String'];
};

export type PrintResolvers<ContextType = any, ParentType extends ResolversParentTypes['Print'] = ResolversParentTypes['Print']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrintsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Prints'] = ResolversParentTypes['Prints']> = {
  currentPage: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  itemsPerPage: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prints: Resolver<Array<ResolversTypes['Print']>, ParentType, ContextType>;
  totalItems: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  healthCheck: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prints: Resolver<Maybe<ResolversTypes['Prints']>, ParentType, ContextType, RequireFields<QueryPrintsArgs, 'input'>>;
};

export type Resolvers<ContextType = any> = {
  Print: PrintResolvers<ContextType>;
  Prints: PrintsResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
};

