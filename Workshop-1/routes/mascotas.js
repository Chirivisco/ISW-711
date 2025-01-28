import express from 'express';
import mascotaController from '../controllers/mascotas.js'
import mascotas from '../controllers/mascotas.js';

const route = express.Router();
route.post('/', mascotaController.create); // crea mascotas
route.get('/:id', mascotaController.getOne); // obtiene una mascota
route.get('/', mascotasController.getAll); // obtiene todas las mascotas
route.put('/:id', mascotasController.update); // modifica mascotas. Tambien se puede usar el '.patch()'
route.delete('/:id', mascotasController.delete); // borra una mascota