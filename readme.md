# Proyecto Final de Programación Backend - CoderCommerce
¡Bienvenido/a al proyecto final de programación backend para CoderHouse! En este proyecto, desarrollaremos una aplicación backend utilizando diversas tecnologías y paquetes mencionados en el archivo package.json. El objetivo es construir una plataforma robusta y segura que permita a los usuarios comprar y vender sus productos y tambien chatear con otras personas.

## Descripción del Proyecto
El proyecto "CoderCommerce" es una aplicación de backend basada en Node.js y Express, que proporciona servicios y funcionalidades para administrar desafíos, usuarios y tareas. La aplicación utiliza una base de datos MongoDB para almacenar la información, y también cuenta con autenticación y autorización utilizando tokens JWT. A continuación, describiremos las tecnologías clave utilizadas en este proyecto:

## Tecnologías Principalesº
- **Node.js:** Plataforma de desarrollo para construir aplicaciones del lado del servidor utilizando JavaScript.
- **Express:** Framework de aplicaciones web para Node.js que simplifica la creación de API y manejo de rutas.
- **MongoDB:** Base de datos NoSQL que almacena los datos de la aplicación de manera eficiente y flexible.
- **Mongoose:** Librería de modelado de objetos para Node.js que simplifica la interacción con la base de datos MongoDB.
- **jsonwebtoken:** Biblioteca para generar y verificar tokens JWT, utilizada para la autenticación y autorización de usuarios.
- **bcrypt:** Herramienta para el hash y la verificación segura de contraseñas.
- **dotenv:** Módulo para cargar variables de entorno desde un archivo .env para mantener la configuración sensible separada del código fuente.
- **express-handlebars:** Motor de plantillas para renderizar vistas HTML en el servidor.- 
- **multer:** Middleware de Express para el manejo de carga de archivos.
- **passport:** Middleware para la autenticación en Express, utilizado junto con passport-jwt para la autenticación basada en tokens JWT.
- **winston:** Biblioteca para registrar mensajes de registro en la aplicación.
Dependencias de Desarrollo
- **Mocha:** Marco de pruebas para Node.js que permite escribir y ejecutar pruebas automatizadas.
- **Chai:** Biblioteca de aserciones para Mocha que facilita la escritura de pruebas.
- **Supertest:** Módulo para probar aplicaciones HTTP con Mocha, especialmente útil para probar las rutas de la API.
- **stripe:** es una librería para Node.js que permite interactuar con la plataforma de pagos en línea Stripe.Con esta librería, los desarrolladores pueden gestionar pagos, suscripciones, reembolsos y transferencias de forma segura y eficiente.Stripe facilita el procesamiento de pagos en aplicaciones y sitios web, ofreciendo una API fácil de usar y ampliamente utilizada.

## Scripts NPM

El archivo package.json contiene varios scripts útiles que podemos utilizar durante el desarrollo y pruebas de la aplicación:

- **start:** Inicia la aplicación en modo de producción ejecutando node index.js.
- **dev:** Inicia la aplicación en modo de desarrollo con nodemon, lo que permite reiniciar automáticamente el servidor cuando se realizan cambios en el código.
- **test:** Ejecuta las pruebas automatizadas utilizando Mocha y Chai.

## Instalación y Uso
1. Clona el repositorio desde GitHub.
1. Instala las dependencias ejecutando npm install en la raíz del proyecto.
1. Crea un archivo .env en la raíz del proyecto para configurar las variables de entorno necesarias.
1. Ejecuta npm run dev para iniciar la aplicación en modo de desarrollo.

## Contribuir
Si deseas contribuir a este proyecto, te animamos a que lo hagas. Puedes crear un "fork" del repositorio y enviar tus mejoras mediante "pull requests". Antes de enviar un "pull request", asegúrate de ejecutar las pruebas automatizadas y de que tu código cumpla con las pautas de estilo.

## Información Adicional
Para obtener más detalles sobre el funcionamiento de la API y las rutas disponibles, consulta la documentación proporcionada utilizando Swagger.  Puedes acceder a la documentación en la ruta /apidocs

## Licencia
Este proyecto está bajo la licencia ISC. Para obtener más información, consulta el archivo LICENSE.

Esperamos que disfrutes trabajando en este proyecto final de programación backend y que te ayude a mejorar tus habilidades en el desarrollo de aplicaciones robustas y seguras en Node.js.

**¡Buena suerte!**
