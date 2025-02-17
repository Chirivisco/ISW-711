import express from "express";
import './Config/dbConfig.js';
import cors from "cors";
import bodyParser from "body-parser";
import dbConfig from "./Config/dbConfig.js";
import { teacherCreate, teacherGet, teacherUpdate, teacherDelete } from "./controllers/teacherController.js";
import { courseCreate, courseGet, courseUpdate, courseDelete } from "./controllers/courseController.js";

const app = express();

app.use(bodyParser.json());
app.use(cors({ domains: "*", methods: "*" }));

// rutas 'teachers'
app.post("/teachers", teacherCreate);
app.get("/teachers", teacherGet);
app.put("/teachers/:id", teacherUpdate);
app.delete("/teachers/:id", teacherDelete);

//rutas 'courses'
app.post("/courses", courseCreate);
app.get("/courses/:id", courseGet); // Esta línea se mueve antes de la general
app.get("/courses", courseGet);
app.put("/courses/:id", courseUpdate);
app.delete("/courses/:id", courseDelete);

app.listen(3001, () => console.log("Servidor corriendo en el puerto 3001"));
console.log(dbConfig.db);
