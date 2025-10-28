import { Estudiante } from "../models/estudiante.js";
import { Curso } from "../models/curso.js";

// POST (Malone):
export const crearEstudiante = async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiante(req.body);
        await nuevoEstudiante.save();
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar crear un nuevo estudiante: ${error.message}` });
    }
};
//.................................................................................................//
// GET

// Todos:
export const obtenerTodosLosEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        if (estudiantes.length === 0) {
            return res.status(204).send();
        }
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al tratar de obtener a todos los estudiantes: ${error.message}` });
    }
};


// GET

// Por su respetectivo id:

export const obtenerEstudiantePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = await Estudiante.findById(id);
        if (!estudiante) {
            return res.status(404).json({ message: "El estudiante por su id no fue encontrado" });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al tratar de obtener al estudiante: ${error.message}` });
    }
};

//.................................................................................................................//

// PUT
export const actualizarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, req.body, { new: true });
        if (!estudianteActualizado) {
            return res.status(404).json({ message: "El estudiante no fue encontrado" });
        }
        res.status(200).json(estudianteActualizado);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar  actualizar  al estudiante: ${error.message}` });
    }
};

//...................................................................................................//

// DELETE

//Por el id:
export const eliminarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const estudianteEliminado = await Estudiante.findByIdAndDelete(id);

        if (!estudianteEliminado) {
            return res.status(404).json({ message: "El estudiante por el id no fue encontrado" });
        }


        await Curso.updateMany(
            { estudiantesInscritos: id },
            { $pull: { estudiantesInscritos: id } }
        );

        res.status(200).json({ message: "Estudiante eliminado y desinscrito de cursos" });
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar al eliminar al estudiante: ${error.message}` });
    }
};


//...........................................................................................................................//

//Agregación:

// Estudiantes en más de un curso


// GET
export const obtenerEstudiantesMultiplesCursos = async (req, res) => {
    try {
        const stats = await Estudiante.aggregate([
            {

                $lookup: {
                    from: "Cursos",
                    localField: "_id",
                    foreignField: "estudiantesInscritos",
                    as: "cursosInscrito"
                }
            },
            {

                $project: {
                    _id: 0,
                    nombre: "$nombre",
                    cantidadCursos: { $size: "$cursosInscrito" }
                }
            },
            {

                $match: {
                    cantidadCursos: { $gt: 1 }
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al tratar de realizar la agregación: ${error.message}` });
    }
};