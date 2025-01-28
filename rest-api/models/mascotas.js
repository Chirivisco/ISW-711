import dbClient from "../config/dbClient.js";

class mascotasModel {
    async create(mascota) {
        try {
            const colMascotas = dbClient.db.collection('mascotas');
            const result = await colMascotas.insertOne(mascota);
            return result;
        } catch (error) {
            console.error("Error al insertar mascota:", error);
            throw error;
        }
    }
}

export default new mascotasModel;