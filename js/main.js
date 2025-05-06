// js/main.js - Versión corregida
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // 1. Configuración inicial
    // ====================
    const sidebar = document.getElementById('sidebar');
    const menuActivator = document.getElementById('menuActivator');
    let hideTimeout;
    let rutaActual = '';

    // ====================
    // 2. Lógica del menú hover
    // ====================
    function showMenu() {
        clearTimeout(hideTimeout);
        sidebar.classList.add('active');
    }

    function hideMenu() {
        hideTimeout = setTimeout(() => {
            sidebar.classList.remove('active');
        }, 300);
    }

    if (menuActivator && sidebar) {
        menuActivator.addEventListener('mouseenter', showMenu);
        menuActivator.addEventListener('mouseleave', hideMenu);
        sidebar.addEventListener('mouseenter', showMenu);
        sidebar.addEventListener('mouseleave', hideMenu);
    }

    // ====================
    // 3. Lógica de submenús
    // ====================
    document.querySelectorAll('.menu-item[data-menu]').forEach(item => {
        item.addEventListener('click', function() {
            const menuId = this.getAttribute('data-menu');
            const submenu = document.getElementById(`submenu-${menuId}`);
            
            document.querySelectorAll('.submenu').forEach(sm => {
                if (sm !== submenu) {
                    sm.classList.remove('show');
                    sm.previousElementSibling.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
            submenu.classList.toggle('show');
        });
    });

    // ====================
    // 4. Carga dinámica mejorada
    // ====================
    function cargarSeccion(url) {
        if (rutaActual === url) return;
        rutaActual = url;

        console.log(`[Runequest] Cargando: ${url}`);
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    mostrarError(url);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('contenido').innerHTML = html;
                cargarJS(url.replace('.html', '.js'));
            })
            .catch(error => {
                console.error('Error al cargar:', error);
                mostrarError(url);
            });
    }

    function mostrarError(url) {
        const nombreSeccion = url.split('/').pop().replace('.html', '').replace('-', ' ');
        document.getElementById('contenido').innerHTML = `
            <div class="seccion-activa">
                <h2>${nombreSeccion}</h2>
                <div class="alert alert-danger mt-3">
                    <p>Error al cargar la sección. Verifica:</p>
                    <ul>
                        <li>Que el archivo <strong>${url}</strong> existe</li>
                        <li>Que el servidor está funcionando</li>
                    </ul>
                    <small>Consulta la consola (F12) para más detalles</small>
                </div>
            </div>
        `;
    }

    function cargarJS(url) {
        document.querySelectorAll('script[data-section]').forEach(script => script.remove());
        
        fetch(url)
            .then(response => {
                if (response.ok) {
                    const script = document.createElement('script');
                    script.src = url;
                    script.setAttribute('data-section', 'true');
                    document.body.appendChild(script);
                }
            })
            .catch(() => console.warn(`JS no encontrado para: ${url}`));
    }

    // ====================
    // 5. Mapeo de secciones
    // ====================
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.addEventListener('click', function() {
            const texto = this.textContent.trim();
            let ruta = '';
            
            // Mapeo especial para Varita de los Deseos
            if (texto === 'Varita de los Deseos') {
                ruta = 'secciones/magia/varita-deseos.html';
            } 
            // Mapeo para otras secciones
            else {
                const seccionPadre = this.parentElement.id.replace('submenu-', '');
                ruta = `secciones/${seccionPadre}/${texto.toLowerCase().replace(/\s+/g, '-')}.html`;
            }
            
            cargarSeccion(ruta);
        });
    });

    // ====================
    // 6. Configuración inicial
    // ====================
    // Cargar contenido inicial (evitando fetch)
    document.getElementById('contenido').innerHTML = `
        <div class="seccion-activa">
            <h2 style="text-align: center;">Bienvenido al Sistema Runequest</h2>
            <div class="alert alert-info">
                <p>Selecciona una opción del menú lateral para comenzar.</p>
                <small>Pasa el cursor por el borde izquierdo para mostrar el menú</small>
            </div>
        </div>
    `;

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            window.location.href = 'index.html';
        }
    });

    console.log('[Runequest] Sistema iniciado correctamente');
});