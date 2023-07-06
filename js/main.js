let condicionesGenerales = document.getElementsByClassName("condiciones-generales")[0];

condicionesGenerales.addEventListener("onclick", respuestaOnclick);

function respuestaOnclick() {
    condicionesGenerales.className(color);
}
    
condicionesGenerales.addEventListener("click", respuestaClick);

function respuestaClick() {
    let parrafo = document.createElement("p");
    parrafo.innerHTML = 'Estos son los términos y condiciones';
    document.footer.appendChild(parrafo);
}


let politicaSeguridad = document.getElementsByClassName("politica-seguridad")[0];

politicaSeguridad.addEventListener("click", respuestaClick1);

function respuestaClick1() {
    let parrafo1 = document.createElement("p");
    parrafo1.innerHTML = 'Estas son nuestras politicas de seguridad';
    document.footer.appendChild(parrafo1);
};

let terminosCondiciones = document.getElementsByClassName("terminos-condiciones")[0];

terminosCondiciones.addEventListener("click", respuestaClick2);

function respuestaClick2() {
    let parrafo2 = document.createElement("p");
    parrafo2.innerHTML = 'Estos son nuestros términos y condiciones';
    document.footer.appendChild(parrafo2);
};

