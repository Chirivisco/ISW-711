import express from 'express';
import mongoose from 'mongoose';
import BodyParser from 'body-parser';

import routesMascotas from './routes/mascotas.js';

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/mascotas', routesMascotas);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
