document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración del menú lateral
    const sidebar = document.getElementById('sidebar');
    const menuActivator = document.getElementById('menuActivator');
    let hideTimeout;
    let rutaActual = '';

    function showMenu() {
        clearTimeout(hideTimeout);
        sidebar.classList.add('active');
    }

    function hideMenu() {
        hideTimeout = setTimeout(() => sidebar.classList.remove('active'), 300);
    }

    // Detectar dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        menuActivator.addEventListener('click', () => sidebar.classList.toggle('active'));
    } else {
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
                e.stopPropagation();
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

        // Submenú Espíritus
        const espiritusItem = document.querySelector('.submenu-espiritus');
        if (espiritusItem) {
            espiritusItem.addEventListener('click', function(e) {
                e.stopPropagation();
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
            });
        });
    }

    // 4. Configuración inicial
    setupMenuItems();
    
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