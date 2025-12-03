"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: schema_1.schema,
        rootValue: resolvers_1.resolvers,
        graphiql: true,
    }));
    app.get("/health", (_req, res) => {
        res.sendStatus(200);
    });
    return app;
}
//# sourceMappingURL=app.js.map