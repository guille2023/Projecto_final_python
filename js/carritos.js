const URL = "https://sanronick.pythonanywhere.com/"
const app = Vue.createApp({
    data() {
        return {
            excursiones: [],
            mostrarCarrito: false,
            carrito: [],
        }
    },
    created() {
        this.obtener_excursiones()
    },
    methods: {
        obtener_excursiones() {
            fetch(URL + 'excursiones')
                .then(response => response.json())
                .then(data => {
                    this.excursiones = data
                })
                .catch(error => {
                    console.error(URL + 'excursiones', error)
                    alert('Error al obtener las excursiones.')
                })
        },
        obtenerCarrito() {
            fetch(URL + 'carrito')
                .then(response => response.json())
                .then(data => {
                    this.carrito = data
                    this.mostrarCarrito = true
                })
                .catch(error => {
                    console.error('Error al obtener el carrito:', error)
                    alert('Error al obtener el carrito.')
                })
        },
        agregarAlCarrito(excursion) {
            fetch(URL + 'carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigo: excursion.codigo,
                    cantidad: 1,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message)
                    setTimeout("document.location=document.location",1000);
                    this.obtenerCarrito()
                })
                .catch(error => {
                    console.error('Error al agregar excursion al carrito:', error)
                    alert('Error al agregar excursion al carrito.')
                })
            
        },
        quitarDelCarrito(excursion) {
            fetch(URL + 'carrito', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigo: excursion.codigo,
                    cantidad: 1,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message)
                    setTimeout("document.location=document.location");
                })
                .catch(error => {
                    console.error('Error al restar excursion del carrito:', error)
                    alert('Error al restar excursion del carrito.')
                })
        },
        

        
    
    },

   
})
app.mount('#app')