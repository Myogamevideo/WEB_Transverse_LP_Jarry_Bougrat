import { ApolloServer,gql } from 'apollo-server';
import { schema } from "./src/schema";

/** 
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

const typeDefs = gql`
  scalar Date

  type Project {
    name: String
    creator: User
    tasks: [Task]
  }

  type User {
    name: String
    surname: String
    dateOfBirth: Date
    friends: [User]
    project: [Project]
  }

  type Task {
    name: String
    duration: Int
    priority: Int
    asignee: [User]

  }

  type Query {
    get_user(_id: ID!): User
    get_project(_id: ID!): Project
    project: [Project]
    user: [User]
    task: [Task]
  }
`;

  projects: () => projects,
  users: () => users,
  task: () => tasks,

const projects = [
    {
      name: 'Soirée',
    creator: User,
    tasks: [Task],
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];


const resolvers = {
    Date: dateScalar,
    Query: {
      user: async (root, { _id }, context, info) => {
        return await User.findOne({_id}).populate('tasks');
      },
      project: async (root, { _id }, context, info) => {
        return await Project.findOne({_id}).populate('tasks');
      }
    },
  };

  **/

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ schema , mocks: true});
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});