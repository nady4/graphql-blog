import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { User } from "../models/User.ts";
import { Post } from "../models/Post.ts";
import { Comment } from "../models/Comment.ts";

export const GraphQLUser = new GraphQLObjectType({
  name: "User",
  description: "User",
  fields: {
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
});

export const GraphQLPost = new GraphQLObjectType({
  name: "Post",
  description: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: GraphQLUser,
      resolve: (post) => User.findById(post.author),
    },
    comments: {
      type: new GraphQLList(GraphQLComment),
      resolve: (post) => Comment.find({ post: post._id }),
    },
  }),
});

export const GraphQLComment = new GraphQLObjectType({
  name: "Comment",
  description: "Comment",
  fields: {
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    author: {
      type: GraphQLUser,
      resolve: (comment) => User.findById(comment.author),
    },
    post: {
      type: GraphQLPost,
      resolve: (comment) => Post.findById(comment.post),
    },
  },
});
