import { User } from '../Model/User';

export const typeDef = `
  type User {
    _id: ID!
    username: String!
    password: String!
    playlists: [Playlist]
    musics: [Music]
    token: String
  }

  input UserInput{
    username: String!
    password: String!
    token: String
  }

  extend type Query {
    users: [User]
    user(_id: ID!): User
  }

  extend type Mutation {
    createUser(username: String!, password: String!): User
    createUserWithInput(userInput: UserInput!): User
    updateUser(_id: ID!, userInput: UserInput!): User
    deleteUser(_id: ID!): Boolean
    addToPlaylists(playlistId: ID!): [Playlist]
    addToMusics(musicId: ID!): [Music]
  }
`;

// TODO: add addToPlaylists and addToMusics with inputPlaylist and inputMusic

export const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('musics').populate('playlists');
    },
    user: async (root, { _id }, context, info) => {
      return await User.findOne({ _id }).populate('musics').populate('playlists');
    },
  },
  Mutation: {
    createUser: async (root, { username, password }, context, info) => {
      // TODO: hash password ?
      return await User.create({ username, password });
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
      const result = await User.remove({ _id });
      return result.deletedCount > 0;
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