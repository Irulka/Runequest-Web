function initObjetosM() {
    console.log('Inicializando Objetos Mágicos...');
    
    const objetosGrid = document.getElementById('objetosm-grid');
    const resultadosContainer = document.querySelector('.resultados-container');
    const imagenDinamica = document.getElementById('imagen-dinamica');
    
    // Array con los nombres de los archivos JSON de los objetos mágicos
    const objetoFiles = [
        'js/secciones/magia/objetosm/het-het.json',
        'js/secciones/magia/objetosm/laudnav.json'
        // Añade más archivos aquí según sea necesario
    ];
    
    // Cargar todos los objetos mágicos
    Promise.all(objetoFiles.map(file => 
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${file}: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Error procesando ${file}:`, error);
                return null; // Continuar con otros archivos incluso si hay errores
            })
    ))
    .then(objetos => {
        // Filtrar objetos nulos (por si hubo errores en la carga)
        const objetosValidos = objetos.filter(objeto => objeto !== null);
        mostrarObjetos(objetosValidos);
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-volver')) {
                resultadosContainer.style.display = 'none';
                objetosGrid.style.display = 'grid';
                imagenDinamica.src = './imagenes/objetosm.webp';
                imagenDinamica.alt = 'Objetos Mágicos';
            }
        });
    })
    .catch(error => console.error('Error cargando Objetos Mágicos:', error));
    
    function mostrarObjetos(objetos) {
        objetosGrid.innerHTML = '';
        
        objetos.forEach(objeto => {
            if (!objeto || !objeto.nombre) return; // Saltar objetos inválidos
            
            const opcionObjeto = document.createElement('div');
            opcionObjeto.className = 'opcion-objeto';
            
            const avatar = document.createElement('div');
            avatar.className = 'objeto-avatar';
            avatar.innerHTML = `<img src="${objeto.imagen || './imagenes/objetosm.webp'}" alt="${objeto.nombre}">`;
            
            const info = document.createElement('div');
            info.className = 'objeto-info';
            info.innerHTML = `<h3>${objeto.nombre}</h3>`;
            
            opcionObjeto.appendChild(avatar);
            opcionObjeto.appendChild(info);
            
            opcionObjeto.addEventListener('click', () => {
                mostrarFichaObjeto(objeto);
                // Cambiar la imagen de la sección por la del objeto
                imagenDinamica.src = objeto.imagen || './imagenes/objetosm.webp';
                imagenDinamica.alt = objeto.nombre;
            });
            
            objetosGrid.appendChild(opcionObjeto);
        });
    }
    
    function mostrarFichaObjeto(objeto) {
        objetosGrid.style.display = 'none';
        resultadosContainer.style.display = 'block';
        
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-objeto">
                <h2>${objeto.nombre}</h2>
                
                <div class="seccion-info">
                    <h3>Descripción</h3>
                    <div class="descripcion-texto">
                        ${objeto.descripcion || 'No hay descripción disponible.'}
                    </div>
                </div>
                
                <div class="seccion-info">
                    <h3>Características</h3>
                    <div class="caracteristicas-grid">
                        ${objeto.propiedades ? Object.entries(objeto.propiedades).map(([key, value]) => `
                            <div class="caracteristica">
                                <strong>${key}:</strong> ${value}
                            </div>
                        `).join('') : '<p>No hay características definidas</p>'}
                    </div>
                </div>
                
                <div class="seccion-info">
                    <h3>Habilidades</h3>
                    <div class="habilidades-lista">
                        ${objeto.efectos && objeto.efectos.length > 0 ? 
                            objeto.efectos.map(efecto => `
                                <div class="habilidad-item">
                                    <div class="habilidad-nombre">${efecto.nombre || 'Efecto mágico'}</div>
                                    <div>${efecto.descripcion || 'Sin descripción disponible.'}</div>
                                </div>
                            `).join('') : 
                            '<p>No hay habilidades mágicas definidas</p>'
                        }
                    </div>
                </div>
                
                <button class="btn-volver">Volver a la lista</button>
            </div>
        `;
    }
}

// Inicialización
if (document.readyState === 'complete') {
    initObjetosM();
} else {
    document.addEventListener('DOMContentLoaded', initObjetosM);
}