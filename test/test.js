const test = require("tap").test;
const Fastify = require("fastify");
const fastifyArangoDB = require("..");

test("fastify.arango should exist", assert => {
  assert.plan(1);

  const fastify = Fastify();

  fastify.register(fastifyArangoDB, {
    url: "http://127.0.0.1:8529"
  });

  fastify.ready(err => {
    // assert.error(err);
    assert.ok(fastify.arango);
    fastify.close();
  });
});

test("fastify.arango with database and auth should exist", assert => {
  assert.plan(1);

  const fastify = Fastify();

  fastify.register(
    fastifyArangoDB,
    {
      url: "http://127.0.0.1:8529",
      database: "test",
      auth: {
        username: "root",
        password: "root"
      }
    },
    err => {
      assert.error(err);
    }
  );

  fastify.ready(err => {
    // assert.error(err);
    assert.ok(fastify.arango);
    fastify.close();
  });
});
