import Fastify from 'fastify';
import { connection, deleteProduto } from './DB/db.js';
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
  const query = 'SELECT id FROM produtos';

  try {
    const result = await config.query(query);
    reply.send(result.rows);
  } catch (err) {
    console.log(err);
    reply.send(500);
  }
});

// Utilizando o metodo de post para adicionar um novo produto ao banco
// fastify.post('/produtos', async (request, reply) => {
//   const { nome, categoria, preco } = request.body;

//   const query = 'INSERT INTO produtos (nome, categoria, preco) VALUES ("Produto Teste", "TESTE", $9999,99)';

//   try {
//     await config.query(query, [nome, categoria, preco]);
//     reply.code(201).send({ message: 'Produto criado com sucesso!' });
//   } catch (err) {
//     console.error(err);
//     reply.code(400).send({ message: 'Erro ao inserir produto' });
//   }
// });

fastify.delete('/produtos/:id', async (req, res) => {
  await deleteProduto(req.params.id);
  res.status(204);
})





// Run the server!
fastify.listen({ port: 5005 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`);
  console.log("teste");
});



