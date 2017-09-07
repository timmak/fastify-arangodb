# fastify-arangodb

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  
[![Build Status](https://travis-ci.org/timmak/fastify-mongodb.svg?branch=master)](https://travis-ci.org/timmak/fastify-arangodb)

Fastify ArangoDB plugin, with this you can share the same arangodb instance pool in every part of your server.

Under the hood the official [arangojs](https://github.com/arangodb/arangoj) driver is used, the options that you pass to `register` will be passed to the ArangoDB client. Passing an object to options is *required*.

## Install
```
npm i fastify-arangodb --save
```
## Usage
Add it to you project with `register` and you are done! 
You can access the *Arango* instance via `fastify.arango` 

```js
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
}).log(`server listening on ${fastify.server.address().port}`)
})
```

## License

Licensed under [ISC](./LICENSE).