function initModificadores() {
    console.log('Inicializando Calculadora de Modificadores...');
    
    const btnCalcular = document.getElementById('btn-calcular');
    const resultadosContainer = document.getElementById('resultados-container');
    
    btnCalcular.addEventListener('click', calcularModificadores);
    
    function calcularModificadores() {
        // Obtener valores de las características
        const fuerza = parseInt(document.getElementById('fuerza').value);
        const constitucion = parseInt(document.getElementById('constitucion').value);
        const tamano = parseInt(document.getElementById('tamano').value);
        const destreza = parseInt(document.getElementById('destreza').value);
        const poder = parseInt(document.getElementById('poder').value);
        const inteligencia = parseInt(document.getElementById('inteligencia').value);
        const carisma = parseInt(document.getElementById('carisma').value);
        
        // Validar valores
        if (isNaN(fuerza) || isNaN(constitucion) || isNaN(tamano) || 
            isNaN(destreza) || isNaN(poder) || isNaN(inteligencia) || isNaN(carisma)) {
            alert('Por favor, introduce valores válidos para todas las características');
            return;
        }
        
        // Calcular atributos derivados
        const puntosVida = calcularPuntosVida(constitucion, tamano, poder);
        const puntosMagia = poder; // Puntos de magia = POD
        const tasaCuracion = calcularTasaCuracion(constitucion);
        const danioEspiritual = calcularDanioEspiritual(poder, carisma);
        const modificadorDanio = calcularModificadorDanio(fuerza, tamano);
        const maximoPeso = calcularMaximoPeso(fuerza, constitucion);
        const rangoAtaqueDex = calcularRangoAtaqueDex(destreza);
        const rangoAtaqueTam = calcularRangoAtaqueTam(tamano);
        
        // Calcular modificadores de habilidades
        const modAgilidad = calcularModAgilidad(fuerza, tamano, destreza, poder);
        const modComunicacion = calcularModComunicacion(inteligencia, poder, carisma);
        const modConocimientos = calcularModConocimientos(inteligencia, poder);
        const modMagia = calcularModMagia(poder, carisma);
        const modManipulacion = calcularModManipulacion(fuerza, destreza, inteligencia, poder);
        const modPercepcion = calcularModPercepcion(inteligencia, poder);
        const modSigilo = calcularModSigilo(destreza, inteligencia, poder);
        
        // Mostrar resultados
        resultadosContainer.style.display = 'block';
        document.getElementById('resultado-principal').innerHTML = `
            <div class="ficha-npc">
                <h2>Resultados</h2>
                
                <div class="atributo-resultado">
                    <h3>Atributos Básicos</h3>
                    <p><strong>Puntos de Vida:</strong> ${puntosVida.total}</p>
                    <p><strong>Puntos de Magia:</strong> ${puntosMagia}</p>
                    <p><strong>Tasa de Curación:</strong> ${tasaCuracion} puntos por semana</p>
                    <p><strong>Daño en Combate Espiritual:</strong> ${danioEspiritual}</p>
                    <p><strong>Modificador al Daño:</strong> ${modificadorDanio}</p>
                    <p><strong>Peso Máximo:</strong> ${maximoPeso} Carga</p>
                    <p><strong>Rango de Ataque (DES):</strong> ${rangoAtaqueDex}</p>
                    <p><strong>Rango de Ataque (TAM):</strong> ${rangoAtaqueTam}</p>
                </div>
                
                <div class="atributo-resultado">
                    <h3>Puntos de Vida por Localización</h3>
                    <table class="tabla-localizaciones">
                        <tr>
                            <th>Localización</th>
                            <th>Puntos de Vida</th>
                        </tr>
                        <tr>
                            <td>Cabeza</td>
                            <td>${puntosVida.cabeza}</td>
                        </tr>
                        <tr>
                            <td>Cada Brazo</td>
                            <td>${puntosVida.brazos}</td>
                        </tr>
                        <tr>
                            <td>Cada Pierna</td>
                            <td>${puntosVida.piernas}</td>
                        </tr>
                        <tr>
                            <td>Abdomen</td>
                            <td>${puntosVida.abdomen}</td>
                        </tr>
                        <tr>
                            <td>Pecho</td>
                            <td>${puntosVida.pecho}</td>
                        </tr>
                    </table>
                </div>
                
<div class="atributo-resultado">
  <h3>Modificadores de Habilidades</h3>
  <p>
    <strong>Agilidad:</strong> ${modAgilidad}%, 
    <strong>Comunicación:</strong> ${modComunicacion}%, 
    <strong>Conocimientos:</strong> ${modConocimientos}%, 
    <strong>Magia:</strong> ${modMagia}%, 
    <strong>Manipulación:</strong> ${modManipulacion}%, 
    <strong>Percepción:</strong> ${modPercepcion}%, 
    <strong>Sigilo:</strong> ${modSigilo}%
  </p>
</div>
                
                <button class="btn-magia" onclick="document.getElementById('resultados-container').style.display='none'">Volver</button>
            </div>
        `;
    }
    
    // Funciones de cálculo
    function calcularPuntosVida(con, tam, pod) {
        // Calcular modificadores de CON por TAM y POD
        let modTam = 0;
        let modPod = 0;
        
        if (tam >= 1 && tam <= 4) modTam = -2;
        else if (tam >= 5 && tam <= 8) modTam = -1;
        else if (tam >= 13 && tam <= 16) modTam = +1;
        else if (tam >= 17 && tam <= 20) modTam = +2;
        else if (tam >= 21 && tam <= 24) modTam = +3;
        else if (tam >= 25 && tam <= 28) modTam = +4;
        else if (tam > 28) modTam = 4 + Math.floor((tam - 28) / 4);
        
        if (pod >= 1 && pod <= 4) modPod = -1;
        else if (pod >= 17 && pod <= 20) modPod = +1;
        else if (pod >= 21 && pod <= 24) modPod = +2;
        else if (pod >= 25 && pod <= 28) modPod = +3;
        else if (pod > 28) modPod = 3 + Math.floor((pod - 28) / 4);
        
        const total = con + modTam + modPod;
        
        // Calcular puntos por localización
        let cabeza, brazos, piernas, abdomen, pecho;
        
        if (total <= 6) {
            cabeza = 2; brazos = 1; piernas = 2; abdomen = 2; pecho = 3;
        } else if (total <= 9) {
            cabeza = 3; brazos = 2; piernas = 3; abdomen = 3; pecho = 4;
        } else if (total <= 12) {
            cabeza = 4; brazos = 3; piernas = 4; abdomen = 4; pecho = 5;
        } else if (total <= 15) {
            cabeza = 5; brazos = 4; piernas = 5; abdomen = 5; pecho = 6;
        } else if (total <= 18) {
            cabeza = 6; brazos = 5; piernas = 6; abdomen = 6; pecho = 7;
        } else if (total <= 21) {
            cabeza = 7; brazos = 6; piernas = 7; abdomen = 7; pecho = 8;
        } else {
            const extra = Math.floor((total - 21) / 3);
            cabeza = 7 + extra; 
            brazos = 6 + extra; 
            piernas = 7 + extra; 
            abdomen = 7 + extra; 
            pecho = 8 + extra;
        }
        
        return {
            total: total,
            cabeza: cabeza,
            brazos: brazos,
            piernas: piernas,
            abdomen: abdomen,
            pecho: pecho
        };
    }
    
    function calcularTasaCuracion(con) {
        if (con <= 6) return 1;
        if (con <= 12) return 2;
        if (con <= 18) return 3;
        return 3 + Math.floor((con - 18) / 6);
    }
    
    function calcularDanioEspiritual(pod, car) {
        const suma = pod + car;
        if (suma <= 12) return "1D6";
        if (suma <= 24) return "1D6+1";
        if (suma <= 32) return "1D6+2";
        if (suma <= 40) return "2D6";
        if (suma <= 56) return "2D6+1";
        
        const dadosExtra = Math.floor((suma - 56) / 16);
        return `${2 + dadosExtra}D6+1`;
    }
    
    function calcularModificadorDanio(fue, tam) {
        const suma = fue + tam;
        if (suma <= 12) return "-1D4";
        if (suma <= 24) return "Ninguno";
        if (suma <= 32) return "+1D4";
        if (suma <= 40) return "+1D6";
        if (suma <= 56) return "+2D6";
        
        const dadosExtra = Math.floor((suma - 56) / 16);
        return `+${2 + dadosExtra}D6`;
    }
    
    function calcularMaximoPeso(fue, con) {
        const promedio = Math.floor((fue + con) / 2);
        return Math.min(promedio, fue);
    }
    
    function calcularRangoAtaqueDex(dex) {
        if (dex <= 5) return 5;
        if (dex <= 8) return 4;
        if (dex <= 12) return 3;
        if (dex <= 15) return 2;
        if (dex <= 18) return 1;
        return 0;
    }
    
    function calcularRangoAtaqueTam(tam) {
        if (tam <= 6) return 3;
        if (tam <= 14) return 2;
        if (tam <= 21) return 1;
        return 0;
    }
    
    // Funciones para calcular modificadores de habilidades
    function calcularModAgilidad(fue, tam, dex, pod) {
        let mod = 0;
        
        // Modificador por FUE
        if (fue <= 4) mod -= 5;
        else if (fue >= 17 && fue <= 20) mod += 5;
        else if (fue > 20) mod += 5 + Math.floor((fue - 20) / 4) * 5;
        
        // Modificador por TAM
        if (tam <= 4) mod += 5;
        else if (tam >= 17 && tam <= 20) mod -= 5;
        else if (tam > 20) mod -= 5 + Math.floor((tam - 20) / 4) * 5;
        
        // Modificador por DEX
        if (dex <= 4) mod -= 10;
        else if (dex <= 8) mod -= 5;
        else if (dex >= 13 && dex <= 16) mod += 5;
        else if (dex >= 17 && dex <= 20) mod += 10;
        else if (dex > 20) mod += 10 + Math.floor((dex - 20) / 4) * 5;
        
        // Modificador por POD
        if (pod <= 4) mod -= 5;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        return mod;
    }
    
    function calcularModComunicacion(int, pod, car) {
        let mod = 0;
        
        // Modificador por INT
        if (int <= 4) mod -= 5;
        else if (int >= 17 && int <= 20) mod += 5;
        else if (int > 20) mod += 5 + Math.floor((int - 20) / 4) * 5;
        
        // Modificador por POD
        if (pod <= 4) mod -= 5;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        // Modificador por CAR
        if (car <= 4) mod -= 10;
        else if (car <= 8) mod -= 5;
        else if (car >= 13 && car <= 16) mod += 5;
        else if (car >= 17 && car <= 20) mod += 10;
        else if (car > 20) mod += 10 + Math.floor((car - 20) / 4) * 5;
        
        return mod;
    }
    
    function calcularModConocimientos(int, pod) {
        let mod = 0;
        
        // Modificador por INT
        if (int <= 4) mod -= 10;
        else if (int <= 8) mod -= 5;
        else if (int >= 13 && int <= 16) mod += 5;
        else if (int >= 17 && int <= 20) mod += 10;
        else if (int > 20) mod += 10 + Math.floor((int - 20) / 4) * 5;
        
        // Modificador por POD
        if (pod <= 4) mod -= 5;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        return mod;
    }
    
    function calcularModMagia(pod, car) {
        let mod = 0;
        
        // Modificador por POD
        if (pod <= 4) mod -= 10;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        // Modificador por CAR
        if (car <= 4) mod -= 5;
        else if (car >= 17 && car <= 20) mod += 5;
        else if (car > 20) mod += 5 + Math.floor((car - 20) / 4) * 5;
        
        return mod;
    }
    
    function calcularModManipulacion(fue, dex, int, pod) {
        let mod = 0;
        
        // Modificador por FUE
        if (fue <= 4) mod -= 5;
        else if (fue >= 17 && fue <= 20) mod += 5;
        else if (fue > 20) mod += 5 + Math.floor((fue - 20) / 4) * 5;
        
        // Modificador por DEX
        if (dex <= 4) mod -= 10;
        else if (dex >= 17 && dex <= 20) mod += 10;
        else if (dex > 20) mod += 10 + Math.floor((dex - 20) / 4) * 5;
        
        // Modificador por INT
        if (int <= 4) mod -= 10;
        else if (int >= 17 && int <= 20) mod += 10;
        else if (int > 20) mod += 10 + Math.floor((int - 20) / 4) * 5;
        
        // Modificador por POD
        if (pod <= 4) mod -= 5;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        return mod;
    }
    
    function calcularModPercepcion(int, pod) {
        let mod = 0;
        
        // Modificador por INT
        if (int <= 4) mod -= 10;
        else if (int >= 17 && int <= 20) mod += 10;
        else if (int > 20) mod += 10 + Math.floor((int - 20) / 4) * 5;
        
        // Modificador por POD
        if (pod <= 4) mod -= 5;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        return mod;
    }
    
    function calcularModSigilo(dex, int, pod) {
        let mod = 0;
        
        // Modificador por DEX
        if (dex <= 4) mod -= 10;
        else if (dex >= 17 && dex <= 20) mod += 10;
        else if (dex > 20) mod += 10 + Math.floor((dex - 20) / 4) * 5;
        
        // Modificador por INT
        if (int <= 4) mod -= 10;
        else if (int >= 17 && int <= 20) mod += 10;
        else if (int > 20) mod += 10 + Math.floor((int - 20) / 4) * 5;
        
        // Modificador por POD
        if (pod <= 4) mod -= 5;
        else if (pod >= 17 && pod <= 20) mod += 5;
        else if (pod > 20) mod += 5 + Math.floor((pod - 20) / 4) * 5;
        
        return mod;
    }
}

if (document.readyState === 'complete') {
    initModificadores();
} else {
    document.addEventListener('DOMContentLoaded', initModificadores);
}