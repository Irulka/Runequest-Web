// Funciones de utilidad para dados
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(numDice, sides) {
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}

// Tablas de modificadores
const damageBonusTable = {
    '1-12': '-1D4',
    '13-24': 'Ninguno',
    '25-32': '+1D4',
    '33-40': '+1D6',
    '41-56': '+2D6',
    'each +16': '+1D6' // Significa +1D6 por cada 16 puntos por encima de 56
};

// TABLA PARA DAÑO EN COMBATE ESPIRITUAL
const spiritualDamageTable = {
    '2-12': '1D3',
    '13-24': '1D6',
    '25-32': '1D6+1',
    '33-40': '1D6+3',
    '41-56': '2D6+3',
    'each +16': '1D6+1' // Por cada 16 puntos por encima de 56
};

const healingRateTable = {
    '1-6': 1,
    '7-12': 2,
    '13-18': 3,
    'each +6': 1 // Significa +1 por cada 6 puntos por encima de 18
};

const powHitPointModifiers = {
    '1-4': -1,
    '5-16': 0, // Sin modificar
    '17-20': 1,
    '21-24': 2,
    '25-28': 3,
    'each +4': 1 // Por cada 4 puntos más de POD a partir de 28
};

const sizHitPointModifiers = {
    '1-4': -2,
    '5-8': -1,
    '9-12': 0, // Sin modificar
    '13-16': 1,
    '17-20': 2,
    '21-24': 3,
    '25-28': 4,
    'each +4': 1 // Por cada 4 puntos más de TAM a partir de 28
};

const hitLocationTable = {
    '1-6': { 'Each Leg': 2, 'Abdomen': 2, 'Chest': 3, 'Each Arm': 1, 'Head': 2 },
    '7-9': { 'Each Leg': 3, 'Abdomen': 3, 'Chest': 4, 'Each Arm': 2, 'Head': 3 },
    '10-12': { 'Each Leg': 4, 'Abdomen': 4, 'Chest': 5, 'Each Arm': 3, 'Head': 4 },
    '13-15': { 'Each Leg': 5, 'Abdomen': 5, 'Chest': 6, 'Each Arm': 4, 'Head': 5 },
    '16-18': { 'Each Leg': 6, 'Abdomen': 6, 'Chest': 7, 'Each Arm': 5, 'Head': 6 },
    '19-21': { 'Each Leg': 7, 'Abdomen': 7, 'Chest': 8, 'Each Arm': 6, 'Head': 7 },
    'each +3': { 'Each Leg': 1, 'Abdomen': 1, 'Chest': 1, 'Each Arm': 1, 'Head': 1 } // +1 PV por cada 3 puntos por encima de 21
};

const skillCategoryModifiers = {
    'Agility': {
        'STR': { '1-4': -5, '17-20': 5, 'each +4': 5, 'default': 0 },
        'SIZ': { '1-4': -5, '17-20': 5, 'each +4': 5, 'default': 0 },
        'POW': { '1-4': -5, '17-20': 5, 'each +4': 5, 'default': 0 },
        'DEX': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 }
    },
    'Communication': {
        'CHA': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'INT': { '1-4': -5, '5-16': 0, '17-20': 5, 'each +4': 5, 'default': 0 },
        'POW': { '1-4': -5, '5-16': 0, '17-20': 5, 'each +4': 5, 'default': 0 },
    },
    'Knowledge': {
        'INT': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'POW': { '1-4': -5, '17-20': 5, 'each +4': 5, 'default': 0 }
    },
    'Manipulation': {
        'STR': { '1-4': -5, '5-16': 0, '17-20': 5, 'each +4': 5, 'default': 0 },
        'DEX': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'INT': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'POW': { '1-4': -5, '17-20': 5, 'each +4': 5, 'default': 0 },
    },
    'Perception': {
        'INT': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'POW': { '1-4': -5, '5-8': 0, '13-16': 0, '17-20': 5, 'each +4': 5, 'default': 0 }
    },
    'Stealth': {
        'SIZ': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'INT': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'DEX': { '1-4': -10, '5-8': -5, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'POW': { '1-4': -5, '5-16': 0, '17-20': 5, 'each +4': 5, 'default': 0 }
    },
    'Magic': {
        'POW': { '1-4': -10, '5-8': -5, '9-12': 0, '13-16': 5, '17-20': 10, 'each +4': 5, 'default': 0 },
        'CHA': { '1-4': -5, '5-16': 0, '17-20': 5, 'each +4': 5, 'default': 0 }
    }
};

// Tablas de Strike Rank para DEX y SIZ
const dexStrikeRankTable = {
    '1-5': 5,
    '6-8': 4,
    '9-12': 3,
    '13-15': 2,
    '16-18': 1,
    '19-more': 0
};

const sizStrikeRankTable = {
    '1-6': 3,
    '7-14': 2,
    '15-21': 1,
    '22-more': 0
};

// Función genérica para obtener modificadores de tablas con rangos y 'each +'
function getModifierFromTable(value, table) {
    let modifier = table.default !== undefined ? table.default : 0;
    let lastExplicitRangeMax = 0;
    let eachPlusKey = null;

    for (const rangeKey in table) {
        if (rangeKey.includes('-')) {
            const [min, max] = rangeKey.split('-').map(Number);
            if (value >= min && value <= max) {
                return table[rangeKey];
            }
            if (max > lastExplicitRangeMax) {
                lastExplicitRangeMax = max;
            }
        } else if (rangeKey.includes('each +')) {
            eachPlusKey = rangeKey;
        } else if (rangeKey.includes('-more')) {
            const min = parseInt(rangeKey.split('-')[0]);
            if (value >= min) {
                return table[rangeKey];
            }
        }
    }

    if (eachPlusKey && value > lastExplicitRangeMax) {
        const baseIncrement = parseInt(eachPlusKey.split('+')[1]);
        if (baseIncrement > 0) {
            const unitsAboveMax = Math.floor((value - lastExplicitRangeMax) / baseIncrement);
            const eachPlusValue = table[eachPlusKey];
            
            if (typeof eachPlusValue === 'number') {
                return (table.default !== undefined ? table.default : 0) + (eachPlusValue * unitsAboveMax);
            } else if (typeof eachPlusValue === 'string') {
                return eachPlusValue;
            }
        }
    }
    return modifier;
}

function calculateStrikeRank(value, srTable) {
    return getModifierFromTable(value, srTable);
}

