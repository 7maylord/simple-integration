import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./graphql/schema";
import connectToMongoDB from "./db";

dotenv.config();

const app = express();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs, // GraphQL schema definitions
  resolvers, // GraphQL resolvers
});

//  Initialize Apollo Server middleware with CORS and JSON parsing
app.use(cors());
app.use(json());
app.use("/graphql", expressMiddleware(server));

// Connect to MongoDB before starting the server
connectToMongoDB()
  .then(() => {
    const PORT = process.env.PORT || 3020;
    app.listen(PORT, () => {
      console.log(` 🚀 Server running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
