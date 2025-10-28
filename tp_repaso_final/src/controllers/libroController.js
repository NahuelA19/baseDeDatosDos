import { Libro } from "../models/libro.js";
import { Autor } from "../models/autor.js";


//Post (Malone):
export const crearLibro = async (req, res) => {
    try {
        const { titulo, paginas, autor } = req.body;

        const autorExiste = await Autor.findById(autor);

        if (!autorExiste) {
            return res.status(404).json({ message: "El autor no existe crack" });
        }

        const libroNuevo = new Libro(req.body);

        await libroNuevo.save();

        res.status(201).json(libroNuevo);

    } catch (error) {
        res.status(500).json({ message: `Se produjo un error al crear el libro: ${error.message}` });
    }
};

//..................................................................................................................//



//Get:


//Todos los libros:

export const obtenerTodosLosLibros = async (req, res) => {
    try {
        const libros = await Libro.aggregate([
            {
                $lookup: {
                    from: "Autores",
                    localField: "autor",
                    foreignField: "_id",
                    as: "datosDelAutor"
                }
            },
            {
                $unwind: "$datosDelAutor"
            },
            {
                $project: {
                    titulo: 1,
                    paginas: 1,
                    categorias: 1,
                    autor: {
                        _id: "$datosDelAutor._id",
                        nombre: "$datosDelAutor.nombre"
                    }
                }
            }
        ]);

        if (libros.length === 0) {
            return res.status(204).send();
        }

        res.status(200).json(libros);

    } catch (error) {
        res.status(500).json({ message: `Error al leer libros: ${error.message}` });
    }
};

//Por su id:

export const obtenerLibroPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const libro = await Libro.findById(id).populate("autor", "nombre");

        if (!libro) {
            return res.status(404).json({ message: "El libro que esta buscando por el id ingresado no fue encontrado" });
        }

        res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al buscar el libro por su id: ${error.message}` });
    }
};

//..................................................................................................................//


//Put:
export const actualizarLibro = async (req, res) => {

    try {
        const { id } = req.params;
        const { titulo, paginas, categorias, autor } = req.body;


        if (autor) {
            const autorExiste = await Autor.findById(autor);
            if (!autorExiste) {
                return res.status(404).json({ message: "El autor no existe crack" });
            }
        }

        const libroActualizado = await Libro.findByIdAndUpdate(
            id, req.body, { new: true }
        );

        if (!libroActualizado) {
            return res.status(404).json({ message: "El libro que esta buscando no fue encontrado." });
        }

        res.status(200).json(libroActualizado);

    } catch (error) {
        res.status(500).json({ message: `Error al actualizar libro: ${error.message}` });
    }

};

//..................................................................................................................//


//Delete
// por id (no creo que quieras eliminar todos >:())

export const eliminarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const libroEliminado = await Libro.findByIdAndDelete(id);

        if (!libroEliminado) {
            return res.status(404).json({ message: "El libro que queria eliminar por su id no fue encontrado" });
        }

        res.status(200).json({ message: "El libro que selecciono fue eliminado con exito" });
    } catch (error) {
        res.status(500).json({ message: `Ocurrio un error al intentar eliminar el libro: ${error.message}` });
    }
};