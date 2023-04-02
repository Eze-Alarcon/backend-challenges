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

✅ Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem

✅ NO ELIMINAR FileSystem de tu proyecto.

✅ Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat.

✅ Los mensajes deberán guardarse en una colección 'messages' en mongo.
✅ El formato es: {user:correoDelUsuario, message: mensaje del usuario}

✅ Corroborar la integridad del proyecto.

## Testing
