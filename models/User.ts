import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "❌ Please enter a valid e-mail address ✉️"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
