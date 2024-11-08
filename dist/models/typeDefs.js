"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
  type Query {
    hello: String
    welcome(name: String): String
    users: [User]
    user(id: ID): User
  }
  type User {
    id: ID
    name: String
    password: String
    email: String
    avatar: String
    cart: [String]
  }
  type Mutation {
    create(
      name: String
      password: String
      email: String
      avatar: String
      cart: [String]
    ): User
    update(
      id: ID
      name: String
      password: String
      email: String
      avatar: String
      cart: [String]
    ): User
    delete(id: ID): User
  }
`;
