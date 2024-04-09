import { config } from "../DB/config.js";

export const produtoService = {

    buscarTodos: async (request, reply) => {
        const query = 'SELECT * FROM produtos';
      
        try {
          const result = await config.query(query);
          reply.send({
            qtd: result.rowCount,
            data: result.rows
          });
        } catch (err) {
          console.log(err);
          reply.send(500);
        }
      },



}