import { Playlist } from '../Model/Playlist';
import { User } from '../Model/User';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server")


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
    addToPlaylists(playlistId: ID!): User
    removeFromPlaylists(playlistId: ID!): User
    removeAllPlaylists: Boolean
    addToMusics(musicId: ID!): User
    removeFromMusics(musicId: ID!): User
    login(username: String!, password: String!): User
  }
`;

// TODO: add addToPlaylists and addToMusics with inputPlaylist and inputMusic

export const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('musics').populate('playlists');
    },
    user: async (root, { _id }, context, info) => {
      console.log(context);
      if (_id === "") _id = context.user.id;

      return await User.findOne({ _id }).populate('musics').populate('playlists');
    },
  },
  Mutation: {
    createUser: async (root, { username, password }, context, info) => {

      if (!username || !password) throw UserInputError('Invalid credentials');

      const userFound = await User.findOne({ username });
      if (userFound) throw new UserInputError('Username already used.');

      password = await bcrypt.hash(password, 10);

      return await User.create({ username, password });
    },
    createUserWithInput: async (root, { userInput }, context, info) => {

      password = await bcrypt.hash(password, 10);

      return await User.create(userInput);
    },
    updateUser: async (root, { _id, userInput }) => {
      return await User.findByIdAndUpdate(_id, userInput, { new: true });
    },
    deleteUser: async (root, { _id }, context, info) => {

      await Playlist.deleteMany({ creator: _id });

      const result = await User.remove({ _id });

      return result.deletedCount > 0;
    },
    addToPlaylists: async (root, { playlistId }) => {
      var user = await User.findByIdAndUpdate(_id, {
        $push: {
          musics: playlistId
        }
      })
      return await user.save();
    },
    removeFromPlaylists: async (root, { playlistId }, context, info) => {
      if (!context.user) throw new AuthenticationError('You must be connected.');

      var user = await User.findByIdAndUpdate(context.user.id, {
        $pull: {
          playlists: playlistId
        }
      });

      if (user.playlists.includes(playlistId)) {
        await Playlist.deleteOne({ _id: playlistId });
      }

      return await user.save();
    },
    removeAllPlaylists: async (root, data, context, info) => {
      if (!context.user) throw new AuthenticationError('You must be connected.');
      var user = await User.findById(context.user.id);

      if (user.playlists.length > 0) {
        await Playlist.deleteMany({ creator: user._id });

        user.playlists = [];

        await user.save();
      }

      return user.playlists.length === 0;
    },
    addToMusics: async (root, { musicId }) => {

      var user = await User.findByIdAndUpdate(_id, {
        $push: {
          musics: musicId
        }
      })
      return await user.save();
    },
    removeFromMusics: async (root, { musicId }, context, info) => {
      if (!context.user) throw new AuthenticationError('You must be connected.');

      var user = await User.findByIdAndUpdate(context.user.id, {
        $pull: {
          musics: {
            _id: musicId,
          }
        }
      })

      return await user.save();
    },
    login: async (root, { username, password }, context, info) => {
      if (!username || !password) throw UserInputError('Login credentials check error');

      const user = await User.findOne({ username });
      if (!user) throw new AuthenticationError('Invalid credentials');

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError('Invalid credentials');

      const token = getToken(user);

      return {
        id: user._id,
        ...user._doc,
        token,
      };
    },
  }
};

const getToken = ({ id, username, email }) =>
  jwt.sign(
    {
      id,
      username,
      email
    },
    process.env.SECRET,
    { expiresIn: '1d' }
  );

export const getUser = (token) => {
  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log('getUser err', err);
    console.log('getUser decoded', decoded);

    // TODO: return the complete user from mongoose ?
    return decoded;
  });
}