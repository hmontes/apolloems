const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express') ;
const bodyParser = require('body-parser') ;
const { makeExecutableSchema } = require('graphql-tools');

const ems = require('easy-modularization-scheme')

const schema = makeExecutableSchema(ems());

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `Easy Modularization Scheme is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));