function initRasgosCaoticos() {
    console.log('Inicializando Rasgos Caóticos...');

    const efectosRasgos = {
        "1-3": "-1D6 Poder.",
        "4-5": "-2D6 Poder.",
        "6-6": "-3D6 Poder.",
        "7-9": "-1D6 Destreza.",
        "10-11": "-2D6 Destreza.",
        "12-12": "-3D6 Destreza.",
        "13-14": "-2D6 Fuerza.",
        "15-15": "-4D6 Fuerza.",
        "16-17": "-2D6 Constitución.",
        "18-18": "-4D6 Constitución.",
        "19-20": "+3 al rango de ataque de la víctima, mientrsa dure el hechizo.",
        "21-22": "La víctima no puede resistirse a ningún hechizo de nivel 1.",
        "23-24": "Empapado en ácido. Potencia 2D10 (duranto 1 solo turno).",
        "25-26": "Envuleto en llamas. 3D10 de daño (durante 1 solo turno).",
        "27-28": "Atrae la magia: todos los hechizos de ataque de 1 punto lanzados en un radio de 20 metros apuntan automáticamente a la víctima.",
        "29-30": "La víctima se vuelve inmune al fuego durante la duración del conjuro.",
        "31-32": "Superar un chequeo de INTx5 o la víctima quedará estupefácta durante 15 minutos.",
        "33-35": "Todos los enemigos tienen un +20% de impactar a la víctima.",
        "36-37": "una gema, objeto mágico o arma valiosa en posesión de la víctima es devorada por el caos y desaparece para siempre.",
        "38-40": "Cada asalto de combate cuerpo a cuerpo, la víctima recibe 1 punto de daño en una localización al azar hasta que expire el conjuro.",
        "41-42": "La víctima queda desconcertada hasta que acabe el conjuro.",
        "43-45": "Los metales no rúnicos hacen el doble de daño a la víctima.",
        "46-46": "La víctima es incapaz de atacar físicamente.",
        "47-48": "Todos los enemigos tienen +30% de posibilidades de impactar a la víctima.",
        "49-50": "La víctima es atacada por un veneno de potencia 2D10 (un solo asalto).",
        "51-52": "Casa asalto  de combate cuerpo a cuerpo, la víctima recibe 3 puntos de daño en una localización al azar hsata que expire el conjuro.",
        "53-54": "Todas las armas que impacten a la víctima añaden +3 al daño.",
        "55-56": "La víctima se ve afectado por un conjuro de enlentecer.",
        "57-58": "La víctima no puede resistirse a conjuros de 1 o 2 puntos.",
        "59-60": "Un espíritu de 3D6 POD entra en combate espiritual con la víctima.",
        "61-62": "Una explosión de 3D6 de daño y 3m de radio afecta a todos, incluida la víctima (solo un turno).",
        "63-65": "La víctima se vuelve físicamente inconfundible del lanzador del conjuro.",
        "66-67": "La víctima se vuelve muy silenciosa al moverse. +25% de forma permanente a Deslizarse en Silencio.",
        "68-70": "El objetivo se convierte en atrayente mágico para hechizos de 1 y 2 puntos: todos los hechizos de magia espiritual lanzados a cualquier persona, beneficiosa o perjudicial, en un radio de 3 metros del objetivo golpean en su lugar a la víctima.",
        "71-72": "Añade +4 puntos de daño a todas las armas que impacten a la víctima.",
        "73-74": "Añade +5 puntos de daño a todas las armas que impacten a la víctima.",
        "75-76": "Añade +6 puntos de daño a todas las armas que impacten a la víctima..",
        "77-77": "La víctima no puede usar magia ofensiva.",
        "78-80": "La víctima sufre 10D6 puntos de daño en una localización al azar hasta que expire el conjuro.",
        "81-82": "La víctima queda inmovilizada.",
        "83-84": "La victima se vuelve Berserker como si estuviera bajo los efectos del conjuro Fanatismo.",
        "85-85": "Los enemigos tienen +40% de posibilidades de impactar a la víctima.",
        "86-87": "Todos los objetos en el cuerpo de la víctima son devorados por el caos y esta queda desnuda y desarmada.",
        "88-90": "La víctima no puede producir sonidos vocales, incluido el lanzamiento de conjuros.",
        "91-92": "Supera un chequeo de CONx5 o pierde la consciencia durante la duración del conjuro.",
        "93-94": "La víctima será el objetivo de todos los conjuros que se lancen en un radio de 3 metros.",
        "95-96": "La víctima queda Desmoralizada hasta la finalización del conjuro.",
        "97-98": "Pierde 2D6 de Tamaño.",
        "99-99": "Tirar dos veces, volviendo a tirar si se obtiene este resultado una vez más.",
        "100-100": "La víctima se une al bando del lanzador mientras dure el hechizo."
    };

    // Función para obtener el efecto basado en el rango
    const obtenerEfecto = (valor) => {
        for (const [rango, efecto] of Object.entries(efectosRasgos)) {
            const [min, max] = rango.split('-').map(Number);
            if (valor >= min && valor <= max) {
                return efecto;
            }
        }
        return `Efecto misterioso (${valor}): El DJ decide el resultado`;
    };

    // Elementos de la interfaz
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnManual = document.getElementById('btn-manual');
    const inputValor = document.getElementById('input-valor');
    const resultadosContainer = document.querySelector('.resultados-container');
    const resultadoPrincipal = document.getElementById('resultado-principal');

    // Verificación de elementos
    if (!btnAleatorio || !btnManual || !resultadosContainer) {
        console.error('Error: Elementos esenciales no encontrados en el DOM');
        return;
    }

    // Función para mostrar resultados
    const mostrarResultados = (valor) => {
        console.log(`Mostrando resultado para: ${valor}`);
        
        if (resultadoPrincipal) {
            resultadoPrincipal.querySelector('.resultado-valor').textContent = valor;
            resultadoPrincipal.querySelector('.resultado-efecto').textContent = obtenerEfecto(valor);
        }

        resultadosContainer.style.display = 'block';
    };

    // Event Listeners
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

    console.log('Maldición de Thed lista para usar');
}

// Inicialización
if (document.readyState === 'complete') {
    initRasgosCaoticos();
} else {
    document.addEventListener('DOMContentLoaded', initRasgosCaoticos);
}