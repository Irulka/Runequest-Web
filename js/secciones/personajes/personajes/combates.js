// combates.js - Versión corregida y probada

// Estado global del combate
const estadoCombate = {
  participantes: [],
  // Cambiado a 20x18 = 360 celdas
  tablero: Array(360).fill(null), // null significa vacío
  activo: false,
  personajeArrastrado: null,
  personajeEditando: null,
  celdaObstaculoSeleccionando: null,
  tipoPersonajeAgregando: null,
  imagenFondo: '' // Nueva propiedad para la imagen de fondo
};

// Dimensiones fijas del tablero
const GRID_ROWS = 18; // 18 filas
const GRID_COLS = 20; // 20 columnas
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

// Tamaño de las celdas en píxeles
const CELL_SIZE = 45; // **CAMBIADO: Tamaño de 45px**

// **AÑADIDO: Constante para el gap (0 para una imagen continua)**
const GAP_SIZE = 0;

// Variable global para almacenar el BoundingClientRect de la celda clicada
// Esta variable ya no será usada para posicionar los modales, pero se mantiene si se necesitara para otras cosas.
let clickedCellRect = null;

// Inicialización cuando el DOM está listo
function initCombate() {
  console.log("Inicializando módulo de combate");

  // Crear tablero cuadrado
  crearTableroCuadrado();

  // Configurar eventos
  setupEventListeners();

  console.log("Módulo de combate inicializado correctamente");
}

// ===== FUNCIONES PRINCIPALES =====

function setupEventListeners() {
  // Botones principales
  document.getElementById('btn-nuevo-combate').addEventListener('click', iniciarNuevoCombate);
  document.getElementById('btn-guardar-combate').addEventListener('click', guardarCombate);
  document.getElementById('btn-cargar-combate').addEventListener('click', cargarCombate);
  document.getElementById('btn-agregar-pj').addEventListener('click', () => mostrarModalAddPersonaje('pj'));
  document.getElementById('btn-agregar-npc').addEventListener('click', () => mostrarModalAddPersonaje('npc'));

  // Selector de imagen de fondo
  document.getElementById('selector-imagen-fondo').addEventListener('change', (e) => {
    aplicarImagenDeFondo(e.target.value);
  });

  // Sistema de arrastre
  document.addEventListener('mousedown', manejarInicioArrastre);
  document.addEventListener('mousemove', manejarArrastre);
  document.addEventListener('mouseup', manejarSoltar);
  document.addEventListener('mouseleave', cancelarArrastre);

  // Eventos para el modal de información del personaje (edición)
  document.querySelector('#modal-personaje-info .close-button-info').addEventListener('click', cerrarModalInfoPersonaje);
  document.getElementById('modal-guardar-anotaciones').addEventListener('click', guardarAnotacionesPersonaje);
  document.querySelectorAll('#modal-personaje-info .btn-mod-stat').forEach(button => {
    button.addEventListener('click', (e) => modificarEstadisticaPersonaje(e.target.dataset.stat, e.target.dataset.action));
  });

  // Eventos para el modal de selección de obstáculo
  document.querySelector('#modal-obstaculo-selector .obstaculo-close-button').addEventListener('click', cerrarModalObstaculoSelector);
  document.querySelectorAll('.btn-obstacle-color').forEach(button => {
    button.addEventListener('click', (e) => seleccionarTipoObstaculo(e.target.dataset.color));
  });

  // Eventos para el nuevo modal de añadir personaje
  document.querySelector('#modal-add-personaje .add-personaje-close-button').addEventListener('click', cerrarModalAddPersonaje);
  document.getElementById('btn-confirmar-add-personaje').addEventListener('click', agregarNuevoPersonaje);

  // Eventos para los botones +/- en el modal de añadir personaje
  document.querySelectorAll('#modal-add-personaje .btn-mod-stat').forEach(button => {
    button.addEventListener('click', (e) => {
      const stat = e.target.dataset.stat;
      const action = e.target.dataset.action;
      const inputElement = document.getElementById(`input-${stat}-personaje`);
      let value = parseInt(inputElement.value);

      if (action === 'plus') {
        value++;
      } else if (action === 'minus') {
        value--;
      }
      if (value < 0) value = 0; // Asegurarse de que no sea negativo
      inputElement.value = value;
    });
  });
}

