export const typeDefs = gql`
  type Project {
    name: String
    creator: User
    tasks: [Task]
  }

  type Query {
    get_project(_id: ID!): Project
    project: [Project]
  }
`;

export const resolvers = {
    Query: {
      project: async (root, { _id }, context, info) => {
        return await Project.findOne({_id}).populate('tasks');
      },
      userSchemaAssert: async () => {
        return "Hello world, from User schema";
      },
    },
    Mutation: {
    
    }
  };