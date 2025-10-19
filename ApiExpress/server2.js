const express = require('express')

const app = express();

const PORT = 3000;

// Middleware global: contar cantidad de peticiones
// TODO: Crear un middleware "contarPeticiones" que escuche todas las peticiuones y vaya sumando 1 al contador


let kon = 0;

const contadorDePeticiones = (req,res,next) =>{
    kon++;    
    console.log(`El numero total de peticiones recibidas actualmente es de: ${kon} `);
   next();
}

app.use(contadorDePeticiones);


// Middleware local (a completar por el alumno)
// TODO: Crear un middleware "validarEdad" que lea req.query.edad
// y verifique que sea un número mayor o igual a 18.
// Si no cumple, responder con status 400 y mensaje "Acceso denegado".


const validadorEdad =(req,res,next) =>{

    const{edad} = req.query;

    if(edad && !isNaN(edad) && parseInt(edad)>= 18){
        next();
    } else{
        res.status(400).send("Prohibido el acceso. Debes tener 18 o mas.(Y el valor ingresado un numero,crack).")
    }
}

app.use(validadorEdad);



// TODO: Ruta principal '/'

app.get('/',(req,res) =>{
   res.send('Bienvenido a la API del TP N°2');
});


// TODO: Crear una ruta '/edad' que use el middleware "validarEdad"
// y devuelva "Acceso permitido" si la edad es válida.


app.get('/edad',validadorEdad,(req,res) =>{
    res.send('Acceso permitido')
});

// TODO: Crear una ruta '/producto/:id' que reciba un id numérico.
// Si el id no es un número, devolver error 400.
// Si es válido, devolver un mensaje con el id.

app.get('/producto/:id',(req,res)=>{
    const{id} = req.params;

    if(isNaN(id)){
        return res.status(400).send("El id deberia ser un valor numerico")
    }

    res.send(`Producto con el id: ${id}`);

})


// TODO: Crear una ruta '/promedio' que reciba tres notas por query (n1, n2, n3)
// y devuelva el promedio.
// Si falta alguna nota o no son números, devolver error 400.


app.get('/promedio',(req,res) =>{

    const{n1,n2,n3} = req.query;


    if (!n1 || !n2 || !n3 || isNaN(parseFloat(n1)) || isNaN(parseFloat(n2)) || isNaN(parseFloat(n3))){
        return res.status(400).send('Error. Las tres notas tienen que ser numeros y no puede faltar ningun valor (n1,n2,n3');

    }

    const nota1 = parseFloat(n1);
    const nota2 = parseFloat(n2);
    const nota3 = parseFloat(n3);

    const promedio = (nota1 + nota2 + nota3)/3;

    res.send(`El promedio de las notas es:  ${promedio.toFixed(2)}`);

})

// TODO: Crear una ruta '/hora' que devuelva la hora actual del servidor.


app.get('/hora',(req,res) =>{
    const horaActual = new Date().toLocaleTimeString();
    res.send(`La hora actual en el server es: ${horaActual}`);
});


//Inicio del servidor: 

app.listen(PORT,() =>{
    console.log(`Servidor corriendo en http://localhost: ${PORT}`);
});