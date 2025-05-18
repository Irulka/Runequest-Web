function initPifias() {
    console.log('Inicializando Tabla de Pifias...');

    const efectosPifias = {
        "1-5": "Pierde la siguiente parada.",
        "6-10": "Pierde el siguiente ataque.",
        "11-15": "Pierdes el siguiente ataque y la siguiente parada.",
        "16-20": "Pierdes el siguiente ataque, parada y esquiva.",
        "21-25": "Pierdes los siguientes 1D3 ataques.",
        "26-30": "Pierdes los siguientes 2D3 ataques y paradas.",
        "31-35": "Se rompe la sujección del escudo y lo pierde de inmediato.",
        "36-40": "Se rompe la sujección del escudo y lo pierde de inmediato, junto con el siguiente ataque.",
        "41-45": "Se rompe una correa de la armadura y se le suelta una pieza (tirar localización).",
        "46-50": "Se rompe una correa de la armadura y se le suelta una pieza (tirar localización). También pierde el proximo ataque y parada.",
        "51-55": "Se cae y pierde la parada en el asalto actual. Tarda 1D3 asaltos en levantarse.",
        "56-60": "Torcedura de tobillo; su MOV se reduce a la mitad durante 5D10 asaltos.",
        "61-63": "Se tuerce el tobillo y cae al suelo. Tardará 1D3 asaltos en levantarse y movimiento reducido a la mitad durante 5D10 asaltos.",
        "64-67": "Visión afectada. Pierde 25% en ataques y paradas. Se necesitan 1D3 turnos sin combatir para que se aclare la visión.",
        "68-70": "Visión afectada. Pierde 50% en ataques y paradas. Se necesitan 1D6 turnos sin combatir para que se aclare la visión.",
        "71-72": "Visión impedida. Pierde todos los ataques y paradas. Se necesitan 1D6 turnos sin combatir para que se aclare la visión.",
        "73-74": "Distraido; los enemigos atacan durante el siguiente asalto con un +25%.",
        "75-78": "Deja caer el arma, o escudo empleado. Tarda 1D3 asaltos para recuperarlo.",
        "79-82": "El arma o escudo sale disparada a 1D6 metros de distancia. Dirección (1D8): 1-norte, 2-noreste, 3-este, 4-sureste, 5-sur, 6-suroeste, 7-este, 8-noroeste.",
        "83-86": "El arma o escudo empleado se rompe. Si está encantado, 10% por cada punto de magia de batalla y 20% por cada punto de magia rúnica.",
        "87-89": "Ataque: Golpea al aliado más cercano o a uno mismo, causando daño normal. Parada: guardia abierta, el enemigo consigue automáticamente un ataque exitoso normal.",
        "90-91": "Ataque: Golpea al aliado más cercano o a uno mismo, causando dano máximo. Parada: guardia abierta, el enemigo consigue automáticamente un ataque exitoso normal.",
        "92-92": "Ataque: Golpea al aliado más cercano o a uno mismo, causando dano crítico. Parada: guardia abierta, el enemigo consigue automáticamente un ataque exitoso normal.",
        "93-95": "Ataque: Se golpea a sí mismo causándose daño normal. Parada: Guardia abierta. El enemigo impacta automáticamenet causando daño máximo.",
        "96-97": "Ataque: Se golpea a sí mismo causándose daño máximo. Parada: Guardia abierta. El enemigo impacta automaticamente casuando daño crítico.",
        "98-98": "Ataque: Se golpea a sí mismo con un resultado crítoco. Parada: Guardia abierta y el enemigo consigue automáticamente un éxito crítico.",
        "99-99": "¡La has hecho buena! Tira dos veces en la tabla y aplica todos los resultados.",
        "100-100": "¡La has hecho buena! Tira tres veces en la tabla y aplica todos los resultados."
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

    console.log('Tabla de Pifias lista para usar');
}

// Inicialización
if (document.readyState === 'complete') {
    initPifias();
} else {
    document.addEventListener('DOMContentLoaded', initPifias);
}