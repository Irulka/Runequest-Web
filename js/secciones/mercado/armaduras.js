/**
 * SISTEMA DE ARMADURAS - BUSQUEDA POR PARTE DEL CUERPO
 */

const CONFIG = {
    BASE: '', // Cambiado para GitHub Pages
    PATHS: {
        armaduras: 'js/secciones/mercado/armaduras.json'
    },
    DEBUG: true
};

// Variables globales
let todasLasArmaduras = [];
const UI = {
    tablaBody: document.getElementById('armaduras-tbody'),
    tablaContainer: document.querySelector('.tabla-armaduras-container'),
    tituloCategoria: document.getElementById('titulo-categoria'),
    buscador: document.getElementById('buscador-armaduras'),
    contenedorBotones: document.querySelector('.controles')
};

// --------------------------
// FUNCIONES PRINCIPALES
// --------------------------

async function cargarArmaduras() {
    try {
        const response = await fetch(`${CONFIG.PATHS.armaduras}`);
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        todasLasArmaduras = await response.json();
        
        // Extraer partes del cuerpo únicas para los botones
        const partesCuerpo = [...new Set(todasLasArmaduras.map(item => item.cubre))];
        crearBotonesPartesCuerpo(partesCuerpo);
        
        return true;
    } catch (error) {
        console.error("Error cargando armaduras:", error);
        todasLasArmaduras = generarDatosError();
        crearBotonesPartesCuerpo(["Error"]); // Mostrar al menos un botón
        return false;
    }
}

function generarDatosError() {
    return [{
        cubre: "Error",
        tipo: "Error al cargar datos",
        material: "-",
        absorcion: "-",
        crg: "-",
        precio: "-",
        silencio: "-"
    }];
}

function crearBotonesPartesCuerpo(partesCuerpo) {
    UI.contenedorBotones.innerHTML = '';
    
    const divBotones = document.createElement('div');
    divBotones.style.display = 'flex';
    divBotones.style.flexWrap = 'wrap';
    divBotones.style.gap = '15px';
    divBotones.style.justifyContent = 'center';
    divBotones.style.width = '100%';
    divBotones.style.marginBottom = '20px'; // Añadido para mejor espaciado
    
    partesCuerpo.forEach((parte, index) => {
        const boton = document.createElement('button');
        boton.className = 'btn-magia';
        boton.textContent = parte;
        boton.style.minWidth = '120px'; // Para que todos tengan similar ancho
        
        boton.addEventListener('click', () => {
            filtrarPorParteCuerpo(parte);
        });
        
        divBotones.appendChild(boton);
        
        // Agrupar botones en filas cada 3 elementos
        if ((index + 1) % 3 === 0 || index === partesCuerpo.length - 1) {
            UI.contenedorBotones.appendChild(divBotones.cloneNode(true));
            divBotones.innerHTML = '';
        }
    });
}

function filtrarPorParteCuerpo(parteCuerpo) {
    UI.tablaBody.innerHTML = '';
    UI.tituloCategoria.textContent = `Armaduras para: ${parteCuerpo}`;
    UI.tituloCategoria.style.display = 'block';
    UI.buscador.value = ''; // Limpiar el buscador

    const armadurasFiltradas = todasLasArmaduras.filter(armadura => 
        armadura.cubre.toLowerCase() === parteCuerpo.toLowerCase()
    );

    if (armadurasFiltradas.length === 0) {
        mostrarMensajeTabla(`No se encontraron armaduras para ${parteCuerpo}`);
    } else {
        armadurasFiltradas.forEach(armadura => crearFilaArmadura(armadura));
    }

    UI.tablaContainer.style.display = 'block';
}

function mostrarMensajeTabla(mensaje) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td colspan="7" style="text-align: center; color: #a0aec0;">
            ${mensaje}
        </td>
    `;
    UI.tablaBody.appendChild(row);
}

function crearFilaArmadura(armadura) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${armadura.tipo || '-'}</td>
        <td>${armadura.material || '-'}</td>
        <td class="proteccion">${armadura.absorcion || '-'}</td>
        <td>${armadura.crg || '-'}</td>
        <td class="precio">${armadura.precio || '-'} L</td>
        <td class="silueta">${armadura.cubre || '-'}</td>
        <td>${armadura.silencio >= 0 ? '+' : ''}${armadura.silencio || '0'}</td>
    `;
    UI.tablaBody.appendChild(row);
}

function buscarGlobalmente(termino) {
    UI.tablaBody.innerHTML = '';
    UI.tituloCategoria.textContent = `Resultados para "${termino}"`;
    UI.tituloCategoria.style.display = 'block';

    const terminoLower = termino.toLowerCase();
    const resultados = todasLasArmaduras.filter(armadura => 
        (armadura.tipo && armadura.tipo.toLowerCase().includes(terminoLower)) ||
        (armadura.material && armadura.material.toLowerCase().includes(terminoLower)) ||
        (armadura.cubre && armadura.cubre.toLowerCase().includes(terminoLower))
    );

    if (resultados.length === 0) {
        mostrarMensajeTabla(`No se encontraron armaduras que coincidan con "${termino}"`);
    } else {
        resultados.forEach(armadura => crearFilaArmadura(armadura));
    }

    UI.tablaContainer.style.display = 'block';
}

function configurarBuscador() {
    let timeoutBusqueda;

    UI.buscador.addEventListener('input', (e) => {
        clearTimeout(timeoutBusqueda);
        const termino = e.target.value.trim();
        
        timeoutBusqueda = setTimeout(() => {
            if (termino) {
                buscarGlobalmente(termino);
            } else {
                UI.tablaContainer.style.display = 'none';
                UI.tituloCategoria.style.display = 'none';
            }
        }, 300);
    });
}

// --------------------------
// INICIALIZACIÓN
// --------------------------

async function init() {
    const exito = await cargarArmaduras();
    
    if (exito) {
        configurarBuscador();
        UI.tablaContainer.style.display = 'none';
        UI.tituloCategoria.style.display = 'none';
        
        if (CONFIG.DEBUG) console.log('Sistema de armaduras inicializado');
    } else {
        mostrarMensajeTabla("Error al cargar los datos. Recarga la página.");
    }
}

// Manejo de carga
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 10);
} else {
    document.addEventListener('DOMContentLoaded', init);
}