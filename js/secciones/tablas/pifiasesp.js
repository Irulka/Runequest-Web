function initPifiasEsp() {
    console.log('Inicializando Tabla de Pifias en Combate Espiritual...');

    const efectosPifias = {
        "1-15": "El combatiente confunde las realidades; pierde todas las acciones en la siguiente ronda.",
        "16-30": "El combatiente comienza a soñar; pierde los siguientes dos asaltos mientras ataca enemigos imaginarios.",
        "31-45": "El combatiente se confunde con el objetivo; se inflige daño de combate espiritual a sí mismo.",
        "46-60": "El combatiente alucina; si está discorporado, puede atacar a cualquier objetivo cercano al azar; si está en el Mundo Medio, pierde los siguientes 1D3 asaltos negociando con un enemigo imaginario.",
        "61-75": "Las energías del combatiente se desenfocan; pierde 1D6 puntos de magia.",
        "76-79": "El combatiente comienza a llorar incontrolablemente y tiene problemas para ver. Su habilidad de Combate Espiritual se reduce a la mitad durante los siguientes dos asaltos.",
        "80-89": "Las energías del combate espiritual penetran el velo; el combatiente sufre 1D3 puntos de daño a una localización aleatoria.",
        "90-90": "Un objeto mágico (elegido al azar) queda dañado irreparablemente debido al desbordamiento de energías mágicas.",
        "91-95": "Las energías afectan los sentidos del combatiente. Tira 1D6: 1: Las piernas se entumecen y el combatiente cae; 2: Los brazos se entumecen y suelta lo que esté sosteniendo; 3-4: Pierde el control de la vejiga; 5: Pierde el control de los intestinos; 6: Cae inconsciente (retiene los puntos de magia restantes).",
        "96-98": "**No chamán:** El cuerpo y espíritu del combatiente se separan; se discorpora y solo puede reunirse con un éxito en Tirada de Viaje Espiritual o la intervención de un chamán. El DJ debe determinar los efectos físicos de una discorporación prolongada.\n**Chamán:** Tira dos veces de nuevo.",
        "99-99": "El combatiente pierde toda fe y cree que su única opción viable es rendirse; el combate espiritual termina.",
        "100-100": "¡La has hecho buena! Tira dos veces en la tabla y aplica todos los resultados."
    };

    // Función para obtener el efecto basado en el rango
    const obtenerEfecto = (valor) => {
        for (const [rango, efecto] of Object.entries(efectosPifias)) {
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

    console.log('Tabla de Pifias en Combate Espiritual lista para usar');
}

// Inicialización
if (document.readyState === 'complete') {
    initPifiasEsp();
} else {
    document.addEventListener('DOMContentLoaded', initPifiasEsp);
}