// Inicialización del generador de nombres
// Esta función se ejecutará automáticamente cuando el script sea cargado por main.js
// y el DOM de la sección 'nombres.html' ya esté disponible.
(function() { // Usamos una IIFE (Immediately Invoked Function Expression) para encapsular el código
    console.log('Inicializando Generador de Nombres...');

    // Elementos de la interfaz
    const selectRaza = document.getElementById('raza');
    const checkApodo = document.getElementById('incluir-apodo');
    const btnGenerar = document.getElementById('generar-nombre');
    const btnMasculino = document.getElementById('masculino');
    const btnFemenino = document.getElementById('femenino');
    
    // Contenedor de resultados dentro de varita-container
    const resultadoGeneradoContainer = document.getElementById('resultado-generado-container'); 
    const resultadoPrincipal = document.getElementById('resultado-principal'); 

    // Variables de estado
    let genero = 'masculino';

    // Configurar eventos para los botones de género
    btnMasculino.addEventListener('click', (e) => {
        e.preventDefault();
        genero = 'masculino';
        btnMasculino.classList.add('active');
        btnFemenino.classList.remove('active');
        console.log('Género seleccionado:', genero);
        // Ocultar y limpiar resultados si se cambia el género
        resultadoGeneradoContainer.classList.remove('visible');
        resultadoPrincipal.innerHTML = '';
    });

    btnFemenino.addEventListener('click', (e) => {
        e.preventDefault();
        genero = 'femenino';
        btnFemenino.classList.add('active');
        btnMasculino.classList.remove('active');
        console.log('Género seleccionado:', genero);
        // Ocultar y limpiar resultados si se cambia el género
        resultadoGeneradoContainer.classList.remove('visible');
        resultadoPrincipal.innerHTML = '';
    });

    // Configurar evento para el botón generar
    btnGenerar.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Botón Generar clickeado');

        const raza = selectRaza.value;
        const incluirApodo = checkApodo.checked;

        console.log('Raza seleccionada:', raza);
        console.log('Incluir apodo:', incluirApodo);

        if (!raza) {
            console.log('No se seleccionó raza');
            alert('Por favor, selecciona una raza');
            return;
        }
        
        // Limpiar y ocultar el resultado anterior antes de generar uno nuevo
        resultadoGeneradoContainer.classList.remove('visible');
        resultadoPrincipal.innerHTML = '';

        console.log('Generando nombre...');
        const nombre = generarNombre(raza, genero, incluirApodo);
        console.log('Nombre generado:', nombre);
        mostrarResultado(nombre); 
    });

    // Base de datos de sílabas por raza y género
    const silabasDB = {
        humano: {
            masculino: ['al', 'ber', 'to', 'car', 'los', 'man', 'uel', 'jo', 'se', 'mar', 'tin', 'an', 'dre', 'luis', 'fran', 'cis', 'co', 'juan', 'ped', 'ro', 'die', 'go', 'mig', 'gui', 'ller', 'vic', 'tor', 'fer', 'nan', 'do'],
            femenino: ['mar', 'ia', 'an', 'na', 'car', 'men', 'lu', 'ci', 'a', 'so', 'fi', 'a', 'is', 'a', 'bel', 'lau', 'ra', 'eli', 'za', 'beth', 'pau', 'la', 'ju', 'li', 'a', 'ale', 'jan', 'dra', 'cla', 'u', 'dia']
        },
        elfo: {
            masculino: ['el', 'ron', 'del', 'las', 'le', 'glor', 'ion', 'sil', 'van', 'lor', 'ien', 'thal', 'as', 'mir', 'ion', 'fin', 'ar', 'el', 'dar', 'gal', 'ad', 'riel', 'cele', 'born', 'leg', 'olas', 'gil', 'thon', 'mel', 'kor'],
            femenino: ['ar', 'wen', 'ce', 'le', 'bri', 'an', 'na', 'luth', 'ien', 'gal', 'ad', 'riel', 'nym', 'phe', 'la', 'ria', 'sil', 'mari', 'el', 'da', 'wen', 'isil', 'dris', 'yav', 'an', 'na', 'il', 'mar', 'eth', 'riel']
        },
        enano: {
            masculino: ['gim', 'li', 'tho', 'rin', 'bal', 'in', 'dwa', 'lin', 'glo', 'dor', 'bif', 'ur', 'bom', 'bur', 'fi', 'ki', 'oin', 'ori', 'no', 'do', 'bal', 'ther', 'fund', 'gor', 'gro', 'ri', 'har', 'drin', 'thor', 'daz'],
            femenino: ['dis', 'fra', 'hel', 'ga', 'hil', 'dis', 'kat', 'la', 'li', 'na', 'mora', 'na', 'nor', 'na', 'ora', 'ra', 'gna', 'sig', 'run', 'tho', 'ra', 'ul', 'dra', 've', 'ra', 'yrs', 'a', 'zul', 'dra', 'eva']
        },
        orco: {
            masculino: ['rag', 'nak', 'gul', 'dush', 'mau', 'gur', 'sha', 'kha', 'zog', 'grom', 'thrak', 'snag', 'git', 'ug', 'luk', 'skum', 'drog', 'gor', 'bag', 'rat', 'ug', 'luk', 'skum', 'drog', 'gor', 'bag', 'rat', 'ug', 'luk', 'skum'],
            femenino: ['gra', 'na', 'sha', 'ka', 'mau', 'ra', 'ug', 'tha', 'zog', 'ga', 'snag', 'ga', 'git', 'tha', 'drog', 'ga', 'gor', 'ga', 'bag', 'ga', 'rat', 'ga', 'ug', 'tha', 'luk', 'ga', 'skum', 'ga', 'drog', 'ga']
        },
        troll: {
            masculino: ['uz', 'zaz', 'clo', 'ut', 'lo', 'grok', 'mug', 'lub', 'thud', 'grug', 'dung', 'snar', 'gluk', 'bog', 'rot', 'mud', 'gob', 'slud', 'grub', 'blug', 'thok', 'gak', 'drok', 'slug', 'blug', 'thok', 'gak', 'drok', 'slug', 'blug'],
            femenino: ['uz', 'za', 'cla', 'uta', 'la', 'grak', 'a', 'mug', 'a', 'thud', 'a', 'grug', 'a', 'dung', 'a', 'snar', 'a', 'gluk', 'a', 'bog', 'a', 'rot', 'a', 'mud', 'a', 'gob', 'a', 'slud', 'a', 'grub', 'a']
        }
    };

    // Lista de apodos
    const apodos = [
        'el/la valiente', 'el/la sabio/a', 'el/la astuto/a', 'el/la veloz', 'el/la fuerte', 'el/la yunque','el/la traicionero/a',
        'el/la sagaz', 'el/la mago/a', 'el/la guerrero/a', 'el/la cazador/a', 'el/la viajero/a', 'el/la seductor','el/la soplon/a',
        'el/la explorador/a', 'el/la erudito/a', 'el/la noble', 'el/la justo/a', 'el/la piadoso/a', 'el/la casto/a', 'el/la desconfiado/a',
        'el/la cruel', 'el/la despiadado/a', 'el/la oscuro/a', 'el/la luminoso/a', 'el/la bendito/a', 'el/la salvaje', 'el/la lugrube',
        'el/la maldito/a', 'el/la sangriento/a', 'el/la matador/a', 'el/la destructor/a', 'el/la creador/a', 'el/la afilado/a','el/la iracundo/a',
        'el/la artesano/a', 'el/la herrero/a', 'el/la arquitecto/a', 'el/la constructor/a', 'el/la sabio/a', 'el/la iluminado/a',
        'el/la viejo/a', 'el/la joven', 'el/la inmortal', 'el/la eterno/a', 'el/la fugaz','el/la sacamantecas', 'el/la luchador/a',
        'el/la rápido/a', 'el/la lento/a', 'el/la pesado/a', 'el/la ligero/a', 'el/la ágil', 'el/la apestoso', 'el/la veloz',
        'el/la torpe', 'el/la elegante', 'el/la grosero/a', 'el/la educado/a', 'el/la cortés', 'el/la victorioso/a', 'el/la azote',
        'el/la descortés', 'el/la amable', 'el/la hostil', 'el/la pacífico/a', 'el/la belicoso/a', 'el/la vengativo/a'
    ];

    // Función para generar un nombre aleatorio
    function generarNombre(raza, genero, incluirApodo) {
        console.log(`Generando nombre para ${raza}, género ${genero}, apodo: ${incluirApodo}`);
        const silabas = silabasDB[raza][genero];
        const formato = elegirFormatoNombre();

        console.log(`Formato seleccionado: ${formato}`);
        console.log(`Sílabas disponibles: ${silabas.length}`);

        let nombre = '';

        switch(formato) {
            case 'corto':
                nombre = generarNombreCorto(silabas);
                break;
            case 'largo':
                nombre = generarNombreLargo(silabas);
                break;
            case 'compuesto':
                nombre = generarNombreCompuesto(silabas);
                break;
        }

        // Capitalizar la primera letra del nombre principal
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

        // Añadir apodo si se solicita
        let apodo = '';
        if (incluirApodo) {
            apodo = obtenerApodoAleatorio(genero);
        }

        return {
            nombre: nombre,
            apodo: apodo,
            formato: formato, 
            raza: raza,       
            genero: genero    
        };
    }

    // Función para elegir aleatoriamente el formato del nombre
    function elegirFormatoNombre() {
        const formatos = ['corto', 'largo', 'compuesto'];
        return formatos[Math.floor(Math.random() * formatos.length)];
    }

    // Función para generar nombre corto (2 sílabas)
    function generarNombreCorto(silabas) {
        const silaba1 = silabas[Math.floor(Math.random() * silabas.length)];
        let silaba2 = silabas[Math.floor(Math.random() * silabas.length)];

        // Evitar repetición de sílabas idénticas
        while (silaba2 === silaba1) {
            silaba2 = silabas[Math.floor(Math.random() * silabas.length)];
        }

        return silaba1 + silaba2;
    }

    // Función para generar nombre largo (3 sílabas)
    function generarNombreLargo(silabas) {
    const numSilabas = 3; // Ahora siempre determina 3 sílabas
    let nombre = '';

    for (let i = 0; i < numSilabas; i++) {
        nombre += silabas[Math.floor(Math.random() * silabas.length)];
    }

    return nombre;
}

    // Función para generar nombre compuesto (2 nombres), capitalizando la segunda palabra
    function generarNombreCompuesto(silabas) {
        const nombre1 = Math.random() > 0.5 ?
            generarNombreCorto(silabas) :
            generarNombreLargo(silabas);

        let nombre2 = Math.random() > 0.5 ?
            generarNombreCorto(silabas) :
            generarNombreLargo(silabas);
        
        // Capitalizar la primera letra de la segunda palabra
        nombre2 = nombre2.charAt(0).toUpperCase() + nombre2.slice(1);

        return nombre1 + ' ' + nombre2;
    }

    // Función para obtener un apodo aleatorio y manejar la concordancia de género
    function obtenerApodoAleatorio(genero) {
        let apodoOriginal = apodos[Math.floor(Math.random() * apodos.length)];
        let apodoFinal = apodoOriginal;

        // 1. Reemplazar 'el/la' por 'el' o 'la'
        apodoFinal = apodoFinal.replace('el/la', genero === 'masculino' ? 'el' : 'la');

        // 2. Manejar la variación de género de la palabra en sí
        if (genero === 'femenino') {
            // Caso 1: Apodos que terminan en 'o/a' (ej. SanguinariO/A -> SanguinariA)
            if (apodoFinal.includes('o/a')) {
                apodoFinal = apodoFinal.replace('o/a', 'a');
            } 
            // Caso 2: Apodos que terminan en 'or/a' (ej. Constructor/A -> Constructora)
            else if (apodoFinal.includes('or/a')) {
                apodoFinal = apodoFinal.replace('or/a', 'ora');
            }
            // Caso 3: Apodos que solo tienen '/a' (ej. Desmembrador/a -> Desmembradora)
            else if (apodoFinal.includes('/a')) {
                // Elimina solo el '/' (la 'a' ya está presente al final del apodo original)
                apodoFinal = apodoFinal.replace('/a', ''); 
            }
            // Caso 4: Apodos que no tienen /a y no necesitan cambio de terminación (ej. Audaz)
            // No se hace nada, ya que la palabra no cambia por género.
        } else { // genero === 'masculino'
            // Para el masculino, simplemente eliminamos las partes de variación de género
            apodoFinal = apodoFinal.replace('/a', '');
            apodoFinal = apodoFinal.replace('o/a', 'o');
            apodoFinal = apodoFinal.replace('or/a', 'or');
        }

        return apodoFinal;
    }


    // Función para mostrar el resultado
    function mostrarResultado(nombreObj) { 
        console.log('Mostrando resultado:', nombreObj);

        if (!resultadoGeneradoContainer || !resultadoPrincipal) {
            console.error('No se encontró el contenedor de resultados o el div de resultado principal');
            return;
        }

        const htmlResultado = `
            <div class="ficha-nombre">
                <div class="nombre-y-apodo">
                    <span class="nombre-principal">${nombreObj.nombre}</span>
                    ${nombreObj.apodo ? `<span class="apodo">"${nombreObj.apodo}"</span>` : ''}
                </div>
            </div>
        `;

        resultadoPrincipal.innerHTML = htmlResultado;
        
        resultadoGeneradoContainer.classList.add('visible');

        console.log('Resultado mostrado en el DOM');
    }
})(); 