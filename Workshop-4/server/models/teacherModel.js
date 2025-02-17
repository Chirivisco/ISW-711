import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  cedula: { type: String },
  age: { type: Number }
});

export default mongoose.model("Teacher", teacherSchema, "teachers");
