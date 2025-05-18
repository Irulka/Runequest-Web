function initRasgosCaoticos() {
    console.log('Inicializando Rasgos Caóticos...');

    const efectosRasgos = {
        "1-3": "+1D6 Poder.",
        "4-5": "+2D6 Poder.",
        "6-6": "+3D6 Poder.",
        "7-8": "+2D6 Destreza.",
        "9-9": "+4D6 Destreza.",
        "10-11": "+2D6 Fuerza.",
        "12-12": "+4D6 Fuerza.",
        "13-14": "+2D6 Constitución.",
        "15-15": "+4D6 Constitución.",
        "16-17": "+2D6 Tamaño.",
        "18-18": "+4D6 Tamaño.",
        "19-20": "Escupe ácido de 2D10 de POT a seis metros 1d6 veces al día.",
        "21-22": "2D6 veces al día escupe aliento de fuego de potencia 3D10 y alcance de 3 metros.",
        "23-23": "Altamente inflamable. Si prende fuego, quemará todo en un radio de 3 metros.",
        "24-26": "Órganos sensoriales extra.",
        "27-28": "Apariencia confusa. -20% a todos los ataques dirigidos a el.",
        "29-29": "Apariencia muy confusa. -30% a todos los ataques dirigidos a el.",
        "30-30": "Apariencia extremadamente confusa. -40% a todos los ataques dirigidos a el.",
        "31-32": "Tacto venenoso. Veneno de 2D10 POT una vez traspase la armadura.",
        "33-35": "+6 de armadura corporal.",
        "36-37": "+9 de armadura corporal.",
        "38-39": "+12 de armadura corporal.",
        "40-42": "Absorve conjuros mágicos de hasta 2 puntos, añadiendo los puntos absorvidos a sus PM.",
        "43-44": "Absorve conjuros mágicos de hasta 4 puntos, añadiendo los puntos absorvidos a sus PM.",
        "45-45": "Absorve conjuros mágicos de hasta 2D6 puntos, añadiendo los puntos absorvidos a sus PM.",
        "46-48": "Refleja conjuros de hasta 2 puntos hacial el lanzador sin que le afecten.",
        "46-50": "Refleja conjuros de hasta 4 puntos hacial el lanzador sin que le afecten.",
        "51-51": "Refleja conjuros de hasta 2D6 puntos hacial el lanzador sin que le afecten.",
        "52-54": "Una vez muerto, su espíritu ataca a quien lo mató en combate espiritual. Si lo posee, se apoderará de él.",
        "55-56": "Incrementa su velocidad de movimiento en 2D6 metros por asalto.",
        "57-58": "Explota al morir. Todos en un rango de 3m  recibirán un daño entre 1D6 y 6D6 (lanzar 1d6 para determinar).",
        "59-65": "Regenera 2D6-5 puntos de golpe por asalto (mínimo 1) por cada localziación herida.",
        "66-67": "Lanza horribles y agonizantes gritos al moverse.",
        "68-69": "Lleva un valioso metal o una gema visible en su cuerpo (1D10X100 L). Podría ser un diente metálico.",
        "70-70": "Lleva un valioso metal o una gema oculta en su cuerpo (1D6X1000 L). Podría ser un organo interno.",
        "71-72": "Hedor insoportable. Resistir una tirada de CONx5 para no caer inconsciente.",
        "73-74": "Horrible: Los que lo vean deberán superar un chequeo de PODx5 para no ser desmoralizados (igual que el conjuro).",
        "75-76": "Como un ataque adicional, puede desconcertar a un enemigo por turno (igual que el conjuro). Tirada para resistirse.",
        "77-86": "Posee una parte del cuerpo o apéndice adicional, plenamente funcional. Modifica su table de localización.",
        "87-88": "Una característica de la criatura del caos se duplica (por ejemplo ,los gorp tendrán daño de ácido de 16 puntos).",
        "89-90": "Capaz de saltar una distancia en metros igual a su DES.",
        "91-92": "Apariencia hipnótica. Tira INTx5 o permanecerás envelesado hasta que devore al objetivo o se aleje.",
        "93-94": "Tienen la apariencia de un ojbeto inofensivo hasta que se abalanza al ataque.",
        "95-95": "Tira dos veces en esta misma tabla.",
        "96-100": "Tira por La Maldición de Thed."
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

    console.log('Rasgos Caóticos listos para usar');
}

// Inicialización
if (document.readyState === 'complete') {
    initRasgosCaoticos();
} else {
    document.addEventListener('DOMContentLoaded', initRasgosCaoticos);
}