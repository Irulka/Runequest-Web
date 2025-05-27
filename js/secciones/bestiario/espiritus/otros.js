(function() {
    // Elementos de la interfaz
    const UI = {
        btnAnimal: document.getElementById('btn-animal'),
        btnNoctulo: document.getElementById('btn-noctulo'),
        btnNinfa: document.getElementById('btn-ninfa'),
        btnSerpiente: document.getElementById('btn-serpiente'), 
        resultados: document.getElementById('resultados-espiritu'),
        tablaEspiritu: document.getElementById('espiritu-tbody'),
        tablaAtaques: document.getElementById('ataques-tbody'),
        tablaHabilidades: document.getElementById('habilidades-tbody'),
        tablaLocalizaciones: document.getElementById('localizaciones-tbody'),
        tablaMagia: document.getElementById('magia-tbody'),
        seccionAnimal: document.getElementById('animal-info'),
        tablaAnimal: document.getElementById('animal-tbody'),
        seccionAtaques: document.getElementById('ataques-info'),
        seccionLocalizaciones: document.getElementById('localizaciones-info'),
        seccionDescripcion: document.getElementById('descripcion-info'),
        tablaDescripcion: document.getElementById('descripcion-tbody'),
        seccionMagia: document.getElementById('magia-info')
    };

    // Lista de tipos de espíritus animales y sus hechizos
    const tiposAnimales = [
        { tipo: "Anfibio (rana, tritón)", hechizos: ["Detectar Enemigos", "Pegamento"] },
        { tipo: "Artrópodo (araña, escorpión)", hechizos: ["Coordinación", "Vinculación Espiritual"] },
        { tipo: "Ave Carnívora (halcón, búho)", hechizos: ["Desmoralizar", "Fariseo", "Movilidad"] },
        { tipo: "Ave No Voladora (pingüino, avestruz)", hechizos: ["Mano de Hierro", "Movilidad"] },
        { tipo: "Ave Herbívora (paloma, gallo)", hechizos: ["Glamour", "Bruma"] },
        { tipo: "Ave Acuática (pato, gaviota)", hechizos: ["Detectar Enemigos", "Movilidad"] },
        { tipo: "Cefalópodo (pulpo, calamar)", hechizos: ["Muro Oscuro"] },
        { tipo: "Crustáceo (cangrejo, langosta)", hechizos: ["Protección"] },
        { tipo: "Pez Grande Herbívoro (mantarraya, carpa)", hechizos: ["Curar", "Movilidad"] },
        { tipo: "Pez Grande Carnívoro (tiburón, lucio)", hechizos: ["Desmoralizar", "Lentitud", "Fuerza"] },
        { tipo: "Pez Pequeño (trucha, piraña)", hechizos: ["Coordinación", "Ojos de Río", "Bruma"] },
        { tipo: "Insecto Herbívoro (abeja, langosta)", hechizos: ["Coordinación", "Movilidad"] },
        { tipo: "Insecto Carnívoro (avispa, mantis)", hechizos: ["Disrupción", "Movilidad"] },
        { type: "Invertebrado (gusano, medusa)", hechizos: ["Segunda Vista"] },
        { type: "Mamífero Grande Carnívoro (león, oso)", hechizos: ["Desmoralizar", "Mano de Hierro", "Fuerza"] },
        { type: "Mamífero Grande Herbívoro (caballo, bisonte)", hechizos: ["Detectar Enemigos", "Movilidad", "Vigor"] },
        { type: "Mamífero Pequeño Carnívoro (comadreja, murciélago)", hechizos: ["Mano de Hierro", "Movilidad"] },
        { type: "Mamífero Pequeño Herbívoro (conejo, rata)", hechizos: ["Detectar Enemigos", "Silencio"] },
        { type: "Reptil Herbívoro (tortuga, iguana)", hechizos: ["Contramagia", "Protección"] },
        { type: "Reptil Carnívoro (cocodrilo, tortuga mordedora)", hechizos: ["Desmoralizar", "Protección"] },
        { type: "Serpiente", hechizos: ["Glamour", "Curar", "Lentitud", "Vigor"] }
    ];

    // Lista de hechizos típicos para nyctalopes
    const hechizosNyctalopes = [
        "Muro Oscuro",
        "Desmoralizar",
        "Espada Romo",
        "Bruma",
        "Oscuridad"
    ];

    // Lista de hechizos típicos para ninfas
    const hechizosNinfas = [
        "Desconcertar",
        "Vinculación",
        "Coordinación",
        "Extinguir",
        "Curar",
        "Destello"
    ];

    // Tipos de ninfas
    const tiposNinfas = [
        {
            tipo: "Náyade",
            descripcion: "Diosa menor de ríos, lagos y manantiales. Forma su cuerpo directamente del agua. Pierde 1 PM por cada 10 metros que se aleje de su cuerpo de agua.",
            runas: "Agua 100%, Fertilidad 100%"
        },
        {
            tipo: "Oréade",
            descripcion: "Diosa menor de montañas y colinas. Pierde 1 PM por cada 20 metros que se aleje de su montaña o colina.",
            runas: "Tierra 100%, Fertilidad 100%"
        },
        {
            tipo: "Mujer Salvaje",
            descripcion: "Diosa menor que gobierna los lugares salvajes, vagando por colinas y valles. Danzan en celebración extática, dando bendiciones a quienes las complacen.",
            runas: "Tierra 100%, Fertilidad 100%"
        }
    ];

    // Función para tirar dados - VERSIÓN CORREGIDA
    function tirarDados(notacion) {
        // Manejar modificadores como +6, +12, +18
        const partes = notacion.split('+');
        let dados = partes[0];
        let modificador = partes.length > 1 ? parseInt(partes[1]) : 0;
        
        const [numDados, caras] = dados.split('D').map(Number);
        let total = 0;
        
        if (isNaN(numDados) || isNaN(caras)) {
            console.error("Notación de dados inválida:", notacion);
            return modificador; // Devuelve al menos el modificador
        }
        
        // Tirar los dados
        for (let i = 0; i < numDados; i++) {
            total += Math.floor(Math.random() * caras) + 1;
        }
        
        // Aplicar modificador
        return total + modificador;
    }

    // Función para generar un espíritu animal
    function generarAnimal() {
        // Reiniciar selección de botones
        UI.btnAnimal.classList.remove('seleccionado');
        UI.btnNoctulo.classList.remove('seleccionado');
        UI.btnNinfa.classList.remove('seleccionado');
        UI.btnSerpiente.classList.remove('seleccionado');
        
        // Marcar botón seleccionado
        UI.btnAnimal.classList.add('seleccionado');
        
        // Seleccionar tipo aleatorio
        const tipoAnimal = tiposAnimales[Math.floor(Math.random() * tiposAnimales.length)];
        
        // Generar características
        const POD = tirarDados('1D6') + Math.floor(Math.random() * 3) * 6; // 1D6 a 4D6
        const INT = 11; // Valor fijo según PDF
        const CAR = tirarDados('1D3') + (Math.random() > 0.5 ? 0 : tirarDados('3D6') + 3); // 1D3 o 3D6+3
        
        // Generar hechizos aleatorios
        const numHechizos = Math.min(CAR, tipoAnimal.hechizos.length);
        const hechizos = [];
        const hechizosDisponibles = [...tipoAnimal.hechizos];
        
        for (let i = 0; i < numHechizos; i++) {
            const randomIndex = Math.floor(Math.random() * hechizosDisponibles.length);
            hechizos.push(hechizosDisponibles.splice(randomIndex, 1)[0]);
        }
        
        const espiritu = {
            tipo: 'Animal (' + tipoAnimal.tipo + ')',
            POD: POD,
            INT: INT,
            CAR: CAR,
            MOV: POD,
            PM: POD,
            ataque: POD * 5,
            magia: hechizos.join(", "),
            tipoAnimal: tipoAnimal.tipo
        };

        // Mostrar resultados
        mostrarEspiritu(espiritu, 'animal');
    }

    // Función para generar un nyctalope
    function generarNyctalope() {
        // Reiniciar selección de botones
        UI.btnAnimal.classList.remove('seleccionado');
        UI.btnNoctulo.classList.remove('seleccionado');
        UI.btnNinfa.classList.remove('seleccionado');
        UI.btnSerpiente.classList.remove('seleccionado');
        
        // Marcar botón seleccionado
        UI.btnNoctulo.classList.add('seleccionado');
        
        // Determinar tamaño
        const tamanos = [
            { nombre: "Pequeño", SIZ: 4, STR: "4D6", POW: "4D6", HP: "4D6", ataque: 40, danio: "1D6 + 1D4 + Miedo" },
            { nombre: "Mediano", SIZ: 8, STR: "8D6", POW: "8D6", HP: "8D6", ataque: 80, danio: "1D6 + 2D6 + Miedo" },
            { nombre: "Grande", SIZ: 20, STR: "20D6", POW: "20D6", HP: "20D6", ataque: 100, danio: "1D6 + 8D6 + Miedo" }
        ];
        const tamano = tamanos[Math.floor(Math.random() * tamanos.length)];
        
        // Generar características
        const STR = tirarDados(tamano.STR);
        const POW = tirarDados(tamano.POW);
        const HP = tirarDados(tamano.HP);
        const CAR = tirarDados("1D6");
        const MP = POW;
        
        // Generar hechizos
        const numHechizos = Math.min(CAR, hechizosNyctalopes.length);
        const hechizos = [];
        const hechizosDisponibles = [...hechizosNyctalopes];
        
        for (let i = 0; i < numHechizos; i++) {
            const randomIndex = Math.floor(Math.random() * hechizosDisponibles.length);
            hechizos.push(hechizosDisponibles.splice(randomIndex, 1)[0]);
        }
        
        const espiritu = {
            tipo: 'Nyctalope (' + tamano.nombre + ')',
            STR: STR,
            SIZ: tamano.SIZ,
            CAR: CAR,
            POW: POW,
            HP: HP,
            MP: MP,
            ataque: tamano.ataque,
            danio: tamano.danio,
            hechizos: hechizos.join(", "),
            MR: 3
        };

        // Mostrar resultados
        mostrarEspiritu(espiritu, 'nyctalope');
    }

    // Función para generar una ninfa - VERSIÓN COMPLETAMENTE CORREGIDA
    function generarNinfa() {
        // Reiniciar selección de botones
        UI.btnAnimal.classList.remove('seleccionado');
        UI.btnNoctulo.classList.remove('seleccionado');
        UI.btnNinfa.classList.remove('seleccionado');
        UI.btnSerpiente.classList.remove('seleccionado');
        
        // Marcar botón seleccionado
        UI.btnNinfa.classList.add('seleccionado');
        
        // Seleccionar tipo aleatorio
        const tipoNinfa = tiposNinfas[Math.floor(Math.random() * tiposNinfas.length)];
        
        // Generar características con validación
        const STR = Math.max(4, tirarDados('4D6'));
        const CON = Math.max(4, tirarDados('4D6'));
        const SIZ = Math.max(8, tirarDados('2D6+6'));
        const INT = Math.max(9, tirarDados('3D6+6'));
        const POW = Math.max(20, tirarDados('2D6+18'));
        const DEX = Math.max(4, tirarDados('4D6'));
        const CAR = Math.max(14, tirarDados('2D6+12'));
        
        // Calcular valores derivados
        const HP = Math.floor((CON + SIZ) / 2);
        const MP = POW;
        const MR = 4;
        const MOV = POW;
        
        // Generar hechizos
        const numHechizos = Math.min(CAR, hechizosNinfas.length);
        const hechizos = [];
        const hechizosDisponibles = [...hechizosNinfas];
        
        for (let i = 0; i < numHechizos; i++) {
            const randomIndex = Math.floor(Math.random() * hechizosDisponibles.length);
            hechizos.push(hechizosDisponibles.splice(randomIndex, 1)[0]);
        }
        
        // Generar puntos de runa
        const runaPoints = tirarDados('1D20');
        
        const espiritu = {
            tipo: 'Ninfa (' + tipoNinfa.tipo + ')',
            STR: STR,
            CON: CON,
            SIZ: SIZ,
            INT: INT,
            POW: POW,
            DEX: DEX,
            CAR: CAR,
            HP: HP,
            MP: MP,
            MR: MR,
            MOV: MOV,
            ataque: 115,
            hechizos: hechizos.join(", "),
            runas: tipoNinfa.runas,
            runaPoints: runaPoints,
            descripcion: tipoNinfa.descripcion,
            tipoNinfa: tipoNinfa.tipo,
            habilidades: [
                "Sin Cuerpo: Puede formar o disipar un cuerpo humanoide a voluntad",
                "Comando: Puede comandar cualquier criatura de su dominio por 1 PM",
                "Combate Espiritual: Puede iniciar combate espiritual cuando está incorpórea",
                "Percepción Espiritual: Siente todos los espíritus en su área"
            ]
        };

        // Mostrar resultados
        mostrarEspiritu(espiritu, 'ninfa');
    }

    // Función para generar una Hija Serpiente
    function generarHijaSerpiente() {
        // Reiniciar selección de botones
        UI.btnAnimal.classList.remove('seleccionado');
        UI.btnNoctulo.classList.remove('seleccionado');
        UI.btnNinfa.classList.remove('seleccionado');
        UI.btnSerpiente.classList.remove('seleccionado');

        // Marcar botón seleccionado
        UI.btnSerpiente.classList.add('seleccionado');

        // Generar características de la Hija Serpiente
        const STR = tirarDados('2D6+12');
        const CON = tirarDados('4D6');
        const SIZ = tirarDados('4D6+8');
        const INT = tirarDados('2D6+6');
        const POW = tirarDados('6D6+6');
        const DEX = tirarDados('3D6+6');
        const CAR = tirarDados('3D6+8');

        // Valores derivados
        const MOV = 8;
        const SR_Base = 1;
        const HP = Math.floor((CON + SIZ) / 2); // PV = Media de CON y SIZ
        const MP = POW; // PM = POD

        // Habilidades
        const habilidadesEspeciales = [
            { tipo: "Danza", descripcion: "120%" },
            { tipo: "Combate Espiritual", descripcion: "135%" },
            { tipo: "Lealtad (templo)", descripcion: "90%" }, // Esto es una pasión, pero se puede mostrar aquí
            { tipo: "Runas (Tierra)", descripcion: "100%" },
            { tipo: "Runas (Fertilidad)", descripcion: "85%" },
            { tipo: "Comunicación", descripcion: "Puede comunicarse mágicamente con la sacerdotisa principal (si está dentro de los terrenos sagrados) como si fuera un espíritu aliado." },
            { tipo: "Embelesamiento (Especial)", descripcion: "La Hija Serpiente debe igualar su POD contra el POD de su objetivo. Si tiene éxito, el objetivo queda embelesado y no puede actuar contra ella durante tantas horas como CAR tenga la Hija Serpiente. Si falla, no puede intentar embelesar a ese objetivo de nuevo." },
            { tipo: "Constricción (Especial)", descripcion: "Cuando es golpeado por el ataque de constricción, el objetivo es retenido en las espirales de la Hija Serpiente y recibe daño automáticamente en las rondas siguientes. La armadura solo protegerá hasta que el daño acumulativo supere los puntos de armadura, momento en el que se aplasta y se rompe. El daño por constricción es igual al bonificador de daño de la Hija Serpiente." }
        ];

        // Magia
        const runaPoints = tirarDados('4D6');
        const magiaEspiritu = `Hechizos de magia espiritual igual a su CAR (${CAR} puntos)`;
        const magiaRuna = `4D6 (${runaPoints}) puntos de magia rúnica Ernaldana. También tiene acceso a Crear Fisura.`;

        const espiritu = {
            tipo: 'Hija Serpiente',
            STR: STR,
            CON: CON,
            SIZ: SIZ,
            INT: INT,
            POW: POW,
            DEX: DEX,
            CAR: CAR,
            MOV: MOV,
            SR_Base: SR_Base,
            HP: HP,
            MP: MP,
            armadura: "5 puntos de piel de piedra verde en todas partes. La cola y el abdomen tienen 2 puntos adicionales de escamas pétreas.",
            habilidades: habilidadesEspeciales, 
            magiaEspiritu: magiaEspiritu,
            magiaRuna: magiaRuna,
            ataques: [
                {
                    arma: "Hacha de Guerra",
                    danio: "1D8+2+2D6",
                    porcentaje: "85%",
                    SR: "4"
                },
                {
                    arma: "Embelesamiento",
                    danio: "Especial",
                    porcentaje: "Embelesamiento",
                    SR: "1"
                },
                {
                    arma: "Constricción",
                    danio: "2D6 + bonificación de daño por constricción**",
                    porcentaje: "85%",
                    SR: "10"
                }
            ],
            localizaciones: [
                { localizacion: "Cola", d20: "01-08", armaduraHP: "$7/8$" },
                { localizacion: "Abdomen", d20: "09-11", armaduraHP: "$7/7$" },
                { localizacion: "Pecho", d20: "12", armaduraHP: "$5/8$" },
                { localizacion: "Brazo Derecho", d20: "13-15", armaduraHP: "$5/6$" },
                { localizacion: "Brazo Izquierdo", d20: "16-18", armaduraHP: "$5/6$" },
                { localizacion: "Cabeza", d20: "19-20", armaduraHP: "$5/7$" }
            ],
            descripcion: {
                apariencia: "Torso, brazos y cabeza de una hermosa mujer con la parte inferior del cuerpo de una serpiente gigante. Parece estar hecha de piedra verde.",
                origen: "Hijas de Ernalda y guardianas de sus templos y lugares sagrados.",
                invocacion: "Pueden ser invocadas como Espíritus de Culto por varios Cultos de la Tierra como Ernalda y Maran Gor, requiriendo al menos 4 puntos de Runa.",
                comportamiento: "Normalmente flotan invisiblemente alrededor de una estatua de la Hija Serpiente (su cuerpo físico) cerca de la entrada del templo, pero pueden viajar en forma discorpórea por todo el recinto del templo. Pueden habitar su estatua y darle vida, permitiéndole moverse y actuar físicamente. Protegen su templo y a sus adoradores dentro de sus recintos sagrados.",
                resurreccion: "Si su cuerpo es asesinado, se discorporan, para crear un nuevo cuerpo en el siguiente día sagrado del templo."
            }
        };

        // Mostrar resultados
        mostrarEspiritu(espiritu, 'hijaSerpiente');
    }

    // Función para mostrar los resultados
    function mostrarEspiritu(espiritu, tipo) {
        // Limpiar tablas y mostrar secciones adecuadas
        UI.tablaEspiritu.innerHTML = '';
        UI.tablaHabilidades.innerHTML = '';
        UI.tablaAnimal.innerHTML = '';
        UI.tablaAtaques.innerHTML = '';
        UI.tablaLocalizaciones.innerHTML = '';
        UI.tablaDescripcion.innerHTML = '';
        UI.tablaMagia.innerHTML = '';
        
        UI.seccionAnimal.style.display = tipo === 'animal' ? 'block' : 'none';
        UI.seccionAtaques.style.display = (tipo === 'nyctalope' || tipo === 'ninfa' || tipo === 'hijaSerpiente') ? 'block' : 'none';
        UI.seccionLocalizaciones.style.display = (tipo === 'ninfa' || tipo === 'hijaSerpiente') ? 'block' : 'none';
        UI.seccionDescripcion.style.display = (tipo === 'nyctalope' || tipo === 'ninfa' || tipo === 'hijaSerpiente') ? 'block' : 'none';
        UI.seccionMagia.style.display = (tipo === 'ninfa' || tipo === 'hijaSerpiente') ? 'block' : 'none';

        // Mostrar características principales
        let caracteristicas = [];
        
        if (tipo === 'animal') {
            caracteristicas = [
                { nombre: 'Tipo', valor: espiritu.tipoAnimal, detalles: 'Espíritu de animal específico' },
                { nombre: 'POD (Poder)', valor: espiritu.POD, detalles: 'Tirada de 1D6 a 4D6' },
                { nombre: 'INT (Inteligencia)', valor: espiritu.INT, detalles: 'Valor fijo en 11' },
                { nombre: 'CAR (Carisma)', valor: espiritu.CAR, detalles: 'Tirada de 1D3 a 3D6+3' },
                { nombre: 'Movimiento', valor: espiritu.MOV, detalles: 'Igual al valor de POD' },
                { nombre: 'Puntos de Magia', valor: espiritu.PM, detalles: 'Igual al valor de POD' },
                { nombre: 'Ataque Espiritual', valor: `${espiritu.ataque}%`, detalles: 'Igual a POD×5%' }
            ];
        } else if (tipo === 'nyctalope') {
            caracteristicas = [
                { nombre: 'Tamaño', valor: espiritu.tipo.replace('Nyctalope (', '').replace(')', ''), detalles: `${espiritu.SIZ} metros cúbicos` },
                { nombre: 'FUE (Fuerza)', valor: espiritu.STR, detalles: `Tirada de ${espiritu.SIZ === 4 ? "4D6" : espiritu.SIZ === 8 ? "8D6" : "20D6"}` },
                { nombre: 'CAR (Carisma)', valor: espiritu.CAR, detalles: 'Tirada de 1D6' },
                { nombre: 'POD (Poder)', valor: espiritu.POW, detalles: `Tirada de ${espiritu.SIZ === 4 ? "4D6" : espiritu.SIZ === 8 ? "8D6" : "20D6"}` },
                { nombre: 'Puntos de Vida', valor: espiritu.HP, detalles: `Tirada de ${espiritu.SIZ === 4 ? "4D6" : espiritu.SIZ === 8 ? "8D6" : "20D6"}` },
                { nombre: 'Puntos de Magia', valor: espiritu.MP, detalles: 'Igual al valor de POD' },
                { nombre: 'Movimiento', valor: 6, detalles: 'Valor fijo para nyctalopes' }
            ];
        } else if (tipo === 'ninfa') { 
            caracteristicas = [
                { nombre: 'Tipo', valor: espiritu.tipoNinfa, detalles: espiritu.descripcion },
                { nombre: 'FUE (Fuerza)', valor: espiritu.STR, detalles: 'Tirada de 4D6' },
                { nombre: 'CON (Constitución)', valor: espiritu.CON, detalles: 'Tirada de 4D6' },
                { nombre: 'TAM (Tamaño)', valor: espiritu.SIZ, detalles: 'Tirada de 2D6+6' },
                { nombre: 'INT (Inteligencia)', valor: espiritu.INT, detalles: 'Tirada de 3D6+6' },
                { nombre: 'POD (Poder)', valor: espiritu.POW, detalles: 'Tirada de 2D6+18' },
                { nombre: 'DES (Destreza)', valor: espiritu.DEX, detalles: 'Tirada de 4D6' },
                { nombre: 'CAR (Carisma)', valor: espiritu.CAR, detalles: 'Tirada de 2D6+12' },
                { nombre: 'Puntos de Vida', valor: espiritu.HP, detalles: 'Promedio de CON + TAM' },
                { nombre: 'Puntos de Magia', valor: espiritu.MP, detalles: 'Igual al valor de POD' },
                { nombre: 'Movimiento', valor: espiritu.MOV, detalles: 'Igual al valor de POD' },
                { nombre: 'MR', valor: espiritu.MR, detalles: 'Valor fijo en 4' }
            ];
        } else if (tipo === 'hijaSerpiente') {
            caracteristicas = [
                { nombre: 'FUE (Fuerza)', valor: espiritu.STR, detalles: 'Tirada de 2D6+12' },
                { nombre: 'CON (Constitución)', valor: espiritu.CON, detalles: 'Tirada de 4D6' },
                { nombre: 'TAM (Tamaño)', valor: espiritu.SIZ, detalles: 'Tirada de 4D6+8' },
                { nombre: 'INT (Inteligencia)', valor: espiritu.INT, detalles: 'Tirada de 2D6+6' },
                { nombre: 'POD (Poder)', valor: espiritu.POW, detalles: 'Tirada de 6D6+6' },
                { nombre: 'DES (Destreza)', valor: espiritu.DEX, detalles: 'Tirada de 3D6+6' },
                { nombre: 'CAR (Carisma)', valor: espiritu.CAR, detalles: 'Tirada de 3D6+8' },
                { nombre: 'Movimiento', valor: espiritu.MOV, detalles: 'Valor fijo en 8' },
                { nombre: 'MR Base', valor: espiritu.SR_Base, detalles: 'Valor fijo en 1' },
                { nombre: 'Puntos de Vida', valor: espiritu.HP, detalles: 'Media de CON y TAM' }, // Corrección aquí
                { nombre: 'Puntos de Magia', valor: espiritu.MP, detalles: 'Igual al valor de POD' }, // Corrección aquí
                { nombre: 'Armadura', valor: espiritu.armadura, detalles: '' }
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

        // Mostrar ataques
        if (tipo === 'nyctalope') {
            const ataques = [
                { 
                    tipo: 'Tentáculo de Oscuridad', 
                    porcentaje: `${espiritu.ataque}%`, 
                    danio: espiritu.danio 
                }
            ];

            ataques.forEach(ataque => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${ataque.tipo}</td>
                    <td>${ataque.porcentaje}</td>
                    <td>${ataque.danio} (MR: ${espiritu.MR})</td>
                `;
                UI.tablaAtaques.appendChild(fila);
            });
        } else if (tipo === 'ninfa') {
            const ataques = [
                { 
                    tipo: 'Combate Espiritual', 
                    porcentaje: `${espiritu.ataque}%`, 
                    danio: 'Daño a PM' 
                },
                { 
                    tipo: 'Puño', 
                    porcentaje: '80%', 
                    danio: '1D3+1D4 (MR: 8)' 
                }
            ];

            ataques.forEach(ataque => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${ataque.tipo}</td>
                    <td>${ataque.porcentaje}</td>
                    <td>${ataque.danio}</td>
                `;
                UI.tablaAtaques.appendChild(fila);
            });

            // Mostrar localizaciones de golpe para ninfa
            const localizaciones = [
                { localizacion: 'Pierna Derecha', dado: '01-04', armadura: '0/6' },
                { localizacion: 'Pierna Izquierda', dado: '05-08', armadura: '0/6' },
                { localizacion: 'Abdomen', dado: '09-11', armadura: '0/6' },
                { localizacion: 'Pecho', dado: '12', armadura: '0/7' },
                { localizacion: 'Brazo Derecho', dado: '13-15', armadura: '0/5' },
                { localizacion: 'Brazo Izquierdo', dado: '16-18', armadura: '0/5' },
                { localizacion: 'Cabeza', dado: '19-20', armadura: '0/6' }
            ];

            localizaciones.forEach(loc => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${loc.localizacion}</td>
                    <td>${loc.dado}</td>
                    <td>${loc.armadura}</td>
                `;
                UI.tablaLocalizaciones.appendChild(fila);
            });

            // Mostrar magia para ninfa
            const magias = [
                { tipo: 'Magia de Espíritu', hechizos: espiritu.hechizos || "Ninguno" },
                { tipo: 'Magia Rúnica', hechizos: `Puntos de runa: ${espiritu.runaPoints}. Runas: ${espiritu.runas}` }
            ];

            magias.forEach(magia => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${magia.tipo}</td>
                    <td>${magia.hechizos}</td>
                `;
                UI.tablaMagia.appendChild(fila);
            });
        } else if (tipo === 'hijaSerpiente') {
            espiritu.ataques.forEach(ataque => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${ataque.arma}</td>
                    <td>${ataque.porcentaje}</td>
                    <td>${ataque.danio} (MR: ${ataque.SR})</td>
                `;
                UI.tablaAtaques.appendChild(fila);
            });

            // Mostrar localizaciones de golpe para Hija Serpiente
            espiritu.localizaciones.forEach(loc => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${loc.localizacion}</td>
                    <td>${loc.d20}</td>
                    <td>${loc.armaduraHP}</td>
                `;
                UI.tablaLocalizaciones.appendChild(fila);
            });

            // Mostrar magia para Hija Serpiente
            const magias = [
                { tipo: 'Magia de Espíritu', hechizos: espiritu.magiaEspiritu },
                { tipo: 'Magia Rúnica', hechizos: espiritu.magiaRuna }
            ];

            magias.forEach(magia => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${magia.tipo}</td>
                    <td>${magia.hechizos}</td>
                `;
                UI.tablaMagia.appendChild(fila);
            });
        }

        // Mostrar descripción
        if (tipo === 'nyctalope') {
            const descripciones = [
                { 
                    atributo: 'Apariencia', 
                    detalles: 'Masa oscura flotante con un gran ojo sub-luminoso en su centro. Puede formar garras o tentáculos para atacar.' 
                },
                { 
                    atributo: 'Comportamiento', 
                    detalles: 'Son criaturas malignas que disfrutan sembrando el miedo y la confusión. Atacan sin piedad a los intrusos.' 
                },
                { 
                    atributo: 'Hábitat', 
                    detalles: 'Prefieren lugares oscuros y abandonados, como ruinas, cuevas o bosques densos.' 
                },
                { 
                    atributo: 'Tácticas', 
                    detalles: 'Usan su Fearshock para desorientar a las víctimas antes de atacar con sus tentáculos de oscuridad.' 
                }
            ];

            descripciones.forEach(desc => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${desc.atributo}</td>
                    <td>${desc.detalles}</td>
                `;
                UI.tablaDescripcion.appendChild(fila);
            });
        } else if (tipo === 'ninfa') {
            const descripciones = [
                { 
                    atributo: 'Apariencia', 
                    detalles: 'Manifestación femenina de la conciencia de un lugar natural. Toma la forma de una mujer hermosa y deseable de la especie con la que interactúa.' 
                },
                { 
                    atributo: 'Comportamiento', 
                    detalles: 'Reflejan la magia primal de la fertilidad y el deseo. Las ninfas malévolas reflejan un profundo sentido de rechazo y son horribles.' 
                },
                { 
                    atributo: 'Hábitat', 
                    detalles: 'Gobiernan sobre un área natural específica como un lago, colina, río o pradera.' 
                },
                { 
                    atributo: 'Tácticas', 
                    detalles: 'Pueden comandar criaturas de su dominio y usar combate espiritual cuando están incorpóreas.' 
                }
            ];

            descripciones.forEach(desc => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${desc.atributo}</td>
                    <td>${desc.detalles}</td>
                `;
                UI.tablaDescripcion.appendChild(fila);
            });
        } else if (tipo === 'hijaSerpiente') {
            const descripciones = [
                { atributo: 'Apariencia', detalles: espiritu.descripcion.apariencia },
                { atributo: 'Origen', detalles: espiritu.descripcion.origen },
                { atributo: 'Invocación', detalles: espiritu.descripcion.invocacion },
                { atributo: 'Comportamiento', detalles: espiritu.descripcion.comportamiento },
                { atributo: 'Resurrección', detalles: espiritu.descripcion.resurreccion }
            ];

            descripciones.forEach(desc => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${desc.atributo}</td>
                    <td>${desc.detalles}</td>
                `;
                UI.tablaDescripcion.appendChild(fila);
            });
        }

        // Mostrar habilidades especiales
        let habilidadesAMostrar = [];
        if (tipo === 'hijaSerpiente') {
            habilidadesAMostrar = espiritu.habilidades;
        } else if (tipo === 'animal') {
            habilidadesAMostrar = [
                { 
                    tipo: 'Posesión', 
                    descripcion: 'Puede poseer animales de su tipo o, ocasionalmente, a magos que fallen en derrotarlo en combate espiritual.' 
                },
                { 
                    tipo: 'Cambio de Forma', 
                    descripcion: 'Si posee a un huésped, puede transformarlo en su forma animal específica.' 
                },
                { 
                    tipo: 'Magia', 
                    descripcion: `Conoce los siguientes hechizos: ${espiritu.magia || "Ninguno"}` 
                },
                { 
                    tipo: 'Comportamiento', 
                    descripcion: 'Generalmente ignoran a los magos, excepto si pertenecen a cultos aliados o enemigos de su naturaleza.' 
                }
            ];

            // Mostrar información adicional para animales
            const infoAnimal = [
                { 
                    atributo: 'Origen', 
                    descripcion: 'Descendientes de Hykim y Mikyh, son espíritus de animales específicos.' 
                },
                { 
                    atributo: 'Vinculación', 
                    descripcion: 'A menudo son enlazados en cristales o matrices espirituales por magos.' 
                },
                { 
                    atributo: 'Pactos', 
                    descripcion: 'Los chamanes frecuentemente hacen pactos con espíritus animales poderosos.' 
                },
                { 
                    atributo: 'Características', 
                    descripcion: 'Pueden ser mucho más poderosos que un animal normal de su tipo.' 
                }
            ];

            infoAnimal.forEach(info => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${info.atributo}</td>
                    <td>${info.descripcion}</td>
                `;
                UI.tablaAnimal.appendChild(fila);
            });
        } else if (tipo === 'nyctalope') {
            habilidadesAMostrar = [
                { 
                    tipo: 'Miedo', 
                    descripcion: 'El primer golpe que impacta (incluso si es parado) causa Fearshock. Los ataques posteriores solo hacen daño.' 
                },
                { 
                    tipo: 'Magia', 
                    descripcion: `Conoce los siguientes hechizos: ${espiritu.hechizos || "Ninguno"}` 
                },
                { 
                    tipo: 'Intercambio MP/HP', 
                    descripcion: 'Puede intercambiar puntos de magia y puntos de vida en una proporción 1:1.' 
                },
                { 
                    tipo: 'Detección de POD', 
                    descripcion: 'Puede sentir el POD y los puntos de magia de aquellos dentro de su campo de visión.' 
                },
                { 
                    tipo: 'Debilidad', 
                    descripcion: 'No puede ver a través de un Muro de Luz (Lightwall).' 
                }
            ];
        } else if (tipo === 'ninfa') { 
            habilidadesAMostrar = [
                { 
                    tipo: 'Sin Cuerpo', 
                    descripcion: 'Puede formar o disipar un cuerpo humanoide a voluntad a partir de la sustancia de su hogar.' 
                },
                { 
                    tipo: 'Comando', 
                    descripcion: 'Puede comandar cualquier criatura incompleta nacida o que viva en su dominio por 1 PM. El encanto dura 1 hora y no puede ser resistido.' 
                },
                { 
                    tipo: 'Combate Espiritual', 
                    descripcion: 'Puede iniciar combate espiritual cuando está incorpórea.' 
                },
                { 
                    tipo: 'Percepción Espiritual', 
                    descripcion: 'Puede sentir todos los espíritus dentro de su área de hogar.' 
                },
                { 
                    tipo: 'Magia', 
                    descripcion: `Conoce ${espiritu.CAR} puntos de magia de espíritu y ${espiritu.runaPoints} puntos de magia rúnica.` 
                }
            ];
        }

        habilidadesAMostrar.forEach(habilidad => { 
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${habilidad.tipo}</td>
                <td>${habilidad.descripcion}</td>
            `;
            UI.tablaHabilidades.appendChild(fila);
        });

        // Mostrar sección de resultados
        UI.resultados.style.display = 'block';
    }

    // Configurar botones
    function configurarBotones() {
        UI.btnAnimal.addEventListener('click', generarAnimal);
        UI.btnNoctulo.addEventListener('click', generarNyctalope);
        UI.btnNinfa.addEventListener('click', generarNinfa);
        UI.btnSerpiente.addEventListener('click', generarHijaSerpiente); 
    }

    // Inicialización
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