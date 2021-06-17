import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { schema } from "./src/schema";
import dotenv from 'dotenv';
import { getUser } from './src/Schema/User.schema';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const server = new ApolloServer({
  schema, context: ({ req }) => {
    const token = req.headers.authorization || '';

    if (token === "") return;

    const user = getUser(token);

    return { user };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});