import { GraphQLString } from "graphql";
import { User } from "../models/User.ts";

export const register = {
  type: GraphQLString,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const user = new User(args);
    await user.save();
    return "✅ User registered successfully!";
  },
};

export const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error("❓ User not found");
    }
    if (user.password !== args.password) {
      throw new Error("❌ Invalid password");
    }
    return "✅ Login successful";
  },
};
