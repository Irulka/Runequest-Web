// Base de datos de animales ordenada alfabéticamente
const animalesDB = {
    domesticos: [
        { nombre: "Alticamellos" },
        { nombre: "Antílope" },
        { nombre: "Avestruz" },
        { nombre: "Bisón" },
        { nombre: "Caballo" },
        { nombre: "Hombre de rebaño" },
        { nombre: "Impala" },
        { nombre: "Lagarto Bolo" },
        { nombre: "Mula" },
        { nombre: "Perro" },
        { nombre: "Res" },
        { nombre: "Yak" },
        { nombre: "Zebra de guerra" }
    ],
    salvajes: [
        { nombre: "Águila Vrok" },
        { nombre: "Cerdo salvaje" },
        { nombre: "Ciervo de cola negra" },
        { nombre: "Cocodrilo" },
        { nombre: "Corredor de escombros" },
        { nombre: "Gran Águila Vrok" },
        { nombre: "Gran Cóndor" },
        { nombre: "Grulla gigante" },
        { nombre: "Hiena" },
        { nombre: "Jabalí" },
        { nombre: "Jabalí colmilludo" },
        { nombre: "Leon" },
        { nombre: "Lince" },
        { nombre: "Looper" },
        { nombre: "Lobo" },
        { nombre: "Mamut" },
        { nombre: "Mastodonte" },
        { nombre: "Oso" },
        { nombre: "Oso saltarín" },
        { nombre: "Pájaro de sangre" },
        { nombre: "Puma" },
        { nombre: "Rinoceronte" },
        { nombre: "Serpiente" },
        { nombre: "Tigre dientes de sable" },
        { nombre: "Titanótero" }
    ]
};

function initAnimales() {
    console.log('Inicializando Bestiario Animal...');
    
    // Elementos de la interfaz
    const btnDomesticos = document.getElementById('btn-domesticos');
    const btnSalvajes = document.getElementById('btn-salvajes');
    const animalesGrid = document.getElementById('animales-grid');
    const selectorAnimalContainer = document.querySelector('.selector-animal-container');
    const resultadosContainer = document.querySelector('.resultados-container');
    
    // Variables de estado
    let animalSeleccionado = null;
    
    // Mostrar animales domésticos
    btnDomesticos.addEventListener('click', () => {
        mostrarAnimales('domesticos');
    });
    
    // Mostrar animales salvajes
    btnSalvajes.addEventListener('click', () => {
        mostrarAnimales('salvajes');
    });
    
    // Función para mostrar animales de una categoría
    function mostrarAnimales(categoria) {
        animalesGrid.innerHTML = '';
        selectorAnimalContainer.style.display = 'block';
        resultadosContainer.style.display = 'none';
        
        animalesDB[categoria].forEach(animal => {
            const opcionAnimal = document.createElement('div');
            opcionAnimal.className = 'opcion-animal';
            opcionAnimal.textContent = animal.nombre;
            opcionAnimal.addEventListener('click', () => {
                animalSeleccionado = animal;
                generarFichaAnimal(animal);
            });
            
            animalesGrid.appendChild(opcionAnimal);
        });
    }
    
    // Función para generar la ficha completa
    function generarFichaAnimal(animal) {
        selectorAnimalContainer.style.display = 'none';
        resultadosContainer.style.display = 'block';
        
        document.getElementById('resultado-principal').innerHTML = `
            <h3>${animal.nombre}</h3>
            
            <div class="tabs">
                <button class="tab-btn active" data-tab="atributos">Atributos</button>
                <button class="tab-btn" data-tab="localizaciones">Localizaciones</button>
                <button class="tab-btn" data-tab="armas">Armas Naturales</button>
                <button class="tab-btn" data-tab="notas">Anotaciones</button>
            </div>
            
            <div id="atributos" class="tab-content active">
                <div class="stats-container">
                    <div class="stats-column">
                        <div class="stat-item">
                            <span class="stat-name">FUERZA:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">CONSTITUCIÓN:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">TAMAÑO:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">PODER:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">DESTREZA:</span>
                            <span class="stat-value">-</span>
                        </div>
                    </div>
                    <div class="stats-column">
                        <div class="stat-item">
                            <span class="stat-name">PUNTOS DE GOLPE:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">PUNTOS DE MAGIA:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">MOVIMIENTO:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">MR BASE:</span>
                            <span class="stat-value">-</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-name">ARMADURA:</span>
                            <span class="stat-value">-</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="localizaciones" class="tab-content">
                <table class="tabla-localizaciones">
                    <thead>
                        <tr>
                            <th>Localización</th>
                            <th>D20</th>
                            <th>AR/PG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cabeza</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Brazo derecho</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Brazo izquierdo</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Cuerpo</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Pierna derecha</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Pierna izquierda</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Cola (si aplica)</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div id="armas" class="tab-content">
                <table class="tabla-armas">
                    <thead>
                        <tr>
                            <th>Arma</th>
                            <th>%</th>
                            <th>Daño</th>
                            <th>MR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div id="notas" class="tab-content">
                <textarea placeholder="Añade tus anotaciones aquí..." 
                          style="width: 100%; min-height: 100px; background: rgba(0,0,0,0.2); 
                                 color: white; border: 1px solid #4a5568; padding: 8px;"></textarea>
            </div>
        `;
        
        // Configurar eventos para las pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Añadir clase active al seleccionado
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Cerrar selector al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.selector-animal-container') && 
            !e.target.closest('.btn-magia')) {
            selectorAnimalContainer.style.display = 'none';
        }
    });
}

// Inicialización
if (document.readyState === 'complete') {
    initAnimales();
} else {
    document.addEventListener('DOMContentLoaded', initAnimales);
}