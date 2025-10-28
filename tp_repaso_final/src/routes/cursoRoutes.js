import express from "express";

import {
    crearCurso,
    obtenerTodosLosCursos,
    obtenerCursoPorId,
    actualizarCurso,
    eliminarCurso,
    inscribirEstudiante,
    desinscribirEstudiante,
    contarEstudiantesPorCurso
} from "../controllers/cursoController.js";

export const cursoRoutes = express.Router();

cursoRoutes.post("/crear", crearCurso);

cursoRoutes.get("/obtener-todos", obtenerTodosLosCursos);

cursoRoutes.get("/obtener-por-id/:id", obtenerCursoPorId);

cursoRoutes.put("/actualizar/:id", actualizarCurso);

cursoRoutes.delete("/eliminar/:id", eliminarCurso);

cursoRoutes.put("/inscribir/:idCurso/:idEstudiante", inscribirEstudiante);

cursoRoutes.put("/desinscribir/:idCurso/:idEstudiante", desinscribirEstudiante);

// Aca van las futuras agregaciones:
cursoRoutes.get("/estadisticas/contar-estudiantes", contarEstudiantesPorCurso);