const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const TrackAPI = require('./datasources/track-api.js');

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                trackAPI: new TrackAPI(),
            }; 
        },
    });

    const { url, port } = await server.listen();
    console.log(`
        🚀  Server is running!
        🔉  Listening on port ${port}
        📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);