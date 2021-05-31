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
  typeDef as Music,
  resolvers as musicResolvers,
} from './Schema/Music.schema';


export const schema = makeExecutableSchema({
  typeDefs: [Query, Music],
  resolvers: musicResolvers,
});
