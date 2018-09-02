const fp = require("fastify-plugin");
const ArangoDB = require("arangojs");

function fastifyArangoDB(fastify, { database, auth, ...options }, next) {
  const arango = new ArangoDB.Database(options);
  if (database) {
    arango.useDatabase(database);
  }
  if (auth) {
    arango
      .login(auth.username, auth.password)
      .then(token => arango.useBearerAuth(token))
      .then(() => fastify.decorate("arango", arango).addHook("onClose", close))
      .then(next)
      .catch(next);
  } else {
    fastify.decorate("arango", arango).addHook("onClose", close);
    next();
  }
}

function close(fastify, done) {
  fastify.arango.close && fastify.arango.close();
  done();
}

module.exports = fp(fastifyArangoDB, ">=0.13.1");
