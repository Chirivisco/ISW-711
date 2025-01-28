import express from 'express';
import mongoose from 'mongoose';

import routesMascotas from './routes/mascotas.js';

const app = express();

app.use('/mascotas', routesMascotas);

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
