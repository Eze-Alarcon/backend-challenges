# Curso de Backend en Coderhouse

Desafios del curso de coderhouse

- [Curso de Backend en Coderhouse](#curso-de-backend-en-coderhouse)
- [Tercera práctica de integración](#tercera-práctica-de-integración)
  - [Aspectos a incluir](#aspectos-a-incluir)
- [Módulos de testing para proyecto final](#módulos-de-testing-para-proyecto-final)
  - [Aspectos a incluir](#aspectos-a-incluir-1)
- [Cuarta práctica integradora](#cuarta-práctica-integradora)
  - [Aspectos a incluir](#aspectos-a-incluir-2)
- [Proyecto final](#proyecto-final)
  - [Aspectos a incluir](#aspectos-a-incluir-3)

# Tercera práctica de integración

## Aspectos a incluir

- Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo un botón que redireccione a una página para restablecer la contraseña (no recuperarla). 👍
    * link del correo debe expirar después de 1 hora de enviado. 👍
    * No se puede colocar la misma contraseña de antes 👍
    * Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el correo de restablecimiento, el cual contará con una nueva duración de 1 hora. 👍

- Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos

- Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
    * Si un producto se crea sin owner, se debe colocar por defecto “admin”.
    * El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)

- Modificar los permisos de modificación y eliminación de productos para que:
    * Un usuario premium sólo pueda borrar los productos que le pertenecen.
    * El admin pueda borrar cualquier producto, aún si es de un owner.

- Además, modificar la lógica de carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece

- Implementar una nueva ruta en el router de api/users, la cual será /api/users/premium/:uid  la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.

# Módulos de testing para proyecto final

Realizar módulos de testing para tu proyecto principal, utilizando los módulos de mocha + chai + supertest

## Aspectos a incluir

- Se deben incluir por lo menos 3 tests desarrollados para
    * Router de products.
    * Router de carts.
    * Router de sessions.

- NO desarrollar únicamente tests de status, la idea es trabajar lo mejor desarrollado posible las validaciones de testing

# Cuarta práctica integradora

Con base en el proyecto que venimos desarrollando, toca solidificar algunos procesos

## Aspectos a incluir

- Mover la ruta suelta /api/users/premium/:uid a un router específico para usuarios en /api/users/

- Modificar el modelo de User para que cuente con una nueva propiedad “documents” el cual será un array que contenga los objetos con las siguientes propiedades
    * name: String (Nombre del documento).
    * reference: String (link al documento).
    **No es necesario crear un nuevo modelo de Mongoose para éste.**

- Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout 👍
 
- Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos. Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.

- El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
    * Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.

- Modificar el endpoint /api/users/premium/:uid   para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
    * Identificación, Comprobante de domicilio, Comprobante de estado de cuenta

**En caso de llamar al endpoint, si no se ha terminado de cargar la documentación, devolver un error indicando que el usuario no ha terminado de procesar su documentación. (Sólo si quiere pasar de user a premium, no al revés)**

# Proyecto final

Backend de una aplicación ecommerce

## Aspectos a incluir

- Desde el router de /api/users, crear tres rutas:
    * GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol) 👍

    * DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). 👍
    *Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad*

- Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce

- Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.

- Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.

- No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios premium para crear productos, o vistas de panel de admin para updates de productos, etc)

- Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.
