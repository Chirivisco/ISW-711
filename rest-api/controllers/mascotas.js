class mascotasController {
    constructor() {

    }

    async create(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).status.json({ status: 'create-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).status.json({ status: 'update-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async delete(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).status.json({ status: 'delete-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async getAll(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).status.json({ status: 'getAll-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }

    async getOne(req, res) { // metodo asincrono porque se espera una respuesta
        try {
            res.status(201).status.json({ status: 'getOne-ok' })
        }
        catch (e) {
            res.status(500).send(e);
        }
    }
}

export default new mascotasController(); //vuelve publica las instancias del controller.