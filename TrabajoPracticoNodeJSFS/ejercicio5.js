const fs = require("fs");

const path = require("path");



const[, , origen,destino] = process.argv;


if(!origen || ! destino){
    console.error("¡¡Error!!.Se necesita el tanto el archivo de origen como el de destino.");
    console.error('Asi deberia ingresarse: node ejercicio5.js archivo1.txt archivo2.txt');
    process.exit(1);
}


fs.copyFile(origen,destino,(error)=>{
    if(error){
        console.error(`Se ha producido un error al copiar el archivo: ${error.message}`)

    }else{
        console.log(`El archivo se copio correctamente de "${origen}" a "${destino}".`);
    }
})


