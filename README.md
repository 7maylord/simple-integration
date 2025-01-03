# Web2-Web3 Service

A Node.js backend service demonstrating Web2 and Web3 integration using GraphQL, MongoDB, and Ethereum smart contracts.

## Features

1. **Web3 Interaction (Blockchain)**:
   - Query: Fetch the current value from the Ethereum smart contract.
   - Mutation: Update the value in the smart contract.

2. **Web2 Interaction (MongoDB)**:
   - Query: Fetch a list of users from MongoDB.
   - Mutation: Add a new user to MongoDB.

## Tech Stack

- Node.js
- TypeScript
- GraphQL
- MongoDB
- ethers.js
- Solidity (Smart Contract)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/web2-web3-service.git
   cd web2-web3-service
   ```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables in a .env file (refer to .env in the project).

4. Compile TypeScript:

```bash
npm run build
```
5. Start the development server:

```bash
npm run dev
```
## Deployment
Deploy this service to platforms like Vercel, Render, or Heroku. Ensure environment variables are configured correctly.

## GraphQL Endpoints
1. Query Users:

```graphql
query {
  users {
    id
    name
    email
    createdAt
  }
}
```
2. Add User:

```graphql
mutation {
  addUser(name: "John Doe", email: "john@example.com") {
    id
    name
  }
}
```
3. Get Contract Value:

```graphql
query {
  contractValue
}
```
4. Update Contract Value:

```graphql
mutation {
  updateContractValue(newValue: 42)
}
```

## License
MIT