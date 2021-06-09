import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { schema } from "./src/schema";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const server = new ApolloServer({
  schema, context: ({ req }) => {
    const token = req.headers.authorization || '';

    // TODO: getUser has to be created ? Use the mongoose to find it ?
    const user = getUser(token);

    return { user };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});