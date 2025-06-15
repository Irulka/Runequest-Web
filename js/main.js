document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración del menú lateral
    const sidebar = document.getElementById('sidebar');
    const menuActivator = document.getElementById('menuActivator');
    let hideTimeout;
    let rutaActual = '';

    // Función para mostrar el menú
    function showMenu() {
        clearTimeout(hideTimeout);
        sidebar.classList.add('active');
    }

    // Función para ocultar el menú
    function hideMenu() {
        // En dispositivos táctiles, no ocultar automáticamente con timeout
        if (!isTouchDevice) {
            hideTimeout = setTimeout(() => sidebar.classList.remove('active'), 300);
        }
    }

    // Detectar dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        // En dispositivos táctiles, el clic alterna el menú
        menuActivator.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el clic se propague y cierre el menú inmediatamente
            sidebar.classList.toggle('active');
            if (sidebar.classList.contains('active')) {
                resetInactivityTimer(); // Reiniciar temporizador cuando se abre el menú
            }
        });

        // Ocultar menú si hay inactividad en dispositivos táctiles
        let inactivityTimeout;
        const INACTIVITY_DELAY = 5000; // 5 segundos de inactividad

        function resetInactivityTimer() {
            clearTimeout(inactivityTimeout);
            if (sidebar.classList.contains('active')) {
                inactivityTimeout = setTimeout(() => {
                    sidebar.classList.remove('active');
                }, INACTIVITY_DELAY);
            }
        }

        // Reiniciar el temporizador con cualquier toque dentro del menú o en el contenido principal
        document.addEventListener('touchstart', (e) => {
            if (sidebar.contains(e.target) || document.getElementById('contenido').contains(e.target)) {
                resetInactivityTimer();
            }
        });

        // Opcional: Cerrar menú al hacer clic fuera de él en dispositivos táctiles
        document.addEventListener('click', function(e) {
            if (isTouchDevice && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuActivator.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });

    } else {
        // En dispositivos no táctiles, usar mouseenter/mouseleave
        menuActivator.addEventListener('mouseenter', showMenu);
        menuActivator.addEventListener('mouseleave', hideMenu);
        sidebar.addEventListener('mouseenter', showMenu);
        sidebar.addEventListener('mouseleave', hideMenu);
    }

    // 2. Carga dinámica de contenido (versión mejorada)
    function cargarSeccion(seccion) {
        if (rutaActual === seccion) return;
        rutaActual = seccion;
        
        const url = `secciones/${seccion}.html`;
        console.log(`[Runequest] Cargando: ${url}`);
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    mostrarError(seccion);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('contenido').innerHTML = html;
                
                // Cargar el JS correspondiente con ruta corregida
                const rutaJS = `js/secciones/${seccion}.js`;
                cargarJS(rutaJS);
                
                // Forzar el reposicionamiento del scroll
                window.scrollTo(0, 0);
            })
            .catch(error => {
                console.error('Error al cargar:', error);
                mostrarError(seccion);
            });
    }

    // Función pública para que otras secciones puedan usarla
    window.cargarSeccion = cargarSeccion;

    function mostrarError(seccion) {
        const nombreSeccion = seccion.split('/').pop().replace(/-/g, ' ');
        document.getElementById('contenido').innerHTML = `
            <div class="seccion-activa">
                <h2>${nombreSeccion}</h2>
                <div class="alert alert-danger mt-3">
                    <p>Error al cargar la sección. Verifica:</p>
                    <ul>
                        <li>Que el archivo <strong>secciones/${seccion}.html</strong> existe</li>
                        <li>Que el servidor está funcionando</li>
                    </ul>
                </div>
            </div>
        `;
    }

    function cargarJS(url) {
        // Limpiar scripts de sección anteriores
        document.querySelectorAll('script[data-section]').forEach(script => script.remove());
        
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('data-section', 'true');
        script.onerror = () => console.warn(`JS no encontrado para: ${url}`);
        document.body.appendChild(script);
        console.log(`[Runequest] JS cargado: ${url}`);
    }

    // 3. Manejo de menús desplegables (versión mejorada)
    function setupMenuItems() {
        // Menús principales
        document.querySelectorAll('.menu-item[data-menu]').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Previene que el evento burbujee y cierre el menú en táctil
                const submenuId = `submenu-${this.getAttribute('data-menu')}`;
                const submenu = document.getElementById(submenuId);
                
                if (submenu) {
                    // Cerrar otros submenús del mismo nivel
                    const parent = this.parentElement;
                    parent.querySelectorAll('.submenu').forEach(sm => {
                        if (sm !== submenu) {
                            sm.classList.remove('show');
                            const prevItem = sm.previousElementSibling;
                            if (prevItem && prevItem.classList.contains('menu-item')) {
                                prevItem.classList.remove('open');
                            }
                        }
                    });
                    
                    // Alternar submenú actual
                    submenu.classList.toggle('show');
                    this.classList.toggle('open');
                }
            });
        });

        // Submenú Espíritus (si existe)
        const espiritusItem = document.querySelector('.submenu-espiritus');
        if (espiritusItem) {
            espiritusItem.addEventListener('click', function(e) {
                e.stopPropagation(); // Previene que el evento burbujee y cierre el menú en táctil
                const submenu = document.getElementById('submenu-espiritus');
                if (submenu) {
                    submenu.classList.toggle('show');
                    this.classList.toggle('open');
                }
            });
        }

        // Items de submenú (para cargar contenido)
        document.querySelectorAll('.submenu-item[data-seccion]').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                cargarSeccion(this.getAttribute('data-seccion'));
                if (isTouchDevice) {
                    // Opcional: Cerrar el menú lateral después de seleccionar una sección en táctil
                    sidebar.classList.remove('active');
                }
            });
        });
    }

    // 4. Implementación del generador de dados
    const diceDisplay = document.getElementById('dice-display');
    const diceButtons = document.querySelectorAll('.dice-button');
    const rollDiceBtn = document.getElementById('roll-dice-btn');
    const clearDiceBtn = document.getElementById('clear-dice-btn');
    const diceResults = document.getElementById('dice-results');

    // Almacena los elementos seleccionados, ej: [{type: 'die', sides: 6, count: 3}, {type: 'modifier', value: 2}]
    let selectedItems = []; 

    // Añadir dado o modificador al display
    diceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.type;
            if (type === 'die') {
                const sides = parseInt(this.dataset.sides);
                const existingDie = selectedItems.find(item => item.type === 'die' && item.sides === sides);
                if (existingDie) {
                    existingDie.count++;
                } else {
                    selectedItems.push({ type: 'die', sides: sides, count: 1 });
                }
            } else if (type === 'modifier') {
                // Solo debería haber un modificador global, lo acumulamos
                const existingModifier = selectedItems.find(item => item.type === 'modifier');
                if (existingModifier) {
                    existingModifier.value++;
                } else {
                    selectedItems.push({ type: 'modifier', value: 1 });
                }
            }
            renderSelectedDiceAndModifiers();
            // Mantener el menú abierto al añadir elementos en táctil
            if (isTouchDevice && !sidebar.classList.contains('active')) {
                showMenu();
            }
            resetInactivityTimer(); // Reiniciar temporizador al interactuar con el generador
        });
    });

    // Renderizar los dados y modificadores seleccionados en el display
    function renderSelectedDiceAndModifiers() {
        diceDisplay.innerHTML = '';
        if (selectedItems.length === 0) {
            diceDisplay.textContent = 'Selecciona dados o modificadores...';
        } else {
            let displayString = '';
            selectedItems.forEach((item, index) => {
                if (item.type === 'die') {
                    // Siempre añadir el dado con su + si no es el primer elemento
                    if (index > 0 && selectedItems[index-1].type === 'die') {
                         displayString += `+${item.count}D${item.sides}`;
                    } else if (index > 0 && selectedItems[index-1].type === 'modifier' && selectedItems[index-1].value > 0) {
                        // Si el anterior era un modificador positivo, el dado actual también lleva +
                        displayString += `+${item.count}D${item.sides}`;
                    } else if (index > 0 && selectedItems[index-1].type === 'modifier' && selectedItems[index-1].value <= 0) {
                        // Si el anterior era un modificador negativo, el dado actual también lleva +
                        displayString += `+${item.count}D${item.sides}`;
                    }
                    else {
                        displayString += `${item.count}D${item.sides}`;
                    }
                } else if (item.type === 'modifier') {
                    // El modificador siempre lleva su signo si es positivo y si no es el primer elemento.
                    // Si es el primer elemento y es positivo, el '+' no se muestra aquí, solo en el resultado final.
                    // Pero si hay elementos antes, sí se muestra.
                    if (index > 0 && item.value > 0) {
                        displayString += `+${item.value}`;
                    } else {
                        // Si es el primer elemento, o si es negativo, o cero
                        displayString += `${item.value}`;
                    }
                }
            });
            diceDisplay.textContent = displayString;
        }
        diceResults.innerHTML = ''; // Limpiar resultados anteriores al añadir/quitar elementos
    }


    // Limpiar todos los dados y modificadores seleccionados
    clearDiceBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el clic cierre el menú en táctil
        selectedItems = [];
        renderSelectedDiceAndModifiers();
        diceResults.innerHTML = '';
        resetInactivityTimer(); // Reiniciar temporizador al interactuar con el generador
    });

    // Tirar los dados
    rollDiceBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el clic cierre el menú en táctil
        if (selectedItems.length === 0) {
            diceResults.innerHTML = '<p>No hay dados ni modificadores seleccionados para tirar.</p>';
            return;
        }

        let totalSum = 0;
        let resultsHtml = '';
        let modifierSum = 0;
        
        // Almacenar tiradas individuales de dados para mostrarlas
        const individualRolls = [];

        selectedItems.forEach(item => {
            if (item.type === 'die') {
                for (let i = 0; i < item.count; i++) {
                    const roll = Math.floor(Math.random() * item.sides) + 1;
                    totalSum += roll;
                    individualRolls.push(`D${item.sides}: <strong>${roll}</strong>`);
                }
            } else if (item.type === 'modifier') {
                modifierSum += item.value;
            }
        });

        const finalTotal = totalSum + modifierSum;
        resultsHtml += `<h4>Resultado: ${finalTotal}</h4>`; // Resultado total al principio, mismo tamaño y fuente

        // Mostrar tiradas individuales
        if (individualRolls.length > 0) {
            resultsHtml += individualRolls.map(rollStr => `<p>${rollStr}</p>`).join('');
            resultsHtml += `<p>Suma de Dados: <strong>${totalSum}</strong></p>`;
        } else {
            resultsHtml += `<p>No se tiraron dados.</p>`;
        }
        
        if (modifierSum !== 0) {
            resultsHtml += `<p>Modificador Total: <strong>${modifierSum > 0 ? '+' : ''}${modifierSum}</strong></p>`;
        }
        
        diceResults.innerHTML = resultsHtml;
        resetInactivityTimer(); // Reiniciar temporizador al interactuar con el generador
    });

    // 5. Configuración inicial
    setupMenuItems();
    renderSelectedDiceAndModifiers(); // Inicializar el display de dados y modificadores

    // Cargar la sección inicial si no hay hash
    if (!window.location.hash) {
        document.getElementById('contenido').innerHTML = `
            <div class="seccion-activa">
                <div class="seccion-activa" style="text-align:center;">
                    <img src="imagenes/runekeeper.webp" alt="Runequest Logo" style="max-width:50%; height:auto;">
                </div>
            </div>
        `;
    }

    // Botón de salir
    document.getElementById('logout-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            window.location.href = 'index.html';
        }
    });

    // Manejo de carga inicial desde hash
    if (window.location.hash) {
        const seccion = window.location.hash.substring(1).replace('-', '/');
        cargarSeccion(seccion);
    }

    console.log('[Runequest] Sistema iniciado correctamente');
});