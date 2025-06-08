/**
 * SISTEMA DE ARMADURAS - BUSQUEDA POR PARTE DEL CUERPO
 * Versión con rutas corregidas para GitHub Pages
 */

(function() {
    const CONFIG = {
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
            // Ahora la ruta se resuelve de forma relativa a la URL base del documento principal.
            const response = await fetch(`${CONFIG.PATHS.armaduras}`); 
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            todasLasArmaduras = await response.json();
            
            // Extraer partes del cuerpo únicas para los botones
            const partesCuerpo = [...new Set(todasLasArmaduras.map(item => item.cubre))];
            crearBotonesPartesCuerpo(partesCuerpo);
            
            return true;
        } catch (error) {
            console.error("Error cargando armaduras:", error);
            // Si hay un error, puedes devolver un array vacío o null
            // para que el resto del código no falle.
            todasLasArmaduras = []; // Asegura que `todasLasArmaduras` no sea undefined en caso de error
            mostrarMensajeTabla("Error al cargar los datos. Por favor, recarga la página.");
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
        
        // Crear contenedores para las dos filas de botones
        const fila1 = document.createElement('div');
        fila1.className = 'fila-botones';
        
        const fila2 = document.createElement('div');
        fila2.className = 'fila-botones';
        
        // Dividir los botones en dos filas
        const mitad = Math.ceil(partesCuerpo.length / 2);
        const primeraMitad = partesCuerpo.slice(0, mitad);
        const segundaMitad = partesCuerpo.slice(mitad);
        
        // Primera fila de botones
        primeraMitad.forEach(parte => {
            const boton = document.createElement('button');
            boton.className = 'boton-parte';
            boton.textContent = parte;
            
            boton.addEventListener('click', () => {
                filtrarPorParteCuerpo(parte);
            });
            
            fila1.appendChild(boton);
        });
        
        // Segunda fila de botones
        segundaMitad.forEach(parte => {
            const boton = document.createElement('button');
            boton.className = 'boton-parte';
            boton.textContent = parte;
            
            boton.addEventListener('click', () => {
                filtrarPorParteCuerpo(parte);
            });
            
            fila2.appendChild(boton);
        });
        
        UI.contenedorBotones.appendChild(fila1);
        UI.contenedorBotones.appendChild(fila2);
    }

    function filtrarPorParteCuerpo(parteCuerpo) {
        UI.tablaBody.innerHTML = '';
        UI.tituloCategoria.textContent = `Armaduras para: ${parteCuerpo}`;
        UI.tituloCategoria.style.display = 'block';
        UI.buscador.value = '';

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
})();