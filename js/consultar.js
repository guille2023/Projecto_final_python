const url = "https://sanronick.pythonanywhere.com/"

fetch(url + "excursiones")
    .then(function (response) {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al mostrar las excursiones.')
        }
    })

    .then(function (data) {
        var tablaExcursiones = document.getElementById('tablaExcursiones')
        data.forEach(function (excursion) {
            var fila = document.createElement('tr')
            fila.innerHTML = '<td>' + excursion.codigo + '</td>' +
                '<td>' + excursion.descripcion + '</td>' +
                '<td align="right">' + excursion.cantidad + '</td>' +
                '<td align="right">&nbsp; &nbsp;&nbsp; &nbsp;' + excursion.precio + '</td>'
            tablaExcursiones.appendChild(fila)

        })
    })
    .catch(function (error) {
        console.log('Error:', error)
        alert('Error al listar las excursiones')
    })