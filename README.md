# Curso de Backend en Coderhouse - Segunda pre-entrega del proyecto final

Desafios del curso de coderhouse

- [Curso de Backend en Coderhouse - Segunda pre-entrega del proyecto final](#curso-de-backend-en-coderhouse---segunda-pre-entrega-del-proyecto-final)
  - [Profesionalizando la BD](#profesionalizando-la-bd)
    - [Objetivos generales](#objetivos-generales)
    - [Objetivos específicos](#objetivos-específicos)
    - [Sugerencias](#sugerencias)
  - [Aspectos a incluir](#aspectos-a-incluir)
  - [Aspectos de evaluacion](#aspectos-de-evaluacion)
    - [Productos](#productos)
    - [Carrito](#carrito)
    - [Seguridad](#seguridad)
    - [Operacion y formato](#operacion-y-formato)
  - [Documentacion del proyecto](#documentacion-del-proyecto)
  - [Testing](#testing)


## Profesionalizando la BD

### Objetivos generales

- Contarás con Mongo como sistema de persistencia principal
- Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

### Objetivos específicos

- Profesionalizar las consultas de productos con filtros, paginación y ordenamientos
- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

### Sugerencias

**Feel free to delete this**

- Permitir comentarios en el archivo
- La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia. 
- Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido. 

## Aspectos a incluir

**Metodo GET ✅**

Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:

  - Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)

    * limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
    
    * page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

    * query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
    
    * sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento

**Respuesta del metodo GET**

El método GET deberá devolver un objeto con el siguiente formato:

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

  - Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio. **🔴 falta la parte de disponibilidad q ni idea que es**

**Router del cart**

Además, agregar al router de carts los siguientes endpoints:

    
  - DELETE api/carts/:cid/products/:pid => deberá eliminar del carrito el producto seleccionado. **TODO**
  
  - PUT api/carts/:cid => deberá actualizar el carrito con un arreglo de productos con el formato especificado. **TODO**
  
  - PUT api/carts/:cid/products/:pid => deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body **TODO**
  
  - DELETE api/carts/:cid => deberá eliminar todos los productos del carrito **Modificar**
  
  - Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados. **TODO**

**Router de las views**

  - Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:

    * Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
    
    * Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

  - Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 


## Aspectos de evaluacion

### Productos

1. Los productos se visualizan correctamente en la vista de productos, y la misma cuenta con una paginación funcional. 

2. Además, pueden filtrarse por categoría o por disponibilidad, y ordenarse por precio de manera ascendente o descendente.	

### Carrito

1. Los métodos DELETE eliminan correctamente los productos del carrito. Los métodos PUT actualizan correctamente los elementos del carrito. 

2. Se realiza correctamente un populate al momento de obtener un carrito.

### Seguridad

1. La vista de productos muestra un mensaje de error si se pretende agregar una page inexistente? (p. ej. page=20003033 o page= -12323 o page = ASDASDASD).

2. Los endpoints de carrito devuelven error si se desea colocar un :cid o un :pid inexistente.	

### Operacion y formato

1. El formato de productos y carrito es en inglés. 

2. El proyecto corre con npm start.	

## Documentacion del proyecto

API Paths:



## Testing
