import { Playlist } from "../Model/Playlist";
import { Music } from "../Model/Music";
import { UserInputError } from "apollo-server";
import { User } from "../Model/User";

export const typeDef = `
  type Playlist {
    _id: ID!
    name: String!
    description: String
    creator: User!
    musics: [Music]
  }

  input PlaylistInput{
    name: String!
    description: String
    creator: ID!
  }

  extend type Query {
    playlist(_id: ID!): Playlist
    playlists: [Playlist]
    playlistsFromCreator(creator: ID!): [Playlist]
  }

  extend type Mutation {
    createPlaylist(name: String!, description: String!, creator: ID!): Playlist
    createPlaylistWithInput(input: PlaylistInput!): Playlist
    addMusicToPlaylist(_id: ID!, musicId: ID!): Playlist
    removeMusicFromPlaylist(_id: ID!, musicId: ID!): Playlist
    updatePlaylist(_id: ID!, playlistInput: PlaylistInput!): Playlist
    deletePlaylist(_id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    playlists: async () => {
      return await Playlist.find().populate('creator').populate('musics');
    },
    playlist: async (root, { _id }, context, info) => {
      return await Playlist.findOne({ _id }).populate('creator').populate('musics');
    },
    playlistsFromCreator: async (root, { creator }, context, info) => {
      return await Playlist.findOne({ creator }).populate('creator').populate('musics');
    },
  },
  Mutation: {
    createPlaylist: async (root, { name, description, creator }, context, info) => {

      if (name === '' || description === '') throw new UserInputError('Invalid blank values.');

      if ((!creator || creator === '') && !context.user) throw new UserInputError('Invalid creator.');

      if (!creator || creator === '') creator = context.user.id;

      const newPlaylist = await Playlist.create({ name, description, creator });

      const user = await User.findByIdAndUpdate(creator, {
        $push: {
          playlists: newPlaylist
        }
      });

      return newPlaylist;
    },
    createPlaylistWithInput: async (root, { playlistInput }, context, info) => {
      if (playlistInput.name === '' || playlistInput.description === '') throw new UserInputError('Invalid blank values.');

      if ((!playlistInput.creator || playlistInput.creator === '') && !context.user) throw new UserInputError('Invalid creator.');

      if (!playlistInput.creator || playlistInput.creator === '') playlistInput.creator = context.user.id;

      const newPlaylist = await Playlist.create(playlistInput);

      const user = await User.findByIdAndUpdate(playlistInput.creator, {
        $push: {
          playlists: newPlaylist
        }
      });

      return await newPlaylist;
    },
    addMusicToPlaylist: async (root, { _id, musicId }) => {
      var music = await Music.findById(musicId);
      var playlist = await Playlist.findByIdAndUpdate(_id, {
        $push: {
          musics: music
        }
      });
      return await playlist.save();
    },
    removeMusicFromPlaylist: async (root, { _id, musicId }) => {
      var music = await Music.findById(musicId);
      var playlist = await Playlist.findByIdAndUpdate(_id, {
        $pull: {
          musics: music._id
        }
      });
      return await playlist.save();
    },
    updatePlaylist: async (root, { _id, playlistInput }) => {
      return Playlist.findByIdAndUpdate(_id, playlistInput, { new: true });
    },
    deletePlaylist: async (root, { _id }, context, info) => {
      const playlist = await Playlist.findById(_id);

      await User.findByIdAndUpdate(playlist.creator, {
        $pull: {
          playlists: playlist._id
        }
      });

      const result = await Playlist.deleteOne({ _id });


      return result.deletedCount > 0;
    },
  }
};