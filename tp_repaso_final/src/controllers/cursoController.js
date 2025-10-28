import { Curso } from "../models/curso.js";
import { Estudiante } from "../models/estudiante.js";
import mongoose from "mongoose";

// POST (Malone)
export const crearCurso = async (req, res) => {
    try {
        const nuevoCurso = new Curso(req.body);
        await nuevoCurso.save();
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar crear un curso: ${error.message}` });
    }
};
//............................................................................................................................../
// GET
export const obtenerTodosLosCursos = async (req, res) => {
    try {
        const cursos = await Curso.aggregate([
            {
                $lookup: {
                    from: "Estudiantes",
                    localField: "estudiantesInscritos",
                    foreignField: "_id",
                    as: "estudiantesInfo"
                }
            },
            {
                $project: {
                    _id: 1,
                    titulo: 1,
                    descripcion: 1,

                    estudiantesInscritos: {
                        $map: {
                            input: "$estudiantesInfo",
                            as: "est",
                            in: {
                                _id: "$$est._id",
                                nombre: "$$est.nombre",
                                email: "$$est.email"
                            }
                        }
                    }
                }
            }
        ]);

        if (cursos.length === 0) {
            return res.status(204).send();
        }
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar obtener los cursos: ${error.message}` });
    }
};

// GET
export const obtenerCursoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "El ID de curso ingresado no es valido" });
        }

        const cursos = await Curso.aggregate([
            {

                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {

                $lookup: {
                    from: "Estudiantes",
                    localField: "estudiantesInscritos",
                    foreignField: "_id",
                    as: "estudiantesInfo"
                }
            },
            {

                $project: {
                    _id: 1,
                    titulo: 1,
                    descripcion: 1,
                    estudiantesInscritos: {
                        $map: {
                            input: "$estudiantesInfo",
                            as: "est",
                            in: {
                                _id: "$$est._id",
                                nombre: "$$est.nombre",
                                email: "$$est.email"
                            }
                        }
                    }
                }
            }
        ]);

        const curso = cursos[0];

        if (!curso) {
            return res.status(404).json({ message: "El curso que esta buscando no fue encontrado" });
        }
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar obtener el curso: ${error.message}` });
    }
};
//............................................................................................................................../

// PUT
export const actualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { estudiantesInscritos, ...infoCurso } = req.body;

        const cursoActualizado = await Curso.findByIdAndUpdate(id, infoCurso, { new: true });
        if (!cursoActualizado) {
            return res.status(404).json({ message: "El curso no fue encontrado para actualizarlo" });
        }
        res.status(200).json(cursoActualizado);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar actualizar el curso: ${error.message}` });
    }
};
//............................................................................................................................../

// DELETE
export const eliminarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const cursoEliminado = await Curso.findByIdAndDelete(id);
        if (!cursoEliminado) {
            return res.status(404).json({ message: "El curso que trata de eliminar no fue encontrado" });
        }
        res.status(200).json({ message: "El curso fue eliminado con exito" });
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar eliminar el curso: ${error.message}` });
    }
};

//............................................................................................................................../


// Requisitos Ejercicio 2:


//Inscribir estudiantes:

export const inscribirEstudiante = async (req, res) => {
    try {
        const { idCurso, idEstudiante } = req.params;
        const curso = await Curso.findById(idCurso);
        const estudiante = await Estudiante.findById(idEstudiante);
        if (!curso || !estudiante) {
            return res.status(404).json({ message: "El curso o el estudiante no fue encontrado por su id" });
        }


        const cursoActualizado = await Curso.findByIdAndUpdate(
            idCurso,
            { $addToSet: { estudiantesInscritos: idEstudiante } },
            { new: true }
        );

        res.status(200).json(cursoActualizado);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al tratar de inscribir al  estudiante: ${error.message}` });
    }
};

// Desincribir al estudiante:
export const desinscribirEstudiante = async (req, res) => {
    try {
        const { idCurso, idEstudiante } = req.params;

        const cursoActualizado = await Curso.findByIdAndUpdate(
            idCurso,
            { $pull: { estudiantesInscritos: idEstudiante } },
            { new: true }
        );

        if (!cursoActualizado) {
            return res.status(404).json({ message: "El curso no fue encontrado" });
        }

        res.status(200).json(cursoActualizado);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un erorr al tratar de desinscribir al  estudiante: ${error.message}` });
    }
};

//............................................................................................................................../

//Agregaciones:

//Contar estudiantes por curso



export const contarEstudiantesPorCurso = async (req, res) => {
    try {
        const stats = await Curso.aggregate([
            {
                $project: {
                    _id: 0,
                    titulo: "$titulo",
                    cantidadEstudiantes: { $size: "$estudiantesInscritos" }
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al tratar de realizar la agregacion: ${error.message}` });
    }
};

//.......................................................................................................................//