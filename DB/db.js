import { config } from "./config.js";

export const connection = async () => {
    try {
        // Metodos connect e o que  tenta a conexao com o banco.
        await config.connect();

        console.log('PostgreSQL conectado com sucesso!');
    } catch (err) {
        console.log('Erro ao conectar com o banco: ', err);
    }
}

export const deleteProduto = async (id) => {

    return await  config.query('DELETE FROM produtos where id=$1', [id]);

}

// export const postProduto = async () => {

// }