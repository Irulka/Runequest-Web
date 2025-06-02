// Inicialización del bestiario de animales
function initAnimales() {
    console.log('Inicializando Bestiario de Animales...');
    
    // Elementos de la interfaz
    const selectAnimal = document.getElementById('animal');
    const resultadosContainer = document.getElementById('resultados-container');
    
    // Lista de animales disponibles
    const animalesLista = [
        { nombre: "Alce", archivo: "animales/alce.json" },   
        { nombre: "Bisonte", archivo: "animales/bisonte.json" },            
        { nombre: "Caballo", archivo: "animales/caballo.json" },              
        { nombre: "Ciervo de cola Negra", archivo: "animales/ciervo.json" },
        { nombre: "Cocodrilo", archivo: "animales/coco.json" },
        { nombre: "Cocodrilo Gigante", archivo: "animales/cocogi.json" },
        { nombre: "Gran Condor", archivo: "animales/condor.json" },        
        { nombre: "Grulla Gigante", archivo: "animales/grulla.json" },
        { nombre: "Hiena", archivo: "animales/hiena.json" },  
        { nombre: "Hombre de Rebaño", archivo: "animales/hombre.json" },          
        { nombre: "Lagarto Bolo", archivo: "animales/lagartobolo.json" },           
        { nombre: "León", archivo: "animales/leon.json" },    
        { nombre: "Loper", archivo: "animales/loper.json" }, 
        { nombre: "Mamut Lanudo", archivo: "animales/mamut.json" },  
        { nombre: "Mastodonte", archivo: "animales/masto.json" },                              
        { nombre: "Oso Negro", archivo: "animales/osonegro.json" },
        { nombre: "Oso Marrón", archivo: "animales/osomarron.json" },
        { nombre: "Oso Blanco", archivo: "animales/osoblanco.json" },
        { nombre: "Oso Saltarín", archivo: "animales/ososalta.json" },        
        { nombre: "Pájaro de Sangre", archivo: "animales/bloodbird.json" },
        { nombre: "Perro Cerdo", archivo: "animales/perrocerdo.json" },        
        { nombre: "Perro de Caza", archivo: "animales/perroca.json" },          
        { nombre: "Perro de Pelea", archivo: "animales/perrop.json" },        
        { nombre: "Buey", archivo: "animales/toro.json" },
    ].sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Llenar el select con los animales
    animalesLista.forEach(animal => {
        const option = document.createElement('option');
        option.value = animal.archivo;
        option.textContent = animal.nombre;
        selectAnimal.appendChild(option);
    });
    
    // Configurar evento para el select
    selectAnimal.addEventListener('change', function() {
        const archivoSeleccionado = this.value;
        
        if (!archivoSeleccionado) {
            resultadosContainer.style.display = 'none';
            return;
        }
        
        // Cargar el archivo específico del animal
        fetch(`../js/secciones/bestiario/${archivoSeleccionado}`)
            .then(response => {
                if (!response.ok) throw new Error('Animal no encontrado');
                return response.json();
            })
            .then(animal => {
                mostrarFichaAnimal(animal);
            })
            .catch(error => {
                console.error('Error cargando el animal:', error);
                mostrarError();
            });
    });
    
    // Configurar evento para el botón de volver
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-animal')) {
            resultadosContainer.style.display = 'none';
            selectAnimal.value = '';
        }
    });

    // Función para variar porcentajes ±25% con límites de 10-100%
    function variarPorcentaje(valor) {
    if (typeof valor === 'string' && valor.endsWith('%')) {
        const num = parseInt(valor);
        if (!isNaN(num)) {
            // Variación aleatoria entre -10 y +25
            const variacion = Math.floor(Math.random() * 36) - 10;
            let nuevoValor = num + variacion;
            // Asegurar que esté entre 10% y 100%
            nuevoValor = Math.max(10, Math.min(100, nuevoValor));
            return `${nuevoValor}%`;
        }
    }
    return valor;
}

    // Función para procesar objetos con posibles porcentajes
    function procesarPorcentajes(obj) {
        if (typeof obj === 'string') {
            return variarPorcentaje(obj);
        } else if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                return obj.map(item => procesarPorcentajes(item));
            } else {
                const resultado = {};
                for (const [key, value] of Object.entries(obj)) {
                    resultado[key] = variarPorcentaje(value);
                }
                return resultado;
            }
        }
        return obj;
    }

    // Función para procesar ataques con porcentajes
    function procesarAtaques(ataques) {
        if (!ataques) return ataques;
        return ataques.map(ataque => {
            if (ataque.porcentaje) {
                return {
                    ...ataque,
                    porcentaje: variarPorcentaje(ataque.porcentaje)
                };
            }
            return ataque;
        });
    }

    function mostrarFichaAnimal(animal) {
        resultadosContainer.style.display = 'block';
        
        // Generar características aleatorias
        const caracteristicasGeneradas = {};
        if (animal.caracteristicas) {
            for (const [key, value] of Object.entries(animal.caracteristicas)) {
                caracteristicasGeneradas[key] = tirarDados(value);
            }
        }
        
        // Calcular puntos de vida
        const puntosVida = Math.max(1, animal.puntosVida || calcularPuntosVida(caracteristicasGeneradas));
        const pvLocalizaciones = calcularPVLocalizaciones(animal, puntosVida);
        
        // Calcular modificadores de combate (sin daño espiritual)
        const modCombate = calcularModificadoresCombate(caracteristicasGeneradas);
            
        // Procesar todos los campos con porcentajes
        const habilidadesProcesadas = procesarPorcentajes(animal.habilidades);
        const idiomasProcesados = procesarPorcentajes(animal.idiomas);
        const pasionesProcesadas = procesarPorcentajes(animal.pasiones);
        const runasProcesadas = procesarPorcentajes(animal.runas);
        const ataquesProcesados = procesarAtaques(animal.ataques);
        
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-animal">
                <h2>${animal.nombre}</h2>
                
                <div class="tabs">
                    <button class="tab-btn active" data-tab="caracteristicas">Características</button>
                    <button class="tab-btn" data-tab="combate">Combate</button>
                    <button class="tab-btn" data-tab="habilidades">Habilidades</button>
                </div>
                
                <div class="tab-content active" id="caracteristicas">
                    ${generarTablaCaracteristicas(
                        {...animal, pasiones: pasionesProcesadas, runas: runasProcesadas}, 
                        caracteristicasGeneradas, 
                        puntosVida, 
                        pvLocalizaciones, 
                        modCombate
                    )}
                </div>
                
                <div class="tab-content" id="combate">
                    ${generarTablaCombate({...animal, ataques: ataquesProcesados}, pvLocalizaciones, puntosVida)}
                </div>
                
                <div class="tab-content" id="habilidades">
                    ${generarTablaHabilidades({...animal, habilidades: habilidadesProcesadas, idiomas: idiomasProcesados})}
                </div>
                
                <button class="btn-animal">Volver a la lista</button>
            </div>
        `;
        
        // Configurar pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
                btn.classList.add('active');
            });
        });
    }

    function generarTablaCaracteristicas(animal, caracteristicas, puntosVida, pvLocalizaciones, modCombate) {
        return `
            <div class="descripcion-animal">
                <p>${animal.descripcion || 'No hay descripción disponible.'}</p>
            </div>
            
            <h3>Características Generadas</h3>
            <div class="caracteristicas-grid">
                ${Object.entries(caracteristicas).map(([key, value]) => `
                    <div class="caracteristica">
                        <strong>${key}:</strong> ${value}
                    </div>
                `).join('')}
            </div>
            
            <h3>Atributos</h3>
            <div class="atributos-grid">
                <div class="atributo"><strong>Puntos de Vida:</strong> ${puntosVida}</div>
                <div class="atributo"><strong>Movimiento:</strong> ${animal.movimiento || '-'}</div>
                <div class="atributo"><strong>Mod. Daño:</strong> ${modCombate.modDanio}</div>
                <div class="atributo"><strong>Mod. Tamaño:</strong> ${modCombate.modTamano}</div>
                <div class="atributo"><strong>Mod. Destreza:</strong> ${modCombate.modDestreza}</div>
                <div class="atributo"><strong>Armadura:</strong> ${typeof animal.armadura === 'object' ? 
                    Object.entries(animal.armadura).map(([k,v]) => `${k}: ${v}`).join(', ') : 
                    (animal.armadura || 'Ninguna')}</div>
            </div>
            
            ${animal.runas ? `
            <h3>Runas</h3>
            <div class="runas-grid">
                ${typeof animal.runas === 'string' ? `
                    <div class="runa">${animal.runas}</div>
                ` : Object.entries(animal.runas).map(([runa, valor]) => `
                    <div class="runa"><strong>${runa}:</strong> ${valor}</div>
                `).join('')}
            </div>` : ''}
            
            ${animal.pasiones ? `
            <h3>Pasiones</h3>
            <div class="pasiones-grid">
                ${typeof animal.pasiones === 'string' ? `
                    <div class="pasion">${animal.pasiones}</div>
                ` : Object.entries(animal.pasiones).map(([pasion, valor]) => `
                    <div class="pasion"><strong>${pasion}:</strong> ${valor}</div>
                `).join('')}
            </div>` : ''}
        `;
    }

    function generarTablaCombate(animal, pvLocalizaciones, puntosVida) {
        return `
            <h3>Ataques</h3>
            ${animal.ataques?.length ? `
            <table class="tabla-ataques">
                <tr><th>Nombre</th><th>%</th><th>Daño</th><th>MR</th><th>Efecto</th></tr>
                ${animal.ataques.map(a => `
                    <tr>
                        <td>${a.nombre}</td>
                        <td>${a.porcentaje}</td>
                        <td>${a.daño}</td>
                        <td>${a.MR || '-'}</td>
                        <td>${a.efecto || '-'}</td>
                    </tr>
                `).join('')}
            </table>` : '<p>No tiene ataques definidos</p>'}
            
            <h3>Localizaciones</h3>
            ${pvLocalizaciones?.length ? `
            <table class="tabla-localizaciones">
                <tr><th>Localización</th><th>Rango</th><th>Armadura</th><th>PV</th></tr>
                ${pvLocalizaciones.map(l => `
                    <tr>
                        <td>${l.locacion}</td>
                        <td>${l.rango || '-'}</td>
                        <td>${l.armadura || '0'}</td>
                        <td>${l.pvCalculado || l.pv}</td>
                    </tr>
                `).join('')}
            </table>` : '<p>No tiene localizaciones definidas</p>'}
            
            <div class="atributo">
                <strong>Puntos de Vida:</strong> ${puntosVida}
            </div>
            
            ${animal.habilidadesEspeciales?.length ? `
            <h3>Habilidades Especiales</h3>
            <ul class="habilidades-especiales">
                ${animal.habilidadesEspeciales.map(h => `<li>${h}</li>`).join('')}
            </ul>` : ''}
        `;
    }

    function generarTablaHabilidades(animal) {
        return `
            ${animal.habilidades ? `
            <div class="habilidades-grid">
                ${typeof animal.habilidades === 'string' ? `
                    <div class="habilidad">${animal.habilidades}</div>
                ` : Object.entries(animal.habilidades).map(([h, v]) => `
                    <div class="habilidad"><strong>${h}:</strong> ${v}</div>
                `).join('')}
            </div>` : '<p>No tiene habilidades definidas</p>'}
            
            ${animal.idiomas ? `
            <h3>Idiomas</h3>
            <div class="idiomas-grid">
                ${typeof animal.idiomas === 'string' ? `
                    <div class="idioma">${animal.idiomas}</div>
                ` : Object.entries(animal.idiomas).map(([i, v]) => `
                    <div class="idioma"><strong>${i}:</strong> ${v}</div>
                `).join('')}
            </div>` : ''}
        `;
    }

    function mostrarError() {
        resultadosContainer.style.display = 'block';
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-animal">
                <h3>Error</h3>
                <p>No se pudo cargar la información del animal.</p>
                <button class="btn-animal">Volver a la lista</button>
            </div>
        `;
    }

    function tirarDados(formula) {
        const partes = formula.split(/([+-])/);
        let total = 0;
        
        for (let i = 0; i < partes.length; i++) {
            const parte = partes[i].trim();
            if (parte === '+' || parte === '-') continue;
            
            if (parte.includes('D')) {
                const [cantidad, caras] = parte.split('D');
                const numDados = cantidad ? parseInt(cantidad) : 1;
                const numCaras = parseInt(caras);
                
                for (let j = 0; j < numDados; j++) {
                    total += Math.floor(Math.random() * numCaras) + 1;
                }
            } else if (!isNaN(parte)) {
                const operador = i > 0 ? partes[i-1] : '+';
                total = operador === '+' ? total + parseInt(parte) : total - parseInt(parte);
            }
        }
        
        return total;
    }

    // Función para calcular modificador de característica según RQG (2018)
    function calcularModificador(valor) {
        if (valor <= 4) return -2;
        if (valor <= 8) return -1;
        if (valor <= 12) return 0;
        if (valor <= 16) return +1;
        if (valor <= 20) return +2;
        if (valor <= 24) return +3;
        if (valor <= 28) return +4;
        return Math.floor((valor - 28) / 4) + 4;
    }

    // Cálculo de PV según RQG (2018): CON + modTAM + modPOD con mínimo de 1
    function calcularPuntosVida(caracteristicas) {
        const con = caracteristicas.CON || 10;
        const tam = caracteristicas.TAM || 10;
        const pod = caracteristicas.POD || 0;
        
        const modTAM = calcularModificador(tam);
        const modPOD = calcularModificador(pod);
        
        return Math.max(1, con + modTAM + modPOD);
    }

    // Cálculo de PV por localización, respetando las definidas o usando fórmulas con mínimo de 1
    function calcularPVLocalizaciones(animal, puntosVida) {
        if (!animal.localizaciones) return null;
        
        return animal.localizaciones.map(loc => {
            if (typeof loc.pv === 'number') {
                return { ...loc, pvCalculado: Math.max(1, loc.pv) };
            }
            
            // Procesar fórmulas como "PV/4", "PV/4 + 1", etc.
            if (typeof loc.pv === 'string') {
                let pvCalc;
                try {
                    pvCalc = Math.floor(eval(loc.pv.replace('PV', puntosVida)));
                } catch {
                    pvCalc = Math.floor(puntosVida / 4); // Valor por defecto
                }
                
                // Asegurar mínimo de 1 PV
                return { ...loc, pvCalculado: Math.max(1, pvCalc) };
            }
            
            return loc;
        });
    }

    // Nuevas funciones para calcular modificadores de combate (sin daño espiritual)
    function calcularModificadoresCombate(caracteristicas) {
        const fue = caracteristicas.FUE || 10;
        const tam = caracteristicas.TAM || 10;
        const dex = caracteristicas.DES || 10;
        
        return {
            modDanio: calcularModificadorDanio(fue, tam),
            modTamano: calcularModificadorTamano(tam),
            modDestreza: calcularModificadorDestreza(dex)
        };
    }

    function calcularModificadorDanio(fue, tam) {
        const suma = fue + tam;
        if (suma <= 12) return "-1D4";
        if (suma <= 24) return "Ninguno";
        if (suma <= 32) return "+1D4";
        if (suma <= 40) return "+1D6";
        if (suma <= 56) return "+2D6";
        
        const dadosExtra = Math.floor((suma - 56) / 16);
        return `+${2 + dadosExtra}D6`;
    }

    function calcularModificadorTamano(tam) {
        if (tam <= 6) return 3;
        if (tam <= 14) return 2;
        if (tam <= 21) return 1;
        return 0;
    }

    function calcularModificadorDestreza(dex) {
        if (dex <= 5) return 5;
        if (dex <= 8) return 4;
        if (dex <= 12) return 3;
        if (dex <= 15) return 2;
        if (dex <= 18) return 1;
        return 0;
    }
}

if (document.readyState === 'complete') {
    initAnimales();
} else {
    document.addEventListener('DOMContentLoaded', initAnimales);
}