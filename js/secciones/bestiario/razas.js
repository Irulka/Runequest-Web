// Inicialización del generador de razas antiguas
function initRazas() {
    console.log('Inicializando Razas Antiguas...');
    
    // Elementos de la interfaz
    const selectRaza = document.getElementById('raza');
    const resultadosContainer = document.getElementById('resultados-container');
    
    // Lista de razas disponibles
    const razasLista = [
        { nombre: "Dryade", archivo: "razas/dryade.json" }, 
        { nombre: "Elfo Marrón", archivo: "razas/elfom.json" }, 
        { nombre: "Elfo Verde", archivo: "razas/elfov.json" },
        { nombre: "Elfo Amarillo", archivo: "razas/elfoa.json" },
        { nombre: "Elfo Negro", archivo: "razas/elfon.json" },
        { nombre: "Elfo Azul", archivo: "razas/elfoaz.json" },        
        { nombre: "Duende", archivo: "razas/duende.json" },
        { nombre: "Corredor", archivo: "razas/corredor.json" },
        { nombre: "Babuino", archivo: "razas/babuino.json" },
        { nombre: "Centauro", archivo: "razas/centauro.json" },
        { nombre: "Mujer Zorro (forma animal)", archivo: "razas/zorroa.json" },
        { nombre: "Mujer Zorro (Forma mujer)", archivo: "razas/zorrob.json" },
        { nombre: "Mantícora", archivo: "razas/manticora.json" },
        { nombre: "Minotauro", archivo: "razas/minotauro.json" },
        { nombre: "Sátiro", archivo: "razas/satiro.json" }, 
        { nombre: "Dragonewt Crestado (Primer Estadío)", archivo: "razas/drago1.json" },
        { nombre: "Dragonewt Picudo (Segundo Estadío)", archivo: "razas/drago2.json" },
        { nombre: "Dragonwet Sacerdote (Tercer Estadío)", archivo: "razas/drago3.json" },
        { nombre: "Dragonewt (Cuarto Estadío)", archivo: "razas/drago4.json" },
        { nombre: "Dragonewt (Estadío Final)", archivo: "razas/drago5.json" },
        { nombre: "Gigante", archivo: "razas/gigante.json" },
        { nombre: "Glotarón", archivo: "razas/glotaron.json" },
        { nombre: "Agimori (Hombre y Medio)", archivo: "razas/hombreymedio.json" },
        { nombre: "Morocante", archivo: "razas/moro.json" },
        { nombre: "Enano", archivo: "razas/enano.json" },
        { nombre: "Newtling", archivo: "razas/newtling.json" },  
        { nombre: "Ludoch", archivo: "razas/ludoch.json" },  
        { nombre: "Troll Negro", archivo: "razas/trolln.json" },
        { nombre: "Gran Troll", archivo: "razas/trollg.json" },  
        { nombre: "Troll Raza Señorial", archivo: "razas/matriarca.json" }, 
        { nombre: "Trollkin", archivo: "razas/trollkin.json" },   
        { nombre: "Troll de las Cavernas", archivo: "razas/trollc.json" }, 
        { nombre: "Troll Marino", archivo: "razas/trollmar.json" }, 
        { nombre: "Hijo del Viento", archivo: "razas/hijov.json" }, 
        { nombre: "Telmori", archivo: "razas/hermano.json" },         
        { nombre: "Jinete de los Colmillos", archivo: "razas/jinete.json" },                               
        { nombre: "Pato", archivo: "razas/pato.json" } 
    ].sort((a, b) => a.nombre.localeCompare(b.nombre));

    // Llenar el select con las razas
    razasLista.forEach(raza => {
        const option = document.createElement('option');
        option.value = raza.archivo;
        option.textContent = raza.nombre;
        selectRaza.appendChild(option);
    });
    
    // Configurar evento para el select
    selectRaza.addEventListener('change', function() {
        const archivoSeleccionado = this.value;
        
        if (!archivoSeleccionado) {
            resultadosContainer.style.display = 'none';
            return;
        }
        
        // Cargar el archivo específico de la raza
        fetch(`../js/secciones/bestiario/${archivoSeleccionado}`)
            .then(response => {
                if (!response.ok) throw new Error('Raza no encontrada');
                return response.json();
            })
            .then(raza => {
                mostrarFichaRaza(raza);
            })
            .catch(error => {
                console.error('Error cargando la raza:', error);
                mostrarError();
            });
    });
    
    // Configurar evento para el botón de volver
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-magia')) {
            resultadosContainer.style.display = 'none';
            selectRaza.value = '';
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
                // Asegurar que esté entre 10% y 150%
                nuevoValor = Math.max(10, Math.min(150, nuevoValor));
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

    function mostrarFichaRaza(raza) {
        resultadosContainer.style.display = 'block';
        
        // Generar características aleatorias
        const caracteristicasGeneradas = {};
        if (raza.caracteristicas) {
            for (const [key, value] of Object.entries(raza.caracteristicas)) {
                caracteristicasGeneradas[key] = tirarDados(value);
            }
        }
        
        // Calcular puntos de vida
        const puntosVida = Math.max(1, raza.puntosVida || calcularPuntosVida(caracteristicasGeneradas));
        const pvLocalizaciones = calcularPVLocalizaciones(raza, puntosVida);
        
        // Generar Puntos de Magia
        if (raza.puntosMagia) {
            if (typeof raza.puntosMagia === 'string' && raza.puntosMagia.includes('D')) {
                caracteristicasGeneradas.POD = tirarDados(raza.puntosMagia);
            } else {
                caracteristicasGeneradas.POD = raza.puntosMagia;
            }
        }
        
        // Calcular modificadores de combate
        const modCombate = calcularModificadoresCombate(caracteristicasGeneradas);
            
        // Procesar todos los campos con porcentajes
        const habilidadesProcesadas = procesarPorcentajes(raza.habilidades);
        const idiomasProcesados = procesarPorcentajes(raza.idiomas);
        const pasionesProcesadas = procesarPorcentajes(raza.pasiones);
        const runasProcesadas = procesarPorcentajes(raza.runas);
        const ataquesProcesados = procesarAtaques(raza.ataques);
        
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-raza">
                <h2>${raza.nombre}</h2>
                
                <div class="tabs">
                    <button class="tab-btn active" data-tab="caracteristicas">Características</button>
                    <button class="tab-btn" data-tab="combate">Combate</button>
                    <button class="tab-btn" data-tab="habilidades">Habilidades</button>
                    <button class="tab-btn" data-tab="magia">Magia</button>
                </div>
                
                <div class="tab-content active" id="caracteristicas">
                    ${generarTablaCaracteristicas(
                        {...raza, pasiones: pasionesProcesadas, runas: runasProcesadas}, 
                        caracteristicasGeneradas, 
                        puntosVida, 
                        pvLocalizaciones, 
                        modCombate
                    )}
                </div>
                
                <div class="tab-content" id="combate">
                    ${generarTablaCombate({...raza, ataques: ataquesProcesados}, pvLocalizaciones, puntosVida)}
                </div>
                
                <div class="tab-content" id="habilidades">
                    ${generarTablaHabilidades({...raza, habilidades: habilidadesProcesadas, idiomas: idiomasProcesados})}
                </div>
                
                <div class="tab-content" id="magia">
                    ${generarTablaMagia(raza, caracteristicasGeneradas)}
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

    function generarTablaCaracteristicas(raza, caracteristicas, puntosVida, pvLocalizaciones, modCombate) {
        return `
            <div class="descripcion-raza">
                <p>${raza.descripcion || 'No hay descripción disponible.'}</p>
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
                <div class="atributo"><strong>Puntos de Magia:</strong> ${caracteristicas.POD || raza.puntosMagia || '-'}</div>
                <div class="atributo"><strong>Movimiento:</strong> ${raza.movimiento || '-'}</div>
                <div class="atributo"><strong>Mod. Daño:</strong> ${modCombate.modDanio}</div>
                <div class="atributo"><strong>Daño Espiritual:</strong> ${modCombate.danioEspiritual}</div>
                <div class="atributo"><strong>Mod. Tamaño:</strong> ${modCombate.modTamano}</div>
                <div class="atributo"><strong>Mod. Destreza:</strong> ${modCombate.modDestreza}</div>
                <div class="atributo"><strong>Armadura:</strong> ${typeof raza.armadura === 'object' ? 
                    Object.entries(raza.armadura).map(([k,v]) => `${k}: ${v}`).join(', ') : 
                    (raza.armadura || 'Ninguna')}</div>
            </div>
            
            ${raza.runas ? `
            <h3>Runas</h3>
            <div class="runas-grid">
                ${typeof raza.runas === 'string' ? `
                    <div class="runa">${raza.runas}</div>
                ` : Object.entries(raza.runas).map(([runa, valor]) => `
                    <div class="runa"><strong>${runa}:</strong> ${valor}</div>
                `).join('')}
            </div>` : ''}
            
            ${raza.pasiones ? `
            <h3>Pasiones</h3>
            <div class="pasiones-grid">
                ${typeof raza.pasiones === 'string' ? `
                    <div class="pasion">${raza.pasiones}</div>
                ` : Object.entries(raza.pasiones).map(([pasion, valor]) => `
                    <div class="pasion"><strong>${pasion}:</strong> ${valor}</div>
                `).join('')}
            </div>` : ''}
        `;
    }

    function generarTablaCombate(raza, pvLocalizaciones, puntosVida) {
        return `
            <h3>Ataques</h3>
            ${raza.ataques?.length ? `
            <table class="tabla-ataques">
                <tr><th>Nombre</th><th>%</th><th>Daño</th><th>MR</th><th>Efecto</th></tr>
                ${raza.ataques.map(a => `
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
            
            ${raza.habilidadesEspeciales?.length ? `
            <h3>Habilidades Especiales</h3>
            <ul class="habilidades-especiales">
                ${raza.habilidadesEspeciales.map(h => `<li>${h}</li>`).join('')}
            </ul>` : ''}
        `;
    }

    function generarTablaHabilidades(raza) {
        return `
            ${raza.habilidades ? `
            <div class="habilidades-grid">
                ${typeof raza.habilidades === 'string' ? `
                    <div class="habilidad">${raza.habilidades}</div>
                ` : Object.entries(raza.habilidades).map(([h, v]) => `
                    <div class="habilidad"><strong>${h}:</strong> ${v}</div>
                `).join('')}
            </div>` : '<p>No tiene habilidades definidas</p>'}
            
            ${raza.idiomas ? `
            <h3>Idiomas</h3>
            <div class="idiomas-grid">
                ${typeof raza.idiomas === 'string' ? `
                    <div class="idioma">${raza.idiomas}</div>
                ` : Object.entries(raza.idiomas).map(([i, v]) => `
                    <div class="idioma"><strong>${i}:</strong> ${v}</div>
                `).join('')}
            </div>` : ''}
        `;
    }

    function generarTablaMagia(raza, caracteristicas) {
        return `
            ${raza.magia ? `
            <div class="magia-info">
                <p><strong>Capacidad Mágica:</strong> ${raza.magia}</p>
            </div>` : ''}
            
            <div class="puntos-magia">
                <strong>Puntos de Magia:</strong> ${caracteristicas.POD || raza.puntosMagia || '-'}
            </div>
        `;
    }

    function mostrarError() {
        resultadosContainer.style.display = 'block';
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-raza">
                <h3>Error</h3>
                <p>No se pudo cargar la información de la raza.</p>
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
    function calcularPVLocalizaciones(raza, puntosVida) {
        if (!raza.localizaciones) return null;
        
        return raza.localizaciones.map(loc => {
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
    initRazas();
} else {
    document.addEventListener('DOMContentLoaded', initRazas);
}