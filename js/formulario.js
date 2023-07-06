function validarNombre() {
    if (document.fvalida.nombre.value.length === 0) {
        Toastify({
            text: `Tiene que escribir su Nombre`,
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
            onClick: function(){} 
        }).showToast();
        document.fvalida.nombre.focus();
        return false;
    }
    return true;
}

function validarApellido() {
    if (document.fvalida.apellido.value.length === 0) {
        Toastify({
            text: `Tiene que escribir su Apellido`,
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
            onClick: function(){} 
        }).showToast();
        document.fvalida.apellido.focus();
        return false;
    }
    return true;
}

function validarDireccion() {
    if (document.fvalida.direccion.value.length === 0) {
        Toastify({
            text: `Tiene que escribir su Direccion`,
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
            onClick: function(){} 
        }).showToast();
        document.fvalida.direccion.focus();
        return false;
    }
    return true;
}
function validarEmail() {
    if (document.fvalida.email.value.length === 0) {
        Toastify({
            text: `Tiene que escribir su Email`,
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
            onClick: function(){} 
        }).showToast();
        document.fvalida.email.focus();
        return false;
    }
    return true;
}

function validarMotivo() {
    if (document.fvalida.motivo.value === "Seleccione un motivo") {
        Toastify({
            text: `Debe seleccionar un motivo`,
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
            onClick: function(){} 
        }).showToast();
        document.fvalida.motivo.focus();
        return false;
    }
    return true;
}

function validarFormulario() {
    if (!validarNombre() || !validarApellido() || !validarDireccion() || !validarMotivo()) {
    event.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
    }
}

let enviar = document.getElementById("enviar");
enviar.addEventListener("click", validarFormulario);
