import express from "express";
import './Config/dbConfig.js';
import cors from "cors";
import bodyParser from "body-parser";
import dbConfig from "./Config/dbConfig.js";
import { teacherCreate, teacherGet, teacherUpdate, teacherDelete } from "./controllers/teacherController.js";
import { courseCreate, courseGet, courseUpdate, courseDelete } from "./controllers/courseController.js";
import { userCreate, userGet } from "./controllers/userController.js";
import User from "./models/userModel.js";
import { base64decode } from "nodejs-base64";

const app = express();

app.use(bodyParser.json());
app.use(cors({ domains: "*", methods: "*" }));

// Rutas 'users'
app.post("/api/users", userCreate);
app.get("/api/users", userGet);

// autenticación con http basic auth
app.use((req, res, next) => {
    if (req.headers["authorization"]) {
        const authBase64 = req.headers["authorization"].split(" ");
        const userPass = base64decode(authBase64[1]);
        const [user, password] = userPass.split(":");

        User.findOne({ usuario: user, contrasena: password })
            .then(foundUser => {
                if (foundUser) {
                    req.user = foundUser;
                    next();
                } else {
                    res.status(401).json({ error: "Unauthorized" });
                }
            })
            .catch(() => res.status(500).json({ error: "Error en autenticación" }));
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

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
