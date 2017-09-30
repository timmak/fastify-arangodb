const fp = require('fastify-plugin')
const ArangoDB = require('arangojs')
const isObject = require('lodash.isobject')

function fastifyArangoDB (fastify, options, next) {
  if (!isObject(options)) {
    next(
      new Error(
        'ArangoDB Database options should be an object https://github.com/arangodb/arangojs#new-database'
      )
    )
  }
  const arango = new ArangoDB.Database(options)
  fastify.decorate('arango', arango)

  next()
}

module.exports = fp(fastifyArangoDB, '>=0.13.1')
