import { Music } from '../Model/Music';
import { Playlist } from '../Model/Playlist';
import { User } from '../Model/User';

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
      if (title === '' || duration === '') throw new UserInputError('Invalid blank values.');

      if ((!author || author === '') && !context.user) throw new UserInputError('Invalid creator.');

      if (!author || author === '') author = context.user.id;

      const newMusic = await Music.create({ title, author, duration, feat });

      const user = await User.findByIdAndUpdate(author, {
        $push: {
          musics: newMusic
        }
      });

      return newMusic;
    },
    createFromMusic: async (root, { musicInput }, context, info) => {
      if (musicInput.title === '' || musicInput.duration === '') throw new UserInputError('Invalid blank values.');

      if ((!musicInput.author || musicInput.author === '') && !context.user) throw new UserInputError('Invalid creator.');

      if (!musicInput.author || musicInput.author === '') musicInput.author = context.user.id;

      const newMusic = await Music.create(musicInput);

      const user = await User.findByIdAndUpdate(musicInput.author, {
        $push: {
          musics: newMusic
        }
      });

      return newMusic;
    },
    updateMusic: async (root, { _id, musicInput }, context, info) => {
      return Music.findByIdAndUpdate(_id, musicInput, { new: true });
    },
    deleteMusic: async (root, { _id }, context, info) => {
      const music = await Music.findById(_id);

      await User.findByIdAndUpdate(music.author, {
        $pull: {
          musics: music._id
        }
      });

      await Playlist.updateMany({ musics: music._id }, {
        $pull: {
          musics: music._id
        }
      });

      const result = await Music.deleteOne({ _id: music._id });

      return result.deletedCount > 0;
    }
  }
};