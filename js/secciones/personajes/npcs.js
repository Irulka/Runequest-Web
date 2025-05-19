function initNPCs() {
    console.log('Inicializando NPCs...');
    
    const npcsGrid = document.getElementById('npcs-grid');
    const resultadosContainer = document.querySelector('.resultados-container');
    const imagenDinamica = document.getElementById('imagen-dinamica');
    
    // Array con los nombres de los archivos JSON de los NPCs
    const npcFiles = [
        'js/secciones/personajes/npcs/babuino.json',
        'js/secciones/personajes/npcs/trolln.json',
        'js/secciones/personajes/npcs/vasana.json'
        // Añade más archivos aquí
    ];
    
    // Cargar todos los NPCs
    Promise.all(npcFiles.map(file => 
        fetch(file).then(response => response.json())
    ))
    .then(npcs => {
        mostrarNPCs(npcs);
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-volver')) {
                resultadosContainer.style.display = 'none';
                npcsGrid.style.display = 'grid';
                imagenDinamica.src = './imagenes/npc.png';
                imagenDinamica.alt = 'Personajes No Jugadores';
            }
        });
    })
    .catch(error => console.error('Error cargando NPCs:', error));
    
    function mostrarNPCs(npcs) {
        npcsGrid.innerHTML = '';
        
        npcs.forEach(npc => {
            const opcionNPC = document.createElement('div');
            opcionNPC.className = 'opcion-npc';
            
            const avatar = document.createElement('div');
            avatar.className = 'npc-avatar';
            avatar.innerHTML = `<img src="${npc.imagen || './imagenes/npc.png'}" alt="${npc.nombre}">`;
            
            const info = document.createElement('div');
            info.className = 'npc-info';
            info.innerHTML = `<h3>${npc.nombre}</h3>`;
            
            opcionNPC.appendChild(avatar);
            opcionNPC.appendChild(info);
            
            opcionNPC.addEventListener('click', () => {
                mostrarFichaNPC(npc);
                // Cambiar la imagen de la sección por la del NPC
                imagenDinamica.src = npc.imagen || './imagenes/npc.png';
                imagenDinamica.alt = npc.nombre;
            });
            
            npcsGrid.appendChild(opcionNPC);
        });
    }
    
    function mostrarFichaNPC(npc) {
        npcsGrid.style.display = 'none';
        resultadosContainer.style.display = 'block';
        
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-npc">
                <h2>${npc.nombre}</h2>
                
                <div class="tabs">
                    <button class="tab-btn active" data-tab="caracteristicas">Características</button>
                    <button class="tab-btn" data-tab="combate">Combate</button>
                    <button class="tab-btn" data-tab="habilidades">Habilidades</button>
                    <button class="tab-btn" data-tab="magia">Magia</button>
                </div>
                
                <div class="tab-content active" id="caracteristicas">
                    ${generarTablaCaracteristicas(npc)}
                </div>
                
                <div class="tab-content" id="combate">
                    ${generarTablaCombate(npc)}
                </div>
                
                <div class="tab-content" id="habilidades">
                    ${generarTablaHabilidades(npc)}
                </div>
                
                <div class="tab-content" id="magia">
                    ${generarTablaMagia(npc)}
                </div>
                
                <button class="btn-volver">Volver a la lista</button>
            </div>
        `;
        
        // Configurar pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Ocultar todos los contenidos
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Desactivar todos los botones
                document.querySelectorAll('.tab-btn').forEach(tabBtn => {
                    tabBtn.classList.remove('active');
                });
                
                // Mostrar contenido seleccionado
                document.getElementById(tabId).classList.add('active');
                btn.classList.add('active');
            });
        });
    }
    
    function generarTablaCaracteristicas(npc) {
        return `
            <h3>Características Principales</h3>
            <div class="caracteristicas-grid">
                ${Object.entries(npc.caracteristicas).map(([key, value]) => `
                    <div class="caracteristica">
                        <strong>${key}:</strong> ${value}
                    </div>
                `).join('')}
            </div>
            
            <h3>Runas</h3>
            <div class="runas-grid">
                ${Object.entries(npc.runas).map(([runa, valor]) => `
                    <div class="runa">
                        <strong>${runa}:</strong> ${valor}
                    </div>
                `).join('')}
            </div>
            
            <h3>Pasiones</h3>
            <div class="pasiones-grid">
                ${Object.entries(npc.pasiones).map(([pasion, valor]) => `
                    <div class="pasion">
                        <strong>${pasion}:</strong> ${valor}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    function generarTablaCombate(npc) {
        return `
            <h3>Ataques</h3>
            <table class="tabla-ataques">
                <tr>
                    <th>Arma</th>
                    <th>%</th>
                    <th>Daño</th>
                    <th>MR</th>
                    ${npc.ataques.some(a => a.Prs) ? '<th>Prs</th>' : ''}
                </tr>
                ${npc.ataques.map(ataque => `
                    <tr>
                        <td>${ataque.arma}</td>
                        <td>${ataque['%']}</td>
                        <td>${ataque.daño}</td>
                        <td>${ataque.MR}</td>
                        ${ataque.Prs ? `<td>${ataque.Prs}</td>` : ''}
                    </tr>
                `).join('')}
            </table>
            
            <h3>Localizaciones</h3>
            <table class="tabla-localizaciones">
                <tr>
                    <th>Zona</th>
                    <th>D20</th>
                    <th>Armadura/HP</th>
                </tr>
                ${npc.localizaciones.map(loc => `
                    <tr>
                        <td>${loc.zona}</td>
                        <td>${loc.d20}</td>
                        <td>${loc['armadura/HP']}</td>
                    </tr>
                `).join('')}
            </table>
            
            <p><strong>Notas de Combate:</strong> ${npc.combate}</p>
            <p><strong>Armadura:</strong> ${npc.armadura}</p>
        `;
    }
    
    function generarTablaHabilidades(npc) {
        return `
            <div class="habilidades-grid">
                ${Object.entries(npc.habilidades).map(([habilidad, valor]) => `
                    <div class="habilidad">
                        <strong>${habilidad}:</strong> ${valor}
                    </div>
                `).join('')}
            </div>
            
            <h3>Idiomas</h3>
            <div class="idiomas-grid">
                ${Object.entries(npc.idiomas).map(([idioma, valor]) => `
                    <div class="idioma">
                        <strong>${idioma}:</strong> ${valor}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    function generarTablaMagia(npc) {
        return `
            <div class="magia-grid">
                ${Object.entries(npc.magia).map(([hechizo, valor]) => `
                    <div class="hechizo">
                        <strong>${hechizo}:</strong> ${valor}
                    </div>
                `).join('')}
            </div>
            
            <p><strong>Puntos de Magia:</strong> ${npc.caracteristicas['Puntos de Magia']}</p>
        `;
    }
}

if (document.readyState === 'complete') {
    initNPCs();
} else {
    document.addEventListener('DOMContentLoaded', initNPCs);
}