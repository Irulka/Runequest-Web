/**
 * SISTEMA DE OBJETOS COMUNES CON BUSCADOR MEJORADO
 * Versión encapsulada para evitar conflictos
 */

(function() {
    const CONFIG = {
        BASE: '',
        PATHS: {
            herramientas: 'js/secciones/mercado/tools.json',
            instrumentos: 'js/secciones/mercado/instrumentos.json',
            defaultImage: 'imagenes/default-object.png'
        },
        DEBUG: false
    };

    // Datos iniciales
    const categorias = {
        herramientas: { nombre: "Herramientas", datos: [] },
        ropa: { nombre: "Ropa", datos: [] },
        equipo: { nombre: "Equipo", datos: [] },
        instrumentos: { nombre: "Instrumentos", datos: [] },
        alimento: { nombre: "Alimento", datos: [] },
        joyeria: { nombre: "Joyería", datos: [] }
    };

    // Referencias UI
    const UI = {
        tablaBody: document.getElementById('objetos-tbody'),
        tablaContainer: document.querySelector('.tabla-objetos-container'),
        tituloCategoria: document.getElementById('titulo-categoria'),
        buscador: document.getElementById('buscador-objetos'),
        botones: {}
    };

    let timeoutBusqueda;

    // --------------------------
    // FUNCIONES PRINCIPALES
    // --------------------------

    async function cargarDatosCategoria(categoria) {
        try {
            let archivo = '';
            if (categoria === 'herramientas') archivo = CONFIG.PATHS.herramientas;
            else if (categoria === 'instrumentos') archivo = CONFIG.PATHS.instrumentos;
            else return [];

            const response = await fetch(`${CONFIG.BASE}${archivo}`);
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            const data = await response.json();
            return Array.isArray(data) ? data : [data];
        } catch (error) {
            console.error(`Error cargando ${categoria}:`, error);
            return generarDatosError(categoria);
        }
    }

    function generarDatosError(categoria) {
        return [{
            Id: 0,
            nombre: `Error cargando ${categoria}`,
            peso: "-",
            precio: "-",
            descripcion: "No se pudieron cargar los datos. Verifica la conexión."
        }];
    }

    function mostrarItems(categoria, filtro = '') {
        if (!categorias[categoria]) {
            console.error(`Categoría no existe: ${categoria}`);
            return;
        }

        UI.tablaBody.innerHTML = '';
        UI.tituloCategoria.textContent = categorias[categoria].nombre;
        UI.tituloCategoria.style.display = 'block';

        const items = categorias[categoria].datos;
        const terminoBusqueda = filtro.toLowerCase();

        if (!items || items.length === 0) {
            mostrarMensajeTabla(categoria === 'herramientas' || categoria === 'instrumentos' ? 
                `No se encontraron ${categorias[categoria].nombre.toLowerCase()}` : 'Categoría en desarrollo');
        } else {
            const itemsFiltrados = items.filter(item => 
                !terminoBusqueda || item.nombre.toLowerCase().includes(terminoBusqueda));
            
            if (itemsFiltrados.length === 0) {
                mostrarMensajeTabla(`No se encontraron objetos en ${categorias[categoria].nombre} que coincidan con "${filtro}"`);
            } else {
                itemsFiltrados.forEach(item => crearFilaItem(item, terminoBusqueda));
            }
        }

        UI.tablaContainer.style.display = 'block';
    }

    function mostrarMensajeTabla(mensaje) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="4" style="text-align: center; color: #a0aec0;">
                ${mensaje}
            </td>
        `;
        UI.tablaBody.appendChild(row);
    }

    function crearFilaItem(item, terminoBusqueda = '') {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nombre || 'Sin nombre'}</td>
            <td>${item.peso || '-'}</td>
            <td class="precio">${item.precio || '-'}</td>
            <td>${item.descripcion || 'Sin descripción'}</td>
        `;
        
        if (terminoBusqueda && item.nombre.toLowerCase().includes(terminoBusqueda)) {
            row.classList.add('resultado-busqueda');
        }
        
        UI.tablaBody.appendChild(row);
    }

    function buscarGlobalmente(termino) {
        UI.tablaBody.innerHTML = '';
        UI.tituloCategoria.textContent = `Resultados para "${termino}"`;
        UI.tituloCategoria.style.display = 'block';

        let resultadosEncontrados = 0;
        const terminoLower = termino.toLowerCase();

        Object.keys(categorias).forEach(categoria => {
            categorias[categoria].datos.forEach(item => {
                if (item.nombre && item.nombre.toLowerCase().includes(terminoLower)) {
                    crearFilaItem(item, terminoLower);
                    resultadosEncontrados++;
                }
            });
        });

        if (resultadosEncontrados === 0) {
            mostrarMensajeTabla(`No se encontraron objetos que coincidan con "${termino}"`);
        }

        UI.tablaContainer.style.display = 'block';
    }

    function configurarBotones() {
        Object.keys(categorias).forEach(key => {
            const botonId = `btn-${key}`;
            UI.botones[key] = document.getElementById(botonId);
            
            if (UI.botones[key]) {
                // Limpiar event listener previo si existe
                UI.botones[key].removeEventListener('click', manejarClickBoton);
                
                // Agregar nuevo event listener
                UI.botones[key].addEventListener('click', manejarClickBoton);
            }
        });
    }

    async function manejarClickBoton() {
        const categoria = this.id.replace('btn-', '');
        
        if (categorias[categoria].datos.length === 0) {
            categorias[categoria].datos = await cargarDatosCategoria(categoria);
        }
        UI.buscador.value = '';
        mostrarItems(categoria);
    }

    function configurarBuscador() {
        // Limpiar event listener previo si existe
        UI.buscador.removeEventListener('input', manejarInputBuscador);
        
        // Agregar nuevo event listener
        UI.buscador.addEventListener('input', manejarInputBuscador);
    }

    function manejarInputBuscador(e) {
        clearTimeout(timeoutBusqueda);
        const termino = e.target.value.trim();
        
        timeoutBusqueda = setTimeout(() => {
            if (termino) {
                buscarGlobalmente(termino);
            } else if (UI.tituloCategoria.textContent && !UI.tituloCategoria.textContent.startsWith("Resultados para")) {
                const categoriaActual = Object.keys(categorias).find(key => 
                    categorias[key].nombre === UI.tituloCategoria.textContent);
                if (categoriaActual) mostrarItems(categoriaActual);
            }
        }, 300);
    }

    // --------------------------
    // INICIALIZACIÓN
    // --------------------------

    async function init() {
        categorias.herramientas.datos = await cargarDatosCategoria('herramientas');
        categorias.instrumentos.datos = await cargarDatosCategoria('instrumentos');
        
        configurarBotones();
        configurarBuscador();
        
        UI.tablaContainer.style.display = 'none';
        UI.tituloCategoria.style.display = 'none';
        
        if (CONFIG.DEBUG) console.log('Sistema de objetos con buscador inicializado');
    }

    // Manejo de carga
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 10);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    // Limpiar al salir de la página (para SPA)
    window.addEventListener('beforeunload', function() {
        UI.buscador.removeEventListener('input', manejarInputBuscador);
        Object.values(UI.botones).forEach(boton => {
            if (boton) boton.removeEventListener('click', manejarClickBoton);
        });
        clearTimeout(timeoutBusqueda);
    });
})();