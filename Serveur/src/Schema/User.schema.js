const { GraphQLScalarType, Kind } = require('graphql');
import { ApolloServer, gql } from 'apollo-server';

export const dateScalar = new GraphQLScalarType({
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

export const typeDefs = gql`
  scalar Date

  type User {
    name: String
    surname: String
    dateOfBirth: Date
    friends: [User]
    project: [Project]
  }

  type Query {
    user: [User]
    get_user(_id: ID!): User
  }
`;

export const resolvers = {
  Date: dateScalar,
  Query: {
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
    user: async (root, { _id }, context, info) => {
      return await User.findOne({ _id }).populate('tasks');
    },
  },
  Mutation: {

  }
};