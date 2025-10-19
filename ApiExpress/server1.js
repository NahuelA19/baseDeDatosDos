const express = require('express');

const app = express();

const PORT = 3000;


// TODO: Agregar un middleware que registre la fecha, el método, la URL y la IP del cliente.

const registrarPeticiones = (req,res,next) =>{


    const fecha = new Date().toLocaleString(); 

    const metodo = req.method;

    const url = req.originalUrl;

    const ip = req.ip;


console.log(`Registrando peticion: [${fecha}] - Método: ${metodo} - URL: ${url} - IP: ${ip}`);

  next();
}

//Uso: 

app.use(registrarPeticiones);


// TODO: Crear una ruta principal '/' que devuelva un mensaje de bienvenida.
// TODO: Crear una ruta con parámetro en la URL, por ejemplo '/saludo/:nombre'.
// Debe devolver un saludo personalizado.

app.get('/saludar/:nombre',(req,res)=>{
    const nombre = req.params.nombre;

    const mensaje = `Hola, ${nombre}. Bienvenido al servidor`;


    res.send(mensaje);
});


// TODO: Crear una ruta '/suma' que reciba num1 y num2 por query string y devuelva la suma.

app.get('/suma',(req,res)=>{
    
    const num1 = req.query.num1;
   
    const num2 = req.query.num2;


    if(!num1 || !num2){ 
        return res.status(400).send("Falta pasar uno de los dos numeros.")
    }

     
    //Los pasamos de string a float: 

    const numero1Float = parseFloat(num1);

    const numero2Float = parseFloat(num2);


    if(isNaN(numero1Float) || isNaN(numero2Float)){         
        return res.status(400).send("Ambos valores deben ser numeros validos.");

    }  


   const resultado = numero1Float + numero2Float;


   res.send(`El resultado de la suma de ${numero1Float} y ${numero2Float} es de: ${resultado}`);

})

// TODO: Crear una ruta extra, por ejemplo '/fecha', que devuelva la fecha actual.


app.get('/fecha',(req,res)=>{
    const fecha = new Date().toLocaleDateString();  

    res.send(`La fecha actual es: ${fechaAcutal}`);
})



// Iniciar el servidor

app.listen(PORT,() =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


