const fastify = require('fastify')()

fastify.register(
  require('./'),
  {
    url: 'http://root:root@localhost:8529'
  },
  err => {
    if (err) throw err
  }
)

fastify.get('/user/:id', async (req, reply) => {
  const collection = fastify.arango.collection('users')
  collection.document(req.params.id).then(user => {
    reply.send(user)
  })
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
