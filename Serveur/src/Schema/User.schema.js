const { GraphQLScalarType, Kind } = require('graphql');
import { ApolloServer, gql } from 'apollo-server';
import { User } from '../Model/User';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export const typeDefs = gql`
  scalar Date

  type User {
    username: String
    password: String
    dateOfBirth: Date
    playlists: [Playlist]
    musics: [Music]
    token: String
  }

  input UserInput{
    username: String
    password: String
    dateOfBirth: Date
    token: String
  }

  extend type Query {
    users: [User]
    user(_id: ID!): User
  }

  extend type Mutation {
    createUser(username: String!, password: String!, dateOfBirth: Date!): User
    createUserWithInput(userInput: UserInput!): User
    updateUser(_id: ID!, userInput: UserInput!): User
    deleteUser(_id: ID!): Boolean
    addToPlaylists(playlistId: ID!): [Playlist]
    addToMusics(musicId: ID!): [Musics]
  }
`;

// TODO: add addToPlaylists and addToMusics with inputPlaylist and inputMusic

export const resolvers = {
  Date: dateScalar,
  Query: {
    users: async () => {
      return await User.find().populate('musics').populate('playlists');
    },
    user: async (root, { _id }, context, info) => {
      return await User.findOne({ _id }).populate('musics').populate('playlists');
    },
  },
  Mutation: {
    createUser: async (root, { username, password, dateOfBirth }, context, info) => {
      // TODO: hash password ?
      return await User.create({ username, password, dateOfBirth });
    },
    createUserWithInput: async (root, { userInput }, context, info) => {
      // TODO: hash password ?
      //input.password = await bcrypt.hash(input.password, 10);
      return await User.create(userInput);
    },
    updateUser: async (root, { _id, userInput }) => {
      return await User.findByIdAndUpdate(_id, userInput, { new: true });
    },
    deleteUser: async (root, { _id }, context, info) => {
      return await User.remove({ _id });
    },
    addToPlaylists: async (root, { _id, playlistId }) => {
      var user = await User.findByIdAndUpdate(_id, {
        $push: {
          musics: playlistId
        }
      })
      return await user.save();
    },
    // TODO: add remove from playlist
    addToMusics: async (root, { _id, musicId }) => {
      var user = await User.findByIdAndUpdate(_id, {
        $push: {
          musics: musicId
        }
      })
      return await playuserlist.save();
    },
    // TODO: add remove from musics
  }
};