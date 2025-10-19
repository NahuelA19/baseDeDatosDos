    1. ¿Cuál es la diferencia entre parámetros en la ruta y parámetros en query?

    La diferencia es que los parametos en la ruta son parte escencial de la URL y se utilizan para indentificar recursos especificos y obligatorios.
    
    Accede con req.params

    En cambio los parametros en query son opcionales y van despues de un simbolo de pregunta (?). Se utilizan para ordenar o filtrar la respuesta sin cambiar la base.

    Accede con req.query.
..................................................................................................................

    2. ¿Qué ventajas tiene usar Express sobre Node.js puro?

    Las ventajas que tiene usar Express sobre Node.js es que ofrece un framework que abstrae la complefijidad y el codigo repetitivo,permitiendo construir aplicaciones mas rapido y organizado.

    Express tiene un sistema de enrutamiento y limpio y declarativo que simplifica la gestion de rutas, tambien cuenta con la arquitectura de middleware para tareas reutilizables como validaciones.
    
    Y un conjunto de metodos y propiedades utiles que facilitan el manejo de peticiones req y res.
..................................................................................................................

    3. ¿Qué es un middleware y para qué se puede usar?

    Es una funcion que se ejecuta en medio de un ciclo de peticion/respuesta.
     
    Su tarea es centralizar y reutilizar lgoica que se aplica en multiples rutas como autenticacion de usuarios,validacion de datos de entrada,el registro de peticiones para el monitoreo.

    Permite ejecutar codigo de forma modular antes que la peticion llegue a su logica final permitiendo asi qeu existan aplicaciones mas organizadas seguras y limpias.
..................................................................................................................

    4. ¿Qué hace app.listen y qué pasa si no se ejecuta?

     Lo que hace app.listen es iniciar el servidor y lo pone en un modo de "escuchar" peticiones en un puerto especificado de tu computadora.

     Es el paso final que transforma el codigo de configuracion de express.

     Si no se ejecuta app.lisen el servidor nunca iniciaria. El codigo se procesaria pero al no tener mas instrucciones a ejecutar el proceso terminaria.
..................................................................................................................

    5. ¿Qué códigos HTTP se utilizan para indicar éxito o error y cuál es la diferencia entre ellos?

    Los codigos que se utilizan para indicar exito son la serie 2xx indican que la peticion fue recibida entendida y procesada con exito en el servidor.

    En cambio los codigos de error informan que algo no salio como se planeaba y tienen varios codigos: 

    serie 4xx : como 404 not found, 400 BadRequest, que son errores del cliente, como ingresar mal la URL o un dato.

    Y los serie 5xx: Indican que la peticion era valida pero algo en el serviodr fallo al querer procesarlo.

..................................................................................................................

    6. ¿Cuál es la diferencia entre un middleware global y uno local?

    La diferencia principal entre ambos es el alcance, el middleware global utiliza app.use() permite que se ejecute para todas las peticiones que reciba la aplicacion. Mientras que el local lo aplica de manera mas selectiva pasandolo como un argumento de una ruta especifica.
    ..........................................................................................................
    7. ¿Qué ocurre si no llamamos a next() dentro de un middleware?

    Si no llamamos a next() dentro de un middleware el cliente se quedara congelado indefinidamente y el cliente no recibiria nunca una respuesta. 

    Al pasar el tiempo el navegador mandara un error de tiempo agotado (timeout).
    ..........................................................................................................

    8. ¿Por qué conviene validar datos antes de procesar una ruta?

    Conviene validar los datos antes de procesar una ruta por seguridad,integridad y estabilidad.

    Seguridad:

    Las validacion es la principal defensa contra los ataques como las inyecciones SQL.

    Integridad: 

    Evita que se guarde informacion corrupta o formatos incorrectos.

    Estabilidad: Previene caidas y errores inesperado al manejar datos invalidos de forma controlada desde el inicio.

