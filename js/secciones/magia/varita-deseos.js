function initVaritaDeseos() {
    console.log('Inicializando Varita de los Deseos...');

    const efectosVarita = {
        1: "¡Polvo de hadas! Todos en 10 metros estornudan durante 1d6 turnos",
        2: "Chispa luminosa: Crea una pequeña luz que dura 1d10 minutos",
        3: "Susurro del viento: Escuchas un mensaje en un idioma desconocido",
        4: "Piel de rana: Tu piel se vuelve verde y húmeda por 1 hora",
        5: "Ilusión de sonido: Reproduce un sonido aleatorio de la naturaleza",
        6: "Cambio de color: Un objeto cercano cambia de color aleatoriamente",
        7: "Olor a quemado: El aire huele a madera quemada por 10 minutos",
        8: "Atracción magnética: Los objetos metálicos pequeños se pegan entre sí",
        9: "Reflejo distorsionado: Los espejos muestran imágenes alteradas",
        10: "Viento suave: Una brisa constante sopla a tu alrededor",
        11: "Luz tenue: Genera una luz equivalente a una vela",
        12: "Eco persistente: Tus palabras se repiten 3 veces",
        13: "Piel dorada: Tu piel brilla débilmente en la oscuridad",
        14: "Frío repentino: La temperatura baja 10 grados por 1 minuto",
        15: "Flor instantánea: Hace crecer una flor en tierra cercana",
        16: "Sabor metálico: Todo sabe a metal por 1d6 minutos",
        17: "Niebla ligera: Genera un banco de niebla de 3 metros",
        18: "Risa incontrolable: Debes reírte durante 1d4 turnos",
        19: "Pájaros cantores: Atrae pájaros cantores por 5 minutos",
        20: "Sombras danzantes: Las sombras cobran vida brevemente",
        21: "Agua pura: Purifica 1 litro de agua",
        22: "Hoja perpetua: Una hoja cae flotando sin fin",
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
        67: "Salto prodigioso: Saltas hasta 10 metros",
        68: "Golpe demoledor: Tu ataque ignora armadura",
        69: "Esquivar imposible: Tu ataque no puede ser esquivado",
        70: "Muro de viento: Crea un muro de viento que bloquea proyectiles",
        71: "Piel de titanio: +3 a defensa por 1d4 turnos",
        72: "Golpe eléctrico: Tu ataque causa daño eléctrico extra",
        73: "Escudo sagrado: Absorbe 5 puntos de daño mágico",
        74: "Voz curativa: Tus palabras curan 1d4 PV",
        75: "Fuerza arcana: +2 al daño en el próximo ataque",
        76: "Toque vampírico: Roba 1d6 PV al atacar",
        77: "Escudo de fuerza: Bloquea completamente un ataque",
        78: "Golpe congelante: Congela parcialmente al objetivo",
        79: "Piel de diamante: Inmune al primer ataque recibido",
        80: "Resurrección menor: Revive con 1 PV si mueres en 1 minuto",
        81: "Telepatía breve: Lee pensamientos por 1 turno",
        82: "Teletransporte menor: Te mueves 3 metros instantáneamente",
        83: "Invisibilidad momentánea: Invisible por 1 turno",
        84: "Control elemental: Manipula un elemento pequeño",
        85: "Mente dominante: Controla una criatura débil por 1 turno",
        86: "Piel etérea: 50% de evitar daño físico",
        87: "Golpe dimensional: Atraviesa armaduras",
        88: "Escudo temporal: Retrocedes 1 segundo en el tiempo al ser golpeado",
        89: "Visión de rayos X: Ves a través de objetos delgados",
        90: "Regeneración rápida: Cura 1d4 PV por turno",
        91: "Aura de poder: +1 a todos los ataques cercanos",
        92: "Grito de batalla: Todos los aliados reciben +1 al daño",
        93: "Campo antimagia: Anula magias de nivel 1 cercanas",
        94: "Piel de fénix: Revives una vez si mueres",
        95: "Golpe celestial: Daño doble contra no muertos",
        96: "Escudo arcano: Absorbe 10 puntos de daño mágico",
        97: "Toque de muerte: 5% de matar instantáneamente",
        98: "Teletransporte: Viajas hasta 30 metros",
        99: "Invisibilidad: Eres invisible por 1d6 turnos",
        100: "Deseo limitado: Cumple un deseo simple (el Director de Juego decide los límites)"
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