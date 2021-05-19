export const typeDefs = gql`
  type Playlist {
    name: String
    creator: User
    musics: [Music]
  }

  type Query {
    get_playlist(_id: ID!): Playlist
    playlists: [Playlist]
  }
`;

export const resolvers = {
  Query: {
    project: async (root, { _id }, context, info) => {
      return await Project.findOne({ _id }).populate('musics');
    },
  },
  Mutation: {

  }
};