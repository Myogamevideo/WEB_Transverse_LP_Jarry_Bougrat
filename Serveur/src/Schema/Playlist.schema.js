import { Playlist } from "../Model/Playlist";
import { Music } from "../Model/Music";

export const typeDefs = gql`
  type Playlist {
    _id: ID!
    name: String
    description: String
    creator: User
    musics: [Music]
  }

  input PlaylistInput{
    name: String
    description: String
    creator: User
  }

  extend type Query {
    playlist(_id: ID!): Playlist
    playlists: [Playlist]
    playlistsFromCreator(creator: ID!): [Playlist]
  }

  extend type Mutation {
    createPlaylist(name: String!, description: String!, creator: User!): Playlist
    createPlaylistWithInput(input: PlaylistInput!): Playlist
    addMusicToPlaylist(_id: ID!, musicInput: MusicInput!): Playlist
    updatePlaylist(_id: ID!, playlistInput: PlaylistInput!): Playlist
    deletePlaylist(_id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    playlists: async () => {
      return await Playlist.find().populate('musics');
    },
    playlist: async (root, { _id }, context, info) => {
      return await Playlist.findOne({ _id }).populate('musics');
    },
    playlistsFromCreator: async (root, { creator }, context, info) => {
      return await Playlist.findOne({ creator }).populate('musics');
    },
  },
  Mutation: {
    createPlaylist: async (root, { name, description, creator }, context, info) => {
      return await Playlist.create({ name, description, creator });
    },
    createPlaylistWithInput: async (root, { playlistInput }, context, info) => {
      return await Playlist.create(playlistInput);
    },
    addMusicToPlaylist: async (root, { _id, musicInput }) => {
      var music = await Music.create(musicInput);
      var playlist = await Playlist.findByIdAndUpdate(_id, {
        $push: {
          musics: music
        }
      })
      return await playlist.save();
    },
    // TODO: add remove from playlist
    updatePlaylist: async (root, { _id, playlistInput }) => {
      return Playlist.findByIdAndUpdate(_id, playlistInput, { new: true });
    },
    deletePlaylist: async (root, { _id }, context, info) => {
      return Playlist.remove({ _id });
    },
  }
};