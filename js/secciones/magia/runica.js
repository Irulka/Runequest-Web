function initRunica() {
    console.log('Inicializando Selector de Magia Rúnica...');
    
    // Elementos de la interfaz
    const selectConjuro = document.getElementById('conjuro');
    const resultadosContainer = document.querySelector('.resultados-container');
    
    // Cargar datos de conjuros
    fetch('js/secciones/magia/runica.json')
        .then(response => response.json())
        .then(data => {
            // Ordenar conjuros alfabéticamente
            const conjurosOrdenados = data.conjuros.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
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
            
            // Configurar evento para el botón de volver
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-volver')) {
                    resultadosContainer.style.display = 'none';
                    selectConjuro.value = '';
                }
            });
        })
        .catch(error => console.error('Error cargando los conjuros:', error));
    
    // Función para mostrar la ficha completa del conjuro (igual que en espiritual.js)
    function mostrarFichaConjuro(conjuro) {
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
                    <p>${conjuro.Description ? conjuro.Description.replace(/\n/g, '<br>') : 'No hay descripción disponible.'}</p>
                </div>
                
                <button class="btn-volver">Volver a la lista</button>
            </div>
        `;
    }
}

if (document.readyState === 'complete') {
    initRunica();
} else {
    document.addEventListener('DOMContentLoaded', initRunica);
}