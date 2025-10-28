# TP Repaso Final - MongoDB CRUD y Agregaciones


# Pasos para poder correr y probar: 


**1: Clonar el repositorio en la carpeta que quieras:**

`git clone <URL_DEL_REPO>`



**2: Instalar desde la terminal :**

`npm install`


**3: Crear tu archivo .env :**



**4: Levantar el contenedor :**


`sudo docker compose up -d`


**5: Iniciar el servidor como en modo desarollador :**

`npm run dev`


**6: Ver que todo este funcionando correctamente :**

Deberia figurar desde la terminal este mensaje : El servidor estará corriendo en `http://localhost:3000` 



## Ahora toca realizar las pruebas en Postman


### Este parte de la guia fue modificada con IA para cuidar su salud visual

### Ejercicio 1: Libros y Autores 

**Autores (`/autores`)**

* `POST /autores/crear` - Crear un autor.
* `GET /autores/obtener-todos` - Ver todos los autores.
* `GET /autores/obtener-por-id/:id` - Ver un autor por ID.
* `PUT /autores/actualizar/:id` - Actualizar un autor.
* `DELETE /autores/eliminar/:id` - Eliminar autor (y sus libros asociados).
* `GET /autores/estadisticas/promedio-paginas` - Obtener promedio de páginas por autor.
* `GET /autores/estadisticas/cantidad-libros` - Obtener cantidad de libros por autor.

**Libros (`/libros`)**

* `POST /libros/crear` - Crear un libro.
* `GET /libros/obtener-todos` - Ver todos los libros (con info del autor).
* `GET /libros/obtener-por-id/:id` - Ver un libro por ID.
* `PUT /libros/actualizar/:id` - Actualizar un libro.
* `DELETE /libros/eliminar/:id` - Eliminar un libro (solo el libro).

---

### Ejercicio 2: Cursos y Estudiantes 

**Estudiantes (`/estudiantes`)**

* `POST /estudiantes/crear` - Crear estudiante.
* `GET /estudiantes/obtener-todos` - Ver todos.
* `GET /estudiantes/obtener-por-id/:id` - Ver uno por ID.
* `PUT /estudiantes/actualizar/:id` - Actualizar estudiante.
* `DELETE /estudiantes/eliminar/:id` - Eliminar estudiante (y lo saca de los cursos).
* `GET /estudiantes/estadisticas/multiples-cursos` - Obtener estudiantes en más de 1 curso.

**Cursos (`/cursos`)**

* `POST /cursos/crear` - Crear curso.
* `GET /cursos/obtener-todos` - Ver todos (con estudiantes inscritos).
* `GET /cursos/obtener-por-id/:id` - Ver uno por ID.
* `PUT /cursos/actualizar/:id` - Actualizar info del curso.
* `DELETE /cursos/eliminar/:id` - Eliminar un curso.
* `PUT /cursos/inscribir/:idCurso/:idEstudiante` - Inscribir estudiante a curso.
* `PUT /cursos/desinscribir/:idCurso/:idEstudiante` - Desinscribir estudiante.
* `GET /cursos/estadisticas/contar-estudiantes` - Obtener cantidad de estudiantes por curso.

---