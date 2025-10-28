import express from "express";

import {
    crearLibro,
    obtenerTodosLosLibros,
    obtenerLibroPorId,
    actualizarLibro,
    eliminarLibro
} from "../controllers/libroController.js";

export const libroRoutes = express.Router();

//...................................................................................................//


//CRUD



//Post (Malone):
libroRoutes.post("/crear", crearLibro);

//..................................................................................................................//



//Get:


//Todos los libros:

libroRoutes.get("/obtener-todos", obtenerTodosLosLibros);

//Por su id:

libroRoutes.get("/obtener-por-id/:id", obtenerLibroPorId);

//..................................................................................................................//


//Put:
libroRoutes.put("/actualizar/:id", actualizarLibro);

//..................................................................................................................//


//Delete
// por id (no creo que quieras eliminar todos >:())

libroRoutes.delete("/eliminar/:id", eliminarLibro);