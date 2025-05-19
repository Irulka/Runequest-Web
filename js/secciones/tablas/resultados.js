function initResultados() {
    console.log('Inicializando Tabla de Resultados...');

    const tablaResultados = [
        { habilidad: "1-5", critico: "1", especial: "1", pifia: "96-00" },
        { habilidad: "6-7", critico: "1", especial: "1", pifia: "96-00" },
        { habilidad: "8-10", critico: "1", especial: "1-2", pifia: "96-00" },
        { habilidad: "11-12", critico: "1", especial: "1-2", pifia: "97-00" },
        { habilidad: "13-17", critico: "1", especial: "1-3", pifia: "97-00" },
        { habilidad: "18-22", critico: "1", especial: "1-4", pifia: "97-00" },
        { habilidad: "23-27", critico: "1", especial: "1-5", pifia: "97-00" },
        { habilidad: "28-29", critico: "1", especial: "1-6", pifia: "97-00" },
        { habilidad: "30-30", critico: "1-2", especial: "1-6", pifia: "97-00" },
        { habilidad: "31-32", critico: "1-2", especial: "1-6", pifia: "98-00" },
        { habilidad: "33-37", critico: "1-2", especial: "1-7", pifia: "98-00" },
        { habilidad: "38-42", critico: "1-2", especial: "1-8", pifia: "98-00" },
        { habilidad: "43-47", critico: "1-2", especial: "1-9", pifia: "98-00" },
        { habilidad: "48-49", critico: "1-2", especial: "1-10", pifia: "98-00" },
        { habilidad: "50-50", critico: "1-3", especial: "1-10", pifia: "98-00" },
        { habilidad: "51-52", critico: "1-3", especial: "1-10", pifia: "99-00" },
        { habilidad: "53-57", critico: "1-3", especial: "1-11", pifia: "99-00" },
        { habilidad: "58-62", critico: "1-3", especial: "1-12", pifia: "99-00" },
        { habilidad: "63-67", critico: "1-3", especial: "1-13", pifia: "99-00" },
        { habilidad: "68-69", critico: "1-3", especial: "1-14", pifia: "99-00" },
        { habilidad: "70-70", critico: "1-4", especial: "1-14", pifia: "99-00" },
        { habilidad: "71-72", critico: "1-4", especial: "1-14", pifia: "99-00" },
        { habilidad: "73-77", critico: "1-4", especial: "1-15", pifia: "99-00" },
        { habilidad: "78-82", critico: "1-4", especial: "1-16", pifia: "99-00" },
        { habilidad: "83-87", critico: "1-4", especial: "1-17", pifia: "99-00" },
        { habilidad: "88-89", critico: "1-4", especial: "1-18", pifia: "99-00" },
        { habilidad: "90-92", critico: "1-5", especial: "1-18", pifia: "99-00" },
        { habilidad: "93-95", critico: "1-5", especial: "1-19", pifia: "99-00" },
        { habilidad: "96-97", critico: "1-5", especial: "1-19", pifia: "99-00" },
        { habilidad: "98-102", critico: "1-5", especial: "1-20", pifia: "99-00" },
        { habilidad: "103-107", critico: "1-5", especial: "1-21", pifia: "99-00" },
        { habilidad: "108-109", critico: "1-5", especial: "1-22", pifia: "99-00" },
        { habilidad: "110-112", critico: "1-6", especial: "1-22", pifia: "99-00" },
        { habilidad: "113-117", critico: "1-6", especial: "1-23", pifia: "99-00" },
        { habilidad: "118-122", critico: "1-6", especial: "1-24", pifia: "99-00" },
        { habilidad: "123+", critico: "5% habilidad", especial: "20% habilidad", pifia: "00" }
    ];

    const obtenerResultados = (valor) => {
        for (const resultado of tablaResultados) {
            if (resultado.habilidad === "123+") {
                if (valor >= 123) return resultado;
                continue;
            }
            
            const [min, max] = resultado.habilidad.split('-').map(Number);
            if (valor >= min && valor <= max) {
                return resultado;
            }
        }
        return {
            habilidad: "Desconocido",
            critico: "5% habilidad",
            especial: "20% habilidad",
            pifia: "00"
        };
    };

    const inputValor = document.getElementById('input-valor');
    const resultadosContainer = document.querySelector('.resultados-container');

    if (!inputValor || !resultadosContainer) {
        console.error('Error: Elementos esenciales no encontrados en el DOM');
        return;
    }

    const mostrarResultados = (valor) => {
        const resultados = obtenerResultados(valor);
        
        document.getElementById('valor-habilidad').textContent = valor;
        document.getElementById('rango-habilidad').textContent = resultados.habilidad;
        document.getElementById('valor-critico').textContent = resultados.critico;
        document.getElementById('valor-especial').textContent = resultados.especial;
        document.getElementById('valor-pifia').textContent = resultados.pifia;

        resultadosContainer.style.display = 'block';
    };

    inputValor.addEventListener('change', (e) => {
        const valor = parseInt(e.target.value);
        if (!isNaN(valor) && valor >= 1 && valor <= 170) {
            mostrarResultados(valor);
        } else {
            alert('Por favor, introduce un número entre 1 y 170');
            inputValor.focus();
        }
    });

    console.log('Tabla de Resultados lista para usar');
}

if (document.readyState === 'complete') {
    initResultados();
} else {
    document.addEventListener('DOMContentLoaded', initResultados);
}