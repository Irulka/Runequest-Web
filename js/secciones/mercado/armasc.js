/**
 * SISTEMA DE ARMAS CUERPO A CUERPO
 * Versión con filtrado por categorías
 */

(function() {
    const CONFIG = {
        BASE: '../../',
        PATHS: {
            armasc: './js/secciones/mercado/armasc.json'
        },
        DEBUG: true
    };

    // Variables globales
    let todasLasArmas = [];
    const UI = {
        tablaBody: document.getElementById('armasc-tbody'),
        tablaContainer: document.querySelector('.tabla-armasc-container'),
        tituloCategoria: document.getElementById('titulo-categoria'),
        buscador: document.getElementById('buscador-armasc'),
        contenedorBotones: document.querySelector('.controles')
    };

    // --------------------------
    // FUNCIONES PRINCIPALES
    // --------------------------

    async function cargarArmas() {
        try {
            const response = await fetch(`${CONFIG.BASE}${CONFIG.PATHS.armasc}`);
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
            nombre: "Error al cargar datos",
            basico: "-",
            fue: "-",
            des: "-",
            dano: "-",
            pg: "-",
            crg: "-",
            mr: "-",
            tipo: "-"
        }];
    }

    function crearBotonesCategorias(categorias) {
        UI.contenedorBotones.innerHTML = '';
        
        // Crear contenedores para las dos filas de botones
        const fila1 = document.createElement('div');
        fila1.className = 'fila-botones';
        
        const fila2 = document.createElement('div');
        fila2.className = 'fila-botones';
        
        // Dividir los botones en dos filas
        const mitad = Math.ceil(categorias.length / 2);
        const primeraMitad = categorias.slice(0, mitad);
        const segundaMitad = categorias.slice(mitad);
        
        // Primera fila de botones
        primeraMitad.forEach(categoria => {
            const boton = document.createElement('button');
            boton.className = 'boton-categoria';
            boton.textContent = categoria;
            
            boton.addEventListener('click', () => {
                filtrarPorCategoria(categoria);
            });
            
            fila1.appendChild(boton);
        });
        
        // Segunda fila de botones
        segundaMitad.forEach(categoria => {
            const boton = document.createElement('button');
            boton.className = 'boton-categoria';
            boton.textContent = categoria;
            
            boton.addEventListener('click', () => {
                filtrarPorCategoria(categoria);
            });
            
            fila2.appendChild(boton);
        });
        
        UI.contenedorBotones.appendChild(fila1);
        UI.contenedorBotones.appendChild(fila2);
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
            <td colspan="9" style="text-align: center; color: #a0aec0;">
                ${mensaje}
            </td>
        `;
        UI.tablaBody.appendChild(row);
    }

    function crearFilaArma(arma) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${arma.nombre || '-'}</td>
            <td>${arma.basico || '-'}</td>
            <td>${arma.fue || '-'}</td>
            <td>${arma.des || '-'}</td>
            <td>${arma.dano || '-'}</td>
            <td>${arma.pg || '-'}</td>
            <td>${arma.crg || '-'}</td>
            <td>${arma.mr || '-'}</td>
            <td>${arma.tipo || '-'}</td>
        `;
        UI.tablaBody.appendChild(row);
    }

    function buscarGlobalmente(termino) {
        UI.tablaBody.innerHTML = '';
        UI.tituloCategoria.textContent = `Resultados para "${termino}"`;
        UI.tituloCategoria.style.display = 'block';

        const terminoLower = termino.toLowerCase();
        const resultados = todasLasArmas.filter(arma => 
            (arma.categoria && arma.categoria.toLowerCase().includes(terminoLower)) ||
            (arma.nombre && arma.nombre.toLowerCase().includes(terminoLower))
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
            
            if (CONFIG.DEBUG) console.log('Sistema de armas cuerpo a cuerpo inicializado');
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