import express from "express";
import { connectDB } from "./db/index.ts";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.ts";

await connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("✅ Listening on port 3000!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
