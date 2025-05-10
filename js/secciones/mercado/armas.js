/**
 * SISTEMA DE NAVEGACIÓN DE ARMAS - Versión SPA
 * Adaptado para funcionar con la carga dinámica de contenido
 */

(function() {
    // Elementos de la interfaz
    const UI = {
        btnCuerpo: document.getElementById('btn-cuerpo'),
        btnDistancia: document.getElementById('btn-distancia')
    };

    // --------------------------
    // FUNCIONES PRINCIPALES
    // --------------------------

    function configurarBotones() {
        // Botón de armas cuerpo a cuerpo
        UI.btnCuerpo.addEventListener('click', () => {
            cargarSeccion('mercado/armasc');
        });

        // Botón de armas a distancia
        UI.btnDistancia.addEventListener('click', () => {
            cargarSeccion('mercado/armasd');
        });
    }

    // Función para integrarse con el sistema SPA existente
    function cargarSeccion(seccion) {
        if (typeof window.cargarSeccion === 'function') {
            window.cargarSeccion(seccion);
        } else {
            console.error('Función cargarSeccion no disponible');
        }
    }

    // --------------------------
    // INICIALIZACIÓN
    // --------------------------

    function init() {
        configurarBotones();
        console.log('Sistema de navegación de armas (SPA) inicializado');
    }

    // Manejo de carga
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 10);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();