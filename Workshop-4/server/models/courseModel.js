import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  course_name: { type: String, required: true },
  schedule: { type: String, required: true },
  credits: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }
  // ObjectId es el "primary key" de mongo. 'ref: Teacher' hace referencia al modelo Teacher.
});

export default mongoose.model("Course", courseSchema);
