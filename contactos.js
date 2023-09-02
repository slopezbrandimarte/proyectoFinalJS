fetch('datos.json')
.then(response => response.json())
.then(contactos =>{
    const personas = contactos.personas
    const listaContactos = document.getElementById('listaContactos')

    personas.forEach(persona => {
        const nuevaFila = document.createElement('tr')
        nuevaFila.classList.add('contenidoColumnado')

        const datosPersonales = ['nombre', 'apellido','correo','localidad']
        datosPersonales.forEach(datosPersonales => {
            const celda = document.createElement('td')
            celda.textContent = persona[datosPersonales]
            nuevaFila.appendChild(celda)
        })
        listaContactos.appendChild(nuevaFila)

    })

})
.catch((error) =>{
    console.error('ocurrio un error en la carga de contactos',error)
})

// Agrega un evento al campo de búsqueda
const inputBuscarContactos = document.getElementById("BuscarContactos")


if (inputBuscarContactos) {
    inputBuscarContactos.addEventListener("input", buscarContactos)
}

function buscarContactos() {
    const buscarTexto = inputBuscarContactos.value.toLowerCase()
    const contactos = document.querySelectorAll(".contenidoColumnado")

    contactos.forEach((contacto) => {
    const contenidoContacto = contacto.textContent.toLowerCase()
    contacto.style.display = contenidoContacto.includes(buscarTexto) ? "table-row": "none"
    })
}
botonBuscar.addEventListener("click", () => {
    buscarContactos()
})

inputBuscarContactos.addEventListener("keypress", event =>{
    if(event.key === "enter"){
        buscarContactos()
        event.preventDefault()
    }
})

