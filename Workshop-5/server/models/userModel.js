import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  tipo_usuario: { type: String, enum: ['normal', 'admin'], required: true }
});

export default mongoose.model("User", userSchema);