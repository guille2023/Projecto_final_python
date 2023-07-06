const app = Vue.createApp({
    data() {
        return {
            excursiones: []
        }
    },
    methods: {
        obtenerExcursiones() {
            const URL = "https://sanronick.pythonanywhere.com/"

            fetch(URL + 'excursiones')
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al mostrar las excursiones')
                    }
                })
                .then(data => {
                    this.excursiones = data
                })
                .catch(error => {
                    console.log('Error:', error)
                    alert('Error al mostrar las excursiones')
                })
        },
        eliminarExcursion(codigo) {
            const URL = "https://sanronick.pythonanywhere.com/"

            fetch(URL + `excursiones/${codigo}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        
                        this.excursiones = this.excursiones.filter(excursion => excursion.codigo !== codigo)
                        console.log('Excursion eliminada correctamente.')
                    }
                })
                .catch(error => {
                    console.log('Error:', error)
                    alert('Error al eliminar la excursion')
                })
        }
    },
    mounted() {
        this.obtenerExcursiones()
    }
})
app.mount('body')