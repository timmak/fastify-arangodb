const fp = require("fastify-plugin");
const ArangoDB = require("arangojs");

async function fastifyArangoDB(fastify, { database, auth, options }, done) {
  const arango = new ArangoDB.Database(options);
  if (database) {
    arango.useDatabase(database);
  }
  if (auth) {
    try {
      let token = await arango.login(auth.username, auth.password);
      arango.useBearerAuth(token);
    } catch (e) {
      throw new Error(e);
    }
  }
  fastify.decorate("arango", arango);
  fastify.addHook("onClose", close);
  done();
}

function close(fastify, done) {
  fastify.arango.close && fastify.arango.close();
  done();
}

module.exports = fp(fastifyArangoDB, {
  fastify: ">=2.8.0",
  name: "fastify-arangodb"
});
