/**
 * SISTEMA DE ARMAS A DISTANCIA
 * Versión con filtrado por categorías
 */

(function() {
        const CONFIG = {
        BASE: '', // Aquí está el cambio clave: ahora es una cadena vacía.
        PATHS: {
            armasd: 'js/secciones/mercado/armasd.json'
        },
        DEBUG: false
    };

    // Variables globales
    let todasLasArmas = [];
    const UI = {
        tablaBody: document.getElementById('armasd-tbody'),
        tablaContainer: document.querySelector('.tabla-armasd-container'),
        tituloCategoria: document.getElementById('titulo-categoria'),
        buscador: document.getElementById('buscador-armasd'),
        contenedorBotones: document.getElementById('botones-categoria')
    };

    // --------------------------
    // FUNCIONES PRINCIPALES
    // --------------------------

    async function cargarArmas() {
        try {
            const response = await fetch(`${CONFIG.BASE}${CONFIG.PATHS.armasd}`);
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            todasLasArmas = await response.json();
            
            // Extraer categorías únicas para los botones
            const categorias = [...new Set(todasLasArmas.map(item => item.categoria))];
            crearBotonesCategorias(categorias);
            
            return true;
        } catch (error) {
            console.error("Error cargando armas:", error);
            todasLasArmas = generarDatosError();
            return false;
        }
    }

    function generarDatosError() {
        return [{
            categoria: "Error",
            tipo: "Error al cargar datos",
            porcentaje: "-",
            fue: "-",
            des: "-",
            dano: "-",
            pg: "-",
            crg: "-",
            alcance: "-",
            tasa: "-",
            precio: "-"
        }];
    }

    function crearBotonesCategorias(categorias) {
        UI.contenedorBotones.innerHTML = '';
        
        categorias.forEach(categoria => {
            const boton = document.createElement('button');
            boton.className = 'boton-categoria';
            boton.textContent = categoria;
            
            boton.addEventListener('click', () => {
                filtrarPorCategoria(categoria);
            });
            
            UI.contenedorBotones.appendChild(boton);
        });
    }

    function filtrarPorCategoria(categoria) {
        UI.tablaBody.innerHTML = '';
        UI.tituloCategoria.textContent = `Armas: ${categoria}`;
        UI.tituloCategoria.style.display = 'block';
        UI.buscador.value = '';

        const armasFiltradas = todasLasArmas.filter(arma => 
            arma.categoria.toLowerCase() === categoria.toLowerCase()
        );

        if (armasFiltradas.length === 0) {
            mostrarMensajeTabla(`No se encontraron armas en ${categoria}`);
        } else {
            armasFiltradas.forEach(arma => crearFilaArma(arma));
        }

        UI.tablaContainer.style.display = 'block';
    }

    function mostrarMensajeTabla(mensaje) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="10" style="text-align: center; color: #a0aec0;">
                ${mensaje}
            </td>
        `;
        UI.tablaBody.appendChild(row);
    }

    function crearFilaArma(arma) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${arma.tipo || '-'}</td>
            <td>${arma.porcentaje || '-'}</td>
            <td>${arma.fue || '-'}</td>
            <td>${arma.des || '-'}</td>
            <td>${arma.dano || '-'}</td>
            <td>${arma.pg || '-'}</td>
            <td>${arma.crg || '-'}</td>
            <td>${arma.alcance || '-'}</td>
            <td>${arma.tasa || '-'}</td>
            <td>${arma.precio || '-'}</td>
        `;
        UI.tablaBody.appendChild(row);
    }

    function buscarGlobalmente(termino) {
        UI.tablaBody.innerHTML = '';
        UI.tituloCategoria.textContent = `Resultados para "${termino}"`;
        UI.tituloCategoria.style.display = 'block';

        const terminoLower = termino.toLowerCase();
        const resultados = todasLasArmas.filter(arma => 
            (arma.tipo && arma.tipo.toLowerCase().includes(terminoLower))
        );

        if (resultados.length === 0) {
            mostrarMensajeTabla(`No se encontraron armas que coincidan con "${termino}"`);
        } else {
            resultados.forEach(arma => crearFilaArma(arma));
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
        const exito = await cargarArmas();
        
        if (exito) {
            configurarBuscador();
            UI.tablaContainer.style.display = 'none';
            UI.tituloCategoria.style.display = 'none';
            
            if (CONFIG.DEBUG) console.log('Sistema de armas a distancia inicializado');
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
})();