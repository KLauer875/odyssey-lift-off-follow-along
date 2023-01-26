const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema.js");
const resolvers = require('./resolvers.js');
const TrackAPI = require('./datasources/track-api.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            trackAPI: new TrackAPI(),
        }; 
    },
});

server.listen().then(() => {
    console.log(`
        🚀  Server is running!
        🔉  Listening on port 4000
        📭  Query at http://localhost:4000
    `);
});