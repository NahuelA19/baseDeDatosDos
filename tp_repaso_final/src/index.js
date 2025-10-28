import express from "express";
import mongoose from "mongoose";

//Import A y L: 
import { autorRoutes } from "./routes/autorRoutes.js";
import { libroRoutes } from "./routes/libroRoutes.js"; 
import { cursoRoutes } from "./routes/cursoRoutes.js";
import { estudianteRoutes } from "./routes/estudianteRoutes.js";

const app = express();

//Mid
app.use(express.json());

//Conexion BD: 
mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME
}).then(() => {
    console.log("Se conecto correctamente a la base de datos");
}).catch((e) => {
    console.error(`Error al conectarse a la BBDD: ${e} `);
});

//Rutas: 
app.use("/autores", autorRoutes);
app.use("/libros", libroRoutes); 
app.use("/estudiantes", estudianteRoutes);
app.use("/cursos", cursoRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT} `)
});