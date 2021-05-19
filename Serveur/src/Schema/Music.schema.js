import { Music } from '../Model/Music';

export const typeDefs = gql`
  type Music {
    _id: ID!
    title: String
    duration: Number
    author: User
    feat: [User]
  }

  type MusicInput {
    title: String
    duration: Number
    author: User
    feat: [User]
  }

  extend type Query {
    musics: [Music]
    music(_id: ID!): Music
  }

  extend type Mutation {
    createMusic(title: String!, author: User!, duration: Number!, feat: [User!]): Music
    createFromMusic(music: MusicInput!): Music
    updateMusic(_id: ID!, music: MusicInput!!): Music
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
    createFromMusic: async (root, { music }, context, info) => {
      return await Music.create(music);
    },
    updateMusic: async (root, { _id, music }, context, info) => {
      return Music.findByIdAndUpdate(_id, music, { new: true });
    },
    deleteMusic: async (root, { _id }, context, info) => {
      return Music.remove({ _id });
    }
  }
};