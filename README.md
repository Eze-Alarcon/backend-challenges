# Curso de Backend en Coderhouse - Modulo 2 - Desafios

Desafios del curso de coderhouse

- [Curso de Backend en Coderhouse - Modulo 2 - Desafios](#curso-de-backend-en-coderhouse---modulo-2---desafios)
- [Documentacion del proyecto](#documentacion-del-proyecto)
  - [Mejoras](#mejoras)
    - [Roles](#roles)
    - [Vistas](#vistas)
    - [Seguridad](#seguridad)
  - [Consideraciones](#consideraciones)
  - [API Endpoints:](#api-endpoints)
  - [Detalles de los Endpoints](#detalles-de-los-endpoints)
    - [Endpoints de productos](#endpoints-de-productos)
      - [products/](#products)
      - [Products/:pid](#productspid)
    - [Endpoints de cart](#endpoints-de-cart)
      - [cart/](#cart)
      - [cart/:cid](#cartcid)
      - [cart/:cid/product/:pid](#cartcidproductpid)
    - [Endpoints con vistas (HTML)](#endpoints-con-vistas-html)
      - [Products View](#products-view)
      - [Cart View](#cart-view)
- [Consigna: Práctica de integración](#consigna-práctica-de-integración)
  - [Detalles del desafio](#detalles-del-desafio)
  - [Proceso de testing](#proceso-de-testing)

# Documentacion del proyecto

## Mejoras

### Roles

Por el momentos los roles disponibles son:

- User: para los usuarios que no disponen de privilegios

- Admin: para los usuarios con privilegios administrativos

### Vistas

Tambien se han implementado 3 vistas nuevas y algunas modificaciones en las demas, detallaremos las vistas implementadas:

- / -> esta vista nos llevara a la pestaña de login en donde colocaremos nuestras credenciales de acceso
- /register -> en caso de no contar con credenciales, deberemos crear una cuenta
- /profile -> aqui podremos ver informacion (no sensible) del usuario

### Seguridad

Como medida de seguridad, solo las vistas de login y register estaran disponibles sin iniciar sesion.

## Consideraciones

Dado el tiempo de desarollo, no se lograron contemplar algunos extras con lo cual, se deben tener en cuenta algunos detalles para esta etapada:

- Se debe contar con un carrito en la coleccion 'cart' de la base de datos dado que sino se pueden encontrar fallas inesperadas (estoy trabajando en ello), por favor crear un carrito con id 1.

- Al momento de escribir esta documentacion no se ha desarrollado un boton para crear un nuevo carrito, con lo cual, todos los productos que se guarden al carrito se guardaran en el carrito 1.

- La vista del carrito ('/cart/1') se puede editar manualmente.

## API Endpoints:

Base URL: http://localhost:8080/

API URL: http://localhost:8080/api/

Describire brevemente los endpoints y entrare en detalle mas adelante.

Endpoints de productos

- products/ - products/:pid ** ✅ **

:pid ==> productID

Endpoints del carrito:

- cart/
- cart/:cid
- cart/:cid/product/:pid

:cid ==> cartID
:pid ==> productID

Endpoints con vistas (HTML):

- /
- /cart/:cid (:cid ==> cartID)

## Detalles de los Endpoints

### Endpoints de productos

#### products/

Este endpoint cuenta con 2 metodos disponibles:

- GET
- POST

El metodo GET, hara un llamado para traernos los productos, cuenta con las siguientes caracteristicas:

- limit
- page
- sort

page y limit deben ser valores numericos

sort ordenara segun el precio, puede tomar los siguientes valores: - asc o 1 => para ordenar de forma ascendente - desc o -1 => para ordenar de forma descendente

En el caso de que se desee filtrar, contamos con 2 opciones: - price - other

price debe ser un valor numerico pero other nos permite pasarle una clave y un valor para buscar, ejemplo:

http://localhost:8080/api/products/?id=5

Nos devuelve el producto con id: 5.

http://localhost:8080/api/v1/products/?code=code-2

Nos devuelve el producto con codigo: 'code-2'.

El metodo POST nos permite crear un producto con la siguiente estructura:

{
id: Number
title: String
description: String
category: String
price: Number
status: Boolean
thumbnail: Array[]
stock: Number
code: String
}

Para crear el producto es necesario enviar los campos requeridos:

{
title
description
category
price
}

aunque tambien tiene campos opcionales:
{
status -> opcionales, valor por defecto: true
thumbnail -> opcionales, valor por defecto: []
stock -> opcionales, valor por defecto: 0
code -> opcionales, valor por defecto: code-UUID (UUID -> valor random)
}

Nos respondera con el objeto añadido a la base de datos.

#### Products/:pid

Este endpoint cuenta con 3 metodos disponibles:

- GET
- PUT
- DELETE

EL metodo GET nos devolvera el producto con el id que se encuentre en la url (:pid), este metodo no espera ningun otro dato.

El metodo PUT nos permite actualizar los valores de un producto ya sea total o parcialmente; los valores perceptibles a cambiar son:

{
description
thumbnail
category
title
price
stock
}

En caso de que los valores ingresados sean admitidos, se retornara el objeto con sus valores actualizados.

El metodo Delete devolvera un objeto con el siguiente formato:

{
"product_deleted": {
"acknowledged": boolean,
"deletedCount": number
}
}

- acknowledged: true si la db ha entendido bien la instruccion, false en caso contrario
- deletedCount: 1 si ha borrado algun elemento, 0 en caso de que no se haya logrado borrar el elemento

### Endpoints de cart

#### cart/

Este endpoint cuenta con 2 metodos disponibles:

- GET
- POST

El metodo GET fue implementado con la finalidad de facilitar las operaciones de testear.

Al llamar este metodo devuelve la coleccion completa de carritos.

El metodo POST crea un carrito con la siguiente interfaz:

{
id: string,
products: array[]
}

#### cart/:cid

Este endpoint cuenta con 2 metodos disponibles:

- GET
- DELETE

El metodo GET, buscara un carrito en particular.

Devuelve el carrito que corresponda con el ID enviado bajo el valor ':cid', junto con el detalle de cada producto y un dato extra que corresponde al total de productos en el carrito.

ejemplo: cart/1

{
cart: {
id: "1",
products: [
{
product: {
\_id: "64388ce145c7207533a840c9",
id: 2,
code: "code-2",
title: "titulo update",
description: "Description 1",
price: 100,
status: true,
thumbnail: []
},
quantity: 4
},
]
},
totalProducts: 4
}

El metodo DELETE borrara todos los elementos dentro de un carrito

Ejemplo:

Supongamos un carrito:

{
id: "1",
products: [
{
product: "64388ce145c7207533a840c9",
quantity: 4
},
{
product: "64388d0c45c7207533a840d9",
quantity: 1
},
{
product: "64388ced45c7207533a840cd",
quantity: 1
}
]
}

al aplicarle el metodo, obtendremos:

{
id: "1",
products: []
}

#### cart/:cid/product/:pid

Este endpoint cuenta con 2 metodos disponibles:

- PUT
- DELETE

El metodo PUT ingresa un producto en el carrito o, en el caso de que exista el producto en el carrito, modificara la cantidad del mismo.

En caso de que el producto no existe en el carrito, y le asignara 1 al campo "quantity" (cantidad) del producto.

Caso contrario, sumara +1 a la cantidad del producto seleccionado. Opcionalmente, este metodo acepta que se le pase por el body, un json con el siguiente formato:

{
"quantity": number
}

Esto hara que el la cantidad del producto se vea modificado por el valor enviado.

Al llamar a este metodo obtendremos la siguiente respuesta:

{
details: {
response: {
productAdded: boolean,
productModified: boolean,
quantityValue: number
}
}
}

- productAdded: indica si se ha agregado un nuevo producto al carrito,

- productModified: indica si se ha modificado un producto,

- quantityValue: indica el valor al cual ha cambiado la cantidad del producto

El metodo DELETE elimina un producto del carrito

Nos retorna el siguiente objeto:

{
"productRemoved": boolean
}

- productRemoved: indica si se ha eliminado un producto

### Endpoints con vistas (HTML)

#### Products View

URL: [Link a products view -> http://localhost:8080/](http://localhost:8080/)

En esta vista, se encontrara una lista de todos los productos existentes con su respectiva navegacion por paginas.

#### Cart View

URL: [Link a cart view (del carrito 1) -> http://localhost:8080/cart/1](http://localhost:8080/cart/1)

En esta vista, se encontrara el desgloce de los productos de un carrito en particular.

# Consigna: Práctica de integración

## Detalles del desafio

Generar un módulo de Mocking para el servidor.

Al inicializarse el mock, este debe generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo.
Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’)

Además, generar un customizador de errores. ✅
  - Crear un diccionario para tus errores más comunes (crear un producto, agregarlo al carrito, etc.)

## Proceso de testing

- Se visitará el endpoint /mockingproducts y deberá corroborarse una respuesta de 50 productos generados con el formato de un producto real del proyecto.

- Se intentará crear un producto con todos los datos válidos, el producto debe crearse satisfactoriamente.

- Se intentará crear un un producto  con todos los campos menos el título y el precio, los cuales deberían ser requeridos, por lo tanto, se debe recibir un error customizado para reconocer en qué propiedades no se enviaron los datos.