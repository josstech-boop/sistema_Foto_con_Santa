class Participante {
    constructor([nombre, edad, regalo_deseado]) {
        this.nombre = nombre
        this.edad = edad
        this.regalo = regalo_deseado
        this.turno = 0
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.length = 0
    }

    peek() {
        return this.first
    }

    enqueue(datos) {
        const newParticipante = new Participante(datos)
        newParticipante.turno = this.length + 1
        if (this.length === 0) {
            this.first = newParticipante
            this.last = newParticipante
        } else {
            this.last.next = newParticipante
            this.last = newParticipante
        }
        this.length++
        this.pintar()
        btnSiguiente.disabled = false
        return this
    }

    dequeue() {
        const datoHistorial = this.first
        const temporal = this.first.next
        this.first = temporal
        this.length--
        this.length === 0 ? this.last = null : this.last
        return datoHistorial
    }

    pintar() {
        contadorCola.textContent = `En espera : ${this.length} niños `
        if (this.length !== 0) {
            nombreProximo.textContent = `Turno de ${this.first.nombre} #${this.first.turno}`
            filaVaciaMensaje.classList.add('d-none')
            let filaActual = this.first
            let html = ''

            if (filaActual.next === null) {
                html = `<div class="list-group-item d-flex justify-content-between align-items-center border-start border-danger border-3 mb-2 rounded shadow-sm bg-white text-dark">
                <div>
                    <h6 class="fw-bold mb-0">${filaActual.nombre}</h6>
                    <small class="text-muted">Edad: ${filaActual.edad} | Deseo: ${filaActual.regalo}</small>
                </div>
                <span class="badge bg-danger rounded-pill fw-bold">#${filaActual.turno}</span>
            </div> `
            } else {
                let contador = 0
                while (contador < this.length) {
                    html += ` <div class="list-group-item d-flex justify-content-between align-items-center border-start border-danger border-3 mb-2 rounded shadow-sm bg-white text-dark" >
                        <div>
                            <h6 class="fw-bold mb-0">${filaActual.nombre}</h6>
                            <small class="text-muted">Edad: ${filaActual.edad} | Deseo: ${filaActual.regalo}</small>
                        </div>
                        <span class="badge bg-danger rounded-pill fw-bold">#${filaActual.turno}</span>
                </div> `

                    filaActual = filaActual.next
                    contador++
                }
                contador = 0
            }

            listaEspera.innerHTML = html

        } else {
            listaEspera.innerHTML = `
             <div class="text-center py-4 text-muted my-auto" id="filaVaciaMensaje">
                            <p class="fs-2 m-0 ">🫙</p>
                            <p class="m-0 small ">La cola está vacía por el momento.</p>

                        </div>`
        }

    }

    llamarSiguiente() {
        btnSiguiente.disabled = true
        btnGuardarHistorial.disabled = false
        contenedorActual.classList.add('d-none')
        let ninoTemporal = this.first

        if (ninoTemporal.next == null) {
            nombreProximo.textContent = `Nadie en espera`

        }
        let html = `
                <div class="santa-animado" >🎅</div>

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

        let datosParticipante = this.dequeue()
        historial.push([datosParticipante.nombre, datosParticipante.edad, datosParticipante.regalo, datosParticipante.turno])
        this.pintar()

    }
}


class FotoParticipante {
    constructor([nombre, edad, regalo_deseado, turno]) {
        this.nombre = nombre
        this.edad = edad
        this.regalo = regalo_deseado
        this.turno = turno
        this.next = null
    }
}

class Historial {

    constructor() {
        this.top = null
        this.bottom = null
        this.length = 0
    }

    peek() {
        return this.top
    }

    push(value) {
        const newNode = new FotoParticipante(value)
        if (this.length === 0) {
            this.top = newNode
            this.bottom = newNode
        } else {
            const holdingPointer = this.top
            this.top = newNode
            this.top.next = holdingPointer
        }

        this.length++
        return this
    }
    pop() {
        const temporal = this.top //
        this.top = temporal.next
        this.length--
        if (this.length === 0) {
            this.top = null
            this.bottom = null
        }
        return this
    }

    llenarHistorial() {
        historialVacioMensaje.classList.add('d-none')
        let counter = this.top
        let html = `
        <div class="list-group-item d-flex justify-content-between align-items-center border-start border-success border-3 mb-2 rounded bg-light text-dark opacity-75">
                            <div>
                                <h6 class="fw-bold mb-0 text-decoration-line-through text-muted">${counter.nombre}</h6>
                                <small class="text-success fw-semibold">📸 ¡Foto capturada con éxito!</small>
                            </div>
                            <span class="badge bg-success rounded-pill">Turno #${counter.turno}</span>
                        </div>`

        contenedorHistorial.insertAdjacentHTML('beforeend', html)

        if (participantes.length == 0) {
            contendorActualfoto.innerHTML = `<div class="santa-animado">🎅</div>
                                 <div class="ocultarActual">
                                     <h4 class="fw-bold text-dark m-0 mb-1" id="nombreActual">Nadie en el turno</h4>
                                     <p class="text-muted m-0 small" id="detalleActual">Presiona el botón de abajo para
                                         llamar al primer niño.</p>
                                </div>`

        } else {
            btnSiguiente.disabled = false
        }

        btnGuardarHistorial.disabled = true


    }
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
let contenedorHistorial = document.querySelector('#historialFotos')
let btnGuardarHistorial = document.querySelector('#btnGuardarHistorial')

//cola
let participantes = new Queue()
//Stack
let historial = new Historial()


formulario.addEventListener('submit', (event) => {
    let participante_temporal = [nombreNino.value, edad.value, descripcion_regalo.value]
    participantes.enqueue(participante_temporal)
    formulario.reset()
})

btnSiguiente.addEventListener('click', (event) => {
    const llamarParticipante = new SpeechSynthesisUtterance(`Turno de ${participantes.first.nombre}`)
    llamarParticipante.lang = "es-ES"
    llamarParticipante.rate = 1
    window.speechSynthesis.speak(llamarParticipante)
    participantes.llamarSiguiente()
})

btnGuardarHistorial.addEventListener('click', (event) => {
    historial.llenarHistorial()

})
