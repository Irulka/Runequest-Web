function initGeneradorCristales() {
    console.log('Inicializando Generador de Cristales...');

    const tiposCristales = {
        "1": {
            nombre: "Combinación",
            descripcion: "Tira dos veces y combina los resultados. Suma los POD para la atadura pero trátalos por separado para las capacidades.",
            pod: "Suma de ambos POD"
        },
        "2": {
            nombre: "POD Extra",
            descripcion: "Este cristal tiene una dosis extra de POD. Tira de nuevo y suma 1D6 al POD del nuevo cristal.",
            pod: "POD del nuevo cristal +1D6"
        },
        "2-5": {
            nombre: "Enfoque Curativo",
            descripcion: "Duplica el efecto de los hechizos de Curación lanzados por el aventurero atado, hasta un máximo igual al POD del cristal.",
            pod: "1D8"
        },
        "6-8": {
            nombre: "Sensibilidad",
            descripcion: "Permite lanzar hechizos de Detección de 1 punto sin costo, y de 2 puntos por 1 punto de magia. Usos diarios igual al POD del cristal.",
            pod: "1D8"
        },
        "9-11": {
            nombre: "Doble Rendimiento",
            descripcion: "Proporciona hasta el doble de su POD en puntos de magia por día para que el aventurero los use.",
            pod: "1D8"
        },
        "12-14": {
            nombre: "Potenciador de Poder",
            descripcion: "Duplica la efectividad de hechizos de fuerza variable (excepto Curación) lanzados por el aventurero atado.",
            pod: "1D8"
        },
        "15-16": {
            nombre: "Refuerzo de Hechizos",
            descripcion: "Añade 1 punto de POD por cada punto de POD del cristal al POD característico del usuario cuando usan un hechizo de ataque.",
            pod: "1D4"
        },
        "17-18": {
            nombre: "Fortalecimiento de Hechizos",
            descripcion: "Añade 1 punto de magia por cada punto usado en un hechizo, hasta su límite de POD, para superar Contramagia y Escudos.",
            pod: "1D4"
        },
        "19-20": {
            nombre: "Resistencia a Hechizos",
            descripcion: "Añade su POD a la defensa mágica de un aventurero, dándole POD extra para defenderse.",
            pod: "1D4"
        },
        "21-22": {
            nombre: "Apoyo Espiritual",
            descripcion: "Cada punto de POD del cristal añade +10% a la habilidad de Combate Espiritual del usuario, tanto para ataque como defensa.",
            pod: "1D4"
        },
        "23-24": {
            nombre: "Almacén de Hechizos",
            descripcion: "Cada punto de este cristal cuenta como 1 punto de CAR para poseer hechizos de magia espiritual o espíritus vinculados.",
            pod: "1D4"
        },
        "25-30": {
            nombre: "Defectuoso",
            descripcion: "Contaminado por el Caos, estos cristales pueden ser imposibles de atar, drenar POD permanentemente, o tener efectos impredecibles.",
            pod: "Variable"
        },
        "31-100": {
            nombre: "Almacén de POD/Trampa de Espíritus",
            descripcion: "Puede contener un espíritu o almacenar puntos de magia para el aventurero, hasta su límite de capacidad (2D6+3).",
            pod: "2D6+3"
        }
    };

    // Función para obtener el tipo de cristal basado en el rango
    const obtenerTipoCristal = (valor) => {
        for (const [rango, datos] of Object.entries(tiposCristales)) {
            if (rango.includes('-')) {
                const [min, max] = rango.split('-').map(Number);
                if (valor >= min && valor <= max) {
                    return datos;
                }
            } else if (valor == rango) {
                return datos;
            }
        }
        return tiposCristales["31-100"]; // Por defecto, almacén de POD
    };

    // Función para tirar dados
const tirarDados = (formula) => {
    // Manejar fórmulas con suma (ej. "2D6+3")
    if (formula.includes('+')) {
        const [dicePart, bonus] = formula.split('+').map(part => part.trim());
        const [numDados, caras] = dicePart.split('D').map(Number);
        let total = 0;
        for (let i = 0; i < numDados; i++) {
            total += Math.floor(Math.random() * caras) + 1;
        }
        return total + Number(bonus);
    }
    // Manejar fórmulas simples (ej. "1D8")
    else {
        const [numDados, caras] = formula.split('D').map(Number);
        let total = 0;
        for (let i = 0; i < numDados; i++) {
            total += Math.floor(Math.random() * caras) + 1;
        }
        return total;
    }
};

    // Función para manejar casos especiales (1 y 2)
    const manejarCasosEspeciales = (valor, tipo) => {
        if (valor === 1) {
            // Combinación: tirar dos veces
            const tipo1 = obtenerTipoCristal(Math.floor(Math.random() * 100) + 1);
            const tipo2 = obtenerTipoCristal(Math.floor(Math.random() * 100) + 1);
            const pod1 = tipo1.pod.includes('D') ? tirarDados(tipo1.pod) : 0;
            const pod2 = tipo2.pod.includes('D') ? tirarDados(tipo2.pod) : 0;
            
            return {
                nombre: `Combinación: ${tipo1.nombre} + ${tipo2.nombre}`,
                pod: `${pod1 + pod2} (${tipo1.pod} + ${tipo2.pod})`,
                descripcion: `${tipo1.descripcion}\n\n${tipo2.descripcion}`
            };
        } else if (valor === 2) {
            // POD extra: tirar de nuevo y sumar 1D6
            const nuevoTipo = obtenerTipoCristal(Math.floor(Math.random() * 100) + 1);
            const podBase = nuevoTipo.pod.includes('D') ? tirarDados(nuevoTipo.pod) : 0;
            const podExtra = tirarDados('1D6');
            
            return {
                nombre: `${nuevoTipo.nombre} con POD Extra`,
                pod: `${podBase + podExtra} (${nuevoTipo.pod} +1D6)`,
                descripcion: `${nuevoTipo.descripcion}\n\nEste cristal tiene un POD adicional de 1D6.`
            };
        }
        return tipo;
    };

    // Elementos de la interfaz
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnManual = document.getElementById('btn-manual');
    const inputValor = document.getElementById('input-valor');
    const resultadosContainer = document.querySelector('.resultados-container');
    const resultadoTipo = document.querySelector('.resultado-tipo');
    const resultadoPod = document.querySelector('.resultado-pod');
    const resultadoDescripcion = document.querySelector('.resultado-descripcion');

    // Verificación de elementos
    if (!btnAleatorio || !btnManual || !resultadosContainer) {
        console.error('Error: Elementos esenciales no encontrados en el DOM');
        return;
    }

    // Función para mostrar resultados
    const mostrarResultados = (valor, esAleatorio) => {
        console.log(`Mostrando resultado para: ${valor}`);
        
        const tipo = obtenerTipoCristal(valor);
        
        if (esAleatorio) {
            const resultadoFinal = manejarCasosEspeciales(valor, tipo);
            
            if (resultadoFinal) {
                resultadoTipo.textContent = `Cristal de ${resultadoFinal.nombre}`;
                
                if (resultadoFinal.pod.includes('D') && !resultadoFinal.pod.includes('(')) {
                    const pod = tirarDados(resultadoFinal.pod.split('D')[0] + 'D' + resultadoFinal.pod.split('D')[1]);
                    resultadoPod.textContent = `POD: ${pod} (${resultadoFinal.pod})`;
                } else {
                    resultadoPod.textContent = `POD: ${resultadoFinal.pod}`;
                }
                
                resultadoDescripcion.textContent = resultadoFinal.descripcion;
            }
        } else {
            resultadoTipo.textContent = `Cristal de ${tipo.nombre}`;
            resultadoPod.textContent = `POD: ${tipo.pod}`;
            resultadoDescripcion.textContent = tipo.descripcion;
        }

        resultadosContainer.style.display = 'block';
    };

    // Event Listeners
    btnAleatorio.addEventListener('click', () => {
        const valor = Math.floor(Math.random() * 100) + 1;
        console.log('Tirada aleatoria:', valor);
        inputValor.style.display = 'none';
        mostrarResultados(valor, true);
    });

    btnManual.addEventListener('click', () => {
        inputValor.style.display = inputValor.style.display === 'none' ? 'block' : 'none';
        if (inputValor.style.display === 'block') inputValor.focus();
    });

    inputValor.addEventListener('change', (e) => {
        const valor = parseInt(e.target.value);
        if (!isNaN(valor) && valor >= 1 && valor <= 100) {
            mostrarResultados(valor, false);
            e.target.value = '';
            inputValor.style.display = 'none';
        } else {
            alert('Por favor, introduce un número entre 1 y 100');
            inputValor.focus();
        }
    });

    console.log('Generador de Cristales listo para usar');
}

// Inicialización
if (document.readyState === 'complete') {
    initGeneradorCristales();
} else {
    document.addEventListener('DOMContentLoaded', initGeneradorCristales);
}