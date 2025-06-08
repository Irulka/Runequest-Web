function initEncuentros() {
    console.log('Inicializando Tabla de Encuentros en Ciudades...');

    const ciudadTamanoSelect = document.getElementById('ciudad-tamano');
    const momentoDiaSelect = document.getElementById('momento-dia');
    const zonaSelect = document.getElementById('zona');
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnManual = document.getElementById('btn-manual');
    const inputValor = document.getElementById('input-valor');
    const resultadosContainer = document.querySelector('.resultados-container');
    const resultadoPrincipal = document.getElementById('resultado-principal');

    let encuentrosData = {}; // To store the loaded JSON data

    // Cargar los datos de encuentros desde el archivo JSON
    fetch('js/secciones/tablas/encuentros.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            encuentrosData = data;
            console.log('Datos de encuentros cargados:', encuentrosData);
        })
        .catch(error => {
            console.error('Error al cargar los datos de encuentros:', error);
            // Optionally, display an error message to the user
            resultadoPrincipal.querySelector('.resultado-efecto').textContent = 'Error al cargar los datos de encuentros. Por favor, recarga la página.';
            resultadosContainer.style.display = 'block';
        });

    // Función para obtener el encuentro basado en los filtros y el valor de la tirada
    const obtenerEncuentro = (valor) => {
        const tamano = ciudadTamanoSelect.value;
        const momento = momentoDiaSelect.value;
        const zona = zonaSelect.value;
        const categoria = `${tamano}_${momento}_${zona}`;

        const encuentrosDisponibles = encuentrosData[categoria];

        if (!encuentrosDisponibles) {
            console.warn(`No hay encuentros definidos para la categoría: ${categoria}`);
            return `No se encontraron encuentros para esta configuración (${tamano}, ${momento}, ${zona}). El DJ decide.`;
        }

        // Encontrar el encuentro basándose en el valor de la tirada
        for (const encuentro of encuentrosDisponibles) {
            const [min, max] = encuentro.range.split('-').map(Number);
            if (valor >= min && valor <= max) {
                return encuentro.description;
            }
        }

        return `Encuentro inesperado (${valor}): El DJ decide el resultado.`;
    };

    // Función para mostrar resultados
    const mostrarResultados = (valor) => {
        console.log(`Mostrando resultado para: ${valor}`);
        
        if (resultadoPrincipal) {
            resultadoPrincipal.querySelector('.resultado-valor').textContent = valor;
            resultadoPrincipal.querySelector('.resultado-efecto').textContent = obtenerEncuentro(valor);
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

    console.log('Tabla de Encuentros en Ciudades lista para usar');
}

// Inicialización
if (document.readyState === 'complete') {
    initEncuentros();
} else {
    document.addEventListener('DOMContentLoaded', initEncuentros);
}