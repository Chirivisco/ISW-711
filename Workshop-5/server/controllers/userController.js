import User from "../models/userModel.js";
import { base64decode } from "nodejs-base64";

const userCreate = (req, res) => {
  const { usuario, contrasena, tipo_usuario } = req.body;

  let user = new User({ usuario, contrasena, tipo_usuario });

  user.save()
    .then(() => res.status(201).json(user))
    .catch(err => res.status(422).json({ error: "Hubo problemas al crear el usuario", details: err }));
};

const userGet = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: "Error al obtener usuarios", details: err }));
};

export { userCreate, userGet };