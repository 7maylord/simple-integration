import { gql } from 'graphql-tag';
import User from '../model/user';
import { getValue, setValue } from '../ethereum';

/**
 * GraphQL schema definitions.
 */
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  type Query {
    users: [User!]!          # Fetch all users from MongoDB
    contractValue: Int!      # Fetch current value from Ethereum smart contract
  }

  type Mutation {
    addUser(name: String!, email: String!): User!   # Add a new user to MongoDB
    updateContractValue(newValue: Int!): String!    # Update value in Ethereum smart contract
  }
`;

/**
 * Resolvers for handling GraphQL operations.
 */
export const resolvers = {
  Query: {
    /**
     * Fetch all users from MongoDB.
     */
    users: async () => {
      return await User.find();
    },

    /**
     * Fetch the current value from the Ethereum smart contract.
     */
    contractValue: async () => {
      return await getValue();
    },
  },

  Mutation: {
    /**
     * Add a new user to MongoDB.
     * @param {Object} args - Contains name and email for the new user.
     */
    addUser: async (_: any, args: { name: string; email: string }) => {
      const user = new User(args);
      return await user.save();
    },

    /**
     * Update the value in the Ethereum smart contract.
     * @param {Object} args - Contains the new value to set.
     */
    updateContractValue: async (_: any, args: { newValue: number }) => {
      await setValue(args.newValue);
      return 'Value updated successfully in the smart contract.';
    },
  },
};
