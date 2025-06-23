function initGrupo() {
    console.log('Inicializando Grupo...');

    const grupoGrid = document.getElementById('npcs-grid'); // Re-using the same grid ID as per HTML
    const resultadosContainer = document.querySelector('.resultados-container');
    const imagenDinamica = document.getElementById('imagen-dinamica');

    // Array con los nombres de los archivos JSON de los personajes del grupo
    const groupFiles = [
        'js/secciones/personajes/grupo/borngold.json'
        // Añade más archivos aquí si tienes más personajes
    ];

    // Cargar todos los personajes del grupo
    Promise.all(groupFiles.map(file =>
        fetch(file).then(response => response.json())
    ))
    .then(groupMembers => {
        mostrarGrupo(groupMembers);

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-volver')) {
                resultadosContainer.style.display = 'none';
                grupoGrid.style.display = 'grid';
                imagenDinamica.src = './imagenes/npc.webp'; // Default image for the group section
                imagenDinamica.alt = 'Personajes No Jugadores'; // Alt text needs to be updated or removed
            } else if (e.target.classList.contains('btn-guardar')) {
                guardarCambios();
            }
        });
    })
    .catch(error => console.error('Error cargando Personajes del Grupo:', error));

    function mostrarGrupo(groupMembers) {
        grupoGrid.innerHTML = '';

        groupMembers.forEach(member => {
            const opcionGrupo = document.createElement('div');
            opcionGrupo.className = 'opcion-npc'; // Re-using NPC class for styling

            const avatar = document.createElement('div');
            avatar.className = 'npc-avatar'; // Re-using NPC class for styling
            avatar.innerHTML = `<img src="${member.datosPersonales.imagen || './imagenes/npc.webp'}" alt="${member.nombre}">`;

            const info = document.createElement('div');
            info.className = 'npc-info'; // Re-using NPC class for styling
            info.innerHTML = `<h3>${member.nombre}</h3>`;

            opcionGrupo.appendChild(avatar);
            opcionGrupo.appendChild(info);

            opcionGrupo.addEventListener('click', () => {
                mostrarFichaGrupo(member);
                imagenDinamica.src = member.datosPersonales.imagen || './imagenes/npc.webp';
                imagenDinamica.alt = member.nombre;
            });

            grupoGrid.appendChild(opcionGrupo);
        });
    }

    function mostrarFichaGrupo(member) {
        grupoGrid.style.display = 'none';
        resultadosContainer.style.display = 'block';

        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-npc">
                <h2 id="nombre-personaje" contenteditable="true">${member.nombre}</h2>

                <div class="tabs">
                    <button class="tab-btn active" data-tab="datos-personales">Datos Personales</button>
                    <button class="tab-btn" data-tab="caracteristicas">Características</button>
                    <button class="tab-btn" data-tab="combate">Combate</button>
                    <button class="tab-btn" data-tab="habilidades">Habilidades</button>
                    <button class="tab-btn" data-tab="magia">Magia</button>
                    <button class="tab-btn" data-tab="inventario">Inventario</button>
                </div>

                <div class="tab-content active" id="datos-personales">
                    ${generarDatosPersonales(member.datosPersonales)}
                </div>

                <div class="tab-content" id="caracteristicas">
                    ${generarCaracteristicas(member.caracteristicas, member.puntosRuna, member.runasElementales, member.runasDePoder, member.pasiones, member.cultos)}
                </div>

                <div class="tab-content" id="combate">
                    ${generarCombate(member.localizacionesGolpe, member.armasEquipadas, member.combateEspiritual, member.notasCombate)}
                </div>

                <div class="tab-content" id="habilidades">
                    ${generarHabilidades(member.habilidades)}
                </div>

                <div class="tab-content" id="magia">
                    ${generarMagia(member.magia, member.notasMagia)}
                </div>

                <div class="tab-content" id="inventario">
                    ${generarInventario(member.inventario)}
                </div>

                <button class="btn-guardar btn-magia">Guardar Cambios</button>
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

        // Add event listeners for runas de poder after content is rendered
        document.querySelectorAll('.runa-poder-valor span[contenteditable="true"]').forEach(span => {
            span.addEventListener('input', (e) => {
                let editedValue = parseInt(e.target.innerText) || 0;
                // Clamp value between 0 and 100
                if (editedValue < 0) editedValue = 0;
                if (editedValue > 100) editedValue = 100;
                e.target.innerText = editedValue; // Update the displayed value

                const field = e.target.getAttribute('data-field');
                const pathParts = field.split('.'); // e.g., ['runasDePoder', 'hombre', 'valor']
                const currentRuneName = pathParts[1]; // 'hombre'

                // Find the other rune in the pair from the member's data structure
                let partnerRuneName = null;
                for (const runeKey in member.runasDePoder) {
                    if (runeKey === currentRuneName) {
                        partnerRuneName = member.runasDePoder[runeKey].pareja;
                        break;
                    }
                }

                if (partnerRuneName) {
                    const partnerSpan = document.querySelector(`span[data-field="runasDePoder.${partnerRuneName}.valor"]`);
                    if (partnerSpan) {
                        const newPartnerValue = 100 - editedValue;
                        partnerSpan.innerText = newPartnerValue;
                    }
                }
            });
        });
    }

    function formatKey(key) {
        // Specific keys that should not be automatically formatted
        const noFormatKeys = ['FUE', 'CON', 'TAM', 'DES', 'INT', 'POD', 'CAR', 'AP', 'HP', 'Enc', 'Rango', 'Tasa', 'Parada'];

        if (noFormatKeys.includes(key)) {
            return key;
        }

        // Custom replacements for specific keys
        switch (key) {
            case 'anoNacimiento': return 'Año Nacimiento';
            case 'ocupacion': return 'Ocupación';
            case 'genero': return 'Género';
            case 'estandarVida': return 'Estándar de Vida';
            case 'ingresoBase': return 'Ingreso Base';
            case 'campana': return 'Campaña';
            case 'bonoDanio': return 'Bono Daño';
            case 'tasaCuracion_semana': return 'Tasa Curación (semana)';
            case 'actualEncumbrancia': return 'Encumbrancia Actual';
            case 'maximoEncumbrancia': return 'Encumbrancia Máxima';
            case 'actual': return 'Actual';
            case 'maximo': return 'Máximo';
            case 'valor': return 'Valor';
            case 'danio': return 'Daño';
            case 'SR_TAM': return 'MR TAM';
            case 'SR_DES': return 'MR DES';
            case 'hombre': return 'Hombre';
            case 'bestia': return 'Bestia';
            case 'fertilidad': return 'Fertilidad';
            case 'muerte': return 'Muerte';
            case 'armonia': return 'Armonía';
            case 'desorden': return 'Desorden';
            case 'verdad': return 'Verdad';
            case 'ilusion': return 'Ilusión';
            case 'inmovilidad': return 'Inmovilidad';
            case 'movimiento': return 'Movimiento';
            default:
                // Capitalize first letter and add spaces before capital letters
                return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        }
    }

    function generarDatosPersonales(datos) {
        let html = `<h3>Datos Personales</h3><div class="caracteristicas-grid">`;
        for (const key in datos) {
            if (key !== "imagen") { // Exclude image from direct editing as it's handled by avatar
                html += `<div class="caracteristica"><strong>${formatKey(key)}:</strong> <span contenteditable="true" data-field="datosPersonales.${key}">${datos[key]}</span></div>`;
            }
        }
        html += `</div>`;
        return html;
    }

    function generarCaracteristicas(caracteristicas, puntosRuna, runasElementales, runasDePoder, pasiones, cultos) {
        let html = `
            <h3>Características Principales</h3>
            <div class="caracteristicas-grid">
                ${Object.entries(caracteristicas).map(([key, value]) => `
                    <div class="caracteristica">
                        <strong>${formatKey(key)}:</strong> <span contenteditable="true" data-field="caracteristicas.${key}">${value}</span>
                    </div>
                `).join('')}
            </div>

            <h3>Puntos de Runa</h3>
            <div class="caracteristicas-grid">
                <div class="caracteristica">
                    <strong>${formatKey('actual')}:</strong> <span contenteditable="true" data-field="puntosRuna.actual">${puntosRuna.actual}</span>
                </div>
                <div class="caracteristica">
                    <strong>${formatKey('maximo')}:</strong> <span contenteditable="true" data-field="puntosRuna.maximo">${puntosRuna.maximo}</span>
                </div>
            </div>

            <h3>Runas Elementales</h3>
            <div class="runas-grid">
                ${Object.entries(runasElementales).map(([runa, valor]) => `
                    <div class="runa">
                        <strong>${formatKey(runa)}:</strong> <span contenteditable="true" data-field="runasElementales.${runa}">${valor}</span>
                    </div>
                `).join('')}
            </div>

            <h3>Runas de Poder</h3>
            <div class="runas-grid">
                ${(function() {
                    const renderedPairs = new Set();
                    return Object.entries(runasDePoder).map(([runaKey, runaData]) => {
                        // Check if this rune has a defined pair and if this pair has already been rendered
                        if (runaData.pareja && !renderedPairs.has(runaKey) && !renderedPairs.has(runaData.pareja)) {
                            const primaryRune = runaKey;
                            const secondaryRune = runaData.pareja;

                            // Mark both runes in the pair as rendered
                            renderedPairs.add(primaryRune);
                            renderedPairs.add(secondaryRune);

                            // Retrieve values for both runes
                            const primaryValue = runasDePoder[primaryRune].valor;
                            const secondaryValue = runasDePoder[secondaryRune].valor;

                            return `
                                <div class="runa">
                                    <div class="runa-poder-par">
                                        <div class="runa-poder-valor">
                                            <strong>${formatKey(primaryRune)}:</strong> <span contenteditable="true" data-field="runasDePoder.${primaryRune}.valor">${primaryValue}</span>
                                        </div>
                                        <div class="runa-poder-valor">
                                            <strong>${formatKey(secondaryRune)}:</strong> <span contenteditable="true" data-field="runasDePoder.${secondaryRune}.valor">${secondaryValue}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (!runaData.pareja && !renderedPairs.has(runaKey)) {
                            // Handle single runes that don't have a pair defined
                            renderedPairs.add(runaKey);
                             return `
                                <div class="runa">
                                    <div class="runa-poder-par">
                                        <div class="runa-poder-valor">
                                            <strong>${formatKey(runaKey)}:</strong> <span contenteditable="true" data-field="runasDePoder.${runaKey}.valor">${runaData.valor}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        return ''; // Skip if already rendered as part of a pair or no pair and already rendered
                    }).join('')
                })()}
            </div>

            <h3>Pasiones</h3>
            <div class="pasiones-grid">
                ${pasiones.map((pasion, index) => `
                    <div class="pasion">
                        <strong>Nombre:</strong> <span contenteditable="true" data-field="pasiones.${index}.nombre">${pasion.nombre}</span><br>
                        <strong>Valor:</strong> <span contenteditable="true" data-field="pasiones.${index}.valor">${pasion.valor}</span>
                    </div>
                `).join('')}
            </div>

            <h3>Cultos</h3>
            <div class="caracteristicas-grid">
                ${cultos.map((culto, index) => `
                    <div class="caracteristica">
                        <strong>Nombre:</strong> <span contenteditable="true" data-field="cultos.${index}.nombre">${culto.nombre}</span><br>
                        <strong>Rango:</strong> <span contenteditable="true" data-field="cultos.${index}.rango">${culto.rango}</span>
                    </div>
                `).join('')}
            </div>
        `;
        return html;
    }

    function generarCombate(localizacionesGolpe, armasEquipadas, combateEspiritual, notasCombate) {
        let html = `
            <h3>Localizaciones de Golpe</h3>
            <table class="tabla-localizaciones">
                <tr>
                    <th>Zona</th>
                    <th>AP</th>
                    <th>HP</th>
                </tr>
                ${Object.entries(localizacionesGolpe).map(([zona, valores]) => `
                    <tr>
                        <td>${zona.charAt(0).toUpperCase() + zona.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                        <td><span contenteditable="true" data-field="localizacionesGolpe.${zona}.AP">${valores.AP}</span></td>
                        <td><span contenteditable="true" data-field="localizacionesGolpe.${zona}.HP">${valores.HP}</span></td>
                    </tr>
                `).join('')}
            </table>

            <h3>Armas Equipadas (Cuerpo a Cuerpo)</h3>
            <table class="tabla-ataques" id="armasCuerpoACuerpo-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Daño</th>
                        <th>Enc.</th>
                        <th>HP</th>
                        <th>MR</th>
                    </tr>
                </thead>
                <tbody>
                    ${armasEquipadas.cuerpoACuerpo.map((arma, index) => `
                        <tr>
                            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.${index}.nombre">${arma.nombre}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.${index}.danio">${arma.danio}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.${index}.enc">${arma.enc !== null ? arma.enc : ''}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.${index}.hp">${arma.hp !== null ? arma.hp : ''}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.${index}.sr">${arma.sr !== null ? arma.sr : ''}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button onclick="agregarArmaCuerpoACuerpo()" class="btn-magia">Añadir Arma C/C</button>


            <h3>Armas Equipadas (Proyectil)</h3>
            <table class="tabla-ataques" id="armasProyectil-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Daño</th>
                        <th>Enc.</th>
                        <th>HP</th>
                        <th>Rango</th>
                        <th>Tasa</th>
                    </tr>
                </thead>
                <tbody>
                    ${armasEquipadas.proyectil.map((arma, index) => `
                        <tr>
                            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.${index}.nombre">${arma.nombre}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.${index}.danio">${arma.danio}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.${index}.enc">${arma.enc !== null ? arma.enc : ''}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.${index}.hp">${arma.hp !== null ? arma.hp : ''}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.${index}.rango">${arma.rango}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.${index}.tasa">${arma.tasa}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button onclick="agregarArmaProyectil()" class="btn-magia">Añadir Arma Proyectil</button>

            <h3>Escudos</h3>
            <table class="tabla-ataques" id="escudos-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>AP</th>
                        <th>Parada</th>
                    </tr>
                </thead>
                <tbody>
                    ${armasEquipadas.escudos.map((escudo, index) => `
                        <tr>
                            <td><span contenteditable="true" data-field="armasEquipadas.escudos.${index}.nombre">${escudo.nombre}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.escudos.${index}.AP">${escudo.AP !== null ? escudo.AP : ''}</span></td>
                            <td><span contenteditable="true" data-field="armasEquipadas.escudos.${index}.parada">${escudo.parada !== null ? escudo.parada : ''}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button onclick="agregarEscudo()" class="btn-magia">Añadir Escudo</button>

            <h3>Combate Espiritual</h3>
            <div class="caracteristicas-grid">
                <div class="caracteristica">
                    <strong>${formatKey('valor')}:</strong> <span contenteditable="true" data-field="combateEspiritual.valor">${combateEspiritual.valor}</span>
                </div>
                <div class="caracteristica">
                    <strong>${formatKey('danio')}:</strong> <span contenteditable="true" data-field="combateEspiritual.danio">${combateEspiritual.danio}</span>
                </div>
            </div>

            <p><strong>Notas de Combate:</strong> <span contenteditable="true" data-field="notasCombate">${notasCombate}</span></p>
        `;
        return html;
    }

    function generarHabilidades(habilidades) {
        let html = '';
        for (const categoria in habilidades) {
            html += `<h3>${categoria.charAt(0).toUpperCase() + categoria.slice(1).replace(/([A-Z])/g, ' $1')}</h3><div class="habilidades-grid">`;
            for (const habilidad in habilidades[categoria].habilidades) {
                html += `<div class="habilidad"><strong>${habilidad.charAt(0).toUpperCase() + habilidad.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> <span contenteditable="true" data-field="habilidades.${categoria}.habilidades.${habilidad}">${habilidades[categoria].habilidades[habilidad]}</span></div>`;
            }
            html += `</div>`;
        }
        return html;
    }

    function generarMagia(magia, notasMagia) {
        let html = `
            <h3>Magia Espiritual</h3>
            <div class="magia-grid" id="magiaEspiritual-grid">
                ${magia.magiaEspiritual.map((hechizo, index) => `
                    <div class="hechizo">
                        <span contenteditable="true" data-field="magia.magiaEspiritual.${index}">${hechizo}</span>
                    </div>
                `).join('')}
            </div>
            <button onclick="agregarMagiaEspiritual()" class="btn-magia">Añadir Magia Espiritual</button>

            <h3>Magia Rúnica</h3>
            <div class="magia-grid" id="magiaRunica-grid">
                ${magia.magiaRunica.map((hechizo, index) => `
                    <div class="hechizo">
                        <span contenteditable="true" data-field="magia.magiaRunica.${index}">${hechizo}</span>
                    </div>
                `).join('')}
            </div>
            <button onclick="agregarMagiaRunica()" class="btn-magia">Añadir Magia Rúnica</button>

            <h3>Puntos de Magia</h3>
            <div class="caracteristicas-grid">
                <div class="caracteristica">
                    <strong>${formatKey('actual')}:</strong> <span contenteditable="true" data-field="magia.puntosMagia.actual">${magia.puntosMagia.actual}</span>
                </div>
                <div class="caracteristica">
                    <strong>${formatKey('maximo')}:</strong> <span contenteditable="true" data-field="magia.puntosMagia.maximo">${magia.puntosMagia.maximo}</span>
                </div>
            </div>

            <p><strong>Notas de Magia:</strong> <span contenteditable="true" data-field="notasMagia">${notasMagia}</span></p>
        `;
        return html;
    }

    function generarInventario(inventario) {
        let html = `
            <h3>Encumbrancia</h3>
            <div class="caracteristicas-grid">
                <div class="caracteristica">
                    <strong>${formatKey('maximoEncumbrancia')}:</strong> <span contenteditable="true" data-field="inventario.maximoEncumbrancia">${inventario.maximoEncumbrancia}</span>
                </div>
                <div class="caracteristica">
                    <strong>${formatKey('actualEncumbrancia')}:</strong> <span contenteditable="true" data-field="inventario.actualEncumbrancia">${inventario.actualEncumbrancia}</span>
                </div>
            </div>

            <h3>Equipo</h3>
            <ul id="equipo-list">
                ${inventario.equipo.map((item, index) => `
                    <li><span contenteditable="true" data-field="inventario.equipo.${index}">${item}</span></li>
                `).join('')}
            </ul>
            <button onclick="agregarItemInventario()" class="btn-magia">Añadir Objeto</button>

            <h3>Tesoro</h3>
            <div class="caracteristicas-grid">
                ${Object.entries(inventario.tesoro).map(([moneda, valor]) => `
                    <div class="caracteristica">
                        <strong>${moneda.charAt(0).toUpperCase() + moneda.slice(1)}:</strong> <span contenteditable="true" data-field="inventario.tesoro.${moneda}">${valor}</span>
                    </div>
                `).join('')}
            </div>

            <h3>Objetos Mágicos</h3>
            <ul id="objetosMagicos-list">
                ${inventario.objetosMagicos.map((item, index) => `
                    <li><span contenteditable="true" data-field="inventario.objetosMagicos.${index}">${item}</span></li>
                `).join('')}
            </ul>
            <button onclick="agregarObjetoMagico()" class="btn-magia">Añadir Objeto Mágico</button>
        `;
        return html;
    }

    // Function to add a new inventory item
    window.agregarItemInventario = function() {
        const ul = document.getElementById('equipo-list');
        const newItem = document.createElement('li');
        // Use a unique identifier for new items, e.g., 'new-0', 'new-1'
        const newIndex = ul.children.length; // Simple index for new items
        newItem.innerHTML = `<span contenteditable="true" data-field="inventario.equipo.new-${newIndex}">Nuevo Objeto</span>`;
        ul.appendChild(newItem);
    };

    // Function to add a new magic item
    window.agregarObjetoMagico = function() {
        const ul = document.getElementById('objetosMagicos-list');
        const newItem = document.createElement('li');
        const newIndex = ul.children.length; // Simple index for new items
        newItem.innerHTML = `<span contenteditable="true" data-field="inventario.objetosMagicos.new-${newIndex}">Nuevo Objeto Mágico</span>`;
        ul.appendChild(newItem);
    };

    // Functions to add new combat entries
    window.agregarArmaCuerpoACuerpo = function() {
        const tbody = document.querySelector('#armasCuerpoACuerpo-table tbody');
        const newRow = document.createElement('tr');
        const newIndex = tbody.children.length;
        newRow.innerHTML = `
            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.new-${newIndex}.nombre">Nueva Arma C/C</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.new-${newIndex}.danio">1D6</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.new-${newIndex}.enc"></span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.new-${newIndex}.hp"></span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.cuerpoACuerpo.new-${newIndex}.sr"></span></td>
        `;
        tbody.appendChild(newRow);
    };

    window.agregarArmaProyectil = function() {
        const tbody = document.querySelector('#armasProyectil-table tbody');
        const newRow = document.createElement('tr');
        const newIndex = tbody.children.length;
        newRow.innerHTML = `
            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.new-${newIndex}.nombre">Nueva Arma Proyectil</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.new-${newIndex}.danio">1D6</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.new-${newIndex}.enc"></span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.new-${newIndex}.hp"></span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.new-${newIndex}.rango">10/20</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.proyectil.new-${newIndex}.tasa">1</span></td>
        `;
        tbody.appendChild(newRow);
    };

    window.agregarEscudo = function() {
        const tbody = document.querySelector('#escudos-table tbody');
        const newRow = document.createElement('tr');
        const newIndex = tbody.children.length;
        newRow.innerHTML = `
            <td><span contenteditable="true" data-field="armasEquipadas.escudos.new-${newIndex}.nombre">Nuevo Escudo</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.escudos.new-${newIndex}.AP">2</span></td>
            <td><span contenteditable="true" data-field="armasEquipadas.escudos.new-${newIndex}.parada">50%</span></td>
        `;
        tbody.appendChild(newRow);
    };

    // Functions to add new magic entries
    window.agregarMagiaEspiritual = function() {
        const grid = document.getElementById('magiaEspiritual-grid');
        const newHechizo = document.createElement('div');
        newHechizo.className = 'hechizo';
        const newIndex = grid.children.length;
        newHechizo.innerHTML = `<span contenteditable="true" data-field="magia.magiaEspiritual.new-${newIndex}">Nuevo Hechizo Espiritual</span>`;
        grid.appendChild(newHechizo);
    };

    window.agregarMagiaRunica = function() {
        const grid = document.getElementById('magiaRunica-grid');
        const newHechizo = document.createElement('div');
        newHechizo.className = 'hechizo';
        const newIndex = grid.children.length;
        newHechizo.innerHTML = `<span contenteditable="true" data-field="magia.magiaRunica.new-${newIndex}">Nuevo Hechizo Rúnico</span>`;
        grid.appendChild(newHechizo);
    };


    function guardarCambios() {
        const updatedData = {};
        const currentMemberName = document.getElementById('nombre-personaje').innerText;
        let originalMember = null;

        // Find the original data for the currently displayed character
        Promise.all(groupFiles.map(file => fetch(file).then(response => response.json())))
            .then(allMembers => {
                originalMember = allMembers.find(member => member.nombre === currentMemberName);
                processSave();
            })
            .catch(error => console.error("Error fetching original character data for saving:", error));

        function processSave() {
            if (!originalMember) {
                console.error("Original character data not found for saving.");
                return;
            }

            // Create a deep copy of the original member data to work with
            const finalData = JSON.parse(JSON.stringify(originalMember));

            // Update the top-level name if it was edited
            const editedNameElement = document.getElementById('nombre-personaje');
            if (editedNameElement) {
                finalData.nombre = editedNameElement.innerText;
            }

            // Remove 'sinUsar' from puntosMagia if it exists in finalData (legacy key)
            if (finalData.magia && finalData.magia.puntosMagia && 'sinUsar' in finalData.magia.puntosMagia) {
                delete finalData.magia.puntosMagia.sinUsar;
            }

            // Iterate over all editable fields to update existing data and collect new simple array items
            document.querySelectorAll('[contenteditable="true"][data-field]').forEach(span => {
                const path = span.getAttribute('data-field').split('.');
                let currentTarget = finalData;

                // Handle 'new-N' items separately for arrays of primitives
                if (path[path.length - 2] && path[path.length - 2].startsWith('new-')) { // Example: inventario.equipo.new-0
                     // This is a new item in a simple array (like equipo, objetosMagicos, spiritual/runic magic)
                    // We'll collect these at the end, so skip processing here for now.
                    return;
                }

                if (path[path.length - 1].startsWith('new-')) { // Example: armasEquipadas.cuerpoACuerpo.new-0.nombre
                    // This is a property of a new object in an array (like a new weapon/shield)
                    // We'll collect these at the end, so skip processing here for now.
                    return;
                }


                for (let i = 0; i < path.length; i++) {
                    const key = path[i];
                    if (i === path.length - 1) {
                        // This is the actual value to update
                        if (Array.isArray(currentTarget) && !isNaN(key)) { // If it's an array and key is an index
                            currentTarget[parseInt(key)] = isNaN(span.innerText) ? span.innerText : Number(span.innerText);
                        } else {
                            // Special handling for runasDePoder to ensure values are numbers
                            if (path[0] === 'runasDePoder' && key === 'valor') {
                                currentTarget[key] = Number(span.innerText);
                            } else {
                                currentTarget[key] = isNaN(span.innerText) ? span.innerText : Number(span.innerText);
                            }
                        }
                    } else {
                        if (isNaN(key)) { // Object property
                            if (!currentTarget[key]) currentTarget[key] = {};
                            currentTarget = currentTarget[key];
                        } else { // Array index
                            const index = parseInt(key);
                            if (!Array.isArray(currentTarget)) currentTarget = [];
                            if (!currentTarget[index]) { // Ensure array element exists
                                if (originalMember && originalMember[path[0]] && Array.isArray(originalMember[path[0]]) && originalMember[path[0]][index] && typeof originalMember[path[0]][index] === 'object') {
                                    currentTarget[index] = {}; // Initialize as object if original was object
                                } else {
                                     // This case is already covered by the new-N checks at the top, or it's an existing simple array element
                                }
                            }
                            currentTarget = currentTarget[index];
                        }
                    }
                }
            });

            // --- Special handling for new items added by buttons ---

            // New Inventory Items
            document.querySelectorAll('#equipo-list li span[data-field^="inventario.equipo.new-"]').forEach(span => {
                const newItemText = span.innerText.trim();
                if (newItemText && !finalData.inventario.equipo.includes(newItemText)) {
                    finalData.inventario.equipo.push(newItemText);
                }
            });

            // New Magic Objects
            document.querySelectorAll('#objetosMagicos-list li span[data-field^="inventario.objetosMagicos.new-"]').forEach(span => {
                const newItemText = span.innerText.trim();
                if (newItemText && !finalData.inventario.objetosMagicos.includes(newItemText)) {
                    finalData.inventario.objetosMagicos.push(newItemText);
                }
            });

            // New Melee Weapons
            document.querySelectorAll('#armasCuerpoACuerpo-table tbody tr').forEach(row => {
                const newWeaponFields = Array.from(row.querySelectorAll('span[data-field^="armasEquipadas.cuerpoACuerpo.new-"]'));
                if (newWeaponFields.length > 0) {
                    const newWeapon = {};
                    newWeaponFields.forEach(span => {
                        const propertyName = span.getAttribute('data-field').split('.').pop();
                        newWeapon[propertyName] = isNaN(span.innerText) ? span.innerText.trim() : Number(span.innerText);
                    });
                    const weaponName = newWeapon.nombre.trim();
                    if (weaponName) { // Only add if name is not empty
                        // Check if a weapon with the same name already exists in the original data or newly added
                        const exists = originalMember.armasEquipadas.cuerpoACuerpo.some(arma => arma.nombre === weaponName) ||
                                       finalData.armasEquipadas.cuerpoACuerpo.some(arma => arma.nombre === weaponName);

                        if (!exists || weaponName === "Nueva Arma C/C") { // Allow adding "Nueva Arma C/C" multiple times, but prefer unique names
                            finalData.armasEquipadas.cuerpoACuerpo.push(newWeapon);
                        }
                    }
                }
            });

            // New Projectile Weapons
            document.querySelectorAll('#armasProyectil-table tbody tr').forEach(row => {
                const newWeaponFields = Array.from(row.querySelectorAll('span[data-field^="armasEquipadas.proyectil.new-"]'));
                if (newWeaponFields.length > 0) {
                    const newWeapon = {};
                    newWeaponFields.forEach(span => {
                        const propertyName = span.getAttribute('data-field').split('.').pop();
                        newWeapon[propertyName] = isNaN(span.innerText) ? span.innerText.trim() : Number(span.innerText);
                    });
                    const weaponName = newWeapon.nombre.trim();
                    if (weaponName) {
                        const exists = originalMember.armasEquipadas.proyectil.some(arma => arma.nombre === weaponName) ||
                                       finalData.armasEquipadas.proyectil.some(arma => arma.nombre === weaponName);
                        if (!exists || weaponName === "Nueva Arma Proyectil") {
                            finalData.armasEquipadas.proyectil.push(newWeapon);
                        }
                    }
                }
            });

            // New Shields
            document.querySelectorAll('#escudos-table tbody tr').forEach(row => {
                const newShieldFields = Array.from(row.querySelectorAll('span[data-field^="armasEquipadas.escudos.new-"]'));
                if (newShieldFields.length > 0) {
                    const newShield = {};
                    newShieldFields.forEach(span => {
                        const propertyName = span.getAttribute('data-field').split('.').pop();
                        newShield[propertyName] = isNaN(span.innerText) ? span.innerText.trim() : Number(span.innerText);
                    });
                    const shieldName = newShield.nombre.trim();
                    if (shieldName) {
                        const exists = originalMember.armasEquipadas.escudos.some(escudo => escudo.nombre === shieldName) ||
                                       finalData.armasEquipadas.escudos.some(escudo => escudo.nombre === shieldName);
                        if (!exists || shieldName === "Nuevo Escudo") {
                            finalData.armasEquipadas.escudos.push(newShield);
                        }
                    }
                }
            });

            // New Spiritual Magic Spells
            document.querySelectorAll('#magiaEspiritual-grid .hechizo span[data-field^="magia.magiaEspiritual.new-"]').forEach(span => {
                const newSpellText = span.innerText.trim();
                if (newSpellText && !finalData.magia.magiaEspiritual.includes(newSpellText)) {
                    finalData.magia.magiaEspiritual.push(newSpellText);
                }
            });

            // New Runic Magic Spells
            document.querySelectorAll('#magiaRunica-grid .hechizo span[data-field^="magia.magiaRunica.new-"]').forEach(span => {
                const newSpellText = span.innerText.trim();
                if (newSpellText && !finalData.magia.magiaRunica.includes(newSpellText)) {
                    finalData.magia.magiaRunica.push(newSpellText);
                }
            });

            // Construct the path to the original JSON file based on the character's name
            const fileName = `${finalData.nombre.toLowerCase().replace(/ /g, '')}.json`;

            // Simulate saving by logging the JSON and offering a download
            console.log("Datos a guardar:", finalData);

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(finalData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", fileName);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }
    }

    // Helper function for deep merging objects - this is now less critical as direct manipulation is done
    // but kept for any other potential deep merge needs.
    function mergeDeep(target, source) {
        const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    mergeDeep(target[key], source[key]);
                } else if (Array.isArray(source[key])) {
                    target[key] = source[key];
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return target;
    }
}

if (document.readyState === 'complete') {
    initGrupo();
} else {
    document.addEventListener('DOMContentLoaded', initGrupo);
}