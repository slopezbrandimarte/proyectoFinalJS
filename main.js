

const tabla = document.querySelector("table")
const botonBuscar = document.getElementById("botonBuscar")
const inputBuscarTexto = document.querySelector('input[type="text"]')
const formulario = document.getElementById("formulario")

// almacenar las filas
const contenidoFilas = []



// buscar coincidencias en la tabla
function buscarCoincidencias() {
    const textoBuscar = inputBuscarTexto.value.toLowerCase()
    const filas = tabla.querySelectorAll(".contenidoColumnado")
    filas.forEach((fila) => {
        const columnas = fila.querySelectorAll("td")
        let coincidenciaEncontrada = false
        columnas.forEach((columna) => {
        const contenidoColumna = columna.textContent.toLowerCase()
        if (contenidoColumna.includes(textoBuscar)) {
            coincidenciaEncontrada = true
        }
    })
    fila.style.display = coincidenciaEncontrada ? "table-row" : "none"
    })
}

    botonBuscar.addEventListener("click", () => {
    buscarCoincidencias()
    })



    inputBuscarTexto.addEventListener("keypress", event =>{
        if(event.key === "enter"){
            buscarCoincidencias()
            event.preventDefault()
        }
    })



// Función para agregar una nueva fila
function agregarElemento() {
    const nuevaFila = document.createElement('tr')
    nuevaFila.classList.add("contenidoColumnado")


  // Obtenemos los valores de los inputs y select
    const fechaHoraPedido = obtenerFechaHoraActual()
    const selectAccion = document.querySelector(".selector")
    const accionSeleccionada = selectAccion.options[selectAccion.selectedIndex].text
    const inputDestinacion = document.querySelector(".destinacion input").value
    const inputBuque = document.querySelector(".buque input").value
    const inputEmpresa = document.querySelector(".empresa input").value
    const inputVencimiento = document.querySelector(".vencimiento input").value
    const fechaFormateada = luxon.DateTime.fromISO(inputVencimiento).toFormat("dd/MM/yy")


  // objeto para almacenar los datos de la fila
    const contenidoFila = {
        fechaHoraPedido,
        accion: accionSeleccionada,
        destinacion: inputDestinacion,
        buque: inputBuque,
        empresa: inputEmpresa,
        vencimiento: fechaFormateada
    };


// formatear la fecha 
    function obtenerFechaHoraActual(){
        let DateTime = luxon.DateTime

        const now = DateTime.now()
        return now.toLocaleString (DateTime.DATETIME_med)
}

  // Añadir la fila al array
    contenidoFilas.push(contenidoFila)

  // Crear celdas de la nueva fila
    for (const prop in contenidoFila) {
        const celda = document.createElement("td")
        celda.textContent = contenidoFila[prop]
        nuevaFila.appendChild(celda)
    }

    const entregado = document.createElement("td")
    const inputEntregado = document.createElement("input")
    inputEntregado.type = "checkbox"
    entregado.appendChild(inputEntregado)
    nuevaFila.appendChild(entregado)

    tabla.appendChild(nuevaFila)


  // Evento para borrar una fila al marcar el checkbox y almacenar en sessionStorage



    inputEntregado.addEventListener("change", function(){
        if(inputEntregado.checked){
    
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
                
            swalWithBootstrapButtons.fire({
                title: 'Esta seguro?',
                text: "Si confirmas esta operacion se guardara en el historial de pedidos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    contenidoFila.fechaEntregado = luxon.DateTime.now()
                        
                    sessionStorage.setItem(`filaEntregada_${contenidoFila.fechaEntregado.toMillis()}`, JSON.stringify(contenidoFila))
                      // Eliminar la fila de la tabla
                    tabla.removeChild(nuevaFila)
                                
                    swalWithBootstrapButtons.fire(
                        'Agregado!',
                        'El pedido fue guardado exitosamente',
                        'success'
                        )
                }else if(
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                ){
                    inputEntregado.checked = false
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'El pedido volvera a la lista de pendiente',
                        'error'
                    )}
            })
            }else{
            // Si el checkbox se desmarca, elimina la información almacenada en sessionStorage
                sessionStorage.removeItem("filaEntregada")
            }
    })
        
 // Limpiar los campos después de agregar la fila
    document.querySelectorAll(".destinacion input, .buque input, .empresa input, .vencimiento input").forEach(input => input.value = "")
    selectAccion.selectedIndex = 0
}
document.addEventListener("DOMContentLoaded", function(){
    const botonAgregarTarea = document.getElementById("botonAgregarTarea")
    botonAgregarTarea.addEventListener("click", agregarElemento)
})
    

//fecha y hora actual en formato dd/mm/yyyy hh:mm
function obtenerFechaHoraActual(){
    let DateTime = luxon.DateTime

    const now = DateTime.now()
    return now.toLocaleString (DateTime.DATETIME_med)
}


//  borrar el contenido de los inputs
const botonBorrar = document.querySelector(".botonBorrar")
botonBorrar.addEventListener("click", () => {
    document.querySelectorAll('.destinacion input, .buque input, .empresa input, .vencimiento input, .entregado input').forEach(input => input.value = "")
})
