document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = "http://localhost:8080/coches"; 
    const tableBody = document.getElementById("tabla_coches");
    const form = document.getElementById("form_coche");
    const id_cocheNuevo = document.getElementById("id_cocheNuevo");
    const form_eliminar= document.getElementById("form_eliminar");

    // Obtener coches y mostrarlos en la tabla
    try {
        const response = await fetch(apiUrl, { method: "GET" });
        if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
        }

        const data = await response.json();
        console.log("Coches obtenidos");

        data.forEach(car => {
            const row = document.createElement("tr");
            row.setAttribute("data-id", car.id); // Añadir atributo para identificar la fila

            row.innerHTML = `
                <td>${car.id}</td>
                <td>${car.marca}</td>
                <td>${car.modelo}</td>
                <td>${car.año}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error:", error);
    }

    // Manejar el envío del formulario
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const id = document.getElementById("id").value;
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const año = document.getElementById("año").value;

        try {
            let response;

            if (id === "") {//crear coche
                response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        marca: marca,
                        modelo: modelo,
                        año: parseInt(año)
                    })
                });
            } else {
                const url = apiUrl+"/"+id;
                response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        marca: marca,
                        modelo: modelo,
                        año: parseInt(año)
                    })
                });
            }

            if (!response.ok) {
                throw new Error("Error al añadir o editar el coche");
            }

            const coche_nuevo = await response.json();
            console.log("Coche añadido o editado con éxito");

            // Actualizar tabla
            const existingRow = document.querySelector(`tr[data-id='${coche_nuevo.id}']`);
            if (existingRow) {
                // Si el coche ya existe, actualiza la fila
                existingRow.innerHTML = `
                    <td>${coche_nuevo.id}</td>
                    <td>${coche_nuevo.marca}</td>
                    <td>${coche_nuevo.modelo}</td>
                    <td>${coche_nuevo.año}</td>
                `;
            } else {
                // Si el coche es nuevo, añade una nueva fila
                const row = document.createElement("tr");
                row.setAttribute("data-id", coche_nuevo.id);
                row.innerHTML = `
                    <td>${coche_nuevo.id}</td>
                    <td>${coche_nuevo.marca}</td>
                    <td>${coche_nuevo.modelo}</td>
                    <td>${coche_nuevo.año}</td>
                `;
                tableBody.appendChild(row);
            }

            // Resetear el formulario
            form.reset();
        } catch (error) {
            console.error("Error:", error);
        }
    });

    form_eliminar.addEventListener("submit", async function (event) {
        event.preventDefault();

        const id_eliminar = document.getElementById("id_eliminar").value;

        try {
            const url = apiUrl+"/"+id_eliminar; 
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el coche");
            }

            console.log('Coche eliminado con éxito');

            // Eliminar la fila correspondiente de la tabla
            const rowToDelete = document.querySelector(`tr[data-id='${id_eliminar}']`);
            if (rowToDelete) {
                rowToDelete.remove();
            }

            // Resetear el formulario
            form_eliminar.reset();
        } catch (error) {
            console.error("Error:", error);
        }
    });
});

