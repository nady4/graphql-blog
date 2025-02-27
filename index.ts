import express from "express";
import { connectDB } from "./db/index.ts";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./graphql/schema.ts";
import { authenticate } from "./middlewares/auth.ts";

await connectDB();
const app = express();
app.use(authenticate);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("/graphql", createHandler({ schema }));

app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Listening on port ${process.env.PORT || 3000}!`);
});
