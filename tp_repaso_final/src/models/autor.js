import mongoose from "mongoose";

const autor = mongoose.Schema({
    nombre:{type: String, required: true},
    fechaDeNacimiento: Number
},{
    collection: "Autores",
    versionKey: false
});

export const Autor = mongoose.model("Autor",autor);
