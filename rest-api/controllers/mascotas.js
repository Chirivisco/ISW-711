import mascotasModel from '../models/mascotas.js';

class mascotasController {
    constructor() {

    }

    async create(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            const data = mascotasModel.create(req.body);
            res.status(201).json(data)
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).json({ status: 'update-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async delete(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).json({ status: 'delete-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async getAll(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).json({ status: 'getAll-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async getOne(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).json({ status: 'getOne-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }
}

export default new mascotasController(); //vuelve publica las instancias del controller.