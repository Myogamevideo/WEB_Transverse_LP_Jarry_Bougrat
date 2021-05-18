export const typeDefs = gql`
  type Task {
    name: String
    duration: Int
    priority: Int
    asignee: [User]

  }

  type Query {
    task: [Task]
  }
`;


export const resolvers = {
    Query: {

    },
    Mutation: {
    
    }
  };