let footer = `<div id="animacion"><p id="derechosreservados">&#169 2023 grupo 4 Full Stack Python - All Rights Reserved</p></div>`

document.getElementById('pie-animacion').innerHTML = footer;

let divFooter = document.getElementsByClassName("div-footer")[0];
let condicionesGenerales = document.getElementsByClassName("condiciones-generales")[0];

condicionesGenerales.addEventListener("mousedown", respuestaClick);
condicionesGenerales.addEventListener("mouseup", limpiarDiv);

let politicaSeguridad = document.getElementsByClassName("politica-seguridad")[0];
politicaSeguridad.addEventListener("mousedown", respuestaClick1);
politicaSeguridad.addEventListener("mouseup", limpiarDiv);


let terminosCondiciones = document.getElementsByClassName("terminos-condiciones")[0];
terminosCondiciones.addEventListener("mousedown", respuestaClick2);
terminosCondiciones.addEventListener("mouseup", limpiarDiv);



function respuestaClick() {
    divFooter.innerHTML = '<p>Informes de servicios y tarifas: en todos los casos con orientativos y no revisten confirmación.</p>';
}
function respuestaClick1() {
    divFooter.innerHTML = '<p>El site opera con redes, protegidas por sistemas standard de seguridad online y de protección de contraseñas en la Web.</p>';
}
function respuestaClick2() {
    divFooter.innerHTML = '<p>Como condición de uso de este Sitio Web, usted garantiza que toda la información que proporciona en este Sitio Web es verdadera, precisa y completa</p>';
}
function limpiarDiv() {
    divFooter.innerHTML = "";
}


let header = `
<div class="head">
            <img src="img/Front Trips.png" alt="Front Trips" class="logo">
            </div>
        <nav>
            <ul class="navbar">
                <li>
                    <a href="index.html">Home</a>
                </li>
                <li>
                    <a href="Turismo copy.html">Excursiones</a>
                </li>
                <li>
                    <a href="hotel.html">Hoteles</a>
                </li>
                <li>
                    <a href="contacto.html">Contacto</a>
                </li>
                <li>
                    <a href="administradores.html">Administradores</a>
                </li>
            </ul>
        </nav>`
document.getElementById('cabeza').innerHTML = header
