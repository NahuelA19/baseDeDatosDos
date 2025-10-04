const fs = require("fs");

function obtenerFechaHora(){
    const actual = new Date();
    const fecha = actual.toISOString().slice(0,10);
    const hora = actual.toTimeString().split(" ")[0];

    return ` La fecha y hora actual es: [${fecha} ${hora}]`
}


function escribirLog(mensaje){
    fs.appendFileSync("log.txt",`${obtenerFechaHora()} - ${mensaje}\n`)
}


escribirLog("Inicio del programa...")


escribirLog("Programa ejecutandose...... Realizando la tarea..........")


setTimeout(()=> {
    escribirLog("La tarea ha terminado")
},9000);