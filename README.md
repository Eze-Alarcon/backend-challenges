# Curso de Backend en Coderhouse - Segunda pre-entrega del proyecto final

Desafios del curso de coderhouse

- [Curso de Backend en Coderhouse - Segunda pre-entrega del proyecto final](#curso-de-backend-en-coderhouse---segunda-pre-entrega-del-proyecto-final)
- [Profesionalizando la BD](#profesionalizando-la-bd)
  - [Objetivos generales](#objetivos-generales)
  - [Objetivos específicos](#objetivos-específicos)
- [Documentacion del proyecto](#documentacion-del-proyecto)
  - [Consideraciones](#consideraciones)
  - [API Endpoints:](#api-endpoints)
  - [Detalles de los Endpoints](#detalles-de-los-endpoints)
    - [Endpoints de productos](#endpoints-de-productos)
      - [products/](#products)
      - [Products/:pid](#productspid)
- [Aspectos a incluir](#aspectos-a-incluir)
- [Aspectos de evaluacion](#aspectos-de-evaluacion)
  - [Productos](#productos)
  - [Carrito](#carrito)
  - [Seguridad](#seguridad)
  - [Operacion y formato](#operacion-y-formato)


# Profesionalizando la BD

## Objetivos generales

- Contarás con Mongo como sistema de persistencia principal
- Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

## Objetivos específicos

- Profesionalizar las consultas de productos con filtros, paginación y ordenamientos
- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

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
  status -> opcionales, valor por defecto: true
  thumbnail -> opcionales, valor por defecto: []
  stock -> opcionales, valor por defecto: 0
  code -> opcionales, valor por defecto: code-UUID (UUID -> ----valor random)
}

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



# Aspectos a incluir

**Metodo GET ✅**

Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:

  - Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)

    * limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
    
    * page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

    * query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
    
    * sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento

**Respuesta del metodo GET**

El método GET deberá devolver un objeto con el siguiente formato: **✅**

```
{
	status: success/error
  payload: Resultado de los productos solicitados
  totalPages: Total de páginas
  prevPage: Página anterior
  nextPage: Página siguiente
  page: Página actual
  hasPrevPage: Indicador para saber si la página previa existe
  hasNextPage: Indicador para saber si la página siguiente existe.
  prevLink: Link directo a la página previa (null si hasPrevPage=false)
  nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
```

  - Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio. **✅**

**Router del cart**

Además, agregar al router de carts los siguientes endpoints:

    
  - DELETE api/carts/:cid/products/:pid => deberá eliminar del carrito el producto seleccionado. **✅'**
  
  - PUT api/carts/:cid => deberá actualizar el carrito con un arreglo de productos con el formato especificado. **✅**
  
  - PUT api/carts/:cid/products/:pid => deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body **✅**
  
  - DELETE api/carts/:cid => deberá eliminar todos los productos del carrito **✅**
  
  - Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. 
    
    * Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados. **✅**

**Router de las views**

Vistas:

  - ‘/products’: visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:

    * Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
      
    * Contar con el botón de “agregar al carrito” directamente **✅**

  - ‘/carts/:cid' (cartId): visualizar un carrito específico
    
    * se deberán listar SOLO los productos que pertenezcan a dicho carrito.  **✅**


# Aspectos de evaluacion

## Productos

1. Los productos se visualizan correctamente en la vista de productos, y la misma cuenta con una paginación funcional. 

2. Además, pueden filtrarse por categoría o por disponibilidad, y ordenarse por precio de manera ascendente o descendente.	

## Carrito

1. Los métodos DELETE eliminan correctamente los productos del carrito. Los métodos PUT actualizan correctamente los elementos del carrito. 

2. Se realiza correctamente un populate al momento de obtener un carrito.

## Seguridad

1. La vista de productos muestra un mensaje de error si se pretende agregar una page inexistente? (p. ej. page=20003033 o page= -12323 o page = ASDASDASD).

2. Los endpoints de carrito devuelven error si se desea colocar un :cid o un :pid inexistente.	

## Operacion y formato

1. El formato de productos y carrito es en inglés. 

2. El proyecto corre con npm start.	
