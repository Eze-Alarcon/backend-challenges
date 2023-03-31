# backend-desafios

Desafios del curso de coderhouse

# Integrar vistas y sockets a nuestro servidor actual

## Consigna

Pratica Integradora

## Aspectos a incluir

- Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.

✅ Crear una base de datos llamada 'ecommerce' dentro de tu Atlas.

✅ Crear sus colecciones 'carts', 'messages', 'products'

✅ Crear sus respectivos schemas.

✅ Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta 'dao'.

✅ Dentro de dao, agregar también una carpeta 'models' donde vivirán los esquemas de MongoDB.

✅ Contener todos los Managers (FileSystem y DB) en una carpeta llamada 'Dao'

- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem

- NO ELIMINAR FileSystem de tu proyecto.

- Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase.

  - Los mensajes deberán guardarse en una colección 'messages' en mongo (no es necesario implementarlo en FileSystem).
  - El formato es: {user:correoDelUsuario, message: mensaje del usuario}

- Corroborar la integridad del proyecto.

### Extra **hacer**

CartManager tiene una funcion extra sin utilidad.

## Testing

Se instalará y correrá el servidor en el puerto indicado.

- El servidor debe levantarse sin problema.

Se abrirá la ruta raíz

- Debe visualizarse el contenido de la vista index.handlebars
- No se debe activar el websocket aún.

Se buscará en la url del navegador la ruta '/realtimeproducts'.

- Se corroborará que el servidor haya conectado con el cliente, en la consola del servidor deberá mostrarse un mensaje de 'cliente conectado'.
- Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.
