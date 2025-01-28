import express from 'express';
import mascotaController from '../controllers/mascotas.js'
import mascotas from '../controllers/mascotas.js';

const route = express.Router();
route.post('/', mascotaController.create); // crea mascotas
route.get('/:id', mascotaController.getOne); // obtiene una mascota
route.get('/', mascotaController.getAll); // obtiene todas las mascotas
route.put('/:id', mascotaController.update); // modifica mascotas. Tambien se puede usar el '.patch()'
route.delete('/:id', mascotaController.delete); // borra una mascota

export default route;