function iniciarNuevoCombate() {
  // Reiniciar estado
  estadoCombate.participantes = [];
  estadoCombate.tablero = Array(TOTAL_CELLS).fill(null);
  estadoCombate.activo = true;
  estadoCombate.imagenFondo = ''; // Reiniciar imagen de fondo

  // Actualizar UI
  const tableroDiv = document.getElementById('tablero-combate');
  tableroDiv.style.display = 'grid';
  tableroDiv.style.backgroundImage = 'none'; // Quitar imagen de fondo
  tableroDiv.style.backgroundSize = 'cover'; // Asegurarse de que el tamaño esté cubierto
  document.getElementById('lista-participantes').style.display = 'block';
  document.getElementById('selector-imagen-fondo-container').style.display = 'block'; // Mostrar selector

  // Limpiar tablero visualmente
  document.querySelectorAll('.celda-tablero').forEach(celda => {
    celda.classList.remove(
      'celda-ocupada',
      'celda-enemigo',
      'celda-fallecido',
      'celda-obstaculo-celeste',
      'celda-obstaculo-verde',
      'celda-obstaculo-gris',
      'celda-obstaculo-marron',
      'celda-obstaculo-negro',
      'celda-obstaculo-original'
    );
    celda.innerHTML = '';
    celda.style.backgroundColor = '';
  });

  // Limpiar lista de participantes
  document.getElementById('lista-participantes').innerHTML = '<p>No hay participantes aún</p>';

  // Resetear selector de imagen de fondo
  document.getElementById('selector-imagen-fondo').value = '';

  console.log("Nuevo combate preparado.");
}

function aplicarImagenDeFondo(nombreImagen) {
  const tableroDiv = document.getElementById('tablero-combate');
  // Se calcula el tamaño de la imagen según las dimensiones actuales del tablero, incluyendo el GAP_SIZE
  const imagenWidth = (GRID_COLS * CELL_SIZE) + ((GRID_COLS - 1) * GAP_SIZE);
  const imagenHeight = (GRID_ROWS * CELL_SIZE) + ((GRID_ROWS - 1) * GAP_SIZE);

  if (nombreImagen) {
    estadoCombate.imagenFondo = `imagenes/combates/${nombreImagen}.webp`;
    tableroDiv.style.backgroundImage = `url(${estadoCombate.imagenFondo})`;
    tableroDiv.style.backgroundSize = `${imagenWidth}px ${imagenHeight}px`; // Tamaño fijo para la imagen
    tableroDiv.style.backgroundRepeat = 'no-repeat';
    tableroDiv.style.backgroundPosition = 'center center'; // Para asegurar que la imagen se centre
  } else {
    estadoCombate.imagenFondo = '';
    tableroDiv.style.backgroundImage = 'none';
  }
}

function mostrarModalAddPersonaje(tipo) {
  if (!estadoCombate.activo) {
    alert("Primero inicia un nuevo combate");
    return;
  }
  estadoCombate.tipoPersonajeAgregando = tipo;
  const modal = document.getElementById('modal-add-personaje');
  document.getElementById('modal-add-personaje-title').textContent = `Añadir ${tipo.toUpperCase()}`;
  document.getElementById('input-nombre-personaje').value = '';
  document.getElementById('input-pv-personaje').value = '12';
  document.getElementById('input-pm-personaje').value = '12';

  // Posicionamiento para centrado en pantalla
  modal.style.left = '50%';
  modal.style.top = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.display = 'flex';
  document.getElementById('input-nombre-personaje').focus();
}

function agregarNuevoPersonaje() {
  const nombre = document.getElementById('input-nombre-personaje').value.trim();
  const pv = parseInt(document.getElementById('input-pv-personaje').value);
  const pm = parseInt(document.getElementById('input-pm-personaje').value);
  const tipo = estadoCombate.tipoPersonajeAgregando;

  if (!nombre || isNaN(pv) || isNaN(pm)) {
    alert("Por favor, introduce un nombre y valores numéricos válidos para PV y PM.");
    return;
  }

  const nuevoPersonaje = {
    id: Date.now(),
    nombre,
    pv,
    pm,
    tipo,
    posicion: null,
    anotaciones: "",
    fallecido: false
  };

  estadoCombate.participantes.push(nuevoPersonaje);
  actualizarListaParticipantes();
  console.log(`${tipo.toUpperCase()} creado:`, nuevoPersonaje);
  cerrarModalAddPersonaje();
}

