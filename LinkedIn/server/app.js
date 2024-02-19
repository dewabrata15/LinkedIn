const database = require('./config/mongodb')

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const resolverUser = require('./resolvers/user')
const schemaUser = require('./schemas/user')
const resolverPost = require('./resolvers/post')
const schemaPost = require('./schemas/post');
const { authentication } = require('./middlewares/auth');

const server = new ApolloServer({
  typeDefs: [schemaUser, schemaPost],
  resolvers: [resolverUser, resolverPost],
});

async function run() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 3000 },
      context: ({ req }) => {
        return {
          authentication: async () => {
            return await authentication(req)
          }
        }
      }
    });
    console.log(url);
  } catch (error) {
    console.log(error)
  }
}

run()