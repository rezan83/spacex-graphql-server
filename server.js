const express = require("express");
const {schema, rootResolver} = require("./schema");
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors")
const expressPlayground = require("graphql-playground-middleware-express")
    .default;


const App = express();
App.use(cors());

const graph = graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: true,
});
const PORT = process.env.PORT || 4000;

App.use("/graphql", graph);


App.get(
    "/playground",
    expressPlayground({
        endpoint: "/graphql",
    })
);

App.listen(PORT, console.info(`server running on port: ${PORT}`));