function cerrarModalAddPersonaje() {
  document.getElementById('modal-add-personaje').style.display = 'none';
  estadoCombate.tipoPersonajeAgregando = null;
}


function crearTableroCuadrado() {
  const tableroDiv = document.getElementById('tablero-combate');
  tableroDiv.innerHTML = '';

  for (let i = 0; i < TOTAL_CELLS; i++) {
    const celda = document.createElement('div');
    celda.className = 'celda-tablero';
    celda.dataset.index = i;

    // Evento de click en la celda
    celda.addEventListener('click', (e) => {
      // Guardar el BoundingClientRect de la celda clicada
      // Esta línea se mantiene, aunque clickedCellRect ya no se use para posicionar los modales.
      clickedCellRect = celda.getBoundingClientRect();

      const celdaIndex = parseInt(celda.dataset.index);
      const celdaEstado = estadoCombate.tablero[celdaIndex];

      // Si la celda tiene un personaje, mostrar modal de personaje
      if (celdaEstado && typeof celdaEstado === 'number') {
        const personaje = estadoCombate.participantes.find(p => p.id === celdaEstado);
        if (personaje) {
          mostrarModalInfoPersonaje(personaje); // Pasa el personaje para edición
        }
      }
      // Si la celda está vacía o es un obstáculo, mostrar selector de obstáculos
      else {
        estadoCombate.celdaObstaculoSeleccionando = celdaIndex;
        mostrarModalObstaculoSelector();
      }
    });

    tableroDiv.appendChild(celda);
  }
}

