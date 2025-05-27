function initCombate() {
    console.log('DEBUG: initCombate() iniciado. Intentando obtener elementos del DOM.');

    // === 1. Obtener Referencias a Elementos del DOM ===
    const numJugadoresInput = document.getElementById('num-jugadores');
    const numEnemigosInput = document.getElementById('num-enemigos');
    const btnIniciarCombate = document.getElementById('btn-iniciar-combate');
    const controlesCombate = document.querySelector('.controles'); 
    const tableroCombate = document.getElementById('tablero-combate');
    const contenedorPersonajes = document.getElementById('contenedor-personajes');

    console.log('DEBUG: Elementos del DOM obtenidos:');
    console.log('  numJugadoresInput:', numJugadoresInput);
    console.log('  numEnemigosInput:', numEnemigosInput);
    console.log('  btnIniciarCombate:', btnIniciarCombate);
    console.log('  controlesCombate:', controlesCombate);
    console.log('  tableroCombate:', tableroCombate);
    console.log('  contenedorPersonajes:', contenedorPersonajes);

    // Validación de que los elementos existen antes de añadir listeners
    if (!numJugadoresInput || !numEnemigosInput || !btnIniciarCombate || !controlesCombate || !tableroCombate || !contenedorPersonajes) {
        console.error("ERROR CRÍTICO: Uno o más elementos del DOM necesarios para el combate no se encontraron.");
        const mainContentDiv = document.getElementById('contenido'); 
        if(mainContentDiv) {
            mainContentDiv.innerHTML = '<p class="text-danger text-center">Error al cargar la sección de combate. Algunos elementos no están disponibles.</p>';
        }
        return; 
    }

    console.log('DEBUG: Todos los elementos del DOM encontrados. Añadiendo Event Listeners.');

    const iniciarCombate = () => {
        console.log('DEBUG: Botón Iniciar Combate clickeado.');
        const numJugadores = parseInt(numJugadoresInput.value);
        const numEnemigos = parseInt(numEnemigosInput.value);
        const totalPersonajes = numJugadores + numEnemigos;

        if (numJugadores < 1 || numJugadores > 6) {
            alert('El número de jugadores debe estar entre 1 y 6.');
            console.warn('DEBUG: Validación fallida: Número de jugadores fuera de rango.');
            return;
        }
        if (numEnemigos < 0 || numEnemigos > 6) {
            alert('El número de enemigos debe estar entre 0 y 6.');
            console.warn('DEBUG: Validación fallida: Número de enemigos fuera de rango.');
            return;
        }
        if (totalPersonajes > 12) {
            alert('El número total de personajes (jugadores + enemigos) no puede exceder 12.');
            console.warn('DEBUG: Validación fallida: Total de personajes excede 12.');
            return;
        }
        if (totalPersonajes === 0) { 
            alert('Debe haber al menos un personaje (jugador o enemigo).');
            console.warn('DEBUG: Validación fallida: Cero personajes.');
            return;
        }

        console.log(`DEBUG: Iniciando combate con ${numJugadores} jugadores y ${numEnemigos} enemigos.`);

        controlesCombate.style.display = 'none';
        tableroCombate.style.display = 'block';

        contenedorPersonajes.innerHTML = ''; 
        let personajeIdCounter = 1;

        for (let i = 0; i < numJugadores; i++) {
            crearPersonaje(personajeIdCounter++, 'Jugador');
        }
        for (let i = 0; i < numEnemigos; i++) {
            crearPersonaje(personajeIdCounter++, 'Enemigo');
        }
        console.log('DEBUG: Personajes generados.');
    };

    // --- FUNCIÓN crearPersonaje CORREGIDA Y ACTUALIZADA ---
    const crearPersonaje = (id, tipo) => {
        const personajeDiv = document.createElement('div');
        personajeDiv.className = `personaje-recuadro ${tipo.toLowerCase()}`;
        personajeDiv.dataset.id = id;
        personajeDiv.draggable = true;

        personajeDiv.innerHTML = `
            <div class="personaje-header">
                <input type="text" class="personaje-nombre" value="${tipo} ${id}" placeholder="Nombre del personaje">
            </div>
            <div class="stats-row">
                <div class="pv-control-group">
                    <label for="pv-${id}">PV:</label>
                    <div class="pv-input-wrapper">
                        <input type="number" id="pv-${id}" class="personaje-stat-input" value="10" min="0">
                        <div class="pv-controles">
                            <button class="pv-up" data-target-id="pv-${id}"><i class="bi bi-caret-up-fill"></i></button>
                            <button class="pv-down" data-target-id="pv-${id}"><i class="bi bi-caret-down-fill"></i></button>
                        </div>
                    </div>
                </div>
                <div class="pv-control-group"> <label for="pm-${id}">PM:</label>
                    <div class="pv-input-wrapper">
                        <input type="number" id="pm-${id}" class="personaje-stat-input" value="10" min="0">
                        <div class="pv-controles">
                            <button class="pv-up" data-target-id="pm-${id}"><i class="bi bi-caret-up-fill"></i></button>
                            <button class="pv-down" data-target-id="pm-${id}"><i class="bi bi-caret-down-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="notes-group">
                <label for="notas-${id}">Notas:</label>
                <textarea id="notas-${id}" class="personaje-notas" placeholder="Estado, efectos, etc."></textarea>
            </div>
        `;
        contenedorPersonajes.appendChild(personajeDiv);
    };

    // === Manejo de Puntos de Vida (PV) y Puntos Mágicos (PM) ===
    // Modificamos el listener para que funcione con ambos tipos de input
    contenedorPersonajes.addEventListener('click', (event) => {
        const target = event.target;
        // Buscamos si el clic fue en un botón de control o su icono
        const upButton = target.closest('.pv-up');
        const downButton = target.closest('.pv-down');

        if (upButton || downButton) {
            // Usamos data-target-id para saber qué input afectar (pv-X o pm-X)
            const inputId = (upButton || downButton).dataset.targetId;
            const input = document.getElementById(inputId);
            if (input) {
                let currentValue = parseInt(input.value);
                if (isNaN(currentValue)) currentValue = 0; 

                if (upButton) {
                    input.value = currentValue + 1;
                    console.log(`DEBUG: ${inputId} aumentado a ${input.value}.`);
                } else if (downButton) { 
                    if (currentValue > 0) { 
                        input.value = currentValue - 1;
                        console.log(`DEBUG: ${inputId} disminuido a ${input.value}.`);
                    } else {
                        console.log(`DEBUG: Intento de disminuir ${inputId} por debajo de 0. Valor actual: ${currentValue}.`);
                    }
                }
            } else {
                console.warn(`DEBUG: Input con ID ${inputId} no encontrado para control PV/PM.`);
            }
        }
    });

    // === Resto de Event Listeners para Drag and Drop (sin cambios) ===
    let draggedPersonaje = null;

    contenedorPersonajes.addEventListener('dragstart', (e) => {
        const target = e.target.closest('.personaje-recuadro');
        if (target) {
            draggedPersonaje = target;
            e.dataTransfer.setData('text/plain', target.dataset.id); 
            setTimeout(() => target.classList.add('dragging'), 0); 
            console.log(`DEBUG: Dragstart para personaje ${target.dataset.id}.`);
        }
    });

    contenedorPersonajes.addEventListener('dragend', (e) => {
        if (draggedPersonaje) {
            draggedPersonaje.classList.remove('dragging');
            draggedPersonaje = null;
            console.log('DEBUG: Dragend.');
        }
    });

    contenedorPersonajes.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        const target = e.target.closest('.personaje-recuadro');
        if (draggedPersonaje && target && draggedPersonaje !== target) {
            target.classList.add('drag-over-target'); 
        }
    });

    contenedorPersonajes.addEventListener('dragleave', (e) => {
        const target = e.target.closest('.personaje-recuadro');
        if (target) {
            target.classList.remove('drag-over-target');
        }
    });

    contenedorPersonajes.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetElement = e.target.closest('.personaje-recuadro');

        if (draggedPersonaje && targetElement && draggedPersonaje !== targetElement) {
            console.log(`DEBUG: Personaje ${draggedPersonaje.dataset.id} soltado sobre ${targetElement.dataset.id}`);
            targetElement.classList.remove('drag-over-target');
            alert(`¡Personaje ${draggedPersonaje.dataset.id} ha sido unido con ${targetElement.dataset.id}! (Lógica visual pendiente)`);
        } else if (draggedPersonaje && !targetElement) {
            console.log(`DEBUG: Personaje ${draggedPersonaje.dataset.id} soltado en un área vacía.`);
        }
    });

    // === Event Listener principal para el botón de iniciar combate ===
    btnIniciarCombate.addEventListener('click', iniciarCombate);
    console.log('DEBUG: Event listener para btnIniciarCombate añadido.');
}

// === Gestión de carga del script ===
// Mantenemos esta lógica robusta que ya está funcionando
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DEBUG: DOM ya está complete o interactive. Llamando a initCombate con setTimeout.');
    setTimeout(initCombate, 50); 
} else {
    console.log('DEBUG: DOM no está listo. Añadiendo listener para DOMContentLoaded.');
    document.addEventListener('DOMContentLoaded', initCombate);
}