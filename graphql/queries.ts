import { GraphQLString } from "graphql";

export const hello = {
  type: GraphQLString, // Specifies the return type of the query.
  description: "Hello World", // A simple description for documentation.
  resolve: () => "Hello World", // Resolver function that returns the output.
};
