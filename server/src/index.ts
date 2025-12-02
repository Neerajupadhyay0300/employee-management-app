import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const app = express();
app.use(cors());
app.use(helmet());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 GraphQL server running on http://localhost:${PORT}/graphql`);
});
