import mongoose from "mongoose";

const{Schema} = mongoose

const libroSchema = Schema({
    titulo:{type: String,required:true},
    paginas: Number,
    categorias:[String],
    autor:{
        type: Schema.Types.ObjectId,
        ref:"Autor",
        required: true
    }
},{
    collection: "Libros",
    versionKey: false
});


export const Libro = mongoose.model("Libro",libroSchema);

