class Participante {
    constructor([nombre, edad, regalo_deseado, numero_turno]) {
        this.nombre = nombre
        this.edad = edad
        this.regalo = regalo_deseado
        this.turno = numero_turno
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.length = 0
        this.filaEspera = []
        this.historialFotos = []
    }

    peek() {
        return this.first
    }

    enqueue(datos) {
        const newParticipante = new Participante(datos)
        if (this.length === 0) {
            this.first = newParticipante
            this.last = newParticipante
        } else {
            this.last.next = newParticipante
            this.last = newParticipante
        }
        this.filaEspera.push(newParticipante)
        this.length++
        this.pintar()
        return this
    }

    dequeue() {
        const temporal = this.first.next
        this.first = temporal
        this.length--
        this.length === 0 ? this.last = null : this.last
        return this
    }

    pintar() {

        this.length !== 0 ? btnSiguiente.disabled = false : btnSiguiente.disabled = true

        filaVaciaMensaje.classList.add('d-none')
        contadorCola.textContent = `En espera : ${this.length} niños `
        let html = ''
        this.filaEspera.forEach(nino => {
            html += `
                 <div class="list-group-item d-flex justify-content-between align-items-center border-start border-danger border-3 mb-2 rounded shadow-sm bg-white text-dark">
                        <div>
                            <h6 class="fw-bold mb-0">${nino.nombre}</h6>
                            <small class="text-muted">Edad: ${nino.edad} | Deseo: ${nino.regalo}</small>
                        </div>
                        <span class="badge bg-danger rounded-pill fw-bold">#${nino.turno}</span>
                </div> `
        })
        listaEspera.innerHTML = html
    }

    llamarSiguiente() {

        console.log('El turno es de ', this.first.nombre)

        contenedorActual.classList.add('d-none')
        let ninoTemporal = this.first

        console.log(ninoTemporal)

        if (ninoTemporal.next != null) {
            nombreProximo.textContent = ninoTemporal.next.nombre

        }

        let html = `     
                                        <div class="santa-animado">🎅</div>

                            <div class="p-2 text-start">
                                    <div class="d-flex align-items-center mb-3">
                                        <h4 class="fw-bold m-0 text-dark" style="font-size: 1.4rem;">${ninoTemporal.nombre}</h4>
                                        <span
                                            class="badge bg-danger ms-2 px-2.5 py-1.5 rounded-pill shadow-sm small fw-bold">Turno
                                            #${ninoTemporal.turno}</span>
                                    </div>

                                    <div class="row g-2 pt-2 border-top border-light-subtle">
                                        <div class="col-12 mb-1">
                                            <span class="text-muted small d-block uppercase fw-semibold"
                                                style="font-size: 0.75rem;">EDAD:</span>
                                            <span class="text-dark fw-medium" style="font-size: 0.95rem;">${ninoTemporal.edad}
                                                años</span>
                                        </div>
                                        <div class="col-12">
                                            <span class="text-muted small d-block uppercase fw-semibold"
                                                style="font-size: 0.75rem;">REGALO PROMETIDO:</span>
                                            <span class="text-dark fw-bold"
                                                style="color: #d42426 !important; font-size: 1rem;">${ninoTemporal.regalo}</span>
                                        </div>
                                    </div>
                                </div>`

        contendorActualfoto.innerHTML = html
    }

    // llenarHistorial() {
    //     historialVacioMensaje.classList.add('d-none')

    //     let html = `
    //     <div
    //                         class="list-group-item d-flex justify-content-between align-items-center border-start border-success border-3 mb-2 rounded bg-light text-dark opacity-75">
    //                         <div>
    //                             <h6 class="fw-bold mb-0 text-decoration-line-through text-muted">NOMBRE</h6>
    //                             <small class="text-success fw-semibold">📸 ¡Foto capturada con éxito!</small>
    //                         </div>
    //                         <span class="badge bg-success rounded-pill">Turno #</span>
    //                     </div>

    //     `
    // }

}


//variables
let formulario = document.querySelector('#formularioRegistro')
let nombreNino = document.querySelector('#nombreNino')
let edad = document.querySelector('#edadNino')
let descripcion_regalo = document.querySelector('#regaloNino')
let listaEspera = document.querySelector('#listaEspera')
let contadorCola = document.querySelector('#contadorCola')
let btnSiguiente = document.querySelector('#btnSiguienteTurno')
let contenedorActual = document.querySelector('.ocultarActual')
let contendorActualfoto = document.querySelector('#contenedorActual')
let filaVaciaMensaje = document.querySelector('#filaVaciaMensaje')
let nombreProximo = document.querySelector('#nombreProximo')
let historialVacioMensaje = document.querySelector('#historialVacioMensaje')

//cola
let participantes = new Queue()

formulario.addEventListener('submit', (event) => {
    let participante_temporal = [nombreNino.value, edad.value, descripcion_regalo.value]
    participantes.enqueue(participante_temporal)
    formulario.reset()
})

btnSiguiente.addEventListener('click', (event) => {
    participantes.llamarSiguiente()
})