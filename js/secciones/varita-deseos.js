// js/secciones/varita-deseos.js
document.addEventListener('DOMContentLoaded', function() {
    // Base de datos de efectos mágicos (1-100)
    const efectosVarita = {
        1: "¡Polvo de hadas! Todos en 10 metros estornudan durante 1d6 turnos",
        25: "Ilusión menor: Crea una imagen estática del tamaño de una persona durante 1 minuto",
        50: "Curación leve: Restaura 1d8 puntos de vida a un objetivo",
        75: "Fuerza arcana: +2 al daño en el próximo ataque",
        100: "Deseo limitado: Cumple un deseo simple (el Director de Juego decide los límites)",
        // Efectos aleatorios para otros valores
        _default: [
            "Luz brillante (dura 1 hora)",
            "Sonido fantasmal (eco misterioso por 1d6 turnos)",
            "Olor peculiar (floral/metálico/quemado)",
            "Piel cambiante (cambia de color por 1d10 minutos)"
        ]
    };

    // Elementos de la interfaz
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnManual = document.getElementById('btn-manual');
    const inputValor = document.getElementById('input-valor');
    const resultadoDiv = document.getElementById('resultado-varita');
    const valorTirada = document.getElementById('valor-tirada');
    const efectoMagico = document.getElementById('efecto-magico');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');

    // Historial de tiradas
    let historial = [];
    let indiceActual = -1;

    // ====================
    // Funciones principales
    // ====================

    function obtenerEfecto(valor) {
        if (efectosVarita[valor]) {
            return efectosVarita[valor];
        } else {
            // Efecto aleatorio para valores no definidos
            const randomIndex = Math.floor(Math.random() * efectosVarita._default.length);
            return `Efecto aleatorio: ${efectosVarita._default[randomIndex]}`;
        }
    }

    function mostrarResultado(valor) {
        const efecto = obtenerEfecto(valor);
        valorTirada.textContent = valor;
        efectoMagico.textContent = efecto;
        resultadoDiv.style.display = 'block';
    }

    function procesarTirada(valor) {
        historial.push(valor);
        indiceActual = historial.length - 1;
        mostrarResultado(valor);
    }

    // ====================
    // Event Listeners
    // ====================

    btnAleatorio.addEventListener('click', function() {
        const valor = Math.floor(Math.random() * 100) + 1;
        inputValor.style.display = 'none';
        procesarTirada(valor);
    });

    btnManual.addEventListener('click', function() {
        inputValor.style.display = inputValor.style.display === 'none' ? 'block' : 'none';
    });

    inputValor.addEventListener('change', function(e) {
        const valor = parseInt(e.target.value);
        if (valor >= 1 && valor <= 100) {
            procesarTirada(valor);
            e.target.value = '';
            inputValor.style.display = 'none';
        } else {
            alert('Por favor, introduce un valor entre 1 y 100');
        }
    });

    btnAnterior.addEventListener('click', function() {
        if (indiceActual > 0) {
            indiceActual--;
            mostrarResultado(historial[indiceActual]);
        }
    });

    btnSiguiente.addEventListener('click', function() {
        if (indiceActual < historial.length - 1) {
            indiceActual++;
            mostrarResultado(historial[indiceActual]);
        }
    });

    // ====================
    // Inicialización
    // ====================
    console.log('[Varita] Módulo cargado correctamente');
});