/**
 * SISTEMA CENTRALIZADO DE DADOS
 * Versión 1.1 - Compatible con navegadores y Node.js
 * Uso: 
 * - Dados.tirar(6) → 1d6
 * - Dados.tirarFormula("2D6+3") → 2d6+3
 * - Dados.tirarMultiples(3, 6) → 3d6
 */

(function() {
    'use strict';

    // Validación de entorno
    const esNavegador = typeof window !== 'undefined';
    const esNode = typeof module !== 'undefined' && module.exports;

    const Dados = {
        // Tirar un dado simple (1d6, 1d10, etc)
        tirar: function(caras) {
            if (isNaN(caras) || caras < 1) {
                console.error('[Dados] Número de caras inválido:', caras);
                return 0;
            }
            const resultado = Math.floor(Math.random() * caras) + 1;
            if (esNavegador && window.debugDados) {
                console.log(`[Dados] 1d${caras} → ${resultado}`);
            }
            return resultado;
        },

        // Tirar una fórmula compleja (2d6+3)
        tirarFormula: function(formula) {
            if (typeof formula !== 'string') {
                console.error('[Dados] Fórmula debe ser string:', formula);
                return 0;
            }

            const partes = formula.split(/(D|\+|\-)/);
            let total = 0;
            let operacion = '+';
            let debugInfo = esNavegador && window.debugDados ? `[Dados] ${formula}: ` : '';

            for (let i = 0; i < partes.length; i++) {
                const parte = partes[i].trim();
                if (parte === 'D') {
                    const caras = parseInt(partes[i+1]);
                    if (isNaN(caras)) {
                        console.error('[Dados] Caras inválidas en fórmula:', formula);
                        return 0;
                    }
                    const tirada = Math.floor(Math.random() * caras) + 1;
                    total += (operacion === '+') ? tirada : -tirada;
                    if (debugInfo) debugInfo += `${operacion} ${tirada}d${caras}`;
                    i++;
                } else if (['+', '-'].includes(parte)) {
                    operacion = parte;
                } else if (!isNaN(parseInt(parte))) {
                    const valor = parseInt(parte);
                    total += (operacion === '+') ? valor : -valor;
                    if (debugInfo) debugInfo += `${operacion} ${valor}`;
                }
            }

            if (debugInfo) console.log(debugInfo + ` = ${total}`);
            return total;
        },

        // Tirar múltiples dados (ej: 3d6)
        tirarMultiples: function(cantidad, caras) {
            if (isNaN(cantidad) || cantidad < 1 || isNaN(caras) || caras < 1) {
                console.error('[Dados] Parámetros inválidos:', cantidad, caras);
                return 0;
            }
            
            let total = 0;
            let debugInfo = esNavegador && window.debugDados ? `[Dados] ${cantidad}d${caras}: ` : '';
            
            for (let i = 0; i < cantidad; i++) {
                const tirada = Math.floor(Math.random() * caras) + 1;
                total += tirada;
                if (debugInfo) debugInfo += `${i > 0 ? '+' : ''}${tirada}`;
            }

            if (debugInfo) console.log(debugInfo + ` = ${total}`);
            return total;
        },

        // Nueva función para debug
        debug: function(activar = true) {
            if (esNavegador) window.debugDados = activar;
        }
    };

    // Exportación según entorno
    if (esNode) {
        module.exports = Dados;
    } else if (esNavegador) {
        window.Dados = Dados;
        console.log('[Dados] Sistema de dados cargado. Usa Dados.debug() para activar logs.');
    } else {
        console.error('[Dados] Entorno no reconocido');
    }
})();