// PROFESIONES HUMANOS, HOMBRE Y MEDIO  
const profesiones = [
    {
        nombre: "Aprendiz de Chamán",
        skills: "Hablar Lengua de Espíritus +20%, Cantar +10%, Combate Espiritual +30%, Conocimiento Animal +15%, Danza Espiritual +10%, Primeros Auxilios +15%, Saber de Espíritus +20%, Saber de Plantas +20%, Viaje Espiritual +20%, Meditar +20%",
        living: "Pobre",
        income: "20 L",
        cults: "Daka Fal, Waha, Yelm (Estepas)",
        runas: "Espíritu 60%, Magia 60%",
        passions: "Lealtad (chamán)",
        ransom: "250 L",
        equipment: "Un conjunto de hierbas y polvos locales usados para sanación y rituales, varias estatuillas relacionadas con el animal de poder del chamán o ancestros, bienes artesanales por valor de 25 L, 5 L en monedas, taparrabos y túnica, armas culturales apropiadas."
    },
    {
        nombre: "Cazador",
        skills: "Conocimiento Animal +20%, Primeros Auxilios +15%, Ocultarse +20%, Deslizarse en Silencio +20%, Rastrear +25%, Tirar (Arco) +25%, Escuchar +15%, Buscar +15%",
        living: "Escaso",
        income: "50 L",
        cults: "Orlanth, Aldryami (cuando se caza en bosques)",
        runas: "Aire 60%, Movimiento 60%",
        passions: "Lealtad (clan), Odio (enemigos del clan)",
        ransom: "150 L",
        equipment: "Arco, carcaj con 20 flechas, cuchillo de caza, saco de dormir, raciones para 1D6 días, bienes artesanales por valor de 20 L, 10 L en monedas, armadura de cuero ligera, armas culturales apropiadas."
    },
    {
        nombre: "Guerrero",
        skills: "Todas las habilidades de Combate (una a elección +25%, las demás +10%), Esquivar +15%, Escudo +20%, Primeros Auxilios +10%, Percepción +10%",
        living: "Normal",
        income: "75 L",
        cults: "Orlanth, Humakt, Yelmalio",
        runas: "Aire 60%, Muerte 60%",
        passions: "Lealtad (señor/clan), Devoción (deidad de guerra)",
        ransom: "300 L",
        equipment: "Armadura de cuero (o similar), arma principal (espada, hacha, lanza), escudo, 2 armas arrojadizas (jabalinas, hachas de mano), bienes artesanales por valor de 30 L, 15 L en monedas, kit de reparación de armas."
    },
    {
        nombre: "Granjero/Campesino",
        skills: "Conocimiento de Plantas +20%, Conducir Carro +15%, Cuidado de Animales +20%, Primeros Auxilios +10%, Escuchar +10%, Comercio +10%",
        living: "Pobre",
        income: "10 L",
        cults: "Ernalda, Barntar",
        runas: "Tierra 60%, Fertilidad 60%",
        passions: "Lealtad (familia), Amor (tierra)",
        ransom: "50 L",
        equipment: "Herramientas de labranza, saco de grano, una gallina, bienes artesanales por valor de 10 L, 2 L en monedas, ropa de trabajo."
    },
    {
        nombre: "Artesano",
        skills: "Oficio (específico, ej. Herrero, Alfarero, Carpintero) +30%, Tasar +15%, Comercio +20%, Disfrazarse +10% (si el oficio lo requiere), Hablar Idioma (local) +15%",
        living: "Normal",
        income: "60 L",
        cults: "Gustrang (depende del oficio)",
        runas: "Hombre 60%, Verdad 60%",
        passions: "Orgullo (trabajo), Lealtad (gremio)",
        ransom: "200 L",
        equipment: "Herramientas de oficio, materiales de trabajo (valor 20 L), bienes artesanales por valor 25 L, 10 L en monedas."
    },
    {
        nombre: "Comerciante",
        skills: "Comercio +30%, Tasar +20%, Hablar Idioma (varios) +15%, Conducir Carro +15%, Liderazgo +10%, Navegación (si aplica) +15%",
        living: "Acomodado",
        income: "100 L",
        cults: "Issaries",
        runas: "Movimiento 60%, Comunicación 60%",
        passions: "Lealtad (proveedores/clientes), Codicia",
        ransom: "500 L",
        equipment: "Carro y bueyes (o caballo), balanza, pesos, 200 L en mercancías variadas, 50 L en monedas, ropa fina."
    },
    {
        nombre: "Sacerdote",
        skills: "Cantar +20%, Sabiduría Religiosa +30%, Oratoria +20%, Primeros Auxilios +15%, Meditar +20%, Escuchar +10%",
        living: "Normal",
        income: "40 L",
        cults: "Deidad principal (ej. Orlanth, Ernalda, Yelmalio)",
        runas: "Magia 60%, Runa de Poder de la Deidad 60%",
        passions: "Devoción (deidad), Lealtad (templo/comunidad)",
        ransom: "400 L",
        equipment: "Ropas sagradas, símbolo de la deidad, 1D6 unidades de hierbas sagradas o incienso, 20 L en donaciones, 10 L en monedas, libro o rollo de escrituras (si aplica)."
    },
    {
        nombre: "Explorador",
        skills: "Orientación +25%, Rastrear +20%, Conocimiento de Plantas +15%, Ocultarse +15%, Deslizarse en silencio +15%, Supervivencia +20%, Escuchar +15%, Buscar +15%",
        living: "Escaso",
        income: "45 L",
        cults: "Orlanth, Lanbril",
        runas: "Movimiento 60%, Aire 60%",
        passions: "Amor (naturaleza), Lealtad (compañeros)",
        ransom: "180 L",
        equipment: "Mochila, saco de dormir, mapa tosco, brújula (si aplica), kit de pesca/caza menor, raciones para 1D6 días, bienes artesanales por valor de 15 L, 8 L en monedas."
    },
    {
        nombre: "Músico/Bardo",
        skills: "Cantar +25%, Tocar Instrumento +30%, Oratoria +20%, Persuadir +15%, Conocimiento Local +15%",
        living: "Normal",
        income: "30 L",
        cults: "Dormal, Orlanth",
        runas: "Comunicación 60%, Aire 60%",
        passions: "Orgullo (arte), Amor (música)",
        ransom: "120 L",
        equipment: "Instrumento musical, ropa llamativa, 1D6 canciones/historias memorizadas, 15 L en monedas, licor."
    },
    {
        nombre: "Noble/Terrateniente",
        skills: "Liderazgo +25%, Oratoria +20%, Etiqueta +20%, Saber de Leyes +15%, Montar +20%, Negociación +15%",
        living: "Rico",
        income: "200 L",
        cults: "Orlanth (o deidad familiar), Humakt",
        runas: "Hombre 60%, Verdad 60%",
        passions: "Lealtad (familia/tierra), Orgullo (linaje)",
        ransom: "1000 L",
        equipment: "Armadura de calidad, espada de familia, caballo de montar y equipo, ropas finas, 100 L en monedas, documentos de propiedad."
    },
    {
        nombre: "Ladrón",
        skills: "Ocultarse +25%, Deslizarse en silencio +25%, Juego de Manos +20%, Abrir Cerraduras +15%, Tasar +15%, Pelear (Cuchillo) +20%",
        living: "Pobre",
        income: "variable (1D6x10 L)",
        cults: "Lanbril, Argan Argar",
        runas: "Movimiento 60%, Oscuridad 60%",
        passions: "Codicia, Desconfianza (autoridad)",
        ransom: "100 L",
        equipment: "Herramientas de ladrón (ganzúas, etc.), ropa oscura, cuchillo pequeño, saco de tela, 1D6 L en monedas robadas."
    },
    {
        nombre: "Mercenario",
        skills: "Todas las habilidades de Combate (una a elección +20%, las demás +10%), Esquivar +10%, Escudo +15%, Primeros Auxilios +10%, Supervivencia +10%",
        living: "Escaso",
        income: "variable (1D6x50 L por contrato)",
        cults: "Humakt, Orlanth",
        runas: "Muerte 60%, Aire 60%",
        passions: "Lealtad (compañeros de armas), Odio (enemigos)",
        ransom: "250 L",
        equipment: "Armadura ligera/media, arma principal, escudo, 1 arma secundaria, raciones para 1D4 días, 20 L en monedas, equipo de campaña."
    },
    {
        nombre: "Marinero/Pescador",
        skills: "Navegación +25%, Nadar +20%, Conducir Barco +20%, Nudos +15%, Pescar +20%, Lucha (Cuerda/Red) +15%",
        living: "Normal",
        income: "35 L",
        cults: "Magasta, Chalana Arroyos",
        runas: "Agua 60%, Movimiento 60%",
        passions: "Amor (mar), Lealtad (tripulación)",
        ransom: "150 L",
        equipment: "Ropas de marinero, anzuelos y sedales, red pequeña, cuchillo de marinero, bienes por valor de 10 L, 5 L en monedas."
    },
    // PROFESIONES DE LOS ELFOS
    {
        nombre: "Artesano elfo",
        skills: "Regatear +10%, Ocultar +10%, Fabricar (primario) +30%, Fabricar (secundario) +10%, Arco élfico +15%, Sentido élfico +10%, Saber (cualquiera) +10%, Saber vegetal +30%, Hablar otro dioma +10%",
        living: "Normal",
        income: "35 L",
        passions: "Odio (enanos) 60%, Odio (Troll) 60%, Lealtad (bosque) 60%",
        ransom: "150 L",
        equipment: "Herramienas según el tipo de artesanía. Objetos fabricados por valor de 150L."
    },
   {
        nombre: "Sanador elfo",
        skills: "Alquimia +10%, Sentido élfico +10%, Primeros Auxilios +30%, Saber (cualquiera) +10%, Saber vegetal +30%, Cantar +20%, Tratar enfermedades +30%, Tratar venenos +10%",
        living: "Normal",
        income: "35 L",
        passions: "Odio (enanos) 60%, Odio (Troll) 60%, Lealtad (bosque) 60%",
        ransom: "100 L",
        equipment: "Cataplasmas curativas (curan 1D6 en 1D6 horas), Pociones (curan 1D6 en 1D6+10 minutos), antídoto para venenos (POT 3D6), hierbas curativas por valor de 50L."
    },
  {
        nombre: "Jardinero",
        skills: "Saber Animal +10%, Saber local +20%, Arco élfico +20%, Sentido élfico +30%, Primeros auxilios +10%, Ocularse +10%, Escuchar +10% Saber vegeal +30%, Otear +10%, Buscar +10%",
        living: "Normal",
        income: "35 L",
        passions: "Odio (enanos) 60%, Odio (Troll) 60%, Lealtad (bosque) 60%",
        ransom: "150 L",
        equipment: "Herramientas de jardinería, bolsa con semillas raras y brotes de árboles por valor de 120L."
    },
    {
        nombre: "Noble elfo",
        skills: "Esquivar +10%, Arco élfico +20%, Saber élfico +20%, Sentido élfico +10%, Ocultar +20%, Oratoria +10%, Saber vegetal +20%, Lanza 1M +20%, Espada 1M +20% Hablar otro idioma +10%",
        living: "Rico",
        income: "80 L",
        passions: "Odio (enanos) 60%, Odio (Troll) 60%, Lealtad (bosque) 60%",
        ransom: "200 L",
        equipment: "Armadura de escamas (5 pts), espada ancha, lanza corta y joyería y ropas lujosas por valor de 450L."
    },
    {
        nombre: "Chaman elfo",
        skills: "Saber Aldrya +30%, Bailar +10%, Arco élfico +10%, Meditar +10%, Saber vegetal 20%, Cantar +10%, Hablar con espíritus +10%, Combate espiritual +20%, Baile espiritual +10%, Saber espiritual +10%, Viaje espiritual +10% Adorar a Aldrya +30%",
        living: "Normal",
        income: "60 L",
        passions: "Odio (enanos) 60%, Odio (Troll) 60%, Lealtad (bosque) 60%",
        ransom: "140 L",
        equipment: "Artefactos y regalías de los espíritus del bosque, pociones curativas (1D6 en 1D6 horas por herida) joyería y abalorios por valor de 450L."
    },
    {
        nombre: "Guerrero elfo",
        skills: "Saber local +20%, Esquivar +20%, Arco élfico +30%, Ocultarse +20%, Deslizarse en silencio +20%, Lanza 1M +25%, Escudo P +20%.",
        living: "Normal",
        income: "45 L",
        passions: "Odio (enanos) 60%, Odio (Troll) 60%, Lealtad (bosque) 60%",
        ransom: "70 L",
        equipment: "Armadura de corteza (2 ptos), lanza corta y escudo pequeño."
    },
    // PROFESIONES DE LOS ENANOS
    {
        nombre: "Enano de Latón (Fundidor)",
        skills: "Fabricación (latón) +25%, Ciencia (enana) +15%, Saber (enano) +25%, saber (mineral) +30%, Tasar +20%, Leer/Escribir (mostalí) +10%, Inventar +30%, Sentido terrestre (buscar) +5%",
        living: "Normal", income: "40 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "150 L",
        equipment: "Herramientas de herrero, recipientes y objetos manufacturados de metal por valor de 200L."
    },
    {
        nombre: "Enano de Cobre (Herrero)",
        skills: "Fabricación (cobre) +40%, Ciencia (enana) +30%, Saber (metal) +15%, saber (mineral) +10%, Tasar +30%, Inventar +30%, Sentido terrestre (buscar) +15%, Sentido terrestre (otear) +15%, Martillo 2M +10%",
        living: "Normal", income: "60 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "180 L",
        equipment: "Herramientas de forja."
    },
     {
        nombre: "Enano de Oro (Erudito)",
        skills: "Fabricación (oro) +15%, Conocimiento (enano) +30%, Ciencia (enana) +30%, Tasar +20%, Saber (Glorantha) +30%, Saber (mineral) +15%, Oratoria +25%, Leer/Escribir (mostalí) +25%, Hablar (mostalí) +20%",
        living: "Rico", income: "160 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "400 L",
        equipment: "Lupa, equipo de escritura, otras herramientas finas. 3000 L en diversos bienes enanos, muchos de oro."
    },
    {
        nombre: "Enano de Hierro (Herrero/Guerrero)",
        skills: "Batalla +30%, Fabricación (hierro) +25%, Conocimiento (enano) +10%, Escudo M +40%, Arma (a tu elección) +40%, Otra arma +25%",
        living: "Normal", income: "80 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "240 L",
        equipment: "Arma cuerpo a cuerpo, arma a distancia, escudo pequeño, cota de mala enana y yelmo de hierro (9 ptos). "
    },
    {
        nombre: "Enano de Plomo (Vidriero/Fontanero)",
        skills: "Alquimia +10%, Fabricación (vidrio) +30%, Fabricación (fontanería) +30%, Ciencia enana +10%, Inventar +10%, Sentido Terrestre (otear) +15%, Escuchar +15%, Saber (mineral) +15%, Nadar +10%",
        living: "Normal", income: "80 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "240 L",
        equipment: "Llave inglesa ajustable, otras herramientas, caja de herramientas, 1D100 estatuillas de plomo finamente elaboradas de enanos y otros seres de Gloranthan, cada una de 25 milímetros de alto."
    },
    {
        nombre: "Enano de Mercurio (Alquimista)",
        skills: "Alquimia +30%, Saber (enano) +10%, Sentido Terrestre (buscar) +15%, Sentido Terrestre (otear) +15%, Primeros Auxilios +25%, Tasación +10%, Escuchar +15%, Oratoria +15%, Saber (mineral) +25%, Leer/Escribir (mostalí) +15%, Hablar (mostali) +10%",
        living: "Rico", income: "150 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "450 L",
        equipment: "Mortero y maja, quemador, equipo de escritura, máscara respiratoria, bata protectora de lona encerada (2 pts.), 1D6 latas de productos químicos de olor extraño."
    },
    {
        nombre: "Enano de Piedra (Constructor)",
        skills: "Trepar +10%, Saber (arquitectura) +30, Fabricación (Albañilería) +40%, Inventar +30%, Saber (enano), 10%, Sentido Terrestre (buscar) +15%, Sentido Terrestre (otear) +15%, Saber (mineral) +30%, Tasación +10%, Saltar +10%, Leer/Escribir (mostali) +10%.",
        living: "Pobre", income: "40 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "120 L",
        equipment: "Casco de hierro (6 pts.), farscopio plegable, equipo de escritura, mazo, cinceles, regla metálica, llana de albañilería, martillo perforador, lewis (una pequeña herramienta de elevación), 1D6 rocas interesantes."
    },
   {
        nombre: "Enano de Plata (Hechicero)",
        skills: "Fabricación (orfebrería) +10%, Saber (enano) +10%, Saber (Glorantha) +10%, Leer/Escribir (mostali) +10%, (hechizo) +30%, (hechizo) +30%, (hechizo) +10%.",
        living: "Rico", income: "160 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "480 L",
        equipment: "Lupa, 1D3 ligaduras de espíritu, pergaminos de conjuro, útiles de escritura."
    },
   {
        nombre: "Enano de Hojalata (Mantenimiento)",
        skills: "Fabricación (Cantero) +25%, Fabricar (Hojalatero) +10%, Inventar +30%, Ciencia Enana +10%, Tasación +20%, Habla Fluida +10%, Saber (mineral) +30, (hechizo) +25%.",
        living: "Pobre", income: "50 L",
        passions: "Devoción (casta) 60%, Odio (Aldryani) 60%, Odio (Uz) 60%.", ransom: "150 L",
        equipment: "Herramientas varias, 200 clacks de cobre en bienes enanos."
    },
    // PROFESIONES DE LOS TROLLS
   {
        nombre: "Artista (Troll)",
        skills: "Arma cultural (elegir) +10%, Bailar +30%, Tocar Instrumento (percusión) +30%, Leer/Escribir (lengua oscura) +10%, Cantar +30%, Hablar (lengua oscura) +10%, Saber (troll) +10%, Adorar (deidead) +20%.",
        living: "Pobre", income: "50 L",
        passions: "Odio (elfos) 60%, Odio (enanos) 60%, Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "150 L",
        equipment: "Maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), timbales y INTx100 Bolgs. ."
    },
       {
        nombre: "Artesano (Troll)",
        skills: "Regatear +10%, Ocultar +10%, Artesanía (primaria) +30%, Artesanía (secundaria) +20%, Arma cultural (elige una) +20%, Inventar +20%, Perspicacia (Troll) +10%, Conocimiento (cualquiera) +20%",
        living: "Pobre", income: "50 L",
        passions: "Odio (elfos) 60%, Odio (enanos) 60%, Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "150 L",
        equipment: "Herramientas para su profesión, maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), y INTx100 Bolgs. ."
    },
    {
        nombre: "Cazador / Recolector (Troll)",
        skills: "Saber (local) +10%, Arma cultural (elige una) +10%, Sentido Oscuro (Otear) +20%, Sentido Oscuro (buscar) +10%, Esconderse +10%, Deslizarse en Silencio +30%, Honda +20%, Rastrear +30%.",
        living: "Pobre", income: "50 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "150 L",
        equipment: "Trampas y lazos para presas, maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), y INTx100 Bolgs."
    },
    {
        nombre: "Pastor de Insectos (Troll)",
        skills: "Trepar +20%, Artesanía (Cuidado de insectos) +30%, Arma cuerpo a cuerpo (elige una) +10%, Sentido Oscuro (buscar) +10%, Primeros auxilios +10%, Escudo grande +10%, Montar (insectos) +30%, Honda +20%, Nadar +10%.",
        living: "Pobre", income: "50 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "150 L",
        equipment: "Maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), y INTx100 Bolgs."
    },
    {
        nombre: "Noble (Troll)",
        skills: "Arma cultural (elige una) +30%, Arma cultural (elige otra) +30%, Costumbres (Troll) +10%, Perspicacia (Troll) +20%, Intimidar +20%, Escudo grande +30%, Combate espíritual +10%, Leer/Escribir (lengua oscura) +10%, Hablar otro idioma +10%",
        living: "Normal", income: "120 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "360 L",
        equipment: "Armas culturales, escudo grande, armadura de bronce (6 ptos.), yelmo abierto (4 ptos.), ropa elegante por valor de 80 L, una dosis de poción curativa (POT 1D6), una dosis de antídoto de veneno (POT 6, cualquier tipo); esclavo trollkin o escarabajo guardián entrenado, cristal de poder (1D6 puntos). Posee SIZx1.000 bolgs."
    },
    {
        nombre: "Matrona (Troll)",
        skills: "Alquimia +10%, Primeros auxilios +30%, Perspicacia (trol) +10%, Saber (vegetal) +20%, Preparar cadáver +20%, Tratar enfermedad +30%, Tratar veneno +20%.",
        living: "Normal", income: "60 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "180 L",
        equipment: "Maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), y INTx100 Bolgs."
    },
    {
        nombre: "Capataz (Troll)",
        skills: "Arma cultural (melé, elige una) +20%, Sentido Oscuro (buscar) +25%, Sentido Oscuro (otear) +10%, Primeros auxilios +10%, Perspicacia (Trollkin) +20%, Intimidar +10%, Escuchar +25%, Rastrear +20%.",
        living: "Normal", income: "70 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "210 L",
        equipment: "Esclavo trollkin, maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), y INTx100 Bolgs."
    },
    {
        nombre: "Sacerdotisa (Troll)",
        skills: "Bailar +15%, Saber (culto) +30%, Meditar +10%, Preparar cadaver +10%, Leer/Escribir (lengua oscura) +10%, Cantar +20%, Combate Espiritual +20%, Baile espiritual +10%, Saber espiritual +10%, Viaje Espiritual +10%, Adorar (Kyger Litor) +30%.",
        living: "Normal", income: "150 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "450 L",
        equipment: "Armas culturales, escudo grande, armadura de bronce (6 ptos.), yelmo abierto (4 ptos.), ropas elegantes por valor de 80 L, una dosis de poción curativa (POT 1D6), una dosis de antídoto de veneno de cualquier tipo (POT 6), esclavo trollkin (ver página 77) o escarabajo guardián entrenado (ver página 131), cristal de almacenamiento de puntos mágicos (1D6 puntos). Posee TAMx1000 bolgs."
    },
    {
        nombre: "Chaman (Troll)",
        skills: "Primeros auxilios +15%, Meditar +10%, Cantar +20%, Combate espiritual +30%, Danza espiritual +10%, Saber espiritual +20%, Viaje espiritual +20%, Tratar enfermedad +15%, Tratar veneno +15%.",
        living: "Normal", income: "120 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "360 L",
        equipment: "Maza pesada, honda, escudo grande o maza 1M, armadura cuero (3 ptos), y INTx100 Bolgs."
    },
    {
        nombre: "Mercader (Troll)",
        skills: "Regatear +30%, Arma cultural (elige una) +20%, Costumbres (cualquiera) +10%, Perspicacia (Troll) +10%, Leer/Escribir(lengua oscura) +10%, Montar (Insecto) +20%, Hablar (cualquier otro idioma) +10%, Hablar (comercial) +30%.",
        living: "Normal", income: "110 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "330 L",
        equipment: "Maza o lanza pesada, escudo grande, honda, ropas extravagantes, a menudo de fabricación o diseño humano, y un sombrero grande de ala ancha . Uno o más objetos específicos que son raros o de tierras lejanas por valor de 200 L y artículos de comercio general por valor de 1.000 bolgs. Posee CHAx200 bolgs."
    },
    {
        nombre: "Guerrero (Troll)",
        skills: "Batalla +30%, Sentido oscuro (buscar) +10%, Primeros Auxilios +10%, Maza pesada +25%, Esconderse +10%, Escudo grande +25%, Escuchar +10%, Desliarse en silencio +10%, Otra arma (cualquiera) +25%, Cantar +10%.",
        living: "Normal", income: "750 L",
        passions: "Odio (elfos) 60%, Odio (enanos) Amor (familia) 60%, Lealtad (matriarca) 60%.", ransom: "220 L",
        equipment: "Maza pesada, otra arma, honda, escudo grande,  peto de escamas ligeras (4 ptos.), grebas cuirboilli y brazales (3 ptos. cada uno), y un yelmo abierto (4 ptos.). Posee INTx100 bolgs."
    },
// PROFESIONES DE LOS TROLKIN
    {
        nombre: "Valor (trolkin)",
        skills: "Arma cultural (melé, elige una) +20%, Sentido Oscuro (buscar) +25%, Sentido Oscuro (otear) +10%, Primeros auxilios +10%, Perspicacia (Trollkin) +20%, Intimidar +10%, Escuchar +25%, Rastrear +20%.",
        living: "Pobre", income: "3 L",
        passions: "Lealtad (al amo) 60%", ransom: "9 L",
        equipment: "Honda, escudo pequeño, porra, armadura cuero (1 o 2 ptos), y INTx10 Bolgs."
    },
    {
        nombre: "Guerrero (Trolkin)",
        skills: "Batalla +30%, Sentido oscuro (buscar) +10%, Primeros Auxilios +10%, Maza pesada +25%, Esconderse +10%, Escudo grande +25%, Escuchar +10%, Desliarse en silencio +10%, Otra arma (cualquiera) +25%, Cantar +10%.",
        living: "Pobre", income: "4 L",
        passions: "Lealtad (al amo) 60%", ransom: "12 L",
        equipment: "Maza, honda, escudo pequeño,  armadura de cuero (2 ptos.). Posee INTx10 bolgs."
    },
    {
        nombre: "Comida (Trolkin)",
        skills: "Saber (local) +10%, Arma cultural (elige una) +10%, Sentido Oscuro (Otear) +20%, Sentido Oscuro (buscar) +10%, Esconderse +10%, Deslizarse en Silencio +30%, Honda +20%, Rastrear +30%.",
        living: "Pobre", income: "1 L",
        passions: "Lealtad (al amo) 60%", ransom: "3 L",
        equipment: "Trampas y lazos para presas, maza, honda, escudo pequeño, armadura cuero (1 pto), y INTx10 Bolgs."
    },
{
        nombre: "Esclavo (Troll)",
        skills: "Trepar +20%, Artesanía (Cuidado de insectos) +30%, Arma cuerpo a cuerpo (elige una) +10%, Sentido Oscuro (buscar) +10%, Primeros auxilios +10%, Escudo grande +10%, Montar (insectos) +30%, Honda +20%, Nadar +10%.",
        living: "Pobre", income: "2 L",
        passions: "Lealtad (al amo) 60%", ransom: "6 L",
        equipment: "Maza, honda, escudo pequeño, armadura cuero (1 pto), y INTx10 Bolgs."
    }



];

