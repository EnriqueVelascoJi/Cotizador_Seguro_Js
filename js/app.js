//Contructores

function Seguro(marca, year, tipoSeguro) {
    this.marca = marca;
    this.year = year;
    this.tipoSeguro = tipoSeguro;
}
//Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function() {

    let cantidad;
    const base = 2000;

    switch(this.marca) {

        case "1":
        cantidad = base*1.5;
            break;
        case "2":
            cantidad = base*1.05;
            break;
        case "3":
            cantidad = base*1.35;
            break;
        default:
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //Cada año que la diferencia es mayor el costo reduce en 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    console.log(cantidad);

    /*Si el seguro es basico se multiplica por un 30% mas*/
    /*Si el seguro es completo se multiplica por un 50% mas*/

    if(this.tipoSeguro === "basico" ) {
        cantidad += 1.30;
    } else {
        cantidad += 1.50;
    }
    return cantidad;

}

function UI(){}

//Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;
    const selecYear = document.querySelector("#year");

    for(let i = max; i > min; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selecYear.appendChild(option);
    }
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement("div");
    
    if(tipo === "error") {
        div.classList.add("mensaje", "error", "mt-10");
    } else {
        div.classList.add("mensaje", "correcto", "mt-10");
    }
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) => {
    const {marca, year, tipoSeguro} = seguro;
    let textoMarca;
    switch(marca) {

        case "1":
            textoMarca = "Americana";
            break;
        case "2":
            textoMarca = "Asiatico";
            break;
        case "2":
            textoMarca = "Europeo";
            break;
                        
        default:
            break;
    }

    // Crear el resultado 
    const div = document.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal">${tipoSeguro}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>

    `;
    const resultadoDiv = document.querySelector("#resultado");
    
    //Mostrar el spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
    setTimeout(() => {
        spinner.style.display = "none"; //Se borra el spinner
        resultadoDiv.appendChild(div); //Se muestra el resultado
    }, 3000);


}

//instanciar UI
const ui = new UI();
console.log(ui);
//Llena las opciones de loa años
document.addEventListener("DOMContentLoaded", () => {
    ui.llenarOpciones(); //Llena el select con los años
})


eventListeners();
function eventListeners() {
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //Leer la marca seleccionada
    const marca = document.querySelector("#marca").value;



    //Leer el año seleccionado
    const year = document.querySelector("#year").value;


    //Leer el tipo de cobertura
    const tipo = document.querySelector("input[name='tipo']").value;

    if( marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
        return;
    }

    ui.mostrarMensaje("Cotizando.....", "correcto");

    //Ocultar las cotizaciones previas
    const resultados = document.querySelector("#resultado div");
    if(resultados != null) {
        resultados.remove();
    }

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro);

}