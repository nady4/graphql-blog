import { GraphQLString, GraphQLID } from "graphql";
import { GraphQLPost } from "./types.ts";
import { User } from "../models/User.ts";
import { Post } from "../models/Post.ts";
import { createJWT } from "../util/auth.ts";
import bcrypt from "bcrypt";

export const register = {
  type: GraphQLString,
  description: "Register",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const user = new User(args);

    if (await User.findOne({ email: args.email })) {
      throw new Error("❓ User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(args.password, salt);

    await user.save();
    const token = createJWT({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    return token;
  },
};

export const login = {
  type: GraphQLString,
  description: "Login",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const user = await User.findOne({ email: args.email }).select("+password");

    if (!user) {
      throw new Error("❓ User not found");
    }
    if (!(await bcrypt.compare(args.password, user.password))) {
      throw new Error("❌ Invalid password");
    }

    const token = createJWT({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    return token;
  },
};

export const createPost = {
  type: GraphQLPost,
  description: "Create Post",
  args: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  resolve: async (_: any, args: any, { user }) => {
    if (!user) {
      throw new Error("❓ Unauthorized");
    }

    const post = new Post({
      title: args.title,
      content: args.content,
      author: user._id,
    });

    return await post.save();
  },
};

export const updatePost = {
  type: GraphQLPost,
  description: "Update Post",
  args: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  resolve: async (_: any, args: any, { user }) => {
    const post = await Post.findById(args._id);

    if (!post) {
      throw new Error("❓ Post not found");
    }

    if (post.author.toString() !== user._id) {
      throw new Error("❓ Unauthorized");
    }

    post.title = args.title;
    post.content = args.content;
    return post.save();
  },
};

export const deletePost = {
  type: GraphQLPost,
  description: "Delete Post",
  args: {
    _id: { type: GraphQLID },
  },
  resolve: async (_: any, args: any, { user }) => {
    const post = await Post.findById(args._id);

    if (!post) {
      throw new Error("❓ Post not found");
    }

    if (post.author.toString() !== user._id) {
      throw new Error("❓ Unauthorized");
    }

    return post.deleteOne();
  },
};
