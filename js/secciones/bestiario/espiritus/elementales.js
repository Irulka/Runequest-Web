// js/secciones/bestiario/espiritus/elementales.js
function initElementales() {
    console.log('Inicializando Generador de Elementales...');

    // Añadir estilos dinámicos
    const style = document.createElement('style');
    style.textContent = `
        /* Efectos hover */
        .opcion-elemento:hover, .opcion-tamaño:hover {
            background-color: #4a5568;
            color: white;
            transform: scale(1.02);
            transition: all 0.2s ease;
        }
        .opcion-elemento, .opcion-tamaño {
            transition: all 0.2s ease;
            cursor: pointer;
            padding: 8px 12px;
            border-radius: 4px;
            margin: 2px 0;
        }
        .opcion-elemento[data-elemento="aire"]:hover {
            background-color: #63b3ed !important;
        }
        .opcion-elemento[data-elemento="agua"]:hover {
            background-color: #4299e1 !important;
        }
        .opcion-elemento[data-elemento="fuego"]:hover {
            background-color: #f56565 !important;
        }
        .opcion-elemento[data-elemento="luna"]:hover {
            background-color: #b794f4 !important;
        }
        .opcion-elemento[data-elemento="sombra"]:hover {
            background-color: #718096 !important;
        }
        .opcion-elemento[data-elemento="tierra"]:hover {
            background-color: #d69e2e !important;
        }
        
        /* Estilos para las tablas de habilidades */
        .tabla-habilidad {
            margin-top: 15px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 5px;
            border-left: 3px solid #718096;
        }
        
        .tabla-habilidad.lunar {
            border-left-color: #b794f4;
        }
        
        .tabla-habilidad h4 {
            color: #d69e2e;
            margin-bottom: 8px;
            font-size: 1.1em;
        }
        
        .tabla-habilidad table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .tabla-habilidad th {
            background-color: #4a5568;
            padding: 5px;
            text-align: left;
        }
        
        .tabla-habilidad td {
            padding: 5px;
            border-bottom: 1px solid #4a5568;
        }
        
        .tabla-habilidad tr:nth-child(even) {
            background-color: rgba(74, 85, 104, 0.2);
        }
    `;
    document.head.appendChild(style);

    // Función para simular tiradas de dados
    function tirarFormula(formula) {
        if (formula === "0") return "0";
        
        if (window.Dados && window.Dados.tirarFormula) {
            return window.Dados.tirarFormula(formula);
        }
        
        try {
            if (!formula.includes('D')) {
                return formula;
            }
            
            const parts = formula.split('D');
            const numDados = parseInt(parts[0]) || 1;
            const [caras, modificador] = parts[1].split('+').map(Number);
            
            let total = 0;
            for (let i = 0; i < numDados; i++) {
                total += Math.floor(Math.random() * caras) + 1;
            }
            
            return total + (modificador || 0);
        } catch (e) {
            console.error('Error al procesar fórmula:', formula, e);
            return formula;
        }
    }

    // Base de datos de elementales
    const elementalesDB = {
        aire: {
            pequeño: { FUE: "1D6+6", POD: "3D6", PG: "1D6+6", MOV: "12" },
            mediano: { FUE: "2D6+12", POD: "3D6+6", PG: "2D6+12", MOV: "12" },
            grande: { FUE: "3D6+18", POD: "4D6+6", PG: "3D6+18", MOV: "12" },
            habilidad: "Puede levantar objetos o seres vivos con un TAM igual o infeior a su fuerza. En combate pueden levantar a su víctima y dejarla caer. Este puede resistirse enfrentando su FUE con la del elemento. El daño de caída será de 2D6, 3D6 o 5D6, dependiendo del tamaño del espíritu."
        },
        agua: {
            pequeño: { FUE: "1D6+6", POD: "3D6", PG: "1D6+6", MOV: "6" },
            mediano: { FUE: "2D6+12", POD: "3D6+6", PG: "2D6+12", MOV: "6" },
            grande: { FUE: "3D6+18", POD: "4D6+6", PG: "3D6+18", MOV: "6" },
            habilidad: "Un elemental de agua puede purificar agua, pero no puede eliminar químicos disueltos. Además puede empujar embarcaciones y otros objetos por el agua, siempre que su FUE sea superior al TAM del objeto. Este elemental, puede evolver a su víctima e introducirse a la fuerza en sus pulmones. La víctima puede resistirse con una tirada de CONx5 o sufrir 1D8 puntos de daño. Si tiene éxito, podrá intentar salir del elemental con una tirada de DESx5."
        },
        fuego: {
            pequeño: { FUE: "1D6+6", POD: "3D6", PG: "1D6+6", MOV: "6" },
            mediano: { FUE: "2D6+12", POD: "3D6+6", PG: "2D6+12", MOV: "6" },
            grande: { FUE: "3D6+18", POD: "4D6+6", PG: "3D6+18", MOV: "6" },
            habilidad: "Un elemental de fuego puede prender los objetos inflamables que todque, pudiendo incluso llegar a fundir metales. En combate, envuelve en llamas a su víctima. Un elemental de fuego pequeño puede  envolver a la mitad de un humano, uno mediano puede envolverlo por completo y uno grande puede envolver incluso a un jinete y su montura. El daño por fuego tiene lugar al final del asalto. La víctima enfrenta su CON a 3D6 como si se tratase de un veneno. Si resiste, solo recibirá la mitad de daño a puntos generales. Las armaduras físicas no protegen del daño."
        },
        luna: {
            pequeño: { FUE: "1D6+6", POD: "3D6", PG: "1D6+6", MOV: "6" },
            mediano: { FUE: "2D6+12", POD: "3D6+6", PG: "2D6+12", MOV: "6" },
            grande: { FUE: "3D6+18", POD: "4D6+6", PG: "3D6+18", MOV: "6" },
            habilidad: "Un elemental lunar infunde locura a su víctima. Las víctimas inconscientes son imnunes a locura. El elemental puede drenar 1PM por asalto a la víctima, pudiendo combinar este ataque con locura. Las noches de luna llena, estos elementales puede incrementar su tamaño (de pequeño a mediano y de mediano a grande). El ataque de locura tendrá lugar en el MR 12."
        },
        sombra: {
            pequeño: { FUE: "1D6+6", POD: "3D6", PG: "1D6+6", MOV: "6" },
            mediano: { FUE: "2D6+12", POD: "3D6+6", PG: "2D6+12", MOV: "6" },
            grande: { FUE: "3D6+18", POD: "4D6+6", PG: "3D6+18", MOV: "6" },
            habilidad: "Cualquier fuego, o fuente de luz dentro de una sombra (y más débil que ella) es extinguida. Cualquiera que esté dentro de un elemental de oscuridad estará privado sensorialmente. Las sombras atacan causando un terror que puede llegar a matar, enfrentando su POD contra la CON de la víctima. Cualquier que posea la runa de la oscuridad podrá usarla para incrementar su defensa. El ataque tendrá lugar una única vez al final del primer turno. Las víctimas inconscientes no se verán afectadas por el ataque de terror."
        },
        tierra: {
            pequeño: { FUE: "1D6+6", POD: "3D6", PG: "1D6+6", MOV: "3", MD: "0" },
            mediano: { FUE: "2D6+12", POD: "3D6+6", PG: "2D6+12", MOV: "3", MD: "1D6" },
            grande: { FUE: "3D6+18", POD: "4D6+6", PG: "3D6+18", MOV: "3", MD: "2D6" },
            habilidad: "Un elemental de tierra puede cavar pozos, túneles, sujetar objetos al suelo, crear montículos y encontrar objetos enterrados. Un elemental de tierra puede transportar objetos y seres vivos bajo tierra si su FUE se lo permite. Pueden atacar abriendo un foso bajo los pies de los enemigos. Un elemental pequeño envolverá a su víctima hasta la cintura. Uno mediano puede engullirla entera y una grande podría incluso tragarse a un jinete y su montura. La víctima sufrirá un daño igual al modificador al daño del elemental en todas las localizacoines atrapadas. Este ataque daño no tendrá efecto en suelos arenosos y solo podrá hacerlo una vez en el mismo lugar. Tras este ataque, se limitará a mantener sujeta a su víctima empleando su FUE."
        }
    };

    // Tabla de efectos de terror para sombra
    const tablaTerror = `
        <div class="tabla-habilidad">
            <h4>Tabla de Efectos del Ataque de Terror:</h4>
            <table>
                <tr>
                    <th>Tirada</th>
                    <th>Efecto</th>
                </tr>
                <tr>
                    <td>01-05</td>
                    <td>La víctima muere de terror.</td>
                </tr>
                <tr>
                    <td>06-35</td>
                    <td>La víctima colapsa durante 20-CON turnos.</td>
                </tr>
                <tr>
                    <td>36-65</td>
                    <td>La víctima colapsa durante 20-CON asaltos de combate.</td>
                </tr>
                <tr>
                    <td>66-95</td>
                    <td>La víctima se desmoraliza durante 20-CON asaltos de combate.</td>
                </tr>
                <tr>
                    <td>96-100</td>
                    <td>La víctima huye asustada. Si no puede huir atacará como un fanático.</td>
                </tr>
            </table>
        </div>
    `;

    // Tabla de efectos de locura para luna
    const tablaLocura = `
        <div class="tabla-habilidad lunar">
            <h4>Tabla de Efectos de Locura Lunar:</h4>
            <table>
                <tr>
                    <th>Resultado</th>
                    <th>Efecto</th>
                </tr>
                <tr>
                    <td>Crítico</td>
                    <td>Locura: Pierde 1d4 INT permanente. Vuelve a tirar en esta tabla dentro de 30-POD días.</td>
                </tr>
                <tr>
                    <td>Especial</td>
                    <td>Rabia: La víctima ataca a la persona más cercana como si estuviera bajo los efectos de Fanatismo durante 30-POD minutos.</td>
                </tr>
                <tr>
                    <td>Éxito</td>
                    <td>Catatonia: La víctima colapsa durante 30-POD Minutos y no podrá ser despertada.</td>
                </tr>
                <tr>
                    <td>Fallo</td>
                    <td>Sin efecto en criaturas inteligentes. Seres no inteligentes quedarán confundidos por 30-POD minutos.</td>
                </tr>
                <tr>
                    <td>Pifia</td>
                    <td>La víctima no sufre ningún efecto.</td>
                </tr>
            </table>
        </div>
    `;

    // Elementos de la interfaz
    const btnTipo = document.getElementById('btn-tipo-elemental');
    const btnTamaño = document.getElementById('btn-tamaño');
    const menuTipo = document.getElementById('menu-tipo');
    const menuTamaño = document.getElementById('menu-tamaño');
    const resultadosContainer = document.querySelector('.resultados-container');
    const habilidadesElemental = document.getElementById('habilidad-elemental');

    // Variables de estado
    let tipoSeleccionado = null;
    let tamañoSeleccionado = null;

    // Mostrar/ocultar menús desplegables
    btnTipo.addEventListener('click', (e) => {
        e.stopPropagation();
        menuTipo.style.display = menuTipo.style.display === 'none' ? 'block' : 'none';
        menuTamaño.style.display = 'none';
    });

    btnTamaño.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!tipoSeleccionado) {
            alert('Selecciona primero un tipo de elemental');
            return;
        }
        menuTamaño.style.display = menuTamaño.style.display === 'none' ? 'block' : 'none';
        menuTipo.style.display = 'none';
    });

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', () => {
        menuTipo.style.display = 'none';
        menuTamaño.style.display = 'none';
    });

    // Selección de tipo
    document.querySelectorAll('.opcion-elemento').forEach(opcion => {
        opcion.addEventListener('click', (e) => {
            e.stopPropagation();
            tipoSeleccionado = opcion.getAttribute('data-elemento');
            btnTipo.textContent = `Tipo: ${opcion.textContent}`;
            menuTipo.style.display = 'none';
            tamañoSeleccionado = null;
            btnTamaño.textContent = 'Tamaño';
            resultadosContainer.style.display = 'none';
        });
    });

    // Selección de tamaño
    document.querySelectorAll('.opcion-tamaño').forEach(opcion => {
        opcion.addEventListener('click', (e) => {
            e.stopPropagation();
            tamañoSeleccionado = opcion.getAttribute('data-tamaño');
            btnTamaño.textContent = `Tamaño: ${opcion.textContent}`;
            menuTamaño.style.display = 'none';
            generarElemental();
        });
    });

    // Generar el elemental con stats
    function generarElemental() {
        if (!tipoSeleccionado || !tamañoSeleccionado) return;

        const elemental = elementalesDB[tipoSeleccionado][tamañoSeleccionado];
        if (!elemental) return;
        
        // Actualizar UI
        document.getElementById('tipo-elemental-resultado').textContent = 
            tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1);
        document.getElementById('tamaño-resultado').textContent = 
            tamañoSeleccionado.charAt(0).toUpperCase() + tamañoSeleccionado.slice(1);
        
        // Mostrar/ocultar MD para tierra
        const mdContainer = document.getElementById('md-container');
        mdContainer.style.display = tipoSeleccionado === 'tierra' ? 'flex' : 'none';
        
        // Actualizar estadísticas
        for (const [key, formula] of Object.entries(elemental)) {
            if (key === 'habilidad') continue;
            
            const valor = (key === 'MD') ? formula : tirarFormula(formula);
            document.getElementById(`${key.toLowerCase()}-resultado`).textContent = valor;
            
            // Mostrar fórmula para todas excepto MOV y MD
            const formulaElement = document.getElementById(`${key.toLowerCase()}-formula`);
            if (formulaElement && key !== 'MOV' && key !== 'MD') {
                formulaElement.textContent = `(${formula})`;
            }
        }
        
        // Habilidad especial
        const habilidadContainer = document.getElementById('habilidad-elemental');
        habilidadContainer.textContent = elementalesDB[tipoSeleccionado].habilidad;
        
        // Eliminar tablas existentes (por si se cambia de elemental)
        const tablasExistentes = document.querySelectorAll('.tabla-habilidad');
        tablasExistentes.forEach(tabla => tabla.remove());
        
        // Añadir tabla correspondiente según el tipo de elemental
        if (tipoSeleccionado === 'sombra') {
            habilidadContainer.insertAdjacentHTML('afterend', tablaTerror);
        } else if (tipoSeleccionado === 'luna') {
            habilidadContainer.insertAdjacentHTML('afterend', tablaLocura);
        }
        
        // Mostrar resultados
        resultadosContainer.style.display = 'block';
    }

    console.log('Generador de Elementales listo');
}

// Inicialización
if (document.readyState === 'complete') {
    initElementales();
} else {
    document.addEventListener('DOMContentLoaded', initElementales);
}