#Api
La api que he creado es de coches, se puede añadir editar obtener y eliminar coches de ella con los distintos metodos.
Cada coche tiene Marca, Modelo y año, además se le añade un Id por el que se le identificara.

### Endpoints 📌

| Método  | Ruta            | Cuerpo (JSON)                                          | Descripción                                  | Posibles Respuestas |
|---------|----------------|-------------------------------------------------------|----------------------------------------------|----------------------|
| `POST`  | `/coches`       | `{ "marca": "Toyota", "modelo": "Corolla", "año": 2020 }` | Crea un nuevo coche y lo añade a la lista. | `200 OK`: Devuelve el coche creado. |
| `GET`   | `/coches`       |                                                 | Obtiene la lista de todos los coches.       | `200 OK`: Lista de coches. |
| `GET`   | `/coches/{id}`  |                                                 | Obtiene un coche por su ID.                 | `200 OK`: Devuelve el coche. <br> `404 Not Found`: Coche no encontrado. |
| `PUT`   | `/coches/{id}`  | `{ "marca": "Honda", "modelo": "Civic", "año": 2022 }` | Actualiza un coche existente por su ID.     | `200 OK`: Devuelve el coche actualizado. <br> `404 Not Found`: Coche no encontrado. |
| `DELETE`| `/coches/{id}`  |                                                  | Elimina un coche por su ID.                 | `200 OK`: "Coche eliminado". <br> `404 Not Found`: "Coche no encontrado". |

### Probar api
Para probar la api se puede utilizar la aplicación Postman o la pagina web que he añadido tambien al repositorio que es muy sencilla pero mermite utilizar toda la utilidad de la api
