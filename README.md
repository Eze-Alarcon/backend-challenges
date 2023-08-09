# Curso de Backend en Coderhouse

Proyecto final del curso de backend con Node.js en Coderhouse

- [Curso de Backend en Coderhouse](#curso-de-backend-en-coderhouse)
- [Descripcion del proyecto](#descripcion-del-proyecto)
  - [Herramientas implementadas](#herramientas-implementadas)
  - [Documentacion de los endpoints](#documentacion-de-los-endpoints)
- [Consideraciones](#consideraciones)
  - [Scrips](#scrips)
  - [Formato del .env](#formato-del-env)
    - [Salt](#salt)

# Descripcion del proyecto

El proyecto consiste en la implementacion de Node.js junto con API REST para crear el backend de una ecommerce.

Por razones de practicidad no se ha desarrollado una pasarela de pago.

## Herramientas implementadas

Server:
* express
* handlebars
* dotenv

Loggin:
* passport
* cookie-parser
* jsonwebtoken

Base de datos:
* mongoose
* mongoose-paginate-v2

Validaciones y encriptado:
* joi
* bcrypt

Documentacion:
* swagger

Servicios de Email:
* nodemailer

Utilidades:
* socket.io
* nodemon
* winston

## Documentacion de los endpoints

Una vez revisada la seccion de consideraciones, y de tener todo en condiciones para que funcione el programa, se encuentra una ruta en /api/docs para revisar los endpoint disponibles

# Consideraciones

## Scrips

npm run start:
  * Execute: node .
  * Description: Inicia el servidor usando node

npm run dev:
  * Execute: NODE_ENV=development nodemon -e 'js,handlebars,yaml' .
  * Description: Implementa nodemon para iniciar el servidor en modo de desarrollo

npm run lint:
  * Execute: standard . --fix
  * Description: Implementa eslint con standard para revisar los estilos del codigo

npm run commit:
  * Execute: sh -c 'git add .' && cz
  * Description: Implementa commitizen para agilizar el proceso de commits

[Eslint.org](https://eslint.org/)

[Commitizen](https://www.npmjs.com/package/commitizen)

## Formato del .env

Para que el programa funcione correctamente debe existir un archivo .env en la carpeta src/config.
El formato de dicho archivo es el siguiente:

```
  URL_DB = url a la base de datos de produccion de mongo
  URL_DB_TEST = url a la base de datos de desarrollo de mongo

  PORT = puerto de la aplicacion

  SALT = un salt aleatorio para que funcione el encriptado de la contraseña

  COOKIE_SECRET = palabra secreta para encriptar cookies
  JWT_SECRET = palabra secreta para encriptar el JWT

  CLIENT_ID_GITHUB = credenciales de github para el funcionamiento del login co GitHub
  CLIENT_GITHUB_SECRET = credenciales de github para el funcionamiento del login co GitHub

  EMAIL_USER = email desde el cual se enviaran los correos (esto es para que funcione el email service)
  EMAIL_PASS = contraseña del email
  TEST_EMAIL_USER = email mock para realizar tests
  TEST_EMAIL_PASS = contraseña del email mock para realizar tests
```

### Salt 

Puedes crear un salt usando la siguiente funcion de bcrypt:



```JavaScript:
  bcrypt.genSalt(saltRounds, function(err, salt) {
    returns salt
  });
```