function actualizarListaParticipantes() {
  const lista = document.getElementById('lista-participantes');
  lista.innerHTML = '';

  if (estadoCombate.participantes.length === 0) {
    lista.innerHTML = '<p>No hay participantes aún</p>';
    return;
  }

  estadoCombate.participantes.forEach(p => {
    const card = document.createElement('div');
    card.className = 'participante-card';

    let botonColocarHTML = '';
    if (p.posicion === null) {
      botonColocarHTML = `<button class="btn-magia-pequeno" onclick="colocarPersonaje(${p.id})">Colocar</button>`;
    }

    // Volver a presentar la información en una sola línea
    const anotacionesDisplay = p.anotaciones ? ` (${p.anotaciones.substring(0, 70)}${p.anotaciones.length > 30 ? '...' : ''})` : '';

    card.innerHTML = `
      <div class="info-personaje-lista">
        <span><strong>${p.nombre}</strong> (${p.tipo.toUpperCase()})</span>
        <span>PV: <span id="pv-lista-${p.id}">${p.pv}</span></span>
        <span>PM: <span id="pm-lista-${p.id}">${p.pm}</span></span>
        ${anotacionesDisplay}
      </div>
      <div class="botones-personaje-lista">
        ${botonColocarHTML}
        <button class="btn-magia-pequeno btn-eliminar" onclick="eliminarPersonaje(${p.id})">Eliminar</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

function colocarPersonaje(id) {
  const personaje = estadoCombate.participantes.find(p => p.id === id);
  if (!personaje) return;

  const iniciales = obtenerIniciales(personaje.nombre);

  const celdas = document.querySelectorAll('.celda-tablero');
  // Buscar la primera celda vacía para colocar al personaje
  let celdaEncontrada = false;
  for (let i = 0; i < celdas.length; i++) {
    if (estadoCombate.tablero[i] === null) {
      // Limpiar posición anterior si existe
      if (personaje.posicion !== null) {
        estadoCombate.tablero[personaje.posicion] = null;
        const oldCelda = document.querySelector(`.celda-tablero[data-index="${personaje.posicion}"]`);
        // Eliminar todas las clases de estado de la celda antigua
        oldCelda.classList.remove(
          'celda-ocupada', 'celda-enemigo', 'celda-fallecido',
          'celda-obstaculo-celeste', 'celda-obstaculo-verde',
          'celda-obstaculo-gris', 'celda-obstaculo-marron',
          'celda-obstaculo-negro', 'celda-obstaculo-original'
        );
        oldCelda.innerHTML = '';
        oldCelda.style.backgroundColor = '';
      }

      // Colocar en nueva posición
      personaje.posicion = i;
      estadoCombate.tablero[i] = personaje.id;

      const celda = celdas[i];
      celda.classList.add('celda-ocupada');
      if (personaje.tipo === 'npc') celda.classList.add('celda-enemigo');
      if (personaje.fallecido) celda.classList.add('celda-fallecido');

      celda.innerHTML = `
        <div class="personaje-hex" data-id="${personaje.id}" ${personaje.fallecido ? 'style="cursor: default;"' : ''}>
          ${iniciales}
        </div>
      `;

      console.log(`${personaje.nombre} colocado en posición ${i}`);
      celdaEncontrada = true;
      break;
    }
  }
  if (!celdaEncontrada) {
    alert("No hay celdas vacías disponibles para colocar al personaje.");
  }
  actualizarListaParticipantes();
}

function eliminarPersonaje(id) {
  const index = estadoCombate.participantes.findIndex(p => p.id === id);
  if (index !== -1) {
    const personajeEliminado = estadoCombate.participantes[index];

    // Si el personaje está en el tablero, quitarlo visualmente y del estado del tablero
    if (personajeEliminado.posicion !== null) {
      estadoCombate.tablero[personajeEliminado.posicion] = null;
      const celda = document.querySelector(`.celda-tablero[data-index="${personajeEliminado.posicion}"]`);
      if (celda) {
        celda.classList.remove(
          'celda-ocupada', 'celda-enemigo', 'celda-fallecido',
          'celda-obstaculo-celeste', 'celda-obstaculo-verde',
          'celda-obstaculo-gris', 'celda-obstaculo-marron',
          'celda-obstaculo-negro', 'celda-obstaculo-original'
        );
        celda.innerHTML = '';
        celda.style.backgroundColor = '';
      }
    }

    estadoCombate.participantes.splice(index, 1); // Eliminar del array de participantes
    actualizarListaParticipantes();
    console.log(`Personaje con ID ${id} eliminado.`);
  }
}

// ===== SISTEMA DE ARRASTRE =====

function manejarInicioArrastre(e) {
  // Asegúrate de que los modals no estén abiertos
  if (estadoCombate.personajeEditando || estadoCombate.celdaObstaculoSeleccionando !== null || document.getElementById('modal-add-personaje').style.display === 'flex') return;

  if (e.target.classList.contains('personaje-hex')) {
    const personaje = estadoCombate.participantes.find(
      p => p.id === parseInt(e.target.dataset.id)
    );

    // No permitir arrastrar si el personaje está fallecido
    if (personaje && personaje.fallecido) return;

    const celda = e.target.closest('.celda-tablero');

    if (!personaje) return;

    const clone = e.target.cloneNode(true);
    clone.id = 'personaje-arrastrando';
    clone.style.position = 'absolute';
    // Ajuste de la posición inicial para el arrastre, teniendo en cuenta el tamaño de la celda
    clone.style.left = `${e.pageX - (CELL_SIZE / 2)}px`;
    clone.style.top = `${e.pageY - (CELL_SIZE / 2)}px`;
    clone.style.pointerEvents = 'none';
    document.body.appendChild(clone);

    estadoCombate.personajeArrastrado = {
      element: clone,
      id: personaje.id,
      celdaIndex: parseInt(celda.dataset.index),
      original: e.target
    };

    e.target.style.visibility = 'hidden';
  }
}

function manejarArrastre(e) {
  if (estadoCombate.personajeArrastrado) {
    const clone = document.getElementById('personaje-arrastrando');
    // Ajuste de la posición para el arrastre
    clone.style.left = `${e.pageX - (CELL_SIZE / 2)}px`;
    clone.style.top = `${e.pageY - (CELL_SIZE / 2)}px`;
  }
}

function manejarSoltar(e) {
  if (!estadoCombate.personajeArrastrado) return;

  document.getElementById('personaje-arrastrando')?.remove();
  estadoCombate.personajeArrastrado.original.style.visibility = 'visible';

  const celdas = [...document.querySelectorAll('.celda-tablero')];
  const celdaDestino = celdas.find(celda => {
    const rect = celda.getBoundingClientRect();
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
  });

  if (celdaDestino) {
    const nuevoIndex = parseInt(celdaDestino.dataset.index);
    if (estadoCombate.tablero[nuevoIndex] === null) {
      moverPersonaje(estadoCombate.personajeArrastrado.celdaIndex, nuevoIndex);
    } else {
      console.log(`La celda de destino ${nuevoIndex} ya está ocupada o es un obstáculo. No se puede mover.`);
    }
  }

  estadoCombate.personajeArrastrado = null;
}

function cancelarArrastre() {
  if (estadoCombate.personajeArrastrado) {
    document.getElementById('personaje-arrastrando')?.remove();
    estadoCombate.personajeArrastrado.original.style.visibility = 'visible';
    estadoCombate.personajeArrastrado = null;
  }
}

function moverPersonaje(fromIndex, toIndex) {
  const personajeId = estadoCombate.tablero[fromIndex];
  const personaje = estadoCombate.participantes.find(p => p.id === personajeId);

  if (!personaje) return;

  estadoCombate.tablero[fromIndex] = null;
  estadoCombate.tablero[toIndex] = personajeId;
  personaje.posicion = toIndex;

  const celdaFrom = document.querySelector(`.celda-tablero[data-index="${fromIndex}"]`);
  const celdaTo = document.querySelector(`.celda-tablero[data-index="${toIndex}"]`);

  celdaFrom.classList.remove(
    'celda-ocupada', 'celda-enemigo', 'celda-fallecido',
    'celda-obstaculo-celeste', 'celda-obstaculo-verde',
    'celda-obstaculo-gris', 'celda-obstaculo-marron',
    'celda-obstaculo-negro', 'celda-obstaculo-original'
  );
  celdaFrom.innerHTML = '';
  celdaFrom.style.backgroundColor = '';

  celdaTo.classList.add('celda-ocupada');
  if (personaje.tipo === 'npc') celdaTo.classList.add('celda-enemigo');
  if (personaje.fallecido) celdaTo.classList.add('celda-fallecido');

  const iniciales = obtenerIniciales(personaje.nombre);
  celdaTo.innerHTML = `
    <div class="personaje-hex" data-id="${personaje.id}" ${personaje.fallecido ? 'style="cursor: default;"' : ''}>
      ${iniciales}
    </div>
  `;
}

// ===== FUNCIONES MODAL INFORMACIÓN PERSONAJE (EDICIÓN) =====

function mostrarModalInfoPersonaje(personaje) {
  estadoCombate.personajeEditando = personaje;

  const modal = document.getElementById('modal-personaje-info');
  document.getElementById('modal-personaje-nombre').textContent = personaje.nombre;
  document.getElementById('modal-personaje-pv').textContent = personaje.pv;
  document.getElementById('modal-personaje-pm').textContent = personaje.pm;
  document.getElementById('modal-personaje-anotaciones').value = personaje.anotaciones || '';

  // Posicionamiento para centrado en pantalla visible (viewport)
  modal.style.left = '50%';
  modal.style.top = '50%';
  modal.style.transform = 'translate(-50%, -50%)'; // Centra el modal respecto a su propio tamaño
  modal.style.display = 'flex'; // Mostrar el modal
}

function cerrarModalInfoPersonaje() {
  document.getElementById('modal-personaje-info').style.display = 'none';
  estadoCombate.personajeEditando = null;
  clickedCellRect = null; // Limpiar el rect de la celda clicada
  actualizarListaParticipantes();
}

function modificarEstadisticaPersonaje(stat, action) {
  if (!estadoCombate.personajeEditando) return;

  if (action === 'plus') {
    estadoCombate.personajeEditando[stat]++;
  } else if (action === 'minus') {
    estadoCombate.personajeEditando[stat]--;
  }

  if (stat === 'pv' && estadoCombate.personajeEditando[stat] < 0) {
    estadoCombate.personajeEditando[stat] = 0;
  }

  // Actualizar la UI del modal
  document.getElementById(`modal-personaje-${stat}`).textContent = estadoCombate.personajeEditando[stat];
  console.log(`${estadoCombate.personajeEditando.nombre} ${stat.toUpperCase()} ahora es: ${estadoCombate.personajeEditando[stat]}`);

  if (stat === 'pv') {
    if (estadoCombate.personajeEditando.pv === 0) {
      estadoCombate.personajeEditando.fallecido = true;
      actualizarPersonajeEnTablero(estadoCombate.personajeEditando);
    } else if (estadoCombate.personajeEditando.pv > 0 && estadoCombate.personajeEditando.fallecido) {
      estadoCombate.personajeEditando.fallecido = false;
      actualizarPersonajeEnTablero(estadoCombate.personajeEditando);
    }
  }

  // Actualizar también la lista de participantes en la parte inferior
  actualizarListaParticipantes();
}

function guardarAnotacionesPersonaje() {
  if (!estadoCombate.personajeEditando) return;
  estadoCombate.personajeEditando.anotaciones = document.getElementById('modal-personaje-anotaciones').value;
  console.log(`Anotaciones de ${estadoCombate.personajeEditando.nombre} guardadas.`);
  cerrarModalInfoPersonaje();
}

function actualizarPersonajeEnTablero(personaje) {
  if (personaje.posicion === null) return;

  const celda = document.querySelector(`.celda-tablero[data-index="${personaje.posicion}"]`);
  if (!celda) return;

  const personajeHex = celda.querySelector('.personaje-hex');
  if (!personajeHex) return;

  if (personaje.fallecido) {
    celda.classList.add('celda-fallecido');
    personajeHex.style.cursor = 'default';
  } else {
    celda.classList.remove('celda-fallecido');
    personajeHex.style.cursor = 'move';
  }
}

// ===== FUNCIONES MODAL OBSTÁCULO =====

function mostrarModalObstaculoSelector() {
  const modal = document.getElementById('modal-obstaculo-selector');

  // Posicionamiento para centrado en pantalla visible (viewport)
  modal.style.left = '50%';
  modal.style.top = '50%';
  modal.style.transform = 'translate(-50%, -50%)'; // Centra el modal respecto a su propio tamaño
  modal.style.display = 'flex'; // Mostrar el modal
}

function cerrarModalObstaculoSelector() {
  document.getElementById('modal-obstaculo-selector').style.display = 'none';
  estadoCombate.celdaObstaculoSeleccionando = null;
  clickedCellRect = null; // Limpiar el rect de la celda clicada
}

function seleccionarTipoObstaculo(color) {
  if (estadoCombate.celdaObstaculoSeleccionando === null) return;

  const celdaIndex = estadoCombate.celdaObstaculoSeleccionando;
  const celdaElement = document.querySelector(`.celda-tablero[data-index="${celdaIndex}"]`);

  if (!celdaElement) return;

  celdaElement.classList.remove(
    'celda-obstaculo-celeste',
    'celda-obstaculo-verde',
    'celda-obstaculo-gris',
    'celda-obstaculo-marron',
    'celda-obstaculo-negro',
    'celda-obstaculo-original'
  );
  celdaElement.style.backgroundColor = '';

  if (color === 'original') {
    estadoCombate.tablero[celdaIndex] = null;
  } else {
    estadoCombate.tablero[celdaIndex] = `obstaculo-${color}`;
    celdaElement.classList.add(`celda-obstaculo-${color}`);
  }

  console.log(`Celda ${celdaIndex} configurada como obstáculo: ${color}`);
  cerrarModalObstaculoSelector();
}

// ===== FUNCIONES DE GUARDAR/CARGAR EN ARCHIVO EXTERNO =====

function guardarCombate() {
  try {
    const estadoGuardar = {
      participantes: estadoCombate.participantes,
      tablero: estadoCombate.tablero,
      activo: estadoCombate.activo,
      imagenFondo: estadoCombate.imagenFondo
    };

    const jsonString = JSON.stringify(estadoGuardar, null, 2); // Formato legible
    const blob = new Blob([jsonString], { type: 'application/json' });

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses son 0-11
    const year = now.getFullYear();
    const filename = `combate-${day}-${month}-${year}.json`;

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);

    console.log(`Combate guardado como ${filename}`);
  } catch (e) {
    alert('Error al guardar el combate: ' + e.message);
    console.error('Error al guardar el combate:', e);
  }
}

function cargarCombate() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json'; // Solo acepta archivos JSON

  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const parsedEstado = JSON.parse(event.target.result);

        // Restaurar el estado global
        estadoCombate.participantes = parsedEstado.participantes || [];
        estadoCombate.tablero = parsedEstado.tablero || Array(TOTAL_CELLS).fill(null);
        estadoCombate.activo = parsedEstado.activo !== undefined ? parsedEstado.activo : true;
        estadoCombate.imagenFondo = parsedEstado.imagenFundo || parsedEstado.imagenFondo || ''; // Compatibilidad con 'imagenFundo' si existiera

        // Actualizar la UI
        const tableroDiv = document.getElementById('tablero-combate');
        tableroDiv.style.display = 'grid';
        document.getElementById('lista-participantes').style.display = 'block';
        document.getElementById('selector-imagen-fondo-container').style.display = 'block';

        // Aplicar imagen de fondo
        if (estadoCombate.imagenFondo) {
          const imageName = estadoCombate.imagenFondo.split('/').pop().replace('.webp', '');
          document.getElementById('selector-imagen-fondo').value = imageName;
          aplicarImagenDeFondo(imageName);
        } else {
          document.getElementById('selector-imagen-fondo').value = '';
          aplicarImagenDeFondo('');
        }

        // Limpiar y dibujar el tablero con el estado cargado
        document.querySelectorAll('.celda-tablero').forEach(celda => {
          celda.classList.remove(
            'celda-ocupada', 'celda-enemigo', 'celda-fallecido',
            'celda-obstaculo-celeste', 'celda-obstaculo-verde',
            'celda-obstaculo-gris', 'celda-obstaculo-marron',
            'celda-obstaculo-negro', 'celda-obstaculo-original'
          );
          celda.innerHTML = '';
          celda.style.backgroundColor = '';
        });

        estadoCombate.tablero.forEach((celdaContenido, index) => {
          const celdaElement = document.querySelector(`.celda-tablero[data-index="${index}"]`);
          if (!celdaElement) return;

          if (celdaContenido === null) {
            // Celda vacía, ya está limpia por el bucle anterior
          } else if (typeof celdaContenido === 'number') {
            // Es un personaje
            const personaje = estadoCombate.participantes.find(p => p.id === celdaContenido);
            if (personaje) {
              personaje.posicion = index; // Asegurar que la posición del personaje esté actualizada
              celdaElement.classList.add('celda-ocupada');
              if (personaje.tipo === 'npc') celdaElement.classList.add('celda-enemigo');
              if (personaje.fallecido) celdaElement.classList.add('celda-fallecido');
              const iniciales = obtenerIniciales(personaje.nombre);
              celdaElement.innerHTML = `
                <div class="personaje-hex" data-id="${personaje.id}" ${personaje.fallecido ? 'style="cursor: default;"' : ''}>
                  ${iniciales}
                </div>
              `;
            }
          } else if (typeof celdaContenido === 'string' && celdaContenido.startsWith('obstaculo-')) {
            // Es un obstáculo
            const color = celdaContenido.split('-')[1];
            celdaElement.classList.add(`celda-obstaculo-${color}`);
          }
        });

        actualizarListaParticipantes();
        console.log('Estado del combate cargado exitosamente.');

      } catch (e) {
        alert('Error al leer o parsear el archivo JSON: ' + e.message);
        console.error('Error al cargar el combate:', e);
      }
    };
    reader.readAsText(file);
  };
  input.click(); // Abrir el diálogo de selección de archivo
}

// ===== FUNCIONES AUXILIARES =====

function obtenerIniciales(nombre) {
  const palabras = nombre.split(' ');
  if (palabras.length >= 2) {
    return (palabras[0][0] + palabras[1][0]).toUpperCase();
  }
  return nombre.substring(0, 2).toUpperCase() || '??';
}


// Inicialización segura
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCombate);
} else {
  initCombate();
}

// Hacer funciones accesibles globalmente para los botones HTML
window.colocarPersonaje = colocarPersonaje;
window.agregarNuevoPersonaje = agregarNuevoPersonaje;
window.eliminarPersonaje = eliminarPersonaje; // Hacer la función eliminarPersonaje accesible