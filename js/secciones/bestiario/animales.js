function initAnimales() {
    console.log('Inicializando Bestiario Animal...');
    
    // Verificación robusta de dependencias
    if (typeof window.animalesDB === 'undefined') {
        console.error('Error crítico: No se cargaron los datos de animales');
        document.getElementById('animales-grid').innerHTML = 
            '<div class="error">Error al cargar los datos del bestiario</div>';
        return;
    }

    // Elementos UI
    const elementos = {
        btnDomesticos: document.getElementById('btn-domesticos'),
        btnSalvajes: document.getElementById('btn-salvajes'),
        grid: document.getElementById('animales-grid'),
        selector: document.querySelector('.selector-animal-container'),
        resultados: document.querySelector('.resultados-container')
    };

    // Controlador de eventos
    function setupEventListeners() {
        elementos.btnDomesticos.addEventListener('click', () => mostrarAnimales('domesticos'));
        elementos.btnSalvajes.addEventListener('click', () => mostrarAnimales('salvajes'));
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.selector-animal-container') && 
                !e.target.closest('.btn-magia')) {
                elementos.selector.style.display = 'none';
            }
        });
    }

    // Mostrar lista de animales
    function mostrarAnimales(categoria) {
        elementos.grid.innerHTML = '';
        elementos.selector.style.display = 'block';
        elementos.resultados.style.display = 'none';
        
        window.animalesDB[categoria].forEach(animal => {
            const opcion = document.createElement('div');
            opcion.className = 'opcion-animal';
            opcion.textContent = animal.nombre;
            opcion.addEventListener('click', () => mostrarFichaAnimal(animal));
            elementos.grid.appendChild(opcion);
        });
    }

    // Mostrar ficha completa
    function mostrarFichaAnimal(animal) {
        elementos.selector.style.display = 'none';
        elementos.resultados.style.display = 'block';
        
        document.getElementById('resultado-principal').innerHTML = `
            <h3>${animal.nombre}</h3>
            <div class="tabs">...</div>
            <!-- Resto de la plantilla igual que antes -->
        `;
        
        // Configurar pestañas (código igual que antes)
    }

    // Inicialización
    setupEventListeners();
    mostrarAnimales('domesticos'); // Cargar domésticos por defecto
}

// Gestión de carga
if (document.readyState === 'complete') {
    setTimeout(initAnimales, 100); // Pequeño delay para asegurar carga
} else {
    document.addEventListener('DOMContentLoaded', initAnimales);
}