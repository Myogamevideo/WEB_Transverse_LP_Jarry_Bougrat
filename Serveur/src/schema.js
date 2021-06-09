import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

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

import {
  typeDef as Playlist,
  resolvers as playlistResolvers,
} from './Schema/Playlist.schema';

import {
  typeDef as User,
  resolvers as userResolvers,
} from './Schema/User.schema';

export const schema = makeExecutableSchema({
  typeDefs: [Query, Music, Playlist, User],
  resolvers: merge(musicResolvers, playlistResolvers, userResolvers),
});
