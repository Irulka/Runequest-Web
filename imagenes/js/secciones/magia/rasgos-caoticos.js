function initVaritaDeseos() {
    console.log('Inicializando Varita de los Deseos...');

    const efectosVarita = {
        1: "El mismísimo dios Eurmal se encarna frente a lanzador.",
        2: "El deseo se cumple tal cual se solicitó, sin malinterpretaciones.",
        3: "El deseo se cumple, pero con ligeras diferencias con lo deseado.",
        4: "El deseo se cumple, pero con diferencias sustanciales co lo deseado.",
        5: "El deseo se cumple, pero con grandes diferencias con lo deseado.",
        6: "la situación que motiva el uso de la varita se soluciona, aunque no del modo deseado.",
        7: "A partir de ahora, el lanzador y el objetivo de la varita compartirán PMs propios, gastándose por igual cada vez alguno de ellos lance un conjuro.",
        8: "Un monstruo se materializa y ataca. Lanza 1d6 (1-Broo, 2-Pulpandante, 3-Jackoso, 4-Caracol Dragón, 5-Halfling caótico, 6-Hombre escorpión).",
        9: "A partir de ahora, el lanzador y el objetivo obtienen comunicación mental permanente.",
        10: "Eurmal no puede atenderte en este momento. Lo hará en la siguiente ocasión en que el lanzador esté en riesgo.",
        11: "A partir de ahora, la mitad del daño (una vez traspasada la armadura) que reciba tanto el lanzador como el objetivo, se reflejará en el otro.",
        12: "A partir de ahora, el lanzador y el objetivo compartirán el conocimiento de conjuros.",
        13: "El lanzador y el objetivo olvidarán un conjuro al azar.",
        14: "El lanzador pierde permanetnemente la capacidad de hablar, pero podrá imitar cualquier sonido, como puertas cerrándose, ruidos de animales. No podrá imitar voces.",
        15: "El lanzador será incapaz de hablar permanentemente. Únicamente podrá repetir la última frase que oiga.",
        16: "A partir de ahora, podrá prender chispas chasqueando los dedos, lo que le ayudará a encender pequeños fuegos (hogueras, antorchasc...).",
        17: "A partir de ahora, el lanzador podrá usar sus PV como si fueran PM.",
        18: "A partir de ahora, regenerará PM a la mitad de velocidad (1 punto cada dos horas).",
        19: "A partir de ahora, regenerará PM al doble de velocidad (2 puntos por hora).",
        20: "Durante 2d6 días, cada vez que vayas a recibir daño, retrocederás 1 segundo en el tiempo. Solo una vez por ataque.",
        21: "Puedes purificar agua removiéndola en una vasija o recipiente con el dedo.",
        22: "                                           ",
        23: "Reloj detenido: Todos los relojes se detienen por 1 minuto",
        24: "Sueño ligero: Induce somnolencia en un objetivo",
        25: "Ilusión menor: Crea una imagen estática del tamaño de una persona durante 1 minuto",
        26: "Piel de piedra: +1 a la defensa por 1d4 turnos",
        27: "Salto mejorado: Dobla tu distancia de salto",
        28: "Voz potente: Tu voz suena el doble de fuerte",
        29: "Dedos ágiles: +2 a abrir cerraduras por 1 hora",
        30: "Oído agudo: Escuchas sonidos lejanos claramente",
        31: "Noche clara: Puedes ver en la oscuridad como de día",
        32: "Equilibrio perfecto: No puedes caerte por 10 minutos",
        33: "Aliento fresco: Tu aliento huele a menta",
        34: "Memoria vívida: Recuerdas un evento pasado con claridad",
        35: "Piel resistente: Ignora el primer punto de daño recibido",
        36: "Reflejos felinos: +1 a esquivar por 1d6 turnos",
        37: "Caminar silencioso: No haces ruido al moverte",
        38: "Mano firme: +1 a ataques con armas arrojadizas",
        39: "Resistencia al veneno: +4 contra venenos",
        40: "Aliento bajo el agua: Puedes respirar agua por 1 minuto",
        41: "Piel ignífuga: Resistencia al fuego por 1 turno",
        42: "Paso ligero: No dejas huellas",
        43: "Vista de águila: Puedes ver detalles a 1 km de distancia",
        44: "Fuerza de gigante: Levantas el doble de peso",
        45: "Mente clara: +1 a tiradas de inteligencia",
        46: "Carisma natural: +1 a persuasión por 1 hora",
        47: "Sueño reparador: Duermes profundamente 1 hora",
        48: "Curación acelerada: Recuperas 1 PV por hora extra",
        49: "Piel cambiante: Tu piel cambia de color lentamente",
        50: "Curación leve: Restaura 1d8 puntos de vida a un objetivo",
        51: "Escudo mágico: +2 a defensa contra ataques mágicos",
        52: "Arma brillante: Tu arma emite luz tenue",
        53: "Protección elemental: Resistencia a un elemento aleatorio",
        54: "Voz de mando: Todos te escuchan cuando hablas",
        55: "Piel de acero: Ignora 2 puntos de daño físico",
        56: "Movimiento ágil: Puedes esquivar un ataque automáticamente",
        57: "Golpe certero: Tu próximo ataque es crítico",
        58: "Escudo reflejo: Refleja el 10% del daño recibido",
        59: "Paso veloz: Tu velocidad aumenta un 50%",
        60: "Mente blindada: Inmune a efectos mentales por 1 turno",
        61: "Alma resistente: +2 a todos los salvamentos",
        62: "Aura curativa: Cura 1 PV a aliados cercanos por turno",
        63: "Grito atronador: Aturde enemigos en 5 metros",
        64: "Toque paralizante: Puedes paralizar un objetivo",
        65: "Visión verdadera: Ves a través de ilusiones",
        66: "Piel de dragón: Resistencia a fuego y frío",
        67: "                                    ",
        68: "El lanzador o el objetivo se vuelven totalmente ignífigos (no sus pertenencias).",
        69: "El lanzador y el objetivo quedarán unidos por Eurmal. Siempre que interactuen tendrán que mentirse.",
        70: "Eurmal es generoso. Tira dos veces en la tabla.",
        71: "Pardillo: Los comerciantes te cobrarán siempre un 20% del precio habitual.",
        72: "Un elemental aparecerá y atacará al azar (1d4: 1-Tierra, 2-Agua, 3-Aire, 4-Fuego).",
        73: "Un espectro emerge de la varita y ataca a alguien al azar (PER 14, INT 11)",
        74: "El portador o el objetivo quedan cargados eléctricamente, dando descargas de 1d6 de daño al realizar ataques.",
        75: "El lanzador y el objetivo intercambian sus mentes durante 1d6 horas.",
        76: "Cualquier animal no monstruoso que vaya a atarcarlo, tendrá un 40% de posibilidades de salir huyendo.",
        77: "Aprendes una habilidad al 50% (1d4: 1-Alfarería, 2-Tejer, 3-Hacer cestos de mimbre, 4-Sombreros de paja).",
        78: "Se produce una estampida al estilo Jumanji. Serán necesarias dos tiradas de esquivar o de suerte para no ser arrollados.",
        79: "Pies extremadamente sudorosos. Habilidades como Trepar o Saltar tendrán un -20%)",
        80: "Cuando sufra una herida mortal, podrá tirar PERx2 al final del asalto para permanecer vivo.",
        81: "Un espíritu de fiebre cereblal (PER 13) atacará a alguien al azar. El poseido perderá 1 PER al día.",
        82: "El portador o el blanco, podrán resucitar una única vez al turno siguiente de morir, con 2 PV.",
        83: "Si un miembro es amputado en el futuro, le volverá a crecer solo durante 1d6 días.",
        84: "Una gruesa capa de enredaderas espinosas crecerá velozmenete, envolviendo al objetivo pero sin causarle daño (10 PA).",
        85: "Durante 2d8 días los genitales y el ano del objetivo de la varita se fusionan en una cloaca similar a la de las aves.",
        86: "La INT del personaje no cambia, pero su inteligencia libre varía en 1d6-2",
        87: "Si hay árboles presentes, uno de ellos se transformará en un furioso árbol de guerra.",
        88: "Un extraño pliegue de piel aparece en tu cuerpo, permitíendote usarlo como un pequeño bolsillo oculto.",
        89: "Un personaje cercano al azar, será automaticamente poseido por un espíritu animal (rana, cerdo, gallina,cabra,...) durante 10 minutos.",
        90: "Lenguaje visual. El portador y el blanco podrán comunicarse mediante sencillos gestos que solo entenderán ellos.",
        91: "Un fuerte terremoto sacude todo. Serán necesarios chequeos de DesX4 para permanecer de pié, y de DesX2 para poder correr o luchar.",
        92: "El lanzador gana permanentemente 1 punto de Destreza.",
        93: "El lanzador pierde permanentemente 1 punto de Destreza.",
        94: "El portador o el objetivo se teletransportará a una distancia aproximada de 100 metros.",
        95: "Narcolepsia bajo presión. En situaciones críticas el lanzador o el objetivo (a discrección del DJ), se dormirá si obtiene un 6 en una tirada de 1D6.",
        96: "Un rallo cae en el lugar del objetivo de la varita, provocando 5D6 de daño. En dicho lugar, aparecerá un objeto mágico.",
        97: "Adquiere un rasgo caótico al azar.",
        98: "Recibe un conjuro divino de Eurmal.",
        99: "Un espíritu de curación con PER 15 trata de poseer al portador. Si lo consigu, permanecerá con el hasta agotar todos sus PM.",
        100: "El deseo se cumple con exactitud, pero el lanzador o el objetivo muere en el acto."
    };

    // Elementos de la interfaz con verificación
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnManual = document.getElementById('btn-manual');
    const inputValor = document.getElementById('input-valor');
    const resultadosContainer = document.querySelector('.resultados-container');
    const resultadoPrincipal = document.getElementById('resultado-principal');
    const resultadoAnterior = document.getElementById('resultado-anterior');
    const resultadoSiguiente = document.getElementById('resultado-siguiente');

    // Verificación crítica de elementos
    if (!btnAleatorio || !btnManual || !resultadosContainer) {
        console.error('Error: Elementos esenciales no encontrados en el DOM');
        return;
    }

    // Estado inicial
    let ultimoResultado = null;
    inputValor.style.display = 'none';
    resultadosContainer.style.display = 'none';

    // Función para obtener efecto mágico
    const obtenerEfecto = (valor) => {
        return efectosVarita[valor] || `Efecto misterioso (${valor}): El DJ decide el resultado`;
    };

    // Función para mostrar resultados
    const mostrarResultados = (valor) => {
        console.log(`Mostrando resultado para: ${valor}`);
        
        // Actualizar resultados
        if (resultadoPrincipal) {
            resultadoPrincipal.querySelector('.resultado-valor').textContent = valor;
            resultadoPrincipal.querySelector('.resultado-efecto').textContent = obtenerEfecto(valor);
        }

        if (resultadoAnterior && valor > 1) {
            resultadoAnterior.querySelector('.resultado-valor').textContent = valor - 1;
            resultadoAnterior.querySelector('.resultado-efecto').textContent = obtenerEfecto(valor - 1);
            resultadoAnterior.style.display = 'block';
        } else if (resultadoAnterior) {
            resultadoAnterior.style.display = 'none';
        }

        if (resultadoSiguiente && valor < 100) {
            resultadoSiguiente.querySelector('.resultado-valor').textContent = valor + 1;
            resultadoSiguiente.querySelector('.resultado-efecto').textContent = obtenerEfecto(valor + 1);
            resultadoSiguiente.style.display = 'block';
        } else if (resultadoSiguiente) {
            resultadoSiguiente.style.display = 'none';
        }

        // Mostrar elementos
        resultadosContainer.style.display = 'block';
        ultimoResultado = valor;
    };

    // Event Listeners con manejo de errores
    try {
        btnAleatorio.addEventListener('click', () => {
            const valor = Math.floor(Math.random() * 100) + 1;
            console.log('Tirada aleatoria:', valor);
            inputValor.style.display = 'none';
            mostrarResultados(valor);
        });

        btnManual.addEventListener('click', () => {
            inputValor.style.display = inputValor.style.display === 'none' ? 'block' : 'none';
            if (inputValor.style.display === 'block') inputValor.focus();
        });

        inputValor.addEventListener('change', (e) => {
            const valor = parseInt(e.target.value);
            if (!isNaN(valor) && valor >= 1 && valor <= 100) {
                mostrarResultados(valor);
                e.target.value = '';
                inputValor.style.display = 'none';
            } else {
                alert('Por favor, introduce un número entre 1 y 100');
                inputValor.focus();
            }
        });

    } catch (error) {
        console.error('Error al asignar event listeners:', error);
    }

    console.log('Varita de los Deseos lista para usar');
}

// Inicialización condicional
if (document.readyState === 'complete') {
    initVaritaDeseos();
} else {
    document.addEventListener('DOMContentLoaded', initVaritaDeseos);
}