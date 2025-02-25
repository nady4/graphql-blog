import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.ts";
import { connectDB } from "./db/index.ts";

await connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("✅ Listening on port 3000!");
});

app.use(
  "/graphql", // The URL path where GraphQL is accessible.
  graphqlHTTP({
    schema, // Providing the GraphQL schema.
    graphiql: true, // Enable GraphiQL for a user-friendly interface to test queries.
  })
);
