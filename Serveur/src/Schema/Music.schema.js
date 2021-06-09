import { Music } from '../Model/Music';

export const typeDef = `
  type Music {
    _id: ID!
    title: String!
    duration: Int
    author: User!
    feat: [User]
  }

  input MusicInput {
    title: String!
    duration: Int
    author: ID!
    feat: [ID]
  }

  extend type Query {
    musics: [Music]
    music(_id: ID!): Music
  }

  extend type Mutation {
    createMusic(title: String!, author: ID!, duration: Int, feat: [ID!]): Music
    createFromMusic(musicInput: MusicInput!): Music
    updateMusic(_id: ID!, musicInput: MusicInput!): Music
    deleteMusic(_id: ID!): Boolean
  }
`;


export const resolvers = {
  Query: {
    musics: async () => {
      return Music.find().populate('author').populate('feat');
    },
    music: async (root, { _id }, context, info) => {
      return Music.findOne({ _id }).populate('author').populate('feat');
    }
  },
  Mutation: {
    createMusic: async (root, { title, author, duration, feat }, context, info) => {
      return await Music.create({ title, author, duration, feat });
    },
    createFromMusic: async (root, { musicInput }, context, info) => {
      return await Music.create(musicInput);
    },
    updateMusic: async (root, { _id, musicInput }, context, info) => {
      return Music.findByIdAndUpdate(_id, musicInput, { new: true });
    },
    deleteMusic: async (root, { _id }, context, info) => {
      return Music.remove({ _id });
    }
  }
};