const fs = require("fs").promises;

const archivo = "contactos.json";

async function agregarContacto(nombre, telefono, email) {
    try {
        const data = await fs.readFile(archivo, "utf8");
        const contactos = JSON.parse(data);

        const nuevo = { nombre, telefono, email };
        contactos.push(nuevo);

        await fs.writeFile(archivo, JSON.stringify(contactos, null, 4));
        console.log(`Contacto agregado: ${nombre}`);
    } catch (err) {
        console.error("Error al agregar el contacto:", err);
    }
}

async function mostrarContactos() {
    try {
        const data = await fs.readFile(archivo, "utf8");
        const contactos = JSON.parse(data);

        console.log("Lista de contactos: ");
        contactos.forEach((c, i) => {
            console.log(`${i + 1}. ${c.nombre} - ${c.telefono} - ${c.email}`);
        });
    } catch (err) {
        console.error("Hay un error al mostrar los contactos: ", err);
    }
}

async function eliminarContacto(nombre) {
    try {
        const data = await fs.readFile(archivo, "utf8");
        let contactos = JSON.parse(data);

        const filtrados = contactos.filter(c => c.nombre !== nombre);

        if (filtrados.length == contactos.length) {
            console.log(`No se encontró el contacto con nombre: ${nombre}`);
        } else {
            await fs.writeFile(archivo, JSON.stringify(filtrados, null, 4));
            console.log(`El contacto eliminado es: ${nombre}`);
        }
    } catch (err) {
        console.error("Error al eliminar contacto: ", err);
    }
}

(async () => {
    await agregarContacto("Tito Calderon", "987-654-3210", "titocalderon@it.com");
    await mostrarContactos();
    await eliminarContacto("Juan Pérez"); 
    await mostrarContactos();
})();
