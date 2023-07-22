# Desafio de testing




## Instalación

Sobre la carpeta del proyecto ejecutar:

```bash
  npm install 
```
## Ejecución

Una vez instaladas las dependencias ejecutar:

```bash
  npm start
```    

## Testing

Una vez instaladas las dependencias ejecutar:

```bash
  npm run test
```    

## Variables de entorno

### Conexión a la base de datos

Para conectar con su base de datos debe crear un archivo .env y en la variable STRING_CONNECTION agregarle el string que genera atlas para la conexión.
Link:https://www.mongodb.com/cloud/atlas/register
### Puerto
Por defecto el puerto del servidor es el 8080, si se necesita se puede indicar en el archivo .env antes creado una variable PORT para poner el puerto que desee.

## Productos

### Llenar base de datos

Para llenar la base de datos utilice el siguiente endpoint y la base de datos se llenara automaticamente.


| Método HTTP | URL                                  | Descripción                                         |
| ----------- | ------------------------------------ | --------------------------------------------------- |
| POST        | `/products/fulldb`                      | Crea muchos productos                            |
