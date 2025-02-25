import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { hello } from "./queries.ts";

const RootType = new GraphQLObjectType({
  name: "Root",
  description: "Root Query",
  fields: {
    hello, // Adding the hello query as a field in our root query.
  },
});

export const schema = new GraphQLSchema({
  query: RootType,
});
