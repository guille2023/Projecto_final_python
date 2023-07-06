const URL = "https://sanronick.pythonanywhere.com/"

        const app = Vue.createApp({
            data() {
                return {
                    codigo: '',
                    mostrarExcursion: false,
                    descripcion: '',
                    cantidad: '',
                    precio: ''
                }
            },
            methods: {
                obtenerExcursion() {
                    fetch(URL + 'excursiones/' + this.codigo)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                throw new Error('Error al mostrar las excursiones')
                            }
                        })
                        .then(data => {
                            this.descripcion = data.descripcion
                            this.cantidad = data.cantidad
                            this.precio = data.precio
                            this.mostrarExcursion = true
                        })
                        .catch(error => {
                            alert('Error al mostrar las excursiones')
                        })
                },
                guardarCambios() {
                    const excursion = {
                        codigo: this.codigo,
                        descripcion: this.descripcion,
                        cantidad: this.cantidad,
                        precio: this.precio
                    }

                    fetch(URL + 'excursiones/' + this.codigo, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(excursion)
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                throw new Error('Error al guardar los cambios de la excursion')
                            }
                        })
                        .then(data => {
                            alert('Cambios guardados correctamente.')
                            location.reload()
                        })
                        .catch(error => {
                            alert('Error al guardar los cambios de la excursion.')
                        })
                }
            }
        })
        app.mount('#app')