import express from "express";

import {
    crearAutor,
    obtenerTodosLosAutores,
    obtenerAutorPorId,
    actualizarAutor,
    eliminarAutor,
    obtenerPromedioPaginas,
    obtenerCantidadLibros
} from "../controllers/autorController.js";

export const autorRoutes = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CRUD:



//Post (Malone):

autorRoutes.post("/crear", crearAutor);

//...............................................................................................................//

//Get:

//Todos:

autorRoutes.get("/obtener-todos", obtenerTodosLosAutores);


//Por id:


autorRoutes.get("/obtener-por-id/:id", obtenerAutorPorId);

//...............................................................................................................//

//PUT:

autorRoutes.put("/actualizar/:id", actualizarAutor);


//...............................................................................................................//


//DELETE:

autorRoutes.delete("/eliminar/:id", eliminarAutor);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//AGREGACIONEEEES:


// 1. Mostrar el promedio de páginas por autor
autorRoutes.get("/estadisticas/promedio-paginas", obtenerPromedioPaginas);



//.........................................................................................................................//

// 2. Listar los autores con la cantidad de libros que tienen
autorRoutes.get("/estadisticas/cantidad-libros", obtenerCantidadLibros);