const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "logs");
const logFile = path.join(logsDir,"app.log");


if(!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir);
}


function registrarEjecucion(){
    const fecha = new Date().toLocaleDateString();
    const mensaje = `[${fecha}] Ejecución exitosa\n`;

     fs.appendFileSync(logFile,mensaje,"utf8");
     console.log("La ejecucion fue registrada con exito en app.log");

}


function mostrarUltimasEjecuciones(){
    if(!fs.existsSync(logFile)){
        console.log("No hay registros aun en app.log")
        return;
    }

    const contenido = fs.readFileSync(logFile,"utf8");
    const lineas = contenido.trim().split("\n");
    const ultimasCinco = lineas.slice(-5);

    console.log("\n Las ultimas 5 ejecuciones:")

    ultimasCinco.forEach((linea,index)=>{
        console.log(`${index + 1}. ${linea}`)
    })
}

registrarEjecucion();

mostrarUltimasEjecuciones();