// Inicialización del bestiario
function initBestiario() {
    console.log('Inicializando Bestiario...');
    
    // Elementos de la interfaz
    const selectMonstruo = document.getElementById('monstruo');
    const resultadosContainer = document.getElementById('resultados-container');
    
    // Lista de monstruos disponibles
    const monstruosLista = [
        { nombre: "Alosaurio", archivo: "monstruos/alosaurio.json" },
        { nombre: "Anguila Gigante", archivo: "monstruos/anguila.json" },        
        { nombre: "Anquilosaurio", archivo: "monstruos/anquilo.json" },
        { nombre: "Bailarina de las Tinieblas", archivo: "monstruos/dancer.json" },
        { nombre: "Brontosaurio", archivo: "monstruos/bronto.json" },        
        { nombre: "Brollachán", archivo: "monstruos/brolla.json" },        
        { nombre: "Huan-to", archivo: "monstruos/huanto.json" },
        { nombre: "Broo", archivo: "monstruos/broo.json" },
        { nombre: "Deinomychus", archivo: "monstruos/deino.json" }, 
        { nombre: "Dragón de los Sueños", archivo: "monstruos/dragon.json" },           
        { nombre: "Elasmosaurus", archivo: "monstruos/elasmo.json" }, 
        { nombre: "Esqueleto", archivo: "monstruos/esqueleto.json" },                        
        { nombre: "Insecto Toro", archivo: "monstruos/bullsit.json" },
        { nombre: "Caracol Dragón", archivo: "monstruos/caracol.json" },
        { nombre: "Necrófago", archivo: "monstruos/necrofago.json" },
        { nombre: "Glargola", archivo: "monstruos/gargola.json" },       
        { nombre: "Gorp", archivo: "monstruos/gorp.json" },
        { nombre: "Grifo", archivo: "monstruos/grifo.json" },        
        { nombre: "Gusano Dragón", archivo: "monstruos/gusano.json" },
        { nombre: "Hadrosaurio", archivo: "monstruos/hadro.json" }, 
        { nombre: "Hipogrifo", archivo: "monstruos/hipog.json" },                
        { nombre: "Hydra Menor", archivo: "monstruos/hydra.json" },
        { nombre: "Hijo de Krarsht", archivo: "monstruos/hijosdek.json" },
        { nombre: "Hombre Escoprión", archivo: "monstruos/hscorpion.json" },
        { nombre: "Reptil Marino", archivo: "monstruos/lagartosa.json" },        
        { nombre: "Lagarto de las Rocas", archivo: "monstruos/lagarto.json" },        
        { nombre: "Magisaurio", archivo: "monstruos/magi.json" },              
        { nombre: "Jackoso", archivo: "monstruos/jackoso.json" },
        { nombre: "Pteranodón Gitante", archivo: "monstruos/ptera.json" },        
        { nombre: "Ogro", archivo: "monstruos/ogro.json" },
        { nombre: "Pulpandante", archivo: "monstruos/pulpa.json" },
        { nombre: "Renacido", archivo: "monstruos/reven.json" },        
        { nombre: "Sapo de los Acantilados", archivo: "monstruos/sapo.json" },
        { nombre: "Semi Pájaros", archivo: "monstruos/semi.json" }, 
        { nombre: "Tiranosaurio", archivo: "monstruos/tirano.json" },         
        { nombre: "Triceratops", archivo: "monstruos/trice.json" },  
        { nombre: "Toro Celestial", archivo: "monstruos/toroc.json" },         
        { nombre: "Tortua Marina Gigante", archivo: "monstruos/tortumar.json" },
        { nombre: "Tortuga Mordedora Gigante", archivo: "monstruos/tortu.json" },                                       
        { nombre: "Arpía", archivo: "monstruos/arpia.json" },
        { nombre: "Unicornio", archivo: "monstruos/unicornio.json" },       
        { nombre: "Vampiro", archivo: "monstruos/vampiro.json" },
        { nombre: "Wyrm", archivo: "monstruos/wyrm.json" },
        { nombre: "Wyrm Marino", archivo: "monstruos/wyrnmma.json" },
        { nombre: "Wyverna", archivo: "monstruos/wyverna.json" },  
        { nombre: "Zombi", archivo: "monstruos/zombi.json" }                  
    ].sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Llenar el select con los monstruos
    monstruosLista.forEach(monstruo => {
        const option = document.createElement('option');
        option.value = monstruo.archivo;
        option.textContent = monstruo.nombre;
        selectMonstruo.appendChild(option);
    });
    
    // Configurar evento para el select
    selectMonstruo.addEventListener('change', function() {
        const archivoSeleccionado = this.value;
        
        if (!archivoSeleccionado) {
            resultadosContainer.style.display = 'none';
            return;
        }
        
        // Cargar el archivo específico del monstruo
        fetch(`../js/secciones/bestiario/${archivoSeleccionado}`)
            .then(response => {
                if (!response.ok) throw new Error('Monstruo no encontrado');
                return response.json();
            })
            .then(monstruo => {
                mostrarFichaMonstruo(monstruo);
            })
            .catch(error => {
                console.error('Error cargando el monstruo:', error);
                mostrarError();
            });
    });
    
    // Configurar evento para el botón de volver
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-magia')) {
            resultadosContainer.style.display = 'none';
            selectMonstruo.value = '';
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

    function mostrarFichaMonstruo(monstruo) {
        resultadosContainer.style.display = 'block';
        
        // Generar características aleatorias
        const caracteristicasGeneradas = {};
        if (monstruo.caracteristicas) {
            for (const [key, value] of Object.entries(monstruo.caracteristicas)) {
                caracteristicasGeneradas[key] = tirarDados(value);
            }
        }
        
        // Calcular puntos de vida
        const puntosVida = Math.max(1, monstruo.puntosVida || calcularPuntosVida(caracteristicasGeneradas));
        const pvLocalizaciones = calcularPVLocalizaciones(monstruo, puntosVida);
        
        // Generar Puntos de Magia - Corrección aplicada aquí
        if (monstruo.puntosMagia) {
            if (typeof monstruo.puntosMagia === 'string' && monstruo.puntosMagia.includes('D')) {
                caracteristicasGeneradas.POD = tirarDados(monstruo.puntosMagia);
            } else {
                caracteristicasGeneradas.POD = monstruo.puntosMagia;
            }
        }
        
        // Calcular modificadores de combate
        const modCombate = calcularModificadoresCombate(caracteristicasGeneradas);
            
            // Procesar todos los campos con porcentajes
            const habilidadesProcesadas = procesarPorcentajes(monstruo.habilidades);
            const idiomasProcesados = procesarPorcentajes(monstruo.idiomas);
            const pasionesProcesadas = procesarPorcentajes(monstruo.pasiones);
            const runasProcesadas = procesarPorcentajes(monstruo.runas);
            const ataquesProcesados = procesarAtaques(monstruo.ataques);
            
            document.getElementById('resultado-principal').innerHTML = `
                <div class="ficha-monstruo">
                    <h2>${monstruo.nombre}</h2>
                    
                    <div class="tabs">
                        <button class="tab-btn active" data-tab="caracteristicas">Características</button>
                        <button class="tab-btn" data-tab="combate">Combate</button>
                        <button class="tab-btn" data-tab="habilidades">Habilidades</button>
                        <button class="tab-btn" data-tab="magia">Magia</button>
                    </div>
                    
                    <div class="tab-content active" id="caracteristicas">
                        ${generarTablaCaracteristicas(
                            {...monstruo, pasiones: pasionesProcesadas, runas: runasProcesadas}, 
                            caracteristicasGeneradas, 
                            puntosVida, 
                            pvLocalizaciones, 
                            modCombate
                        )}
                    </div>
                    
                    <div class="tab-content" id="combate">
                        ${generarTablaCombate({...monstruo, ataques: ataquesProcesados}, pvLocalizaciones, puntosVida)}
                    </div>
                    
                    <div class="tab-content" id="habilidades">
                        ${generarTablaHabilidades({...monstruo, habilidades: habilidadesProcesadas, idiomas: idiomasProcesados})}
                    </div>
                    
                    <div class="tab-content" id="magia">
                        ${generarTablaMagia(monstruo, caracteristicasGeneradas)}
                    </div>
                    
                    <button class="btn-magia">Volver a la lista</button>
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

    function generarTablaCaracteristicas(monstruo, caracteristicas, puntosVida, pvLocalizaciones, modCombate) {
        return `
            <div class="descripcion-monstruo">
                <p>${monstruo.descripcion || 'No hay descripción disponible.'}</p>
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
                <div class="atributo"><strong>Puntos de Magia:</strong> ${caracteristicas.POD || monstruo.puntosMagia || '-'}</div>
                <div class="atributo"><strong>Movimiento:</strong> ${monstruo.movimiento || '-'}</div>
                <div class="atributo"><strong>Mod. Daño:</strong> ${modCombate.modDanio}</div>
                <div class="atributo"><strong>Daño Espiritual:</strong> ${modCombate.danioEspiritual}</div>
                <div class="atributo"><strong>Mod. Tamaño:</strong> ${modCombate.modTamano}</div>
                <div class="atributo"><strong>Mod. Destreza:</strong> ${modCombate.modDestreza}</div>
                <div class="atributo"><strong>Armadura:</strong> ${typeof monstruo.armadura === 'object' ? 
                    Object.entries(monstruo.armadura).map(([k,v]) => `${k}: ${v}`).join(', ') : 
                    (monstruo.armadura || 'Ninguna')}</div>
            </div>
            
            ${monstruo.runas ? `
            <h3>Runas</h3>
            <div class="runas-grid">
                ${typeof monstruo.runas === 'string' ? `
                    <div class="runa">${monstruo.runas}</div>
                ` : Object.entries(monstruo.runas).map(([runa, valor]) => `
                    <div class="runa"><strong>${runa}:</strong> ${valor}</div>
                `).join('')}
            </div>` : ''}
            
            ${monstruo.pasiones ? `
            <h3>Pasiones</h3>
            <div class="pasiones-grid">
                ${typeof monstruo.pasiones === 'string' ? `
                    <div class="pasion">${monstruo.pasiones}</div>
                ` : Object.entries(monstruo.pasiones).map(([pasion, valor]) => `
                    <div class="pasion"><strong>${pasion}:</strong> ${valor}</div>
                `).join('')}
            </div>` : ''}
        `;
    }

    function generarTablaCombate(monstruo, pvLocalizaciones, puntosVida) {
        return `
            <h3>Ataques</h3>
            ${monstruo.ataques?.length ? `
            <table class="tabla-ataques">
                <tr><th>Nombre</th><th>%</th><th>Daño</th><th>MR</th><th>Efecto</th></tr>
                ${monstruo.ataques.map(a => `
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
            
            ${monstruo.habilidadesEspeciales?.length ? `
            <h3>Habilidades Especiales</h3>
            <ul class="habilidades-especiales">
                ${monstruo.habilidadesEspeciales.map(h => `<li>${h}</li>`).join('')}
            </ul>` : ''}
        `;
    }

    function generarTablaHabilidades(monstruo) {
        return `
            ${monstruo.habilidades ? `
            <div class="habilidades-grid">
                ${typeof monstruo.habilidades === 'string' ? `
                    <div class="habilidad">${monstruo.habilidades}</div>
                ` : Object.entries(monstruo.habilidades).map(([h, v]) => `
                    <div class="habilidad"><strong>${h}:</strong> ${v}</div>
                `).join('')}
            </div>` : '<p>No tiene habilidades definidas</p>'}
            
            ${monstruo.idiomas ? `
            <h3>Idiomas</h3>
            <div class="idiomas-grid">
                ${typeof monstruo.idiomas === 'string' ? `
                    <div class="idioma">${monstruo.idiomas}</div>
                ` : Object.entries(monstruo.idiomas).map(([i, v]) => `
                    <div class="idioma"><strong>${i}:</strong> ${v}</div>
                `).join('')}
            </div>` : ''}
        `;
    }

    function generarTablaMagia(monstruo, caracteristicas) {
        return `
            ${monstruo.magia ? `
            <div class="magia-info">
                <p><strong>Capacidad Mágica:</strong> ${monstruo.magia}</p>
            </div>` : ''}
            
            <div class="puntos-magia">
                <strong>Puntos de Magia:</strong> ${caracteristicas.POD || monstruo.puntosMagia || '-'}
            </div>
        `;
    }

    function mostrarError() {
        resultadosContainer.style.display = 'block';
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-monstruo">
                <h3>Error</h3>
                <p>No se pudo cargar la información del monstruo.</p>
                <button class="btn-magia">Volver a la lista</button>
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
    function calcularPVLocalizaciones(monstruo, puntosVida) {
        if (!monstruo.localizaciones) return null;
        
        return monstruo.localizaciones.map(loc => {
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

    // Nuevas funciones para calcular modificadores de combate
    function calcularModificadoresCombate(caracteristicas) {
        const fue = caracteristicas.FUE || 10;
        const tam = caracteristicas.TAM || 10;
        const pod = caracteristicas.POD || 10;
        const dex = caracteristicas.DES || 10;
        const car = caracteristicas.CAR || 10;
        
        return {
            modDanio: calcularModificadorDanio(fue, tam),
            danioEspiritual: calcularDanioEspiritual(pod, car),
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

    function calcularDanioEspiritual(pod, car) {
        const suma = pod + car;
        if (suma <= 12) return "1D6";
        if (suma <= 24) return "1D6+1";
        if (suma <= 32) return "1D6+2";
        if (suma <= 40) return "2D6";
        if (suma <= 56) return "2D6+1";
        
        const dadosExtra = Math.floor((suma - 56) / 16);
        return `${2 + dadosExtra}D6+1`;
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
    initBestiario();
} else {
    document.addEventListener('DOMContentLoaded', initBestiario);
}