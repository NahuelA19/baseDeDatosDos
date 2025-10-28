import mongoose from "mongoose";
const { Schema } = mongoose;

const curso = Schema({
    titulo: { type: String, required: true },
    descripcion: String,
    
    estudiantesInscritos: [{
        type: Schema.Types.ObjectId,
        ref: "Estudiante" 
    }]
}, {
    collection: "Cursos",
    versionKey: false
});

export const Curso = mongoose.model("Curso", curso);