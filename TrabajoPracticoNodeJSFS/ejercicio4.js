const fs = require("fs").promises;


const args = process.argv.splice(2);


if(args.length<2){
    console.log("Uso: node contadorPalabras.js <archivo> <palabra>");
    process.exit(1);
}


const [archivo,palabra] = args;


async function contadorPalabras(archivo,palabra) {
    
    try{
        const data = await fs.readFile(archivo,"utf8");

        const texto = data.toLowerCase();

        const palabraBuscada = palabra.toLowerCase();

        const palabras = texto.match(/\b\w+\b/g) || [];


        const contador = palabras.reduce((acc, p) => (p === palabraBuscada ? acc + 1 : acc), 0);

        console.log(`La palabra "${palabra}" aparece ${contador} veces en el archivo "${archivo}".`);
    } catch (err) {
        console.error("Error al leer el archivo:", err);
    }
}

contadorPalabras(archivo,palabra);