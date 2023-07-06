let usuarios = [
    {id:1, email:"grupo4codoacodo@fullstack.com", contraseña:"elfuturo"},
];
function validarEmail() {
    if (document.fvalida.email.value.length === 0) {
        Toastify({
            text: `Tiene que escribir su Email`,
            duration: 2000,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
        }).showToast();
        document.fvalida.email.focus();
        return false;
    }
    return true;
}

function validarContraseña() {
    if (document.fvalida.contraseña.value.length === 0) {
        Toastify({
            text: `Tiene que escribir su Contraseña`,
            duration: 2000,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
        }).showToast();
        document.fvalida.contraseña.focus();
        return false;
    }
    return true;
}

function VerificarUsuario() {
    if (usuarios.find((u) => u.email === document.fvalida.email.value)) {
        verificarContraseña();
    }   else {
        Toastify({
            text: `Su usuario no se encuentra registrado, solicite el alta a Recursos Humanos para poder modificar el inventario`,
            duration: 2000,
            gravity: "top", 
            position: "center", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
            },
        }).showToast();
        }
}

var logueo = document.createElement("div");
var contenedorFormulario = document.getElementsByClassName("contenedorFormulario")[0];
var teLogueaste = false;

function verificarContraseña() {
    let usuarioContraseña = false;
    usuarios.forEach(usuario => {
        if (usuario.contraseña === document.fvalida.contraseña.value && usuario.email === document.fvalida.email.value)
            { usuarioContraseña = true;
            }
    })
        if (usuarioContraseña) {
            teLogueaste = true;
            Toastify({
                text: `Su ingreso como administrador ha sido exitoso`,
                duration: 2000,
                gravity: "top", 
                position: "center", 
                stopOnFocus: true, 
                style: {
                background: "linear-gradient(0deg, rgba(4,9,244,1) 0%, rgba(48,45,253,1) 100%)",
                },
            }).showToast();
            logueo.textContent = "";
            logueo.textContent =`Usted esta navegando bajo el usuario de administrador: ${document.fvalida.email.value}`;
            contenedorFormulario.appendChild(logueo);
            document.fvalida.email.value="";
            document.fvalida.contraseña.value="";
        } else {
            Toastify({
                text: `Su contraseña es erronea, intente nuevamente`,
                duration: 2000,
                gravity: "top", 
                position: "center", 
                stopOnFocus: true, 
                style: {
                background: "#ff4500",
                },
            }).showToast();
        }
}
var opciones = document.getElementsByClassName("menuAdmin");
Array.from(opciones).forEach((item) => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        if (teLogueaste) {
            window.location.href = event.target.href;
        } else {
            Toastify({
                text: `Solo los administradores tienen acceso a estas opciones. Por favor ingrese su email y contraseña`,
                duration: 2000,
                gravity: "top", 
                position: "center", 
                stopOnFocus: true, 
                style: {
                background: "#ff4500",
                },
            }).showToast();
        }
    })
})







function validarFormulario() {
    if (!validarEmail() || !validarContraseña() || !VerificarUsuario()) {
    event.preventDefault(); // Evita que el formulario se envíe si hay errores de validación
    }
}

function cerrarSesion() {
    alert("La sesion se cerro correctamente y su carrito se ha borrado");
    logueo.textContent = "";
};

let enviar = document.getElementById("enviar");
enviar.addEventListener("click", validarFormulario);
let salir = document.getElementById("salir");
salir.addEventListener("click",cerrarSesion);
