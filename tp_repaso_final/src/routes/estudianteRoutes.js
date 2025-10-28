import express from "express";
import {
    crearEstudiante,
    obtenerTodosLosEstudiantes,
    obtenerEstudiantePorId,
    actualizarEstudiante,
    eliminarEstudiante,
    obtenerEstudiantesMultiplesCursos
} from "../controllers/estudianteController.js";

export const estudianteRoutes = express.Router();

// CRUD
estudianteRoutes.post("/crear", crearEstudiante);

estudianteRoutes.get("/obtener-todos", obtenerTodosLosEstudiantes);

estudianteRoutes.get("/obtener-por-id/:id", obtenerEstudiantePorId);

estudianteRoutes.put("/actualizar/:id", actualizarEstudiante);

estudianteRoutes.delete("/eliminar/:id", eliminarEstudiante);

//Aca van futuras agregaciones:

estudianteRoutes.get("/estadisticas/multiples-cursos", obtenerEstudiantesMultiplesCursos);