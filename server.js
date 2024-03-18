import Fastify from 'fastify';
import { connection } from './DB/db.js';
import { config } from './DB/config.js';

connection();
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

// mostrando todos os produtos
// fastify.get('/produtos', async (request, reply) => {
//   const query = 'SELECT * FROM produtos';

//   try {
//     const result = await config.query(query);
//     reply.send(result.rows);

//   } catch (err) {
//     console.log(err);
//     reply.send(500);
//   }
// });


// aplicando alguns filtros
fastify.get('/produtos', async (request, reply) => {
  const query = 'SELECT nome FROM produtos';

  try {
    const result = await config.query(query);
    reply.send(result.rows);
  } catch (err) {
    console.log(err);
    reply.send(500);
  }
});




// Run the server!
fastify.listen({ port: 5005 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`);
  console.log("teste");
});



