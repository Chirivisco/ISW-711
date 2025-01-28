import dbClient from "../config/dbClient.js";

class mascotasModelo{
    async create () {
        const colMascotas = dbClient.db.collection('mascotas');
    }

}