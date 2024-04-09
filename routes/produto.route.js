import { produtoService } from "../service/produto.service.js"

 export const produtosRoutes = (fastify) => {
    fastify.get('/produtos', produtoService.buscarTodos )
};


