# Documentación para utilizar la aplicacion

## Aplicación

Esta aplicación está implementada con nodejs + mongodb con la librería mongoose. Se trata de un briefing para una aplicación al estilo wallapop. En ella 
los usuarios se podrán registrar y una vez registrados podrán publicar anuncios para ofertar articulos. Tanto para ofertar articulos como para buscar articulos 
habrá que estar logueado en el sistema.

## BBDD

La aplicación utiliza mongodb con la librería mongoose, con puerto y nombre de la base de datos:

process.env.PORT= 3000;
process.env.MONGODB_URI =   'mongodb//localhost:27017/MiNodePop';

## Pruebas de funcionamiento y rutas

### Añadir un nuevo usuario

En postman nos vamos a POST y en la url http://localhost:3000/users nos vamos a body, seleccionamos raw y tipo de dato json en el dropdown e introducimos los credenciales en json para crear un nuevo usuario, por ejemplo: 

{
	"name":"irma",
	"email":"irma@exampole.com",
	"password":"abcde1234"
}

Si todo ha ido correctamente, al pulsar send, el servidor nos mandará un status 200 ok y si nos vamos a headers podremos extraer el valor del x-auth que necesitaremos para introducir anuncios o ver anuncios creados. Para el usuario anterior el x-auth es: 

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTM2ZGJlNTEwZGIzYjA1ZmUwNzJmYTQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTEzNTQ0Njc4fQ.C7PmVuF33hTTPHTmNvEu1XRyMy8zFzBlBOOEFDrVi9o

###Añadir un nuevo anuncio

En postman nos vamos a POST y en la url http://localhost:3000/ads nos vamos a headers para introducir el x-auth del usuario de pruebas, ya que para ver los anuncios debemos estar logueados en el sistema.

En headers selecciono content-type: x-auth y en value introducimos el x-auth, en este caso: 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTM2ZGJlNTEwZGIzYjA1ZmUwNzJmYTQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTEzNTQ0Njc4fQ.C7PmVuF33hTTPHTmNvEu1XRyMy8zFzBlBOOEFDrVi9o

Ahora dentro, de la misma ruta vamos a body, raw, seleccionamos json en el dropdown y introducimos un articulo para anunciar en formato json, por ejemplo:

{
	"name":"bike",
	"sale":true,
	"price":100
}

Si todo va bien, al pulsar send debemos recibir un codigo status 200 y los datos introducidos se habrán guardado en la bbdd.

###Ver anuncios

En postman nos vamos a GET y en la url http://localhost:3000/ads vamos a headers, introducimos content-type: x-auth y value el x-auth de alguno de nuestros usuarios de prueba y pulsamos send.

Recibiremos un código de estado 200 y por pantalla veremos los objetos anunciados, en este caso, por ejemplo :

[
    {
        "_id": "5a36dc8110db3b05fe072fa6",
        "name": "kindle",
        "sale": true,
        "price": 20,
        "_seller": "5a36dbe510db3b05fe072fa4",
        "__v": 0,
        "tags": []
    },
    {
        "_id": "5a36e10f4a626c0635da8736",
        "name": "bike",
        "sale": true,
        "price": 100,
        "_seller": "5a36dbe510db3b05fe072fa4",
        "__v": 0,
        "tags": []
    }
]