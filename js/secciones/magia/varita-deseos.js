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
        16: "A partir de ahora, podrá prender chispas chasqueando los dedos, lo que le ayudará a encender pequeños fuegos (hogueras, antorchas,...).",
        17: "A partir de ahora, el lanzador podrá usar sus PV como si fueran PM.",
        18: "A partir de ahora, regenerará PM a la mitad de velocidad (1 punto cada dos horas).",
        19: "A partir de ahora, regenerará PM al doble de velocidad (2 puntos por hora).",
        20: "Durante 2d6 días, cada vez que vayas a recibir daño, retrocederás 1 segundo en el tiempo. Solo una vez por ataque.",
        21: "Puedes purificar agua removiéndola en una vasija o recipiente con el dedo.",
        22: "El portador podrá saltar una distancia igual a su FUE. Será necesario un segundo chequeo de saltar para caer sin sufrir daños.",
        23: "Regeración: Sanará 1PG por hora, de forma natural.",
        24: "Extremidad sensible: Una localización al azar recigirá siempre un punto adicional de daño.",
        25: "El Callo: Parte del cuerpo endurecida. Armadura natural de 1 en localización al azar.",
        26: "Mientras mantenga los dos brazos estirados en alto, podrá entender otro idioma (al azar), pero no hablarlo. ",
        27: "Recibe un conjuro al azar (si dispone de INT Libre).",
        28: "Tacaño extremo: Deberá superar un chequeo de INTx4 antes de poder gastar su dinero en cualquier cosa.",
        29: "Una vez al día puede comprimir todo su cuerpo hasta alcanzar la mitad de tamaño, presentando un aspecto retorcido y deforme.",
        30: "El tiempo se ralentiza para todos excepto para el lanzador, durante 1 asalto.",
        31: "Lapsus de memoria: Olvidará algo que sabía. Elige una habilidad al azar y resta 10%.",
        32: "Resistente a la magia: Cualquier conjuro lanzado contra el, reducirá su intensidad en 1.",
        33: "Durante 2d6 turnos lloverán monedas, las cuales caen con mucha fuerza DESx3 para evitarlas. 1D8 de daño.",
        34: "Ojos de camaleón: Pueden moverse de forma independiente. No sirve de nada y da mucha grima.",
        35: "Paranofobia: Chequeo de INTx4 para evitar Terror a (1d6): 1-lombrices, 2-sombreros con plumas, 3-flautas, 4-el eco, 5-el ajo, 6-las manos belludas.",
        36: "Olfato Desarrollado: Oler y rastrear cualqueir cosa que emita un olor particular +25%.",
        37: "Te divierte la infiltración: +25% en Ocultarse y en Deslizarse en Silencio. Esto te provoca risa, que podrás contener con chequeos de INTx4.",
        38: "Al portador o al blanco le crecerá una enorme berruga que contiene una matriz: 1d4 (1-Esp. Conjuro, 2-Matriz PM, 3-Esp PER, 4-Elemento).",
        39: "Resistencia al veneno: +20% en tus chequeos para resistir venenos.",
        40: "Inquina: Alguien a quien no conoces, en un radio de 30km, sentirá un profundo odio por ti y te buscará para matarte.",
        41: "Prestigititador: Puedes hacer desaparecer en tus manos objetos pequeños. Desaparecer para siempre.",
        42: "Aparece un dedo adicional en una extremidad. Ni beneficia ni perjudica, pero deberá llevar guantes o zapatos hechos a medida.",
        43: "Deflector: Cualquier conjuro ofensivo se volverá contra su lanzador durante 2d4 semanas.",
        44: "Pulmones de Acero: Los chequeos de Asfixia bajarán un nivel cada dos asaltos.",
        45: "Su orina se convierte en un filtro curativo capaz de sanar 1d6 PV instantaneamente. Sigue sabiendo a orina.",
        46: "No te quedes sin cambio: Con cada deposición, el portador podrá defecar 1d6 monedas mezcladas con los excrementos.",
        47: "Toserá de forma compulsiva cada vez que mienta.",
        48: "El favorito del Embaucador. De forma permanente, cualquier resultado de 1-5 se considera crítico.",
        49: "No podrá recibir ningún conjuro beneficioso o de combate durante 2d8 horas.",
        50: "No ocurre absolutamente nada. En serio. Nada.",
        51: "Lluvia de fuego durante 1d6 asaltos. El fuego causa 1d6 puntos de daño.",
        52: "Todos los conjuros activos en un radio de 20m son dispersados.",
        53: "Todo aquel en un radio de 30m que no supere un chequeo de INTx3 quedará  confundido durante 2d4 turnos.",
        54: "Inmune a la magia durante 1d4 días.",
        55: "Manos y pies de lagartija: +40% a tus posibilidades de trepar si no usas zapatos ni guantes",
        56: "El Tesoro: Obsesión enfermiza por un objeto de tu propiedad. No permitirás que le pase nada ni que lo toque nadie.",
        57: "Manos curativas ardientes: Puedes sanar 1d6 PV por asalto a un objetivo mientras recibes 1d4 de daño por fuego.",
        58: "Odio racial insuperable contra la raza del objetivo o una al azar.",
        59: "Maldito por Eurmal: El rango de pifia será siempre 95-100.",
        60: "Inmune al daño mágico durante 2d4 días.",
        61: "El portador emitirá luz cegadora durante 1d6 turnos. Alcance 20 metros.",
        62: "Un rayo caerá del cielo, impactando a cualquier ser consciente en un radio de 10 metros. 5D6 de daño.No protege armadura.",
        63: "El personaje podrá oir los pensamientos de la gente durante 3d6 días.",
        64: "El personaje podrá matar a un personaje en su línea de visión, como si de un conjuro de Separación del Alma se tratase. Un solo uso.",
        65: "Ingravidez: todos los personajes en un radio de 30m comenzarán a flotar. Se podrán realizar tiradas de Nadar y Saltar para desplazase.",
        66: "Tu movimiento por MR aumenta en 1 permanentemente.",
        67: "La mirada de Thulsa:                          ",
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