// Definición de razas con sus características base y habilidades iniciales
const races = {
    'Elfo Marrón': {
        caracteristicasRoll: {
            STR: '2D6+2', CON: '3D6', SIZ: '2D4+4',
            DEX: '3D6+3', INT: '3D6+6', POW: '2D6+6', CHA: '3D6'
        },
        puntosExtra: 3,
        habilidadesBase: {
           'Trepar': 85, 'Ocultar': 45, 'Esquivar': 65, 'Sentido élfico': 55,
           'Conocimiento élfico': 50, 'Primeros Auxilios': 50, 'Ocultarse': 55,
           'Escuchar': 55, 'Deslizarse en Silencio': 50,'Conocimiento Vegetal': 75,
            'Cantar': 55, 'Combate Espiritual': 55, 'Rastrear': 55,'Adorar Aldrya': 50,
            'Esquiar': 60,'Lanza 1M': 20, 'Espada 1M': 20, 'Arco élfico': 30, 'Escudo P': 25,
            'Honda': 25,
        },
        profesionesDisponibles: [
           "Artesano elfo", "Sanador elfo", "Jardinero", "Noble elfo", "Chaman elfo", "Guerrero elfo"
        ],
        movimiento: 9,
        cults: "Todos los elfos adoran a Aldrya. Otros dioses comunes incluyen Babeester Gor, Chalana Arroy, Ernalda, Flamal,y Yelmalio.",
        runas: "Vegetal (Sustituye a bestia) 75%, Hombre 25%, Tierra o Fuego/Cielo 60%",
        magia: "Trance arquero, Curación, Dardo Veloz.",
        notas: "Los elfos marrones ivernan, pero no duermen durante el resto del año. Pueden ser de cualquiera de los sexos y pueden hibridarse con las dryades. Un típico elfo marrón pesa alrededor de 55 kg y mide aproximádamente 1,6m. Al igual que los trolls, sus eternos enemigos, los elfos verdes son vulnerables al hierro, y no pueden manejarlo. Cualquier daño de un arma de hierro que penetre en su armadura hará el doble del daño normal."
    },
    'Elfo Verde': {
        caracteristicasRoll: {
            STR: '2D6+4', CON: '3D6', SIZ: '3D6',
            DEX: '3D6+3', INT: '3D6+6', POW: '2D6+6', CHA: '3D6'
        },
        puntosExtra: 3,
         habilidadesBase: {
           'Trepar': 85, 'Ocultar': 45, 'Esquivar': 65, 'Sentido élfico': 55,
           'Conocimiento élfico': 50, 'Primeros Auxilios': 50, 'Ocultarse': 55,
           'Escuchar': 55, 'Deslizarse en Silencio': 50,'Conocimiento Vegetal': 75,
            'Cantar': 55, 'Combate Espiritual': 55, 'Rastrear': 55,'Adorar Aldrya': 50,
            'Esquiar': 60,'Lanza 1M': 20, 'Espada 1M': 20, 'Arco élfico': 30, 'Escudo P': 25,
            'Honda': 25,
        },
        profesionesDisponibles: [
            "Artesano elfo", "Sanador elfo", "Jardinero", "Noble elfo", "Chaman elfo", "Guerrero elfo"
        ],
        movimiento: 9, // Factor de movimiento para Elfos Verdes
        cults: "Todos los elfos adoran a Aldrya. Otros dioses comunes incluyen Babeester Gor, Chalana Arroy, Ernalda, Flamal,y Yelmalio.",
        runas: "Vegetal (Sustituye a bestia) 75%, Hombre 25%, Tierra o Fuego/Cielo 60%",
        magia: "Trance arquero, Curación, Dardo Veloz.",
        notas: "Los elfos verdes, fueron el tipo de elfo más importante en la Gran Oscuridad, pero han perdido terreno desde entonces. Los elfos verdes pueden ser de ambos sexos y no se reproducen con las dríades. No duermen en invierno, pero experimentan un periodo diario de descanso. En la nieve, pueden esquiar con esquies mágicos de madera tallada. En tierras más cálidas, suelen compartir sus bosques con los elfos marrones. Un elfo verde suele pesar unos 65 kilogramos y medir algo más de 170 centímetros. Al igual que los trolls, sus eternos enemigos, los elfos verdes son vulnerables al hierro, y no pueden manejarlo. Cualquier daño de un arma de hierro que penetre en su armadura hará el doble del daño normal."
    },
    'Elfo Amarillo': {
        caracteristicasRoll: {
            STR: '2D6+2', CON: '3D6', SIZ: '2D6',
            DEX: '3D6+3', INT: '3D6+6', POW: '2D6+3', CHA: '3D6'
        },
        puntosExtra: 3,
         habilidadesBase: {
           'Trepar': 85, 'Ocultar': 45, 'Esquivar': 65, 'Sentido élfico': 65,
           'Conocimiento élfico': 50, 'Primeros Auxilios': 50, 'Ocultarse': 50,
           'Escuchar': 50, 'Deslizarse en Silencio': 50,'Conocimiento Vegetal': 75,
            'Cantar': 55, 'Combate Espiritual': 55, 'Rastrear': 55,'Adorar Aldrya': 50,
            'Esquiar': 60,'Lanza 1M': 20, 'Espada 1M': 20, 'Arco élfico': 30, 'Escudo P': 25,
            'Honda': 25,
        },
        profesionesDisponibles: [
            "Artesano elfo", "Sanador elfo", "Jardinero", "Noble elfo", "Chaman elfo", "Guerrero elfo"
        ],
        movimiento: 9, // Factor de movimiento para Elfos Amarillos
        cults: "Todos los elfos adoran a Aldrya. Otros dioses comunes incluyen Babeester Gor, Chalana Arroy, Ernalda, Flamal,y Yelmalio.",
        runas: "Vegetal (Sustituye a bestia) 75%, Hombre 25%, Tierra o Fuego/Cielo 60%",
        magia: "Trance arquero, Curación, Dardo Veloz.",
        notas: "Los elfos amarillos, son parientes de los árboles de hoja ancha de todo tipo, incluidas las palmeras. Los elfos amarillos son todos machos y se aparean con las dríades para sobrevivir. Los elfos amarillos se diferencian claramente de otros tipos de elfos. Son físicamente más pequeños, tienen la piel de color marrón oliva oscuro, casi caqui, y carecen de pelo en todo el cuerpo y la cabeza, excepto por ocasionales manchas de musgo. Un elfo amarillo suele pesar unos 35 kilogramos y medir poco más de 120 centímetros. Al igual que los trolls, sus eternos enemigos, los elfos amarillos son vulnerables al hierro, y no pueden manejarlo. Cualquier daño de un arma de hierro que penetre en su armadura hará el doble del daño normal."
    },
     'Humano': {
        caracteristicasRoll: {
            STR: '3D6', CON: '3D6', SIZ: '2D6+6',
            DEX: '3D6', INT: '2D6+6', POW: '3D6', CHA: '3D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Nadar': 5, 'Esquivar': 5, 'Primeros Auxilios': 5, 'Idioma (Nativo)': 75
        },
        profesionesDisponibles: [
            "Aprendiz de Chamán", "Cazador", "Guerrero", "Granjero/Campesino",
            "Artesano", "Comerciante", "Sacerdote", "Explorador",
            "Músico/Bardo", "Noble/Terrateniente", "Ladrón", "Mercenario", "Marinero/Pescador"
        ],
        movimiento: 6,
        cults: "Orlanth, Ernalda, Humakt, Issaries, Yelmalio, Daka Fal, Barntar",
        runas: "Aire, Tierra, Muerte, Movimiento, Verdad, Espíritu",
        magia: "Sanación, Protección, Invocar, Desviar",
        notas: "La raza más común y adaptable."
    },
    'Hombre y Medio (Agimori)': {
        caracteristicasRoll: {
            STR: '3D6+6', CON: '1D4+14', SIZ: '3D6+6',
            DEX: '3D6', INT: '2D6+6', POW: '3D6', CHA: '3D6'
        },
        puntosExtra: 3,
        habilidadesBase: {
            'Esquivarr': 35, 'Ocultarse': 50, 'Escuchar': 40, 'Deslizarse en silencio': 40, 'Escuchar': 35, 'Escudo G': 25, 'Rastrear': 50,
            'Otear': 50, 'Trepar': 15, 'Buscar': 50,  'Jabalina': 30,'Hablar (Agimori)': 50,'Hablar (Praxiano)': 15, 'Lanza 1M': 40,
            'Espada 1M': 20
        },
        profesionesDisponibles: [
        "Aprendiz de Chamán", "Cazador", "Guerrero"
        ],
        movimiento: 10, 
        cults: "Lodril, Daka Fal, Hijos de los fundadores, otras.",
        runas: "Fuego/Cielo 100%, Movimiento 75%",
        magia: "Cuchilla afilada, Disrupción, Movimiento, Reparar, Protección.",
        notas: "Los miembros de esta tribu miden al menos 185 cms y pesan más de 90 kilos. Su fuerza y resistencia está a la altura de su talla, siendo unos oponentes temibles en cualquier situación. Esta raza tiene otras particularidades. No sudan y necesitan muy poca agua para sobrevivir. Su sistema digestivo es muy eficiente, y necesitan muy poco alimento. Poseen una vista excepcionalmente aguda.Sin embargo, sopotan muy mal el frío, sufriendo penalizaciones (bestiario página 49). Solo reciben la mitad del daño de ataques de fuego o calor."
    },
        'Enano (Mostalí)': {
        caracteristicasRoll: {
            STR: '4D6', CON: '2D6+6', SIZ: '2D6',
            DEX: '3D6', INT: '2D6+6', POW: '3D6', CHA: '3D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Fabricar (herrería)': 65, 'Esquivarr': 35,'Saber (mineral)': 35, 'Sentido Terrestre (buscar)': 50,
            'Sentido terrestre (otear)': 50,'Leer/Escribir (mostalí)': 50,'Nadar': 5,'Saber (mineral)': 35,
            'Navegar': 0,'Trepar': 20,
        },
        profesionesDisponibles: [
           "Enano de Latón (Fundidor)","Enano de Cobre (Herrero)","Enano de Oro (Erudito)", "Enano de Hierro (Herrero/Guerrero)", "Enano de Plomo (Vidriero/Fontanero)","Enano de Piedra (Constructor)", "Enano de Plata (Hechicero)", "Enano de Hojalata (Mantenimiento)"
        ],
        movimiento: 6,
        cults: "Mostal",
        runas: "Tierra 80%, Éxtasis 80%",
        magia: "Todos conocen al menos tres conjuros de hechicería, acordes a su subtipo: (Conjuro de Hechicería) +25%, (Conjuro de Hechicería) +20%, (Conjuro de Hechicería) +15%.",
        notas: "Poseen una altura promedio de 120 centímetros y 45 kilos de peso. Sus rasgos facciales son bastante grotescos para los humanos, pero no resultan repulsivos ni horribles. La mayoría lleva barba."
    },
        'Orco': {
        caracteristicasRoll: {
            STR: '4D6', CON: '3D6', SIZ: '2D6+2',
            DEX: '4D6', INT: '3D6', POW: '2D6+3', CHA: '2D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Ocultar': 20, 'Rastrear': 20, 'Esconderse': 20, 'Deslizarse en Silencio': 20, 'Saltar': 40,
            'Intrigar': 20,'Trepar': 30,
        }, 
        profesionesDisponibles: [
          "Cazador", "Guerrero", "Mercenario"
        ],
        movimiento: 6,
        cults: "Principalmente Humakt.",
        runas: "Muerte 60%, Movimiento 50%, Bestia 60%.",
        magia: "Magia espiritual",
        notas: "Son seres bajos, de piernas arqueadas y brazos largos, pero con una gran fuerza y agilidad. Son seres belicosos y bastante propensos a la pelea, por eso suelen tomar profesiones relacionadas con la batalla."
    },
    'Ogro': {
        caracteristicasRoll: {
            STR: '2D6+12', CON: '2D6+6', SIZ: '2D6+6',
            DEX: '3D6', INT: '2D6+6', POW: '2D6+6', CHA: '3D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Esquivar': 65, 'Disfrazarse': 50, 'Encanto': 25, 'Intimidar': 25,'Hablar (lengua local)': 30,
        }, 
        profesionesDisponibles: [
           "Cazador", "Guerrero", "Comerciante", "Sacerdote", "Explorador",
            "Músico/Bardo", "Noble/Terrateniente", "Ladrón", "Mercenario"
        ],
        movimiento: 8,
        cults: "Cacodemonio y en ocasiones Bagog y Xiola Umbar.",
        runas: "Caos, Ilusión y Muerte al 60%.",
        magia: "Forma Falsa, Atraer Atención (Xiola umbar)",
        notas: "Tienen un aspecto y tamaño similar al de un humano, con dientes puntiagudos como los de los carnívoros. Se alimentan de seres inteligentes y son esencialmente malignos. Se integran en sociedades humanas, donde pasan desapercibidos. Tienen un 5% de posibilidades de tener algún rasgo caótico."
    },
    'Troll Negro (Uzko)': {
        caracteristicasRoll: {
            STR: '3D6+6', CON: '3D6', SIZ: '3D6+8',
            DEX: '3D6', INT: '2D6+6', POW: '3D6', CHA: '3D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Hablar (lengua oscura)': 50, 'Trepar': 40, 'Sentido oscuro (otear)': 45, 'Sentido Oscuro (buscar)': 35, 'Esquivar': 35, 'Ocultarse': 35, 'Intimidar': 35, 'Saltar': 40, 'Escuchar': 40, 'Deslizarse en Silencio': 40, 'Combate Espiritual': 40,
             'Maza 2M': 20,  'Maza 1M': 20,'Escudo G': 25, 'Montar': 0,  'Honda': 20, 'Nadar': 5, 'Saber (troll)': 25,
        }, 
        profesionesDisponibles: [
           "Artista (Troll)", "Artesano (Troll)", "Cazador / Recolector (Troll)", "Pastor de Insectos (Troll)", "Noble (Troll)", "Matrona (Troll)", "Capataz (Troll)", "Sacerdotisa (Troll)", "Chaman (Troll)", "Mercader (Troll)", "Guerrero (Troll)"
        ],
        movimiento: 9,
        cults: "Adoran a Kyger Litor y pueden elegir un segundo culto del panteón de las Tinieblas, como por ejemplo Zorak Zoran.",
        runas: "Runa de la oscuridad al menos al 60%",
        magia: "Pared Oscura, Garrotazo, Silencio.",
        notas: "Los trolls negros son la población básica actual de los uz, y sólo ceden los puestos de mayor autoridad a los trolls de la Raza Señorial. Son inteligentes y utilizan todas las armas y la magia. Su gruesa piel les otorga un punto de armadura."
    },
        'Gran Troll (Uzdo)': {
        caracteristicasRoll: {
            STR: '4D6+12', CON: '1D4+14', SIZ: '4D6+12',
            DEX: '3D6', INT: '2D6+2', POW: '3D6', CHA: '2D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Hablar (lengua oscura)': 45, 'Trepar': 40, 'Sentido oscuro (otear)': 30, 'Sentido Oscuro (buscar)': 30, 'Esquivar': 25, 'Ocultarse': 35, 'Intimidar': 45, 'Saltar': 40, 'Escuchar': 40, 'Deslizarse en Silencio': 40, 'Combate Espiritual': 40,
             'Maza 2M': 20,  'Maza 1M': 20,'Escudo G': 25, 'Montar': 0,  'Honda': 20, 'Nadar': 5, 'Saber (troll)': 25,
        }, 
        profesionesDisponibles: [
           "Artista (Troll)", "Artesano (Troll)", "Cazador / Recolector (Troll)", "Pastor de Insectos (Troll)", "Matrona (Troll)", "Capataz (Troll)", "Sacerdotisa (Troll)", "Mercader (Troll)", "Guerrero (Troll)"
        ],
        movimiento: 7,
        cults: "Adoran a Kyger Litor y pueden elegir un segundo culto del panteón de las Tinieblas, como por ejemplo Zorak Zoran.",
        runas: "Runa de la oscuridad al menos al 60%",
        magia: "Pared Oscura, Garrotazo, Silencio.",
        notas: "Los Grandes trolls fueron creados por la bruja araña como su guardia personal. La mitad de estos ejemplares tienen su origen en su programa de cría, sin embargo, han perdido algo de intelecto en el proceso. Su gruesa piel les otorga tres puntos de armadura."
    },
    'Troll Raza Señorial (Uzuz)': {
        caracteristicasRoll: {
            STR: '4D6+6', CON: '2D6+6', SIZ: '3D6+12',
            DEX: '2D6+6', INT: '2D6+12', POW: '3D6', CHA: '2D6+6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Hablar (lengua oscura)': 75, 'Bailar': 64, 'Cantar': 65,'Trepar': 40, 'Sentido oscuro (otear)': 85, 'Sentido Oscuro (buscar)': 85, 'Saber (troll)': 85, 'Saber (mundo subterraneo)': 85,'Esquivar': 35, 'Ocultarse': 70, 'Intimidar': 85, 'Saltar': 40, 'Escuchar': 470, 'Deslizarse en Silencio': 70, 'Combate Espiritual': 95,
             'Maza 2M': 20,  'Maza 1M': 20,'Escudo G': 25, 'Montar': 0,  'Honda': 20, 'Nadar': 5, 'Saber (troll)': 25,
        }, 
        profesionesDisponibles: [
           "Noble (Troll)", "Sacerdotisa (Troll)", "Chaman (Troll)"
        ],
        movimiento: 9,
        cults: "Adoran a Kyger Litor y pueden elegir un segundo culto del panteón de las Tinieblas, como por ejemplo Zorak Zoran.",
        runas: "Runa de la oscuridad al menos al 90%",
        magia: "Pared Oscura, Garrotazo, Silencio.",
        notas: "La Raza de las Amas, las veneradas madres de los trolls, es una raza extraordinariamente antigua. Las hembras tienen varios pares de mamas y suelen tener varios partos en cada embarazo. Allí donde existen, los trols de la Raza Señorial ocupan los puestos de poder. Son poderosos mágicamente y tienden a confiar en esos talentos por encima de todos los demás, pero cuando deben hacerlo también pueden recurrir a una fuerza física y un poder aterradores. Poseen dos puntos de armadura por su gruesa piel. Independientemente de su profesión, un troll de la raza señorial, siempre llevará el mejor equipamiento posible."
    },
     'Trolkin (Enlo)': {
        caracteristicasRoll: {
            STR: '2D6+3', CON: '3D6', SIZ: '1D6+6',
            DEX: '3D6+3', INT: '2D6+3', POW: '2D6', CHA: '2D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Sentido oscuro (otear)': 20, 'Sentido Oscuro (buscar)': 25, 'Esquivar': 25, 'Ocultarse': 35, 'Escuchar': 35, 'Deslizarse en Silencio': 25, 'Otear': 15,'Buscar': 25, 'Hablar (lengua oscura)': 50,
        }, 
        profesionesDisponibles: [
           "Comida (Trolkin)", "Esclavo (Troll)","Guerrero (Trolkin)", "Valor (trolkin)" 
        ],
        movimiento: 6,
        cults: "Adoran a Kyger Litor.",
        runas: "Runa de la oscuridad al menos al 40%. Ninguna runa de poder por encima del 20%",
        magia: "Si conocieran algún conjuro espiritual, sería de escasa potencia.",
        notas: "Esta subespecie fue provocada por una maldición. La mayoría de los trolkin rara vez superan el metro de altura.Los de su propia especie los dividen en cuatro clases: valor, guerrero, esclavo y comida. La luz solar les desmoraliza (igual que el conjuro espiritual). Poseen un punto de armadura natural por su gruesa piel."
    },
     'Hobbit': {
        caracteristicasRoll: {
            STR: '2D6', CON: '2D6+12', SIZ: '2D3',
            DEX: '2D6+10', INT: '2D6+6', POW: '2D6+3', CHA: '3D6'
        },
        puntosExtra: 3, // Puntos para distribuir si el total es <= 92
        habilidadesBase: {
            'Remar': 10, 'Trepar': 25, 'Esquivar': 25, 'Nadar': 25, 'Habla Fluida': 20, 'Oratoria': 20,'Trucos de manos': 15,'Ocultarse': 20, 'Deslizarse en Silencio': 20, 'Hablar (local)': 40,
        }, 
        profesionesDisponibles: [
        "Aprendiz de Chamán", "Cazador", "Guerrero", "Granjero/Campesino",
        "Artesano", "Comerciante", "Sacerdote", "Explorador",
        "Músico/Bardo", "Noble/Terrateniente", "Ladrón", "Marinero/Pescador",
        ],
        movimiento: 5,
        cults: "Ernalda, Voria y Barntar",
        runas: "Tierra 60%. Fertilidad, Hombre y Armonía al menos al 50%",
        magia: "Pueden conocer y utilizar cualquier tipo de magia, pero rara vez un hobbit se convierte en chaman o hechicero.",
        notas: "Pequeños humanoides de complexión robusta, pero muy ágiles. Son bastante civilizados y habitan las zonas templadas de GLorantha."
    },





    
};

