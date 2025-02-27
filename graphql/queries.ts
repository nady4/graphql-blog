import { GraphQLList, GraphQLID } from "graphql";
import { GraphQLUser, GraphQLPost } from "./types.ts";
import { User } from "../models/User.ts";
import { Post } from "../models/Post.ts";

export const user = {
  type: GraphQLUser,
  description: "User",
  args: {
    _id: { type: GraphQLID },
  },
  resolve: (_: any, { _id }) => User.findById(_id),
};

export const users = {
  type: new GraphQLList(GraphQLUser),
  description: "Users",
  resolve: () => User.find(),
};

export const post = {
  type: GraphQLPost,
  description: "Post",
  args: {
    _id: { type: GraphQLID },
  },
  resolve: (_: any, { _id }) => Post.findById(_id),
};

export const posts = {
  type: new GraphQLList(GraphQLPost),
  description: "Posts",
  resolve: () => Post.find(),
};
