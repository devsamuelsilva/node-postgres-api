import Fastify from 'fastify';
import { connection, deleteProduto } from './DB/db.js';
import { config } from './DB/config.js';
import { produtosRoutes } from './routes/produto.route.js';

connection();
// CommonJs
const fastify = Fastify({
    logger: false
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

produtosRoutes(fastify);

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

fastify.get('/produto/:id', async (request, reply) => {
  const id = request.params.id;
  //DOLAR1($1) e usado apra receber o dados do paramentro posto no RESULTTTT
  const query = 'SELECT * FROM produtos WHERE id=$1'
  try {
    const result = await config.query(query,[id]);
    reply.send(result.rows);
  } catch (err) {
    console.log(err);
    reply.send(500);
  }
});


//Utilizando o metodo de post para adicionar um novo produto ao banco
fastify.post('/produtos', async (request, reply) => {
  const { nome, categoria, preco, desconto } = request.body;

  //const query = 'INSERT INTO produtos (nome, categoria, preco, desconto) VALUES ($1, $2, $3, $4)';
  
  //retornando o objeto inserido. (RETURNING no final sempre trará o que foi pedido da query, para retornar todos as colunas RETURNING *)
  //DOLAR1($1) dentro do VALUE e usado apra receber o dados do paramentro posto no RESULT
  const query = 'INSERT INTO produtos (nome, categoria, preco, desconto) VALUES ($1, $2, $3, $4) RETURNING *';

  try {
   const result = await config.query(query, [nome, categoria, preco, desconto]);
    reply.code(201).send({ 
      message: 'Produto criado com sucesso!', 
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    reply.code(400).send({ message: 'Erro ao inserir produto' });
  }
});

fastify.delete('/produtos/:id', async (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM produtos WHERE id = ${id}`;
  console.log(`[QUERY]: ${query}`);
  const result = await config.query(query);
  // res.json()
  res.status(204).send(`Produto de id: ${id} deletado com sucesso !!`);
  return result;
})

//Fazer o PUT e um PATCH para a SEGUNDA.

//PUT
fastify.put('/produtos/:id', async (req, reply) => {
  const id = req.params.id;
  const {nome, preco} = req.body; // This will hold the data to update

  // Validation (Optional): Ensure required fields are present in req.body

  // Build the UPDATE query dynamically using template literals for security
  const query = `UPDATE produtos SET nome = '${nome}', preco = ${preco} WHERE id = ${id} RETURNING *`;
  console.log(`[QUERY]: ${query}`);

  try {
    const result = await config.query(query);
    reply.code(201).send({ 
      message: 'Produto atualizado com sucesso!', 
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    reply.code(400).send({ message: 'Erro ao atualizar o produto' });
  }
});



// Run the server!
fastify.listen({ host:'0.0.0.0', port: 5005 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`);
  console.log("teste");
});



