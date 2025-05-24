function initRunica() {
    console.log('Inicializando Selector de Magia Rúnica...');
    
    // Elementos de la interfaz
    const selectConjuro = document.getElementById('conjuro');
    const resultadosContainer = document.getElementById('resultados-container');
    const resultadoPrincipal = document.getElementById('resultado-principal');
    
    // Cargar datos de conjuros
    fetch('js/secciones/magia/runica.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Ordenar conjuros alfabéticamente
            const conjurosOrdenados = data.conjuros.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
            // Limpiar select antes de llenarlo
            while (selectConjuro.options.length > 1) {
                selectConjuro.remove(1);
            }
            
            // Llenar el select con los conjuros
            conjurosOrdenados.forEach(conjuro => {
                if (conjuro.nombre && conjuro.nombre.trim() !== '') {
                    const option = document.createElement('option');
                    option.value = conjuro.nombre;
                    option.textContent = conjuro.nombre;
                    selectConjuro.appendChild(option);
                }
            });
            
            // Configurar evento para el select
            selectConjuro.addEventListener('change', function() {
                const conjuroSeleccionado = this.value;
                
                if (!conjuroSeleccionado) {
                    resultadosContainer.style.display = 'none';
                    return;
                }
                
                const conjuro = conjurosOrdenados.find(c => c.nombre === conjuroSeleccionado);
                if (conjuro) {
                    mostrarFichaConjuro(conjuro);
                }
            });
        })
        .catch(error => {
            console.error('Error cargando los conjuros:', error);
            // Mostrar mensaje de error al usuario si es necesario
        });
    
    // Función para mostrar la ficha del conjuro
    function mostrarFichaConjuro(conjuro) {
        resultadosContainer.style.display = 'block';
        
        resultadoPrincipal.innerHTML = `
            <div class="ficha-conjuro">
                <h3>${conjuro.nombre}</h3>
                <div class="propiedades-conjuro">
                    <div class="propiedad-conjuro">
                        <strong>Puntos:</strong> <span class="valor-propiedad">${conjuro.puntos || '-'}</span>
                    </div>
                    <div class="propiedad-conjuro">
                        <strong>Distancia:</strong> <span class="valor-propiedad">${conjuro.distancia || '-'}</span>
                    </div>
                    <div class="propiedad-conjuro">
                        <strong>Duración:</strong> <span class="valor-propiedad">${conjuro.duracion || '-'}</span>
                    </div>
                </div>
                <div class="descripcion-conjuro">
                    <h4>Descripción</h4>
                    <p>${conjuro.Description ? conjuro.Description.replace(/\n/g, '<br>') : 'No hay descripción disponible.'}</p>
                </div>
                <button class="btn-magia">Volver a la lista</button>
            </div>
        `;

        // Configurar evento para el botón de volver
        document.querySelector('.btn-magia').addEventListener('click', () => {
            resultadosContainer.style.display = 'none';
            selectConjuro.value = '';
        });
    }
}

// Inicialización
if (document.readyState === 'complete') {
    initRunica();
} else {
    document.addEventListener('DOMContentLoaded', initRunica);
}