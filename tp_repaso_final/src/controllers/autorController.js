import { Autor } from "../models/autor.js";
import { Libro } from "../models/libro.js";

//Post (Malone):

export const crearAutor = async (req, res) => {
    try {
        const { nombre, fecha_nacimiento } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: "Tenes que ingresar un nombre :*." })

        }
        const autorNuevo = new Autor(req.body);
        await autorNuevo.save();

        res.status(201).json(autorNuevo);
    } catch (error) {
        res.status(500).json({ message: `Hubo un error al crear al nuevo autor: ${error.message}` });
    }
};

//...............................................................................................................//

//Get:

//Todos:

export const obtenerTodosLosAutores = async (req, res) => {
    try {
        const autores = await Autor.find();

        if (autores.length === 0) {
            return res.status(204).send();
        }

        res.status(200).json(autores);
    } catch (error) {
        res.status(500).json({ message: `Error al tratar de leer a los autores: ${error.message}` });
    }
};


//Por id:


export const obtenerAutorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findById(id);

        if (!autor) {
            return res.status(404).json({ message: "El autor buscado por id no fue encontrado :(" });
        }

        res.status(200).json(autor);
    } catch (error) {
        res.status(500).json({ message: `Error al buscar al autor por su id: ${error.message}` });
    }
};

//...............................................................................................................//

//PUT:

export const actualizarAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const autorActualizado = await Autor.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!autorActualizado) {
            return res.status(404).json({ message: "El autor que busca actualizar no fue encontrado :(" });
        }

        res.status(200).json(autorActualizado);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al querer actualizar al autor por su id: ${error.message}` });
    }
};


//...............................................................................................................//


//DELETE:

export const eliminarAutor = async (req, res) => {
    try {
        const { id } = req.params;

        await Libro.deleteMany({ autor: id });

        const autorF = await Autor.findByIdAndDelete(id);


        if (!autorF) {
            return res.status(404).json({ message: "El autor no fue encontrado crack" });
        }

        res.status(200).json({ message: "El autor y todos los libros asociados a el fueron eliminados (funado :( ) " });

    } catch (error) {
        res.status(500).json({ message: `Error al eliminar autor: ${error.message}` });
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//AGREGACIONEEEES:


// 1. Mostrar el promedio de páginas por autor
export const obtenerPromedioPaginas = async (req, res) => {
    try {
        const stats = await Libro.aggregate([
            {

                $group: {
                    _id: "$autor",
                    promedioPaginas: { $avg: "$paginas" }
                }
            },
            {

                $lookup: {
                    from: "Autores",
                    localField: "_id",
                    foreignField: "_id",
                    as: "datosDelAutor"
                }
            },
            {

                $unwind: "$datosDelAutor"
            },
            {

                $project: {
                    _id: 0,
                    autor: "$datosDelAutor.nombre",
                    promedioPaginas: 1
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error en la agregacion: ${error.message}` });
    }
};



//.........................................................................................................................//

// 2. Listar los autores con la cantidad de libros que tienen
export const obtenerCantidadLibros = async (req, res) => {
    try {
        const stats = await Autor.aggregate([
            {

                $lookup: {
                    from: "Libros",
                    localField: "_id",
                    foreignField: "autor",
                    as: "libros"
                }
            },
            {

                $project: {
                    _id: 0,
                    nombre: "$nombre",
                    cantidadLibros: { $size: "$libros" }
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error en las agregaciones: ${error.message}` });
    }
};