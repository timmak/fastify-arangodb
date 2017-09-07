const test = require('tap').test
const Fastify = require('fastify')
const fastifyArangoDB = require('./index')

test('fastify.arango should exist', assert => {
  assert.plan(3)

  const fastify = Fastify()

  fastify.register(
    fastifyArangoDB,
    {
      url: 'http://127.0.0.1:8529'
    },
    err => {
      assert.error(err)
    }
  )

  fastify.ready(err => {
    assert.error(err)
    assert.ok(fastify.arango)
    fastify.close()
  })
})
