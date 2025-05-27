(function() {
// Elementos de la interfaz
const UI = {
    btnCuracion: document.getElementById('btn-curacion'),
    btnEnfermedad: document.getElementById('btn-enfermedad'),
    btnFantasma: document.getElementById('btn-fantasma'),
    btnPasion: document.getElementById('btn-pasion'),
    btnVegetal: document.getElementById('btn-vegetal'),
    resultados: document.getElementById('resultados-espiritu'),
    tablaEspiritu: document.getElementById('espiritu-tbody'),
    tablaHabilidades: document.getElementById('habilidades-tbody'),
    seccionEnfermedad: document.getElementById('enfermedad-info'),
    tablaEnfermedad: document.getElementById('enfermedad-tbody'),
    seccionPasion: document.getElementById('pasion-info'),
    tablaPasion: document.getElementById('pasion-tbody'),
    seccionFantasma: document.getElementById('fantasma-info'),
    tablaFantasma: document.getElementById('fantasma-tbody'),
    seccionVegetal: document.getElementById('vegetal-info'),
    tablaVegetal: document.getElementById('vegetal-tbody')
};

// Lista de enfermedades posibles
const enfermedades = [
    {
        nombre: "Fiebre Cerebral",
        descripcion: "Ataca la INT de la víctima. Cuando la INT llega a 0, la víctima entra en coma y muere."
    },
    {
        nombre: "Escalofríos Persistentes",
        descripcion: "Ataca la CON del aventurero. Cuando CON llega a 1-2, queda inconsciente; a 0, muere."
    },
    {
        nombre: "Los Temblores",
        descripcion: "Reduce la DEX hasta dejar a la víctima sin control motor."
    },
    {
        nombre: "Desgaste del Alma",
        descripcion: "Ataca el POD en el Mundo Espiritual. Si el POD llega a 0, el alma deja de existir."
    },
    {
        nombre: "Enfermedad Debilitante",
        descripcion: "Reduce la FUE. Cuando llega a 0, el aventurero queda indefenso y muere."
    }
];

// Lista de pasiones posibles
const pasiones = [
    {
        nombre: "Miedo",
        descripcion: "La víctima se vuelve Desmoralizada (como el hechizo de espíritu) hasta que el espíritu sea exorcizado."
    },
    {
        nombre: "Odio",
        descripcion: "La víctima desarrolla un Odio intenso al 100% hacia una cosa o persona. Actuará maliciosamente cuando el objeto de odio esté cerca."
    },
    {
        nombre: "Hambre",
        descripcion: "La víctima ansía comida. Puede comer cualquier cosa o un tipo específico (como carne humana). Puede hacerse daño comiendo objetos peligrosos."
    },
    {
        nombre: "Impotencia",
        descripcion: "La víctima se vuelve impotente y pierde -50% de su Runa de Fertilidad."
    },
    {
        nombre: "Lujuria",
        descripcion: "La víctima desarrolla una Lujuria intensa al 100% hacia miembros de una especie específica."
    },
    {
        nombre: "Locura",
        descripcion: "La víctima sufre ataques de locura. En situaciones estresantes, el espíritu compara su POD con el de la víctima. Si gana, la víctima queda incapacitada (gritando, riendo o en coma) por 1D20 horas."
    },
    {
        nombre: "Ira",
        descripcion: "La víctima atacará al ser animado más cercano en un frenesí, como si estuviera bajo el hechizo de la Runa Berserker."
    }
];

// Lista de tipos de plantas para espíritus vegetales
const tiposVegetales = [
    "Árbol",
    "Flor",
    "Hongo",
    "Enredadera",
    "Arbusto",
    "Hierba",
    "Musgo",
    "Liquen"
];

// Lista de hechizos típicos para espíritus vegetales
const hechizosVegetales = [
    "Confusión",
    "Contramagia",
    "Detectar Vida",
    "Disipar Magia",
    "Curar",
    "Protección",
    "Pantalla Espiritual",
    "Fuerza"
];

// Función para tirar dados (ejemplo: "3D6" => tira 3 dados de 6 caras)
function tirarDados(notacion) {
    const [numDados, caras] = notacion.split('D').map(Number);
    let total = 0;
    for (let i = 0; i < numDados; i++) {
        total += Math.floor(Math.random() * caras) + 1;
    }
    return total;
}

// Función para generar un espíritu según tipo
function generarEspiritu(tipo) {
    // Reiniciar selección de botones
    UI.btnCuracion.classList.remove('seleccionado');
    UI.btnEnfermedad.classList.remove('seleccionado');
    UI.btnFantasma.classList.remove('seleccionado');
    UI.btnPasion.classList.remove('seleccionado');
    UI.btnVegetal.classList.remove('seleccionado');
    
    // Marcar botón seleccionado
    document.getElementById(`btn-${tipo}`).classList.add('seleccionado');
    
    // Generar características base
    let espiritu = {};
    
    if (tipo === 'fantasma') {
        // Características especiales para fantasmas
        const POD = tirarDados('4D6');
        const INT = tirarDados('2D6') + 6;
        const CHA = tirarDados('3D6');
        
        espiritu = {
            tipo: 'Fantasma',
            POD: POD,
            INT: INT,
            CHA: CHA,
            MOV: POD, // Movimiento igual a POD
            PM: POD, // Puntos de magia igual a POD
            ataque: 70, // Ataque en combate espiritual fijo en 70%
            magia: "Puede tener cualquier tipo de magia (a elección del director de juego)"
        };
    } else if (tipo === 'vegetal') {
        // Características especiales para espíritus vegetales
        const POD = tirarDados('1D6') + Math.floor(Math.random() * 5) * 6; // 1D6 a 5D6+6
        const INT = tirarDados('3D6') + (Math.random() > 0.5 ? 0 : tirarDados('1D6')); // 3D6 o 4D6
        const CHA = tirarDados('1D3') + (Math.random() > 0.5 ? 0 : tirarDados('3D6') + 6); // 1D3 o 3D6+6
        const tipoPlanta = tiposVegetales[Math.floor(Math.random() * tiposVegetales.length)];
        
        // Generar hechizos aleatorios
        const numHechizos = Math.min(CHA, hechizosVegetales.length);
        const hechizos = [];
        const hechizosDisponibles = [...hechizosVegetales];
        
        for (let i = 0; i < numHechizos; i++) {
            const randomIndex = Math.floor(Math.random() * hechizosDisponibles.length);
            hechizos.push(hechizosDisponibles.splice(randomIndex, 1)[0]);
        }
        
        espiritu = {
            tipo: 'Vegetal (' + tipoPlanta + ')',
            POD: POD,
            INT: INT,
            CHA: CHA,
            MOV: POD, // Movimiento igual a POD
            PM: POD * 2, // Puntos de magia igual al doble de POD
            ataque: POD * 5, // Ataque en combate espiritual igual a POD×5%
            magia: hechizos.join(", "),
            tipoPlanta: tipoPlanta
        };
    } else {
        // Características para otros espíritus
        const POD = tirarDados('3D6') + 6;
        espiritu = {
            tipo: tipo === 'curacion' ? 'Curación' : 
                  tipo === 'enfermedad' ? 'Enfermedad' : 'Pasión',
            POD: POD,
            MOV: POD, // Movimiento igual a POD
            ataque: 75, // Ataque en combate espiritual fijo en 75%
            enfermedad: null,
            pasion: null
        };
    }

    // Mostrar secciones según tipo
    UI.seccionEnfermedad.style.display = tipo === 'enfermedad' ? 'block' : 'none';
    UI.seccionPasion.style.display = tipo === 'pasion' ? 'block' : 'none';
    UI.seccionFantasma.style.display = tipo === 'fantasma' ? 'block' : 'none';
    UI.seccionVegetal.style.display = tipo === 'vegetal' ? 'block' : 'none';

    // Asignar enfermedad si es espíritu de enfermedad
    if (tipo === 'enfermedad') {
        const randomIndex = Math.floor(Math.random() * enfermedades.length);
        espiritu.enfermedad = enfermedades[randomIndex];
    } 
    // Asignar pasión si es espíritu de pasión
    else if (tipo === 'pasion') {
        const randomIndex = Math.floor(Math.random() * pasiones.length);
        espiritu.pasion = pasiones[randomIndex];
    }

    // Mostrar resultados
    mostrarEspiritu(espiritu);
}

// Función para mostrar los resultados del espíritu generado
function mostrarEspiritu(espiritu) {
    // Limpiar tablas anteriores
    UI.tablaEspiritu.innerHTML = '';
    UI.tablaHabilidades.innerHTML = '';
    UI.tablaEnfermedad.innerHTML = '';
    UI.tablaPasion.innerHTML = '';
    UI.tablaFantasma.innerHTML = '';
    UI.tablaVegetal.innerHTML = '';

    // Mostrar características principales
    let caracteristicas = [];
    
    if (espiritu.tipo === 'Fantasma') {
        caracteristicas = [
            { nombre: 'POD (Poder)', valor: espiritu.POD, detalles: 'Tirada de 4D6' },
            { nombre: 'INT (Inteligencia)', valor: espiritu.INT, detalles: 'Tirada de 2D6+6' },
            { nombre: 'CAR (Carisma)', valor: espiritu.CHA, detalles: 'Tirada de 3D6' },
            { nombre: 'Movimiento', valor: espiritu.MOV, detalles: 'Igual al valor de POD' },
            { nombre: 'Puntos de Magia', valor: espiritu.PM, detalles: 'Igual al valor de POD' },
            { nombre: 'Ataque Espiritual', valor: `${espiritu.ataque}%`, detalles: 'Fijo en 70% para fantasmas' }
        ];
    } else if (espiritu.tipo.startsWith('Vegetal')) {
        caracteristicas = [
            { nombre: 'POD (Poder)', valor: espiritu.POD, detalles: 'Tirada de 1D6 a 5D6+6' },
            { nombre: 'INT (Inteligencia)', valor: espiritu.INT, detalles: 'Tirada de 3D6 a 4D6' },
            { nombre: 'CAR (Carisma)', valor: espiritu.CHA, detalles: 'Tirada de 1D3 a 3D6+6' },
            { nombre: 'Movimiento', valor: espiritu.MOV, detalles: 'Igual al valor de POD' },
            { nombre: 'Puntos de Magia', valor: espiritu.PM, detalles: 'Igual al doble del valor de POD' },
            { nombre: 'Ataque Espiritual', valor: `${espiritu.ataque}%`, detalles: 'Igual a POD×5%' }
        ];
    } else {
        caracteristicas = [
            { nombre: 'POD (Poder)', valor: espiritu.POD, detalles: 'Tirada de 3D6+6' },
            { nombre: 'Movimiento', valor: espiritu.MOV, detalles: 'Igual al valor de POD' },
            { nombre: 'Ataque Espiritual', valor: `${espiritu.ataque}%`, detalles: 'Fijo en 75% para estos espíritus' }
        ];
    }

    caracteristicas.forEach(car => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${car.nombre}</td>
            <td>${car.valor}</td>
            <td>${car.detalles}</td>
        `;
        UI.tablaEspiritu.appendChild(fila);
    });

    // Mostrar habilidades especiales
    let habilidades = [];
    
    if (espiritu.tipo === 'Enfermedad') {
        habilidades = [
            { 
                tipo: 'Combate Espiritual', 
                descripcion: 'Si ataca con éxito y la víctima falla, puede intentar infectarla con su enfermedad.' 
            },
            { 
                tipo: 'Infección', 
                descripcion: 'Requiere superar el Combate Espiritual del objetivo. Un éxito infecta con la forma aguda, dos éxitos con la forma grave.' 
            },
            { 
                tipo: 'Derrota del Espíritu', 
                descripcion: 'Si la víctima derrota al espíritu, gana inmunidad por 1 año y roba 1D3 puntos de POD del espíritu.' 
            }
        ];
    } 
    else if (espiritu.tipo === 'Pasión') {
        habilidades = [
            { 
                tipo: 'Posesión', 
                descripcion: 'Si derrota a una criatura en combate espiritual (reduciendo sus PM a 0), la posee en secreto, maldiciéndola con una pasión emocional.' 
            },
            { 
                tipo: 'Efecto', 
                descripcion: 'La pasión específica afecta el comportamiento de la víctima hasta que el espíritu sea exorcizado.' 
            },
            { 
                tipo: 'Exorcismo', 
                descripcion: 'Requiere magia espiritual o intervención divina para liberar a la víctima de la posesión.' 
            }
        ];
    }
    else if (espiritu.tipo === 'Fantasma') {
        habilidades = [
            { 
                tipo: 'Posesión', 
                descripcion: 'Si reduce los PM de un oponente a 0 en combate espiritual, puede poseer a la víctima. Permanece atado a su lugar u objeto.' 
            },
            { 
                tipo: 'Formas', 
                descripcion: 'Puede cambiar de forma (nube oscura, formas humanas o animales, incluso enviar partes de su cuerpo por separado).' 
            },
            { 
                tipo: 'Locura', 
                descripcion: 'Muchos fantasmas están locos y odian a los vivos. Un encuentro puede dejar efectos permanentes.' 
            },
            { 
                tipo: 'Magia', 
                descripcion: espiritu.magia 
            }
        ];
    }
    else if (espiritu.tipo.startsWith('Vegetal')) {
        habilidades = [
            { 
                tipo: 'Apariencia', 
                descripcion: `En el Mundo Espiritual toman forma de Aldryami (${espiritu.tipoPlanta === 'Hongo' ? 'elfos negros' : 'elfos, dríadas o corredores'}). ${espiritu.tipoPlanta === 'Flor' ? 'Algunos tienen alas transparentes.' : ''}` 
            },
            { 
                tipo: 'Magia', 
                descripcion: `Conoce los siguientes hechizos: ${espiritu.magia || 'Ninguno'}` 
            },
            { 
                tipo: 'Posesión', 
                descripcion: 'Raramente poseen huéspedes físicos, pero algunos espíritus vegetales malignos poseen a aquellos que derrotan en combate espiritual.' 
            },
            { 
                tipo: 'Efectos', 
                descripcion: 'Las víctimas de posesión pueden sufrir efectos similares al hechizo de Locura o a la habilidad especial Muerte Lenta.' 
            },
            { 
                tipo: 'Conocimiento', 
                descripcion: 'Muchos espíritus vegetales son conscientes de sí mismos y tienen gran conocimiento de su área.' 
            }
        ];
    }
    else {
        habilidades = [
            { 
                tipo: 'Combate Espiritual', 
                descripcion: 'Puede combatir enfermedades en el cuerpo de un infectado, expulsándolas si tiene éxito.' 
            },
            { 
                tipo: 'Curación', 
                descripcion: 'Si encuentra un espíritu de enfermedad, pueden neutralizarse mutuamente en combate.' 
            },
            { 
                tipo: 'Derrota del Espíritu', 
                descripcion: 'Si es poseído por un espíritu de enfermedad, pierde sus habilidades curativas.' 
            }
        ];
    }

    habilidades.forEach(habilidad => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${habilidad.tipo}</td>
            <td>${habilidad.descripcion}</td>
        `;
        UI.tablaHabilidades.appendChild(fila);
    });

    // Mostrar enfermedad si corresponde
    if (espiritu.enfermedad) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${espiritu.enfermedad.nombre}</td>
            <td>${espiritu.enfermedad.descripcion}</td>
        `;
        UI.tablaEnfermedad.appendChild(fila);
    }

    // Mostrar pasión si corresponde
    if (espiritu.pasion) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${espiritu.pasion.nombre}</td>
            <td>${espiritu.pasion.descripcion}</td>
        `;
        UI.tablaPasion.appendChild(fila);
    }

    // Mostrar información de fantasma si corresponde
    if (espiritu.tipo === 'Fantasma') {
        const infoFantasma = [
            { 
                atributo: 'Naturaleza', 
                descripcion: 'Espíritu de los muertos inquietos, atado a un lugar u objeto específico. No puede abandonarlo o debe regresar.' 
            },
            { 
                atributo: 'Visibilidad', 
                descripcion: 'Puede hacerse visible a voluntad y entablar combate espiritual con intrusos.' 
            },
            { 
                atributo: 'Efectos', 
                descripcion: 'Un encuentro con un fantasma puede dejar efectos duraderos o permanentes, dependiendo del sufrimiento de la víctima y el éxito del fantasma.' 
            },
            { 
                atributo: 'Variedad', 
                descripcion: 'Algunos fantasmas son pasivos o incluso agradables, pero la mayoría son malignos y odian a los vivos.' 
            }
        ];

        infoFantasma.forEach(info => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${info.atributo}</td>
                <td>${info.descripcion}</td>
            `;
            UI.tablaFantasma.appendChild(fila);
        });
    }

    // Mostrar información de vegetal si corresponde
    if (espiritu.tipo.startsWith('Vegetal')) {
        const infoVegetal = [
            { 
                atributo: 'Naturaleza', 
                descripcion: 'Espíritu de plantas y hongos específicos. En el Mundo Espiritual toman forma de seres feéricos.' 
            },
            { 
                atributo: 'Vinculación', 
                descripcion: 'A menudo están vinculados a lugares sagrados o áreas naturales importantes.' 
            },
            { 
                atributo: 'Magia', 
                descripcion: 'Los chamanes a menudo hacen pactos con espíritus vegetales poderosos para obtener conocimiento o poder.' 
            },
            { 
                atributo: 'Almacenamiento', 
                descripcion: 'Los magos a menudo los enlazan en cristales o matrices espirituales como fuente de puntos de magia.' 
            },
            { 
                atributo: 'Variedad', 
                descripcion: 'Los espíritus de flores suelen ser más pequeños y delicados, mientras que los de árboles son más poderosos.' 
            }
        ];

        infoVegetal.forEach(info => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${info.atributo}</td>
                <td>${info.descripcion}</td>
            `;
            UI.tablaVegetal.appendChild(fila);
        });
    }

    // Mostrar sección de resultados
    UI.resultados.style.display = 'block';
}

// --------------------------
// CONFIGURACIÓN DE BOTONES
// --------------------------

function configurarBotones() {
    UI.btnCuracion.addEventListener('click', () => generarEspiritu('curacion'));
    UI.btnEnfermedad.addEventListener('click', () => generarEspiritu('enfermedad'));
    UI.btnFantasma.addEventListener('click', () => generarEspiritu('fantasma'));
    UI.btnPasion.addEventListener('click', () => generarEspiritu('pasion'));
    UI.btnVegetal.addEventListener('click', () => generarEspiritu('vegetal'));
}

// --------------------------
// INICIALIZACIÓN
// --------------------------

function init() {
    configurarBotones();
    console.log('Generador de espíritus inicializado');
}

// Manejo de carga
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 10);
} else {
    document.addEventListener('DOMContentLoaded', init);
}
})();