function initCreacionPersonajes() {
    console.log('Inicializando Creación de Personajes...');

    const razaSelector = document.getElementById('raza-selector');
    const profesionSelector = document.getElementById('profesion-selector');
    const btnGenerarAleatorio = document.getElementById('btn-generar-aleatorio');
    const btnMostrarPersonaje = document.getElementById('btn-mostrar-personaje');
    const resultadosContainer = document.getElementById('resultados-container');
    const resultadoPrincipal = document.getElementById('resultado-principal');

    // Event Listeners
    razaSelector.addEventListener('change', actualizarProfesionesPorRaza);
    btnGenerarAleatorio.addEventListener('click', generarCaracteristicasAleatorias);
    btnMostrarPersonaje.addEventListener('click', mostrarPersonaje);

    // Función para poblar el desplegable de razas
    function poblarRazas() {
        // Ordenar las razas alfabéticamente
        const razasOrdenadas = Object.keys(races).sort();
        razaSelector.innerHTML = '<option value="">-- Selecciona una raza --</option>';
        razasOrdenadas.forEach(razaNombre => {
            const option = document.createElement('option');
            option.value = razaNombre;
            option.textContent = razaNombre;
            razaSelector.appendChild(option);
        });
    }

    // Función para poblar el desplegable de profesiones y mostrar tiradas de dados
    function actualizarProfesionesPorRaza() {
        const selectedRazaName = razaSelector.value;
        
        // Actualizar profesiones
        profesionSelector.innerHTML = '<option value="">-- Selecciona una profesión --</option>';
        profesionSelector.disabled = true;

        if (selectedRazaName) {
            profesionSelector.disabled = false;
            const razaData = races[selectedRazaName];
            const profesionesFiltradas = profesiones.filter(prof => razaData.profesionesDisponibles.includes(prof.nombre));
            
            profesionesFiltradas.forEach(prof => {
                const originalIndex = profesiones.findIndex(p => p.nombre === prof.nombre);
                const option = document.createElement('option');
                option.value = originalIndex; 
                option.textContent = prof.nombre;
                profesionSelector.appendChild(option);
            });
        }

        // Actualizar fórmulas de tiradas de dados
        const rollSpans = {
            STR: 'str-roll', CON: 'con-roll', SIZ: 'siz-roll',
            DEX: 'dex-roll', INT: 'int-roll', POW: 'pow-roll', CHA: 'cha-roll'
        };

        if (selectedRazaName && races[selectedRazaName]) {
            const razaData = races[selectedRazaName];
            const charsRoll = razaData.caracteristicasRoll;

            for (const char in rollSpans) {
                const spanId = rollSpans[char];
                const rollFormula = charsRoll[char];
                if (spanId && rollFormula) {
                    document.getElementById(spanId).textContent = `(${rollFormula})`;
                }
            }
        } else {
            // Limpiar fórmulas si no hay raza seleccionada
            for (const char in rollSpans) {
                const spanId = rollSpans[char];
                if (spanId) {
                    document.getElementById(spanId).textContent = '';
                }
            }
        }
    }

    function generarCaracteristicasAleatorias() {
        const selectedRazaName = razaSelector.value;
        if (!selectedRazaName) {
            alert("Por favor, selecciona una raza primero.");
            return;
        }

        const razaData = races[selectedRazaName];
        const charsRoll = razaData.caracteristicasRoll;
        
        let str = evalRoll(charsRoll.STR);
        let con = evalRoll(charsRoll.CON);
        let dex = evalRoll(charsRoll.DEX);
        let pow = evalRoll(charsRoll.POW);
        let cha = evalRoll(charsRoll.CHA);
        let siz = evalRoll(charsRoll.SIZ);
        let int = evalRoll(charsRoll.INT);

        // La lógica de puntos extra solo aplica si la raza tiene 'puntosExtra' definidos (> 0)
        // Y solo si la suma total es <= 92 (regla general de RuneQuest)
        let totalCaracteristicas = str + con + siz + dex + int + pow + cha;
        if (razaData.puntosExtra > 0 && totalCaracteristicas <= 92) {
            let puntosExtra = razaData.puntosExtra;
            const caracteristicas = [
                { name: 'str', value: str, min: 3, max: 18 },
                { name: 'con', value: con, min: 3, max: 18 },
                { name: 'dex', value: dex, min: 3, max: 18 },
                { name: 'pow', value: pow, min: 3, max: 18 },
                { name: 'cha', value: cha, min: 3, max: 18 },
                { name: 'siz', value: siz, min: 8, max: 18 },
                { name: 'int', value: int, min: 8, max: 18 }
            ];

            while (puntosExtra > 0) {
                let addedPoint = false;
                // Ordenar por valor ascendente para priorizar las características más bajas
                caracteristicas.sort((a, b) => a.value - b.value);
                for (let i = 0; i < caracteristicas.length; i++) {
                    // Asegurarse de que no exceda el máximo global de 18
                    if (caracteristicas[i].value < caracteristicas[i].max && caracteristicas[i].value < 18) {
                        caracteristicas[i].value++;
                        puntosExtra--;
                        addedPoint = true;
                        if (puntosExtra === 0) break;
                    }
                }
                if (!addedPoint) break; // No se pudieron añadir más puntos
            }

            str = caracteristicas.find(c => c.name === 'str').value;
            con = caracteristicas.find(c => c.name === 'con').value;
            dex = caracteristicas.find(c => c.name === 'dex').value;
            pow = caracteristicas.find(c => c.name === 'pow').value;
            cha = caracteristicas.find(c => c.name === 'cha').value;
            siz = caracteristicas.find(c => c.name === 'siz').value;
            int = caracteristicas.find(c => c.name === 'int').value;
        }

        // Asignar a los inputs de la interfaz
        document.getElementById('str').value = str;
        document.getElementById('con').value = con;
        document.getElementById('siz').value = siz;
        document.getElementById('dex').value = dex;
        document.getElementById('int').value = int;
        document.getElementById('pow').value = pow;
        document.getElementById('cha').value = cha;
    }

    // Función para evaluar las tiradas de dados (ej. '3D6', '2D6+6')
    function evalRoll(rollString) {
        const parts = rollString.split('+');
        let total = 0;
        let constant = 0;

        const dicePart = parts[0];
        const diceMatch = dicePart.match(/(\d+)D(\d+)/);
        if (diceMatch) {
            const numDice = parseInt(diceMatch[1]);
            const sides = parseInt(diceMatch[2]);
            total = rollDice(numDice, sides);
        } else {
            total = parseInt(dicePart); // In case it's just a number
        }

        if (parts.length > 1) {
            constant = parseInt(parts[1]);
            total += constant;
        }
        return total;
    }

    function getCharacteristicValue(charName) {
        return parseInt(document.getElementById(charName).value);
    }


    function calcularAtributosDerivados(str, con, siz, dex, intel, pow, cha, selectedRazaName) {
        const atributos = {};

        atributos.puntosMagia = pow;

        let pvModifierPow = getModifierFromTable(pow, powHitPointModifiers);
        let pvModifierSiz = getModifierFromTable(siz, sizHitPointModifiers);
        atributos.puntosVidaTotal = con + pvModifierPow + pvModifierSiz;

        const avgStrCon = (str + con) / 2;
        atributos.cargaMaxima = Math.min(str, avgStrCon);

        const strSizSum = str + siz;
        let damageBonus = '';
        const sortedDamageBonusKeys = Object.keys(damageBonusTable).filter(k => k.includes('-')).sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]));
        let foundDamageBase = false;
        let lastDamageRangeMax = 0;

        for (const rangeKey of sortedDamageBonusKeys) {
            const [min, max] = rangeKey.split('-').map(Number);
            if (strSizSum >= min && strSizSum <= max) {
                damageBonus = damageBonusTable[rangeKey];
                foundDamageBase = true;
            }
            if (max > lastDamageRangeMax) {
                lastDamageRangeMax = max;
            }
        }

        if (!foundDamageBase) {
            if (strSizSum <= 12) {
                damageBonus = '-1D4';
            } else if (strSizSum <= 24) {
                damageBonus = 'Ninguno';
            } else if (strSizSum >= 25 && strSizSum <= 32) {
                damageBonus = '+1D4';
            } else if (strSizSum >= 33 && strSizSum <= 40) {
                damageBonus = '+1D6';
            } else if (strSizSum >= 41 && strSizSum <= 56) {
                damageBonus = '+2D6';
            } else if (strSizSum > 56) {
                const baseDiceVal = 2;
                const additionalDiceUnits = Math.floor((strSizSum - 56) / 16);
                const additionalDice = parseInt((damageBonusTable['each +16'].match(/(\d+)D6/) || ['', '0'])[1]) * additionalDiceUnits;
                damageBonus = `+${baseDiceVal + additionalDice}D6`;
            }
        }
        atributos.bonoDanio = damageBonus;

        const powChaSum = pow + cha;
        let spiritualDamage = '';

        const spiritualDamageRanges = [
            { range: [2, 12], value: '1D3' },
            { range: [13, 24], value: '1D6' },
            { range: [25, 32], value: '1D6+1' },
            { range: [33, 40], value: '1D6+3' },
            { range: [41, 56], value: '2D6+3' }
        ];

        let foundSpiritualBase = false;
        let lastSpiritualRangeMax = 0;

        for (const entry of spiritualDamageRanges) {
            if (powChaSum >= entry.range[0] && powChaSum <= entry.range[1]) {
                spiritualDamage = entry.value;
                foundSpiritualBase = true;
                break;
            }
            if (entry.range[1] > lastSpiritualRangeMax) {
                lastSpiritualRangeMax = entry.range[1];
            }
        }

        if (!foundSpiritualBase && powChaSum > lastSpiritualRangeMax) {
            const unitsAboveMax = Math.floor((powChaSum - lastSpiritualRangeMax) / 16);
            const eachPlusValue = spiritualDamageTable['each +16'];

            if (powChaSum > 56) {
                let currentDice = 2;
                let currentConstant = 3;

                const eachPlusDiceMatch = eachPlusValue.match(/(\d+)D6/);
                const eachPlusConstantMatch = eachPlusValue.match(/\+(\d+)/);

                const additionalDicePerUnit = eachPlusDiceMatch ? parseInt(eachPlusDiceMatch[1]) : 0;
                const additionalConstantPerUnit = eachPlusConstantMatch ? parseInt(eachPlusConstantMatch[1]) : 0;

                currentDice += (additionalDicePerUnit * unitsAboveMax);
                currentConstant += (additionalConstantPerUnit * unitsAboveMax);
                
                spiritualDamage = `${currentDice}D6+${currentConstant}`;

            } else if (!foundSpiritualBase) {
                if (powChaSum >= 2 && powChaSum <= 12) spiritualDamage = '1D3';
                else if (powChaSum >= 13 && powChaSum <= 24) spiritualDamage = '1D6';
                else if (powChaSum >= 25 && powChaSum <= 32) spiritualDamage = '1D6+1';
                else if (powChaSum >= 33 && powChaSum <= 40) spiritualDamage = '1D6+3';
                else if (powChaSum >= 41 && powChaSum <= 56) spiritualDamage = '2D6+3';
                else spiritualDamage = '1D3';
            }
        } else if (!foundSpiritualBase) {
             if (powChaSum >= 2 && powChaSum <= 12) spiritualDamage = '1D3';
             else if (powChaSum < 2) spiritualDamage = '1D3';
        }

        atributos.bonoDanioEspiritual = spiritualDamage;

        atributos.tasaCuracion = getModifierFromTable(con, healingRateTable);
        atributos.mrDes = calculateStrikeRank(dex, dexStrikeRankTable);
        atributos.mrTam = calculateStrikeRank(siz, sizStrikeRankTable);

        atributos.puntosVidaLocalizacion = {};
        let pvTotalParaTabla = atributos.puntosVidaTotal;
        let baseLocationHP = {};

        const sortedHitLocationRanges = Object.keys(hitLocationTable).filter(k => k.includes('-')).sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]));
        let selectedRangeKey = '1-6';

        for (const rangeKey of sortedHitLocationRanges) {
            const [min, max] = rangeKey.split('-').map(Number);
            if (pvTotalParaTabla >= min && pvTotalParaTabla <= max) {
                selectedRangeKey = rangeKey;
                break;
            }
        }
        baseLocationHP = hitLocationTable[selectedRangeKey];

        if (pvTotalParaTabla > 21) {
            const unitsAbove21 = Math.floor((pvTotalParaTabla - 21) / 3);
            const extraPointsPerLocation = unitsAbove21 * hitLocationTable['each +3']['Each Leg'];

            atributos.puntosVidaLocalizacion['Cada Pierna'] = baseLocationHP['Each Leg'] + extraPointsPerLocation;
            atributos.puntosVidaLocalizacion['Abdomen'] = baseLocationHP['Abdomen'] + extraPointsPerLocation;
            atributos.puntosVidaLocalizacion['Pecho'] = baseLocationHP['Chest'] + extraPointsPerLocation;
            atributos.puntosVidaLocalizacion['Cada Brazo'] = baseLocationHP['Each Arm'] + extraPointsPerLocation;
            atributos.puntosVidaLocalizacion['Cabeza'] = baseLocationHP['Head'] + extraPointsPerLocation;
        } else {
            atributos.puntosVidaLocalizacion['Cada Pierna'] = baseLocationHP['Each Leg'];
            atributos.puntosVidaLocalizacion['Abdomen'] = baseLocationHP['Abdomen'];
            atributos.puntosVidaLocalizacion['Pecho'] = baseLocationHP['Chest'];
            atributos.puntosVidaLocalizacion['Cada Brazo'] = baseLocationHP['Each Arm'];
            atributos.puntosVidaLocalizacion['Cabeza'] = baseLocationHP['Head'];
        }

        atributos.modificadoresHabilidad = {};
        for (const category in skillCategoryModifiers) {
            let totalModifier = 0;
            const characteristicModifiers = skillCategoryModifiers[category];
            for (const charac in characteristicModifiers) {
                if (charac === 'default') continue;
                let value;
                switch (charac) {
                    case 'STR': value = str; break;
                    case 'DEX': value = dex; break;
                    case 'INT': value = intel; break;
                    case 'POW': value = pow; break;
                    case 'CHA': value = cha; break;
                    case 'SIZ': value = siz; break;
                    default: value = 0;
                }
                const modValue = getModifierFromTable(value, characteristicModifiers[charac]);
                if (typeof modValue === 'number') {
                    totalModifier += modValue;
                }
            }
            atributos.modificadoresHabilidad[category] = `${totalModifier >= 0 ? '+' : ''}${totalModifier}%`;
        }

        // Obtener el movimiento de la raza seleccionada
        atributos.movimiento = races[selectedRazaName].movimiento;

        // Añadir cultos y runas de la raza
        atributos.cultosRaza = races[selectedRazaName].cults;
        atributos.runasRaza = races[selectedRazaName].runas;
        atributos.magiaRaza = races[selectedRazaName].magia;


        return atributos;
    }

    function calcularHabilidades(characteristics, selectedProfession, skillCategoryResults, selectedRazaName) {
        const habilidades = {
            'Habilidades Base Racial': [],
            'Habilidades de Profesión': [],
            'SkillCategoryResults': skillCategoryResults // Modificadores de categoría ya calculados
        };

        // Añadir habilidades base de la raza
        const razaData = races[selectedRazaName];
        if (razaData && razaData.habilidadesBase) {
            for (const skillName in razaData.habilidadesBase) {
                habilidades['Habilidades Base Racial'].push({
                    name: skillName,
                    value: razaData.habilidadesBase[skillName]
                });
            }
        }

        // Habilidades de profesión
        if (selectedProfession && selectedProfession.skills) {
            const professionSkills = selectedProfession.skills.split(', ').map(s => {
                const parts = s.split(' ');
                const percentage = parseInt(parts.pop().replace('%', ''));
                const skillName = parts.join(' ');
                return { name: skillName, value: percentage };
            });

            habilidades['Habilidades de Profesión'] = professionSkills;
        }
        
        return habilidades;
    }

    function mostrarPersonaje() {
        const selectedRazaName = razaSelector.value;
        const selectedProfessionIndex = profesionSelector.value;

        if (!selectedRazaName) {
            alert("Por favor, selecciona una raza.");
            return;
        }
        if (selectedProfessionIndex === "") {
            alert("Por favor, selecciona una profesión.");
            return;
        }

        resultadosContainer.style.display = 'block';

        const str = getCharacteristicValue('str');
        const con = getCharacteristicValue('con');
        const siz = getCharacteristicValue('siz');
        const dex = getCharacteristicValue('dex');
        const int = getCharacteristicValue('int');
        const pow = getCharacteristicValue('pow');
        const car = getCharacteristicValue('cha');

        const characteristics = { str, con, siz, dex, int, pow, car };
        const atributosDerivados = calcularAtributosDerivados(str, con, siz, dex, int, pow, car, selectedRazaName);
        const selectedProfession = profesiones[selectedProfessionIndex];
        const habilidades = calcularHabilidades(characteristics, selectedProfession, atributosDerivados.modificadoresHabilidad, selectedRazaName);

        // Combinar cultos de raza y profesión
        let cultosCombinados = [];
        if (atributosDerivados.cultosRaza) {
            cultosCombinados = cultosCombinados.concat(atributosDerivados.cultosRaza.split(', ').map(c => c.trim()));
        }
        if (selectedProfession.cults) {
            cultosCombinados = cultosCombinados.concat(selectedProfession.cults.split(', ').map(c => c.trim()));
        }
        // Eliminar duplicados y unir
        const cultosUnicos = [...new Set(cultosCombinados)].join(', ');

        // Combinar runas de raza y profesión
        let runasCombinadas = [];
        if (atributosDerivados.runasRaza) {
            runasCombinadas = runasCombinadas.concat(atributosDerivados.runasRaza.split(', ').map(r => r.trim()));
        }
        if (selectedProfession.runas) {
            runasCombinadas = runasCombinadas.concat(selectedProfession.runas.split(', ').map(r => r.trim()));
        }
        // Eliminar duplicados y unir
        const runasUnicas = [...new Set(runasCombinadas)].join(', ');

        let html = `
            <h3>Raza: ${selectedRazaName}</h3>
            ${races[selectedRazaName].notas ? `<p class="race-notes">${races[selectedRazaName].notas}</p>` : ''}
            <h3>Tus Características</h3>
            <table class="tabla-atributos">
                <thead>
                    <tr>
                        <th>Característica</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Fuerza (FUE)</td><td>${str}</td></tr>
                    <tr><td>Constitución (CON)</td><td>${con}</td></tr>
                    <tr><td>Tamaño (TAM)</td><td>${siz}</td></tr>
                    <tr><td>Destreza (DES)</td><td>${dex}</td></tr>
                    <tr><td>Inteligencia (INT)</td><td>${int}</td></tr>
                    <tr><td>Poder (POD)</td><td>${pow}</td></tr>
                    <tr><td>Carisma (CAR)</td><td>${car}</td></tr>
                </tbody>
            </table>

            <h3>Atributos Derivados</h3>
            <table class="tabla-atributos">
                <thead>
                    <tr>
                        <th>Atributo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Puntos de Magia (PM)</td><td>${atributosDerivados.puntosMagia}</td></tr>
                    <tr><td>Puntos de Vida Totales (PV)</td><td>${atributosDerivados.puntosVidaTotal}</td></tr>
                    <tr><td>Carga Máxima (ENC)</td><td>${atributosDerivados.cargaMaxima.toFixed(1)}</td></tr>
                    <tr><td>Bono de Daño</td><td>${atributosDerivados.bonoDanio}</td></tr>
                    <tr><td>Daño en Combate Espiritual</td><td>${atributosDerivados.bonoDanioEspiritual}</td></tr>
                    <tr><td>Movimiento (MOV)</td><td>${atributosDerivados.movimiento}</td></tr>
                    <tr><td>Tasa de Curación</td><td>${atributosDerivados.tasaCuracion} PV/día</td></tr>
                    <tr><td>MR-DES (DEX Strike Rank)</td><td>${atributosDerivados.mrDes}</td></tr>
                    <tr><td>MR-TAM (SIZ Strike Rank)</td><td>${atributosDerivados.mrTam}</td></tr>
                </tbody>
            </table>

            <h3>Puntos de Vida por Localización</h3>
            <table class="tabla-localizaciones">
                <thead>
                    <tr>
                        <th>Localización</th>
                        <th>PV</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Cabeza</td><td>${atributosDerivados.puntosVidaLocalizacion['Cabeza']}</td></tr>
                    <tr><td>Pecho</td><td>${atributosDerivados.puntosVidaLocalizacion['Pecho']}</td></tr>
                    <tr><td>Abdomen</td><td>${atributosDerivados.puntosVidaLocalizacion['Abdomen']}</td></tr>
                    <tr><td>Brazo Derecho</td><td>${atributosDerivados.puntosVidaLocalizacion['Cada Brazo']}</td></tr>
                    <tr><td>Brazo Izquierdo</td><td>${atributosDerivados.puntosVidaLocalizacion['Cada Brazo']}</td></tr>
                    <tr><td>Pierna Derecha</td><td>${atributosDerivados.puntosVidaLocalizacion['Cada Pierna']}</td></tr>
                    <tr><td>Pierna Izquierda</td><td>${atributosDerivados.puntosVidaLocalizacion['Cada Pierna']}</td></tr>
                </tbody>
            </table>

            <h3>Habilidades</h3>
            <p>A continuación se muestran los modificadores de categoría de habilidades base según tus características. Las habilidades de profesión y raciales se suman a estas bases.</p>
            <table class="tabla-habilidades">
                <thead>
                    <tr>
                        <th>Categoría de Habilidad</th>
                        <th>Modificador por Característica</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Agilidad</td><td>${habilidades.SkillCategoryResults['Agility']}</td></tr>
                    <tr><td>Comunicación</td><td>${habilidades.SkillCategoryResults['Communication']}</td></tr>
                    <tr><td>Conocimiento</td><td>${habilidades.SkillCategoryResults['Knowledge']}</td></tr>
                    <tr><td>Manipulación</td><td>${habilidades.SkillCategoryResults['Manipulation']}</td></tr>
                    <tr><td>Percepción</td><td>${habilidades.SkillCategoryResults['Perception']}</td></tr>
                    <tr><td>Sigilo</td><td>${habilidades.SkillCategoryResults['Stealth']}</td></tr>
                    <tr><td>Magia</td><td>${habilidades.SkillCategoryResults['Magic']}</td></tr>
                </tbody>
            </table>
            <h4>Habilidades Base Racial</h4>
            <ul style="list-style-type: none; padding-left: 0;">`;
        habilidades['Habilidades Base Racial'].forEach(skill => {
            html += `<li>${skill.name} ${skill.value}%</li>`;
        });
        html += `</ul>
            <h4>Habilidades de Profesión (se suman al valor base)</h4>
            <ul style="list-style-type: none; padding-left: 0;">`;
        habilidades['Habilidades de Profesión'].forEach(skill => {
            html += `<li>${skill.name} ${skill.value}%</li>`;
        });
        html += `</ul>

            <h3>Tu Profesión</h3>
            <h4>${selectedProfession.nombre}</h4>
            <table class="tabla-atributos">
                <tbody>
                    <tr><td>Estilo de Vida</td><td>${selectedProfession.living}</td></tr>
                    <tr><td>Ingresos</td><td>${selectedProfession.income}</td></tr>
                    <tr><td>Rescate</td><td>${selectedProfession.ransom}</td></tr>
                    <tr><td>Equipo</td><td>${selectedProfession.equipment}</td></tr>
                    ${selectedProfession.notas ? `<tr><td>Notas</td><td>${selectedProfession.notas}</td></tr>` : ''}
                </tbody>
            </table>

            <h3>Afinidades Rúnicas y Pasiones</h3>
            <table class="tabla-atributos">
                <tbody>
                    <tr><td>Cultos</td><td>${cultosUnicos}</td></tr>
                    <tr><td>Runas</td><td>${runasUnicas}</td></tr>
                    <tr><td>Magia</td><td>${atributosDerivados.magiaRaza}</td></tr>
                    <tr><td>Pasiones</td><td>${selectedProfession.passions || 'No especificadas'}</td></tr>
                </tbody>
            </table>
            <p>Se distribuirán 50 puntos entre tus afinidades rúnicas. Recuerda que si una afinidad de Runa de Poder o de Forma se eleva, el valor de su afinidad opuesta debe reducirse para que el total sea 100.</p>
            <p>Las pasiones quedan a criterio del jugador para su desarrollo.</p>

            <button class="btn-magia" onclick="document.getElementById('resultados-container').style.display='none'">Volver</button>
        `;

        resultadoPrincipal.innerHTML = html;
    }

    poblarRazas();
    actualizarProfesionesPorRaza(); 
}

if (document.readyState === 'complete') {
    initCreacionPersonajes();
} else {
    document.addEventListener('DOMContentLoaded', initCreacionPersonajes);
}