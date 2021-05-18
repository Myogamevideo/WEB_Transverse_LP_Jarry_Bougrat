import { makeExecutableSchema } from 'graphql-tools';

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

import {
    typeDef as User,
    resolvers as userResolvers,
} from './Schema - GraphQL Schema ( Typedefs & Resolvers )/User.schema.js';


export const schema = makeExecutableSchema({
    typeDefs: [ Query, User],
    resolvers: userResolvers,
});
