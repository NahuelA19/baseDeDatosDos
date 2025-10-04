const fs = require("fs").promises;

async function main() {
    try {
        const contenido = 'Nombre: Nahuel - Edad: 27 - Carrera: Tecnicatura Universitaria en Programacion - ';

        await fs.writeFile("datos.txt", contenido, "utf8");
        console.log("El documento datos.txt fue creado y escrito");

        const data = await fs.readFile("datos.txt", "utf-8");
        console.log("Imprimiendo el contenido de datos.txt: " + data);

        const fecha = new Date();
        const fechaFormateada = fecha.toISOString().replace("T", " ").substring(0, 19);

        await fs.appendFile("datos.txt", `Fecha de modificación: ${fechaFormateada}\n`);
        console.log("Fecha y hora agregadas correctamente al archivo: ");

        await fs.rename("datos.txt", "informacion.txt");
        console.log("Renombrando archivo.... nuevo nombre: informacion.txt");

        setTimeout(async () => {
            try {
                await fs.unlink("informacion.txt");
                console.log("EL archivo informacion.txt se eliminara luego de 9 segundos...");
            } catch (err) {
                console.error("Error al tratar de eleminar el archivo: ", err);
            }
        }, 9000);

    } catch (err) {
        console.error("Hay un error: ", err);
    }
}

main();
