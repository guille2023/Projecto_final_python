document.getElementById('cargainventario').addEventListener('submit',function(event){
    event.preventDefault()
    var codigo=document.getElementById('codigo').value
    var descripcion=document.getElementById('descripcion').value
    var cantidad=document.getElementById('cantidad').value
    var precio=document.getElementById('precio').value

    var excursion={
        codigo: codigo,
        descripcion:descripcion,
        cantidad:cantidad,
        precio:precio
    }
    console.log(excursion)
    url='https://sanronick.pythonanywhere.com/excursiones'
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(excursion)
    })
    .then(function(response){
        if (response.ok){
            return response.json()
        } else{
            throw new Error('Error al agregar la excursion')
        }
    })
    .then(function(data){
        alert('Excursion agregada exitosamente')
    })
    .catch(function(error){
        console.log('Error:',error)
        alert('Error al agegar la excursion')
    })
})