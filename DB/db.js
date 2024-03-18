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