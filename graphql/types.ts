import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "../models/User.ts";

export const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
});

export const GraphQLPost = new GraphQLObjectType({
  name: "Post",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: GraphQLUser,
      resolve: (post) => User.findById(post.author),
    },
  },
});
