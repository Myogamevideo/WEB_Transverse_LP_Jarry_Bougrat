import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { schema } from "./src/schema";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const server = new ApolloServer({ schema, mocks: true });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});