

Instalar Express si no lo tienen:

npm init -y
npm install express
.......................................................


Server1.js:
//////////

Ejecutar el servidor:

 node server1.js
.................................................

Ejemplo para probar el saludo: 

http://localhost:3000/saludo/tuNombre

.......................................................

Ejemplo para probar la suma: 

http://localhost:3000/suma?num1=x&num2=y

reemplazar x,y por los numeros deseados a sumar.

ejemplo: 

http://localhost:3000/suma?num1=10&num2=2

........................................................


Server2.js:
///////////

Inicio: 

Bienvenida: 

http://localhost:3000/
...........................................................

Validador de Edad: 

http://localhost:3000/edad?edad=19


Para la prueba de error cambie el 19 por algun valor menor o deje el edad solo.

http://localhost:3000/edad?edad=10

http://localhost:3000/edad?edad
..........................................................

Promedios: 

http://localhost:3000/promedio?n1=10&n2=8.5&n3=9.5

Para probar el error deje vacio algun n o escriba algo que no sea un numero.

............................................................

Hora Actual: 

http://localhost:3000/hora







