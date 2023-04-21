# Curso de Backend en Coderhouse - Modulo 2 - Desafios 

Desafios del curso de coderhouse

- [Curso de Backend en Coderhouse - Modulo 2 - Desafios](#curso-de-backend-en-coderhouse---modulo-2---desafios)
- [Documentacion del proyecto](#documentacion-del-proyecto)
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
- [Detalles del desafio](#detalles-del-desafio)
  - [Consigna](#consigna)
  - [Aspectos a incluir](#aspectos-a-incluir)
    - [Hands on lab](#hands-on-lab)
    - [Desafio](#desafio)
  - [Proceso de testing](#proceso-de-testing)


# Documentacion del proyecto


## Consideraciones

Dado el tiempo de desarollo, no se lograron contemplar algunos extras con lo cual, se deben tener en cuenta algunos detalles para esta etapada:

  * Se debe contar con un carrito en la coleccion 'cart' de la base de datos dado que sino se pueden encontrar fallas inesperadas (estoy trabajando en ello), por favor crear un carrito con id 1.

  * Al momento de escribir esta documentacion no se ha desarrollado un boton para crear un nuevo carrito, con lo cual, todos los productos que se guarden al carrito se guardaran en el carrito 1.
  
  * La vista del carrito ('/cart/1') se puede editar manualmente.


## API Endpoints:

Base URL: http://localhost:8080/

API URL: http://localhost:8080/api/

Describire brevemente los endpoints y entrare en detalle mas adelante.

Endpoints de productos
  - products/ **✅**
  - products/:pid ** ✅ **
 
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

  * GET
  * POST

El metodo GET, hara un llamado para traernos los productos, cuenta con las siguientes caracteristicas:

  * limit
  * page
  * sort

  page y limit deben ser valores numericos

  sort ordenara segun el precio, puede tomar los siguientes valores:
    - asc o 1 => para ordenar de forma ascendente
    - desc o -1 => para ordenar de forma descendente

  En el caso de que se desee filtrar, contamos con 2 opciones:
    - price
    - other

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

  * GET
  * PUT
  * DELETE

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

* acknowledged: true si la db ha entendido bien la instruccion, false en caso contrario
  
* deletedCount: 1 si ha borrado algun elemento, 0 en caso de que no se haya logrado borrar el elemento

### Endpoints de cart

#### cart/

Este endpoint cuenta con 2 metodos disponibles:

* GET
* POST

El metodo GET fue implementado con la finalidad de facilitar las operaciones de testear.

  Al llamar este metodo devuelve la coleccion completa de carritos.

El metodo POST crea un carrito con la siguiente interfaz:

{
  id: string,
  products: array[]
}

#### cart/:cid 

Este endpoint cuenta con 2 metodos disponibles:

* GET 
* DELETE

El metodo GET, buscara un carrito en particular.

  Devuelve el carrito que corresponda con el ID enviado bajo el valor ':cid', junto con el detalle de cada producto y un dato extra que corresponde al total de productos en el carrito.

  ejemplo: cart/1

  {
  cart: {
    id: "1",
    products: [
      {
        product: {
          _id: "64388ce145c7207533a840c9",
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

* PUT 
* DELETE

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

  * productAdded: indica si se ha agregado un nuevo producto al carrito,

  * productModified: indica si se ha modificado un producto,
  
  * quantityValue: indica el valor al cual ha cambiado la cantidad del producto

El metodo DELETE elimina un producto del carrito

  Nos retorna el siguiente objeto:

  {
    "productRemoved": boolean
  }
  
  * productRemoved: indica si se ha eliminado un producto


### Endpoints con vistas (HTML)

#### Products View 

URL: [Link a products view -> http://localhost:8080/](http://localhost:8080/)

En esta vista, se encontrara una lista de todos los productos existentes con su respectiva navegacion por paginas.

#### Cart View 

URL: [Link a cart view (del carrito 1) -> http://localhost:8080/cart/1](http://localhost:8080/cart/1)

En esta vista, se encontrara el desgloce de los productos de un carrito en particular. 

# Detalles del desafio

## Consigna

Ajustar nuestro servidor principal para trabajar con un sistema de login.

## Aspectos a incluir

### Hands on lab

Se deberá contar con una estructura de router para sessions en /api/sessions/ el cual contará con métodos para registrar a un usuario y para su respectivo login **✅**

Se deberá contar además con un router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil.

El formulario de registro insertará en la base de datos el usuario. El cual deberá contar con:
  * first_name
  * last_name
  * email
  * age
  * password

Se debe contar con el formulario de login el cual corroborará que el usuario exista en la base, y además genere un objeto user en req.session, indicando que puede utilizar la página.

Agregar validaciones a las rutas de vistas para que, si aún no estoy logueado, no pueda entrar a ver mi perfil, y si ya estoy logueado, no pueda volver a loguearme o registrarme.

En la vista de perfil, se deben arrojar los datos no sensibles del usuario que se haya logueado.

### Desafio 

Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login. 

Una vez completado el login, realizar la redirección directamente a la vista de productos.

Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario

Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo 

Todos los usuarios que no sean admin deberán contar con un rol “usuario”.

Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login

## Proceso de testing

Al cargar el proyecto, éste deberá comenzar en la pantalla de login

Al no tener un usuario, primero se creará un usuario, para esto, la pantalla de login deberá tener un link de redirección “Regístrate” 

El proceso de registro deberá guardar en la base de datos al usuario

Se regresará al proceso de login y se colocarán las credenciales de manera incorrecta, esto para probar que no se pueda avanzar a la siguiente pantalla.

Posteriormente, se colocarán las credenciales de manera correcta, esto para corroborar que se cree una sesión correctamente y que se haga una redirección a la vista de productos.

La vista de productos tendrá en una parte de arriba de la página el mensaje “Bienvenido” seguido de los datos del usuario que se haya logueado (NO mostrar password). Es importante que se visualice el “rol” para ver que aparezca “usuario” o “user”

Se presionará el botón de logout y se destruirá la sesión, notando cómo nos redirige a login.

Se ingresarán las credenciales específicas de admin indicadas en las diapositivas, el login debe redirigir correctamente y mostrar en los datos del rol: “admin” haciendo referencia a la correcta gestión de roles. 

Se revisará que el admin NO viva en base de datos, sino que sea una validación que se haga de manera interna en el código.
