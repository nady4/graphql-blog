import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { hello } from "./queries.ts";
import { login, register } from "./mutations.ts";

const RootType = new GraphQLObjectType({
  name: "Root",
  description: "Root Query",
  fields: {
    hello,
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: {
    login,
    register,
  },
});

export const schema = new GraphQLSchema({
  query: RootType,
  mutation: MutationType,
});
