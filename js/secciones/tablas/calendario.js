// Estado del calendario
const estadoCalendario = {
    estacionActual: 'sea', // Inicia en Tiempo Sagrado según el PDF
    estaciones: ['sea', 'fire', 'earth', 'dark', 'storm','sacred'], // Orden del PDF
    anotaciones: {}, // { 'estacion-semana-diaIndex': { texto: '', color: '' } }
    celdaSeleccionadaParaAnotar: null,
    datos: {
        sea: {
            nombre: "Estación del Mar",
            fasesLunares: {
                "Freezeday": "🌒", // CRESCENT GO
                "Waterday": "🌔", // DYING
                "Clayday": "🌑", // BLACK
                "Windsday": "🌖", // CRESCENT COME
                "Fireday": "🌓", // EMPTY HALF
                "Wildday": "🌕", // FULL
                "Godday": "🌗" // FULL HALF
            },
            semanas: [
                {
                    nombre: "Semana del Desorden",
                    dias: [
                        { festividades: "Flamarl / Yelml" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Valin" },
                        { festividades: "Oakfed" },
                        { festividades: "" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Armonía",
                    dias: [
                        { festividades: "Argan Argar / Kyger Litor / Uleria" },
                        { festividades: "Ernalda / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" }
                    ]
                },
                {
                    nombre: "Semana de la Muerte",
                    dias: [
                        { festividades: "Zorak Zoran" },
                        { festividades: "Humakt" },
                        { festividades: "Maran Gor" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Tolat / Ty Kora Tek" },
                        { festividades: "Waha" }
                    ]
                },
                {
                    nombre: "Semana de la Fertilidad",
                    dias: [
                        { festividades: "" },
                        { festividades: "Aldria / Dormal / Flamal" },
                        { festividades: "Asrelia / Baberter Gor /Ernalda / Eiritha /Lodril" },
                        { festividades: "Basmol" },
                        { festividades: "Mahome" },
                        { festividades: "Chalana Arroy" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana del Éxtasis",
                    dias: [
                        { festividades: "Toro Tempestuoso" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Yin Kin" },
                        { festividades: "Gorgoma" }
                    ]
                },
                {
                    nombre: "Semana del Movimiento",
                    dias: [
                        { festividades: "" },
                        { festividades: "Engizi /Heler /Donandar" },
                        { festividades: "" },
                        { festividades: "Orlanth / Odaila" },
                        { festividades: "Gustban / Lokamos" },
                        { festividades: "Issaries" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Ilusión",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Eurmal / Las siete Madres" },
                        { festividades: "" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Verdad",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Yelmalio" },
                        { festividades: "" },
                        { festividades: "Lankor Mhy / Magasta" }
                    ]
                }
            ]
        },
        fire: {
            nombre: "Estación de Fuego",
            fasesLunares: {
                "Freezeday": "🌒", // CRESCENT GO
                "Waterday": "🌔", // DYING
                "Clayday": "🌑", // BLACK
                "Windsday": "🌖", // CRESCENT COME
                "Fireday": "🌓", // EMPTY HALF
                "Wildday": "🌕", // FULL
                "Godday": "🌗" // FULL HALF
            },
            semanas: [
                {
                    nombre: "Semana del Desorden",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Valin" },
                        { festividades: "Oakfed" },
                        { festividades: "Eurmal" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Armonía",
                    dias: [
                        { festividades: "Kyger Litor / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Lodril / Uleria" },
                        { festividades: "Argan Argar / Uleria" },
                        { festividades: "Aldrya / Yelm / Yinkin / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" }
                    ]
                },
                {
                    nombre: "Semana de la Muerte",
                    dias: [
                        { festividades: "Zorak Zoran" },
                        { festividades: "" },
                        { festividades: "Maran Gor" },
                        { festividades: "" },
                        { festividades: "Humakt" },
                        { festividades: "Tolat / Ty Kora Tek" },
                        { festividades: "Waha" }
                    ]
                },
                {
                    nombre: "Semana de la Fertilidad",
                    dias: [
                        { festividades: "" },
                        { festividades: "Dormal" },
                        { festividades: "Asrelia / Babester Gor / Ernalda /Eiritha / Flamal" },
                        { festividades: "Basmol" },
                        { festividades: "Mahome" },
                        { festividades: "Chalana Arroy" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana del Éxtasis",
                    dias: [
                        { festividades: "" },
                        { festividades: "Toro Tempestuoso" },
                        { festividades: "" },
                        { festividades: "Sartar" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Gorgoma" }
                    ]
                },
                {
                    nombre: "Semana del Movimiento",
                    dias: [
                        { festividades: "" },
                        { festividades: "Engizi / Heler" },
                        { festividades: "" },
                        { festividades: "Orlanth / Odayla" },
                        { festividades: "Gusbran / Lokarnos" },
                        { festividades: "Issaries" },
                        { festividades: "Orlanth Rex" }
                    ]
                },
                {
                    nombre: "Semana de la Ilusión",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Donandar" },
                        { festividades: "Las Siete Madres" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Verdad",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Yelmalio" },
                        { festividades: "" },
                        { festividades: "Lankor Mhy / Magasta" }
                    ]
                }
            ]
        },
        earth: {
            nombre: "Estación de la Tierra",
            fasesLunares: {
                "Freezeday": "🌒", // CRESCENT GO
                "Waterday": "🌔", // DYING
                "Clayday": "🌑", // BLACK
                "Windsday": "🌖", // CRESCENT COME
                "Fireday": "🌓", // EMPTY HALF
                "Wildday": "🌕", // FULL
                "Godday": "🌗" // FULL HALF
            },
            semanas: [
                {
                    nombre: "Semana del Desordenr",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Valin" },
                        { festividades: "Oakfed" },
                        { festividades: "" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Armonía",
                    dias: [
                        { festividades: "Kyger Litor / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Argan Argar / Uleria" },
                        { festividades: "Yinkin / Uleria" },
                        { festividades: "Uleria" }
                    ]
                },
                {
            nombre: "Semana de la Muerte",
                    dias: [
                        { festividades: "Babester Gor / Zorak Zoran" },
                        { festividades: "" },
                        { festividades: "Humakt / Maran Gor" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Tolat / Ty Kora Tek" },
                        { festividades: "Orlanth" }
                    ]
                },
                {
                    nombre: "Semana de la Fertilidad",
                    dias: [
                        { festividades: "Ernalda / Asrelia" },
                        { festividades: "Ernalda / Asrelia / Dormal" },
                        { festividades: "Ernalda / Asrelia / Baberter Gor / Aldrya / Eiritha / Flamal / Dioses de los Cereales" },
                        { festividades: "Asrelia /Asrelia / Basmol" },
                        { festividades: "Asrelia / Ernalda / Mahome / Lodril" },
                        { festividades: "Asrelia /Ernalda / Maran Gor / Chalana Arroy" },
                        { festividades: "Ernalda / Asrelia" }
                    ]
                },
                {
                    nombre: "Semana del Éxtasis",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Toro Tempestuoso" },
                        { festividades: "" },
                        { festividades: "Yelm" },
                        { festividades: "" },
                        { festividades: "Gorgoma" }
                    ]
                },
                {
                    nombre: "Semana del Movimiento",
                    dias: [
                        { festividades: "" },
                        { festividades: "Engizi / Heler" },
                        { festividades: "" },
                        { festividades: "Orlanth / Odayla" },
                        { festividades: "Lokarnos / Gustbran" },
                        { festividades: "Issaries" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Ilusicón",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Donandar" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Eurmal / Las Siete Madres" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Verdad",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Yelmalio" },
                        { festividades: "" },
                        { festividades: "Lhankor Mhy / Magasta" }
                    ]
                }
            ]
        },
        dark: {
            nombre: "Estación de la Oscuridad",
            fasesLunares: {
              "Freezeday": "🌒", // CRESCENT GO
                "Waterday": "🌔", // DYING
                "Clayday": "🌑", // BLACK
                "Windsday": "🌖", // CRESCENT COME
                "Fireday": "🌓", // EMPTY HALF
                "Wildday": "🌕", // FULL
                "Godday": "🌗" // FULL HALF
            },
            semanas: [
                {
                    nombre: "Semana del Desorden",
                    dias: [
                        { festividades: "Yinkin" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Valinr" },
                        { festividades: "Oakfed" },
                        { festividades: "Eurmal / Babester Gor" },
                        { festividades: "Las Siete Madres / Kyger Litor" }
                    ]
                },
                {
                    nombre: "Semana de la Armonía",
                    dias: [
                        { festividades: "Kyger Litor / Uleria" },
                        { festividades: "Argan Argar / Uleria" },
                        { festividades: "Argan Argar / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" }
                    ]
                },
                {
                    nombre: "Semana de la Muerte",
                    dias: [
                        { festividades: "Zorak Zoran / Humakt" },
                        { festividades: "Engizi" },
                        { festividades: "Maran Gor" },
                        { festividades: "Lodril" },
                        { festividades: "Lodril" },
                        { festividades: "Tolat / Ty Kora Tek" },
                        { festividades: "Waha" }
                    ]
                },
                {
                    nombre: "Semana de la Fertilidad",
                    dias: [
                        { festividades: "Waha" },
                        { festividades: "Dormal" },
                        { festividades: "Adrelia / Baberter Gor / Eiritha / Ernalda" },
                        { festividades: "Basmol" },
                        { festividades: "Mahome" },
                        { festividades: "Chalana Arroy" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana del Éxtasis",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Toro Tempestuoso" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Gorgoma" }
                    ]
                },
                {
                    nombre: "Semana del Movimiento",
                    dias: [
                        { festividades: "" },
                        { festividades: "Engizi / Heler" },
                        { festividades: "Aldrya" },
                        { festividades: "Orlanth / Odaya" },
                        { festividades: "Lokarnos / Gustbran / Yelm" },
                        { festividades: "Issaries" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Ilusión",
                    dias: [
                        { festividades: "Donandar / Ernalda" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Magasta" },
                        { festividades: "Las Siete Madres" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Verdad",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Yelmalio" },
                        { festividades: "" },
                        { festividades: "Lhankor Mhy / Magasta" }
                    ]
                }
            ]
        },
        storm: {
            nombre: "Estación de la Tormenta",
            fasesLunares: {
                "Freezeday": "🌒", // CRESCENT GO
                "Waterday": "🌔", // DYING
                "Clayday": "🌑", // BLACK
                "Windsday": "🌖", // CRESCENT COME
                "Fireday": "🌓", // EMPTY HALF
                "Wildday": "🌕", // FULL
                "Godday": "🌗" // FULL HALF
            },
            semanas: [
                {
                    nombre: "Semana del Desorden",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Valin" },
                        { festividades: "Oakfed" },
                        { festividades: "" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Armonía",
                    dias: [
                        { festividades: "Argan Argar / Kyger Litor / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Donandar / Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" },
                        { festividades: "Uleria" }
                    ]
                },
                {
                    nombre: "Semana de la Muerte",
                    dias: [
                        { festividades: "Zorak Zoran" },
                        { festividades: "" },
                        { festividades: "Maran Gor" },
                        { festividades: "Humakt" },
                        { festividades: "Yelm" },
                        { festividades: "Tolat / Ty Kora Tek" },
                        { festividades: "Waha" }
                    ]
                },
                {
                    nombre: "Semana de la Fertilidad",
                    dias: [
                        { festividades: "" },
                        { festividades: "Dormal" },
                        { festividades: "Adrelia / Babester Gor /Eiritha /Ernalda" },
                        { festividades: "Basmol" },
                        { festividades: "Mahome" },
                        { festividades: "Chalana Arroy / Lodril" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana del Éxtasis",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Toro Tempestuoso" },
                        { festividades: "Toro Tempestuoso" },
                        { festividades: "Gorgoma" }
                    ]
                },
                {
                    nombre: "Semana del Movimiento",
                    dias: [
                        { festividades: "" },
                        { festividades: "Engizi / Heler" },
                        { festividades: "" },
                        { festividades: "Orlanth / Odayla" },
                        { festividades: "Gustbrand / Lokarnos / Yikin" },
                        { festividades: "Telmor / Issaries" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Ilusicón",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Eurmal / Las Siete Madres" },
                        { festividades: "" }
                    ]
                },
                {
                    nombre: "Semana de la Verdad",
                    dias: [
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "" },
                        { festividades: "Yelmalio" },
                        { festividades: "Aldrya" },
                        { festividades: "Lankhor Mhy / Magasta" }
                    ]
                }
            ]
        },
                sacred: {
            nombre: "Tiempo Sagrado",
            fasesLunares: {
                "Freezeday": "🌒", // CRESCENT GO
                "Waterday": "🌔", // DYING
                "Clayday": "🌑", // BLACK
                "Windsday": "🌖", // CRESCENT COME
                "Fireday": "🌓", // EMPTY HALF
                "Wildday": "🌕", // FULL
                "Godday": "🌗" // FULL HALF
            },
            semanas: [
                {
                    nombre: "Semana de la Suerte",
                    dias: [
                        { festividades: "Daka Fal" },
                        { festividades: "Daka Fal" },
                        { festividades: "Daka Fal" },
                        { festividades: "Basmol / Pordadores de la Luz / Daka Fal" },
                        { festividades: "Daka Fal" },
                        { festividades: "Issaries / Diosa Roja /Daka Fal" },
                        { festividades: "Lhankor Mhy / Daka Fal" }
                    ]
                },
                {
                    nombre: "Semana del Destino",
                    dias: [
                        { festividades: "Chalana Arroy / Daka Fal" },
                        { festividades: "Chalana Arroy / Daka Fal" },
                        { festividades: "Chalana Arroy / Daka Fal" },
                        { festividades: "Basmol / Portadores de la Luz / Chalana Arroy / Daka Fal" },
                        { festividades: "Chalana Arroy / Daka Fal" },
                        { festividades: "Issaries / Diosa Roja / Chalana Arroy / Daka Fal" },
                        { festividades: " Lankor Mhy / Chalana Arroy / Daka Fal" }
                    ]
                }
            ]
        }
    }
};

// Referencias a elementos del DOM
const tableroCalendario = document.getElementById('tablero-calendario');
const nombreEstacionActual = document.getElementById('nombre-estacion-actual');
const btnEstacionAnterior = document.getElementById('btn-estacion-anterior');
const btnEstacionSiguiente = document.getElementById('btn-estacion-siguiente');
const btnGuardarCalendario = document.getElementById('btn-guardar-calendario');
const btnCargarCalendario = document.getElementById('btn-cargar-calendario');

const modalAnotacionCalendario = document.getElementById('modal-anotacion-calendario');
const cerrarModalAnotacionCalendario = document.getElementById('cerrar-modal-anotacion-calendario');
const inputAnotacionCalendario = document.getElementById('input-anotacion-calendario');
const btnGuardarAnotacionCalendario = document.getElementById('btn-guardar-anotacion-calendario');
const coloresAnotacion = document.querySelector('.colores-anotacion');

// Funciones
function renderizarCalendario() {
    tableroCalendario.innerHTML = ''; // Limpiar el tablero actual

    const estacion = estadoCalendario.datos[estadoCalendario.estacionActual];
    nombreEstacionActual.textContent = estacion.nombre;

    // Crear encabezados de los días de la semana
    const diasSemana = ["Freezeday", "Waterday", "Clayday", "Windsday", "Fireday", "Wildday", "Godday"];

    // Celda vacía en la esquina superior izquierda
    tableroCalendario.appendChild(document.createElement('div'));

    diasSemana.forEach(diaOriginal => { // Iterar sobre los nombres originales para obtener la fase lunar
        const headerCelda = document.createElement('div');
        headerCelda.classList.add('celda-calendario', 'header-dia');
        headerCelda.textContent = traducirDia(diaOriginal); // Texto del día traducido

        // Añadir fase lunar SOLO en el encabezado del día
        const faseLunarHeader = document.createElement('div');
        faseLunarHeader.classList.add('fase-lunar-header');
        faseLunarHeader.textContent = estacion.fasesLunares[diaOriginal]; // Usar el nombre original para buscar la fase
        headerCelda.appendChild(faseLunarHeader);

        tableroCalendario.appendChild(headerCelda);
    });

    // Rellenar el calendario con semanas y días
    estacion.semanas.forEach((semana, indexSemana) => {
        const nombreSemanaCelda = document.createElement('div');
        nombreSemanaCelda.classList.add('celda-calendario', 'header-semana');
        nombreSemanaCelda.textContent = semana.nombre;
        tableroCalendario.appendChild(nombreSemanaCelda);

        semana.dias.forEach((dia, indexDia) => {
            const diaCelda = document.createElement('div');
            diaCelda.classList.add('celda-calendario', 'dia-mes');

            // Las fases lunares NO se añaden a cada día individualmente, solo al encabezado.

            // Añadir festividades
            const festividades = document.createElement('div');
            festividades.classList.add('festividades');
            festividades.textContent = dia.festividades;
            diaCelda.appendChild(festividades);

            // Identificador único para la celda
            const celdaId = `${estadoCalendario.estacionActual}-${indexSemana}-${indexDia}`;
            diaCelda.dataset.celdaId = celdaId;

            // Aplicar anotaciones y colores guardados
            if (estadoCalendario.anotaciones[celdaId]) {
                const anotacion = estadoCalendario.anotaciones[celdaId];
                if (anotacion.texto) {
                    const anotacionDiv = document.createElement('div');
                    anotacionDiv.classList.add('anotacion-texto');
                    anotacionDiv.textContent = anotacion.texto;
                    diaCelda.appendChild(anotacionDiv);
                }
                if (anotacion.color && anotacion.color !== 'original') {
                    diaCelda.classList.add(`celda-color-${anotacion.color}`);
                }
            }

            diaCelda.addEventListener('click', () => abrirModalAnotacion(celdaId));
            tableroCalendario.appendChild(diaCelda);
        });
    });
}

function cambiarEstacion(direccion) {
    const currentIndex = estadoCalendario.estaciones.indexOf(estadoCalendario.estacionActual);
    let nextIndex = currentIndex + direccion;

    if (nextIndex < 0) {
        nextIndex = estadoCalendario.estaciones.length - 1;
    } else if (nextIndex >= estadoCalendario.estaciones.length) {
        nextIndex = 0;
    }

    estadoCalendario.estacionActual = estadoCalendario.estaciones[nextIndex];
    renderizarCalendario();
}

function guardarCalendario() {
    const datosGuardar = {
        anotaciones: estadoCalendario.anotaciones,
    };
    const dataStr = JSON.stringify(datosGuardar, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "calendario_glorantha.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("Calendario guardado");
}

function cargarCalendario() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = event => {
            try {
                const datos = JSON.parse(event.target.result);
                estadoCalendario.anotaciones = datos.anotaciones || {};
                renderizarCalendario();
                console.log("Calendario cargado correctamente");
            } catch (error) {
                console.error("Error al cargar el archivo:", error);
                alert("El archivo no es válido");
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

function traducirDia(dia) {
    const traducciones = {
        'Freezeday': 'Día de Hielo',
        'Waterday': 'Día de Agua',
        'Clayday': 'Día de Arcilla',
        'Windsday': 'Día de Viento',
        'Fireday': 'Día de Fuego',
        'Wildday': 'Día Salvaje',
        'Godday': 'Día Divino'
    };
    return traducciones[dia] || dia;
}


// ===== Funciones del Modal de Anotación =====
function abrirModalAnotacion(celdaId) {
    estadoCalendario.celdaSeleccionadaParaAnotar = celdaId;
    const anotacionExistente = estadoCalendario.anotaciones[celdaId];

    inputAnotacionCalendario.value = anotacionExistente ? anotacionExistente.texto : '';

    // Resetear la selección de color visual
    document.querySelectorAll('.btn-color-celda').forEach(btn => {
        btn.classList.remove('seleccionado');
    });

    if (anotacionExistente && anotacionExistente.color) {
        const btnActivo = document.querySelector(`.btn-color-celda[data-color="${anotacionExistente.color}"]`);
        if (btnActivo) {
            btnActivo.classList.add('seleccionado');
        }
    } else {
        // Asegúrate de que el botón 'original' esté seleccionado si no hay color guardado
        const originalBtn = document.querySelector('.btn-color-celda[data-color="original"]');
        if (originalBtn) {
            originalBtn.classList.add('seleccionado');
        }
    }

    modalAnotacionCalendario.style.display = 'flex'; // Usar flex para centrar
}

function cerrarModalAnotacion() {
    modalAnotacionCalendario.style.display = 'none';
    estadoCalendario.celdaSeleccionadaParaAnotar = null;
    inputAnotacionCalendario.value = '';
    document.querySelectorAll('.btn-color-celda').forEach(btn => {
        btn.classList.remove('seleccionado');
    });
}

function guardarAnotacion() {
    const celdaId = estadoCalendario.celdaSeleccionadaParaAnotar;
    if (!celdaId) return;

    const texto = inputAnotacionCalendario.value.trim();
    const colorSeleccionado = document.querySelector('.btn-color-celda.seleccionado');
    const color = colorSeleccionado ? colorSeleccionado.dataset.color : 'original'; // Default to original if no color selected

    if (texto === '' && color === 'original') {
        // Si no hay texto y el color es el original, eliminamos la anotación
        delete estadoCalendario.anotaciones[celdaId];
    } else {
        estadoCalendario.anotaciones[celdaId] = {
            texto: texto,
            color: color
        };
    }

    renderizarCalendario(); // Volver a renderizar para mostrar los cambios
    cerrarModalAnotacion();
}

function seleccionarColorAnotacion(event) {
    document.querySelectorAll('.btn-color-celda').forEach(btn => {
        btn.classList.remove('seleccionado');
    });
    event.target.classList.add('seleccionado');
}


// Inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendario);
} else {
    initCalendario();
}

function initCalendario() {
    console.log("Inicializando módulo de calendario");
    renderizarCalendario();
    setupEventListenersCalendario();
    console.log("Módulo de calendario inicializado correctamente");
}

function setupEventListenersCalendario() {
    btnEstacionAnterior.addEventListener('click', () => cambiarEstacion(-1));
    btnEstacionSiguiente.addEventListener('click', () => cambiarEstacion(1));
    btnGuardarCalendario.addEventListener('click', guardarCalendario);
    btnCargarCalendario.addEventListener('click', cargarCalendario);

    // Eventos del modal de anotación
    cerrarModalAnotacionCalendario.addEventListener('click', cerrarModalAnotacion);
    btnGuardarAnotacionCalendario.addEventListener('click', guardarAnotacion);
    coloresAnotacion.addEventListener('click', seleccionarColorAnotacion);

    window.addEventListener('click', (event) => {
        if (event.target === modalAnotacionCalendario) {
            cerrarModalAnotacion();
        }
    });
}