import mongoose from "mongoose";

const estudiante = mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    edad: Number
}, {
    collection: "Estudiantes",
    versionKey: false
});

export const Estudiante = mongoose.model("Estudiante", estudiante);