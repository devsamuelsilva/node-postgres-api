import Fastify from 'fastify';

// CommonJs
const fastify = Fastify({
    logger: true
});
// Declare a route
fastify.get('/', function (request, reply) {
  reply.send(
    {
        "code" : 201,
        "status": "UP",
        "message": "Servidor Rodando!"
    }
  )
})
// Run the server!
fastify.listen({ port: 5005 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`);
});