// Inicialización de conjuros espirituales
function initEspiritual() {
    console.log('Inicializando Conjuros Espirituales...');
    
    // Elementos de la interfaz
    const conjurosGrid = document.getElementById('conjuros-grid');
    const resultadosContainer = document.querySelector('.resultados-container');
    
    // Cargar datos de conjuros
    fetch('js/secciones/magia/espiritual.json')
        .then(response => response.json())
        .then(data => {
            // Ordenar conjuros alfabéticamente
            const conjurosOrdenados = data.conjuros.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
            // Mostrar todos los conjuros en el grid
            mostrarConjuros(conjurosOrdenados);
            
            // Configurar evento para el botón de volver
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-volver')) {
                    resultadosContainer.style.display = 'none';
                    conjurosGrid.style.display = 'grid';
                }
            });
        })
        .catch(error => console.error('Error cargando los conjuros:', error));
    
    // Función para mostrar los conjuros en el grid
    function mostrarConjuros(conjuros) {
        conjurosGrid.innerHTML = '';
        
        conjuros.forEach(conjuro => {
            if (conjuro.nombre && conjuro.nombre.trim() !== '') {
                const opcionConjuro = document.createElement('div');
                opcionConjuro.className = 'opcion-conjuro';
                opcionConjuro.textContent = conjuro.nombre;
                opcionConjuro.addEventListener('click', () => {
                    mostrarFichaConjuro(conjuro);
                });
                
                conjurosGrid.appendChild(opcionConjuro);
            }
        });
    }
    
    // Función para mostrar la ficha completa del conjuro
    function mostrarFichaConjuro(conjuro) {
        conjurosGrid.style.display = 'none';
        resultadosContainer.style.display = 'block';
        
        // Construir la línea de propiedades (distancia, duración, uso)
        let propiedadesLinea = [];
        if (conjuro.distancia) propiedadesLinea.push(conjuro.distancia);
        if (conjuro.duracion) propiedadesLinea.push(conjuro.duracion.toLowerCase());
        if (conjuro.uso) propiedadesLinea.push(conjuro.uso.toLowerCase());
        const propiedadesTexto = propiedadesLinea.join(', ');
        
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-conjuro">
                <h3>${conjuro.nombre}</h3>
                
                <div class="propiedades-conjuro">
                    <div class="propiedad-conjuro">
                        <span class="valor-propiedad">${conjuro.puntos || '-'}</span>
                    </div>
                    <div class="propiedad-conjuro">
                        <span class="valor-propiedad">${propiedadesTexto || '-'}</span>
                    </div>
                </div>
                
                <div class="descripcion-conjuro">
                    <h4>Descripción</h4>
                    <p>${conjuro.Description || 'No hay descripción disponible.'}</p>
                </div>
                
                <button class="btn-volver">Volver a la lista</button>
            </div>
        `;
    }
}

// Inicialización
if (document.readyState === 'complete') {
    initEspiritual();
} else {
    document.addEventListener('DOMContentLoaded', initEspiritual);
}