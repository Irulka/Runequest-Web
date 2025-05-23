/**
 * GENERADOR DE DEMONIOS - Runequest
 * Versión SPA adaptada al estilo del sistema
 */

(function() {
    // Elementos de la interfaz
    const UI = {
        btnPequeno: document.getElementById('btn-pequeno'),
        btnMediano: document.getElementById('btn-mediano'),
        btnGrande: document.getElementById('btn-grande'),
        resultados: document.getElementById('resultados-demonio'),
        tablaDemonio: document.getElementById('demonio-tbody'),
        tablaCombate: document.getElementById('combate-tbody'),
        tablaMagia: document.getElementById('magia-tbody')
    };

    // --------------------------
    // FUNCIONES DE GENERACIÓN
    // --------------------------

    // Función para tirar dados (ejemplo: "2D6" => tira 2 dados de 6 caras)
    function tirarDados(notacion) {
        const [numDados, caras] = notacion.split('D').map(Number);
        let total = 0;
        for (let i = 0; i < numDados; i++) {
            total += Math.floor(Math.random() * caras) + 1;
        }
        return total;
    }

    // Función para generar un demonio según tamaño
    function generarDemonio(tamano) {
        // Reiniciar selección de botones
        UI.btnPequeno.classList.remove('seleccionado');
        UI.btnMediano.classList.remove('seleccionado');
        UI.btnGrande.classList.remove('seleccionado');
        
        // Marcar botón seleccionado
        document.getElementById(`btn-${tamano}`).classList.add('seleccionado');
        
        // Generar características según tamaño
        const demonio = {
            tamano: tamano.charAt(0).toUpperCase() + tamano.slice(1),
            STR: 0,
            CON: 0,
            SIZ: 0,
            INT: 0,
            POD: 0,
            DEX: 20,
            puntosRuna: 0,
            MOVE: 12,
            ataque: 0,
            dano: '',
            MR: 0,
            magiaEspiritual: 0
        };

        // Asignar valores según tamaño
        switch(tamano) {
            case 'pequeno':
                demonio.STR = 20;
                demonio.SIZ = 20;
                demonio.POD = tirarDados('1D6') + 6;
                demonio.puntosRuna = tirarDados('1D6');
                demonio.ataque = 50;
                demonio.dano = '2D6';
                demonio.MR = 5;
                break;
            case 'mediano':
                demonio.STR = 25;
                demonio.SIZ = 25;
                demonio.POD = tirarDados('2D6') + 6;
                demonio.puntosRuna = tirarDados('2D6');
                demonio.ataque = 75;
                demonio.dano = '3D6';
                demonio.MR = 4;
                break;
            case 'grande':
                demonio.STR = 30;
                demonio.SIZ = 30;
                demonio.POD = tirarDados('3D6') + 6;
                demonio.puntosRuna = tirarDados('3D6');
                demonio.ataque = 100;
                demonio.dano = '4D6';
                demonio.MR = 4;
                break;
        }

        // Calcular características derivadas
        demonio.CON = demonio.POD; // CON igual a POD
        demonio.INT = tirarDados('3D6');
        demonio.magiaEspiritual = tirarDados('3D6');

        // Mostrar resultados
        mostrarDemonio(demonio);
    }

    // Función para mostrar los resultados del demonio generado
    function mostrarDemonio(demonio) {
        // Limpiar tablas anteriores
        UI.tablaDemonio.innerHTML = '';
        UI.tablaCombate.innerHTML = '';
        UI.tablaMagia.innerHTML = '';

        // Mostrar características principales
        const caracteristicas = [
            { nombre: 'FUE (Fuerza)', valor: demonio.STR, detalles: '' },
            { nombre: 'CON (Constitución)', valor: demonio.CON, detalles: `Igual a POD (${demonio.POD})` },
            { nombre: 'TAM (Tamaño)', valor: demonio.SIZ, detalles: '' },
            { nombre: 'INT (Inteligencia)', valor: demonio.INT, detalles: 'Tirada de 3D6' },
            { nombre: 'POD (Poder)', valor: demonio.POD, detalles: demonio.tamano === 'Pequeño' ? '1D6+6' : demonio.tamano === 'Mediano' ? '2D6+6' : '3D6+6' },
            { nombre: 'DES (Destreza)', valor: demonio.DEX, detalles: 'Fijo en 20 para todos los demonios' },
            { nombre: 'Puntos de Runa', valor: demonio.puntosRuna, detalles: demonio.tamano === 'Pequeño' ? '1D6' : demonio.tamano === 'Mediano' ? '2D6' : '3D6' },
            { nombre: 'Movimiento', valor: demonio.MOVE, detalles: 'Fijo en 12 para todos los demonios' },
            { nombre: 'Puntos de Magia', valor: demonio.POD, detalles: 'Igual a POD (determina también puntos de golpe y armadura)' }
        ];

        caracteristicas.forEach(car => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${car.nombre}</td>
                <td>${car.valor}</td>
                <td>${car.detalles}</td>
            `;
            UI.tablaDemonio.appendChild(fila);
        });

        // Mostrar combate
        const combate = [
            { arma: 'Garras', ataque: `${demonio.ataque}%`, dano: demonio.dano, MR: demonio.MR }
        ];

        combate.forEach(com => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${com.arma}</td>
                <td>${com.ataque}</td>
                <td>${com.dano}</td>
                <td>${com.MR}</td>
            `;
            UI.tablaCombate.appendChild(fila);
        });

        // Mostrar magia
        const magia = [
            { tipo: 'Magia Espiritual', detalles: `Conoce ${demonio.magiaEspiritual} puntos de magia espiritual (3D6, sin límite por CAR)` },
            { tipo: 'Magia de Runa', detalles: `Pertenece a un culto de Oscuridad o Caos (${demonio.puntosRuna} puntos de runa)` },
            { tipo: 'Puntos de Golpe/Armadura', detalles: `Igual a sus puntos de magia actuales (${demonio.POD}). Si gasta magia, se reducen ambos.` }
        ];

        magia.forEach(mag => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${mag.tipo}</td>
                <td>${mag.detalles}</td>
            `;
            UI.tablaMagia.appendChild(fila);
        });

        // Mostrar sección de resultados
        UI.resultados.style.display = 'block';
    }

    // --------------------------
    // CONFIGURACIÓN DE BOTONES
    // --------------------------

    function configurarBotones() {
        UI.btnPequeno.addEventListener('click', () => generarDemonio('pequeno'));
        UI.btnMediano.addEventListener('click', () => generarDemonio('mediano'));
        UI.btnGrande.addEventListener('click', () => generarDemonio('grande'));
    }

    // --------------------------
    // INICIALIZACIÓN
    // --------------------------

    function init() {
        configurarBotones();
        console.log('Generador de demonios inicializado');
    }

    // Manejo de carga
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 10);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();