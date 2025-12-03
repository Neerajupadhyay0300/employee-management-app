import express from "express";
import cors from "cors";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

export function createApp() {
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

  app.get("/health", (_req, res) => {
    res.sendStatus(200);
  });

  return app;
}

