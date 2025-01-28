import 'dotenv/config';
import { MongoClient } from "mongodb";

class dbClient {
    constructor() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=Workshop-1`; // Usar backticks aquí
        this.client = new MongoClient(queryString);
        this.conectarDB();
    }

    async conectarDB() {
        try {
            await this.client.connect();
            this.db = this.client.db('adopcion'); // adopcion es la coleccion de la base de datos.
            console.log("Se conectó al servidor de la BD...");
        } catch (e) {
            console.error("Error al conectar con la base de datos:", e);
        }
    }
}

export default new dbClient();
