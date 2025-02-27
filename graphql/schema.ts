import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { user, users, post, posts } from "./queries.ts";
import {
  login,
  register,
  createPost,
  updatePost,
  deletePost,
} from "./mutations.ts";

const RootType = new GraphQLObjectType({
  name: "Root",
  description: "Root Query",
  fields: {
    user,
    users,
    post,
    posts,
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: {
    login,
    register,
    createPost,
    updatePost,
    deletePost,
  },
});

export const schema = new GraphQLSchema({
  query: RootType,
  mutation: MutationType,
});
