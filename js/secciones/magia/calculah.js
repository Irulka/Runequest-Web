// Inicialización de la calculadora de hechicería
function initCalculadoraHechiceria() {
    console.log('Inicializando Calculadora de Hechicería...');
    
    // Elementos de la interfaz
    const selectConjuro = document.getElementById('conjuro-hechiceria');
    const inputIntLibre = document.getElementById('int-libre');
    const checkboxMaestria = document.getElementById('maestria-runa');
    const divDistribucion = document.getElementById('distribucion-puntos');
    const divPuntosDisponibles = document.getElementById('puntos-disponibles-container');
    const spanPuntosDisponibles = document.getElementById('puntos-disponibles');
    const inputDuracion = document.getElementById('duracion');
    const inputIntensidad = document.getElementById('intensidad');
    const inputAlcance = document.getElementById('alcance');
    const btnCalcular = document.getElementById('calcular-coste');
    const resultadosContainer = document.getElementById('resultados-container');
    
    let conjurosData = [];
    
    // Tablas de efectos basadas en el PDF
    const tablaDuracion = {
        1: "5 minutos",
        2: "10 minutos",
        3: "20 minutos",
        4: "40 minutos",
        5: "80 minutos",
        6: "160 minutos",
        7: "6 horas",
        8: "12 horas",
        9: "1 día",
        10: "2 días",
        11: "4 días",
        12: "1 semana",
        13: "2 semanas",
        14: "4 semanas",
        15: "1 temporada",
        16: "2 temporadas",
        17: "1 año",
        18: "2 años",
        19: "4 años",
        20: "8 años"
    };
    
    const tablaAlcance = {
        1: "10 metros",
        2: "20 metros",
        3: "30 metros",
        4: "50 metros",
        5: "80 metros",
        6: "130 metros",
        7: "210 metros",
        8: "340 metros",
        9: "550 metros",
        10: "1 kilómetro",
        11: "1 kilómetro",
        12: "2 kilómetros",
        13: "4 kilómetros",
        14: "6.5 kilómetros",
        15: "10 kilómetros",
        16: "15 kilómetros",
        17: "25 kilómetros",
        18: "40 kilómetros",
        19: "65 kilómetros",
        20: "100 kilómetros"
    };
    
    const tablaDaño = {
        1: "1D3",
        2: "1D3",
        3: "1D3",
        4: "1D6",
        5: "1D6",
        6: "1D6",
        7: "1D6",
        8: "2D6",
        9: "2D6",
        10: "2D6",
        11: "2D6",
        12: "3D6",
        13: "3D6",
        14: "3D6",
        15: "3D6",
        16: "4D6",
        17: "4D6",
        18: "4D6",
        19: "4D6",
        20: "5D6"
    };
    
    // Función para obtener el daño base según la tabla (sin incrementos)
    function obtenerDañoBase(intensidad) {
        return tablaDaño[intensidad] || "1D3";
    }
    
    // Cargar datos de conjuros desde hechiceria.json
    fetch('js/secciones/magia/hechiceria.json')
        .then(response => response.json())
        .then(data => {
            conjurosData = data.conjuros;
            
            // Ordenar conjuros alfabéticamente
            const conjurosOrdenados = conjurosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
            // Llenar el select con los conjuros
            conjurosOrdenados.forEach(conjuro => {
                if (conjuro.nombre && conjuro.nombre.trim() !== '') {
                    const option = document.createElement('option');
                    option.value = conjuro.nombre;
                    option.textContent = conjuro.nombre;
                    selectConjuro.appendChild(option);
                }
            });
            
            // Configurar evento para el select
            selectConjuro.addEventListener('change', function() {
                const conjuroSeleccionado = this.value;
                
                if (!conjuroSeleccionado) {
                    divDistribucion.style.display = 'none';
                    divPuntosDisponibles.style.display = 'none';
                    resultadosContainer.style.display = 'none';
                    return;
                }
                
                const conjuro = conjurosData.find(c => c.nombre === conjuroSeleccionado);
                if (conjuro) {
                    // Extraer el coste base del conjuro (ejemplo: "2 Puntos" -> 2)
                    const costeBase = parseInt(conjuro.puntos) || 1;
                    const intLibre = parseInt(inputIntLibre.value) || 0;
                    const puntosDisponibles = intLibre - costeBase;
                    
                    if (puntosDisponibles >= 0) {
                        spanPuntosDisponibles.textContent = puntosDisponibles;
                        divDistribucion.style.display = 'block';
                        divPuntosDisponibles.style.display = 'block';
                        
                        // Resetear valores
                        inputDuracion.value = 1;
                        inputIntensidad.value = 1;
                        inputAlcance.value = 1;
                        
                        // Configurar máximos
                        const maxPuntos = Math.max(1, puntosDisponibles + 1);
                        inputDuracion.max = maxPuntos;
                        inputIntensidad.max = maxPuntos;
                        inputAlcance.max = maxPuntos;
                    } else {
                        alert('No tienes suficiente Inteligencia Libre para este conjuro.');
                        divDistribucion.style.display = 'none';
                        divPuntosDisponibles.style.display = 'none';
                    }
                }
            });
            
            // Configurar evento para el botón de calcular
            btnCalcular.addEventListener('click', function() {
                calcularCosteHechizo();
            });
            
            // Configurar evento para cambios en Inteligencia Libre
            inputIntLibre.addEventListener('change', function() {
                if (selectConjuro.value) {
                    selectConjuro.dispatchEvent(new Event('change'));
                }
            });
            
            // Configurar eventos para distribución de puntos
            [inputDuracion, inputIntensidad, inputAlcance].forEach(input => {
                input.addEventListener('change', function() {
                    const puntosDisponibles = parseInt(spanPuntosDisponibles.textContent);
                    const totalUsados = 
                        (parseInt(inputDuracion.value) - 1) + 
                        (parseInt(inputIntensidad.value) - 1) + 
                        (parseInt(inputAlcance.value) - 1);
                    
                    if (totalUsados > puntosDisponibles) {
                        alert('Has excedido los puntos disponibles.');
                        this.value = Math.min(parseInt(this.value), puntosDisponibles - (totalUsados - (parseInt(this.value) - 1)) + 1);
                    }
                });
            });
        })
        .catch(error => console.error('Error cargando los conjuros:', error));
    
    // Función para calcular el coste del hechizo
    function calcularCosteHechizo() {
        const conjuroSeleccionado = selectConjuro.value;
        const conjuro = conjurosData.find(c => c.nombre === conjuroSeleccionado);
        
        if (!conjuro) {
            resultadosContainer.style.display = 'none';
            return;
        }
        
        // Obtener valores
        const costeBase = parseInt(conjuro.puntos) || 1;
        const duracion = parseInt(inputDuracion.value) || 1;
        const intensidad = parseInt(inputIntensidad.value) || 1;
        const alcance = parseInt(inputAlcance.value) || 1;
        const maestria = checkboxMaestria.checked;
        
        // Calcular coste total con maestría
        const costeDuracion = (duracion - 1) * (maestria ? 1 : 2);
        const costeIntensidad = (intensidad - 1) * (maestria ? 1 : 2);
        const costeAlcance = (alcance - 1) * (maestria ? 1 : 2);
        
        const costeTotal = costeBase + costeDuracion + costeIntensidad + costeAlcance;
        
        // Calcular efectos basados en las tablas del PDF
        const efectoDuracion = tablaDuracion[duracion] || "5 minutos";
        const efectoAlcance = tablaAlcance[alcance] || "10 metros";
        
        // Determinar si el conjuro causa daño
        let efectoDaño = "No aplica";
        
        if (conjuro.Description && conjuro.Description.toLowerCase().includes("daño")) {
            efectoDaño = obtenerDañoBase(intensidad);
        }
        
        // Mostrar resultados
        resultadosContainer.style.display = 'block';
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-conjuro">
                <h3>${conjuro.nombre}</h3>
                
                <div class="propiedades-conjuro">
                    <div class="propiedad-conjuro">
                        <span class="valor-propiedad">Coste Base: ${costeBase} puntos</span>
                    </div>
                    <div class="propiedad-conjuro">
                        <span class="valor-propiedad">Coste Total: ${costeTotal} puntos</span>
                    </div>
                    <div class="propiedad-conjuro">
                        <span class="valor-propiedad">Maestría de Runa: ${maestria ? "Sí" : "No"} ${!maestria ? "<span class='coste-doble'>(Costes dobles)</span>" : ""}</span>
                    </div>
                </div>
                
                <table class="tabla-resultados">
                    <thead>
                        <tr>
                            <th>Atributo</th>
                            <th>Nivel</th>
                            <th>Efecto</th>
                            <th>Coste</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Duración</td>
                            <td>${duracion}</td>
                            <td>${efectoDuracion}</td>
                            <td>${costeDuracion} punto${costeDuracion !== 1 ? 's' : ''} ${!maestria ? "<span class='coste-doble'>(×2)</span>" : ""}</td>
                        </tr>
                        <tr>
                            <td>Intensidad</td>
                            <td>${intensidad}</td>
                            <td>${efectoDaño}</td>
                            <td>${costeIntensidad} punto${costeIntensidad !== 1 ? 's' : ''} ${!maestria ? "<span class='coste-doble'>(×2)</span>" : ""}</td>
                        </tr>
                        <tr>
                            <td>Alcance</td>
                            <td>${alcance}</td>
                            <td>${efectoAlcance}</td>
                            <td>${costeAlcance} punto${costeAlcance !== 1 ? 's' : ''} ${!maestria ? "<span class='coste-doble'>(×2)</span>" : ""}</td>
                        </tr>
                    </tbody>
                </table>
                
                ${conjuro.Description ? `
                <div class="descripcion-conjuro">
                    <h4>Descripción</h4>
                    <p>${conjuro.Description.replace(/\n/g, '<br>')}</p>
                </div>
                ` : ''}
                
                <button class="btn-volver" onclick="document.getElementById('resultados-container').style.display='none'">Volver</button>
            </div>
        `;
    }
}

// Inicialización
if (document.readyState === 'complete') {
    initCalculadoraHechiceria();
} else {
    document.addEventListener('DOMContentLoaded', initCalculadoraHechiceria);
}