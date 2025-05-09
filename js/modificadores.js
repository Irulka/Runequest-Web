/**
 * SISTEMA COMPLETO DE MODIFICADORES PARA RUNEQUEST
 * Contiene TODOS los modificadores de características y habilidades
 */

// TABLAS CENTRALIZADAS
const tablas = {
    PG: {
      TAM: [
        { rango: [1, 4], valor: -2 },
        { rango: [5, 8], valor: -1 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 1 },
        { rango: [17, 20], valor: 2 },
        { rango: [21, 24], valor: 3 },
        { rango: [25, 28], valor: 4 },
        { rango: [29, Infinity], incremento: 4, valorBase: 4, valorPorIncremento: 1 }
      ],
      POD: [
        { rango: [1, 4], valor: -1 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 1 },
        { rango: [21, 24], valor: 2 },
        { rango: [25, 28], valor: 3 },
        { rango: [29, Infinity], incremento: 4, valorBase: 3, valorPorIncremento: 1 }
      ]
    },
  
    PGL: [
      { rango: [1, 6], piernas: 2, abdomen: 2, pecho: 3, brazos: 1, cabeza: 2 },
      { rango: [7, 9], piernas: 3, abdomen: 3, pecho: 4, brazos: 2, cabeza: 3 },
      { rango: [10, 12], piernas: 4, abdomen: 4, pecho: 5, brazos: 3, cabeza: 4 },
      { rango: [13, 15], piernas: 5, abdomen: 5, pecho: 6, brazos: 4, cabeza: 5 },
      { rango: [16, 18], piernas: 6, abdomen: 6, pecho: 7, brazos: 5, cabeza: 6 },
      { rango: [19, 21], piernas: 7, abdomen: 7, pecho: 8, brazos: 6, cabeza: 7 },
      { rango: [22, Infinity], base: 21, incremento: 3, valoresBase: {
        piernas: 7, abdomen: 7, pecho: 8, brazos: 6, cabeza: 7
      }}
    ],
  
    RITCU: [
      { rango: [1, 6], valor: 1 },
      { rango: [7, 12], valor: 2 },
      { rango: [13, 18], valor: 3 },
      { rango: [19, Infinity], incremento: 6, valorBase: 3, valorPorIncremento: 1 }
    ],
  
    MODA: [
      { rango: [1, 12], valor: "-1D4" },
      { rango: [13, 24], valor: "0" },
      { rango: [25, 32], valor: "+1D4" },
      { rango: [33, 40], valor: "+1D6" },
      { rango: [41, 56], valor: "+2D6" },
      { rango: [57, Infinity], incremento: 16, valorBase: "+2D6", valorPorIncremento: "+1D6" }
    ],
  
    MRDES: [
      { rango: [1, 5], valor: 5 },
      { rango: [6, 8], valor: 4 },
      { rango: [9, 12], valor: 3 },
      { rango: [13, 15], valor: 2 },
      { rango: [16, 18], valor: 1 },
      { rango: [19, Infinity], valor: 0 }
    ],
  
    MRTAM: [
      { rango: [1, 6], valor: 3 },
      { rango: [7, 14], valor: 2 },
      { rango: [15, 21], valor: 1 },
      { rango: [22, Infinity], valor: 0 }
    ],
  
    MOD_AGILIDAD: {
      FUE: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ],
      TAM: [
        { rango: [1, 4], valor: 5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: -5 },
        { rango: [21, Infinity], incremento: 4, valorBase: -5, valorPorIncremento: -5 }
      ],
      DES: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      POD: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ]
    },
  
    MOD_COMUNICACION: {
      INT: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ],
      POD: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ],
      CAR: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ]
    },
  
    MOD_MAGIA: {
      POD: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      CAR: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ]
    },
  
    MOD_CONOCIMIENTOS: {
      INT: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      POD: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ]
    },
  
    MOD_MANIPULACION: {
      FUE: [
        { rango: [1, 20], valor: -5 },
        { rango: [21, Infinity], valor: -5 }
      ],
      DES: [
        { rango: [1, 12], valor: -10 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      INT: [
        { rango: [1, 12], valor: -10 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      POD: [
        { rango: [1, 16], valor: -5 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ]
    },
  
    MOD_PERCEPCION: {
      INT: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      POD: [
        { rango: [1, 4], valor: -5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: 5 },
        { rango: [21, Infinity], incremento: 4, valorBase: 5, valorPorIncremento: 5 }
      ]
    },
  
    MOD_SIGILO: {
      TAM: [
        { rango: [1, 4], valor: 10 },
        { rango: [5, 8], valor: 5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: -5 },
        { rango: [17, 20], valor: -10 },
        { rango: [21, Infinity], incremento: 4, valorBase: -10, valorPorIncremento: -5 }
      ],
      DES: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      INT: [
        { rango: [1, 4], valor: -10 },
        { rango: [5, 8], valor: -5 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 5 },
        { rango: [17, 20], valor: 10 },
        { rango: [21, Infinity], incremento: 4, valorBase: 10, valorPorIncremento: 5 }
      ],
      POD: [
        { rango: [1, 4], valor: 5 },
        { rango: [5, 8], valor: 0 },
        { rango: [9, 12], valor: 0 },
        { rango: [13, 16], valor: 0 },
        { rango: [17, 20], valor: -5 },
        { rango: [21, Infinity], incremento: 4, valorBase: -5, valorPorIncremento: -5 }
      ]
    }
  };
  
  // FUNCIÓN UNIVERSAL DE BÚSQUEDA
  function buscarEnTabla(tabla, valor, propiedad = null) {
    const items = tablas[tabla];
    
    if (!items) return 0;
    
    if (propiedad && items[propiedad]) {
      const subTabla = items[propiedad];
      for (const item of subTabla) {
        if (item.incremento && valor >= item.rango[0]) {
          const incrementos = Math.floor((valor - item.rango[0]) / item.incremento);
          return item.valorBase + (incrementos * item.valorPorIncremento);
        }
        else if (valor >= item.rango[0] && valor <= item.rango[1]) {
          return item.valor;
        }
      }
    }
    else if (Array.isArray(items)) {
      for (const item of items) {
        if (item.incremento && valor >= item.base) {
          const incrementos = Math.floor((valor - item.base) / item.incremento);
          return typeof item.valorBase === 'string' 
            ? `${item.valorBase}${incrementos > 0 ? `+${incrementos}D6` : ''}`
            : item.valorBase + (incrementos * item.valorPorIncremento);
        }
        else if (valor >= item.rango[0] && valor <= item.rango[1]) {
          return propiedad ? item[propiedad] : item.valor;
        }
      }
    }
    
    return tabla === 'MODA' ? "0" : 0;
  }
  
  // FUNCIONES DE CÁLCULO BÁSICAS
  export const calcularPM = (POD) => POD;
  
  export const calcularPG = (CON, TAM, POD) => {
    return CON + buscarEnTabla('PG', TAM, 'TAM') + buscarEnTabla('PG', POD, 'POD');
  };
  
  export const calcularPGL = (PG) => ({
    piernaDerecha: buscarEnTabla('PGL', PG, 'piernas'),
    piernaIzquierda: buscarEnTabla('PGL', PG, 'piernas'),
    abdomen: buscarEnTabla('PGL', PG, 'abdomen'),
    pecho: buscarEnTabla('PGL', PG, 'pecho'),
    brazoDerecho: buscarEnTabla('PGL', PG, 'brazos'),
    brazoIzquierdo: buscarEnTabla('PGL', PG, 'brazos'),
    cabeza: buscarEnTabla('PGL', PG, 'cabeza'),
    cola: buscarEnTabla('PGL', PG, 'brazos')
  });
  
  export const calcularRITCU = (CON) => buscarEnTabla('RITCU', CON);
  
  export const calcularMODA = (FUE, TAM) => buscarEnTabla('MODA', FUE + TAM);
  
  export const calcularMODAESP = (POD, CAR) => buscarEnTabla('MODA', POD + CAR);
  
  export const calcularCRG = (FUE, CON) => FUE + CON;
  
  export const calcularMRDES = (DES) => buscarEnTabla('MRDES', DES);
  
  export const calcularMRTAM = (TAM) => buscarEnTabla('MRTAM', TAM);
  
  // FUNCIONES DE MODIFICADORES DE HABILIDADES
  export const calcularModAgilidad = (FUE, TAM, DES, POD) => {
    return (
      buscarEnTabla('MOD_AGILIDAD', FUE, 'FUE') +
      buscarEnTabla('MOD_AGILIDAD', TAM, 'TAM') +
      buscarEnTabla('MOD_AGILIDAD', DES, 'DES') +
      buscarEnTabla('MOD_AGILIDAD', POD, 'POD')
    );
  };
  
  export const calcularModComunicacion = (INT, POD, CAR) => {
    return (
      buscarEnTabla('MOD_COMUNICACION', INT, 'INT') +
      buscarEnTabla('MOD_COMUNICACION', POD, 'POD') +
      buscarEnTabla('MOD_COMUNICACION', CAR, 'CAR')
    );
  };
  
  export const calcularModMagia = (POD, CAR) => {
    return (
      buscarEnTabla('MOD_MAGIA', POD, 'POD') +
      buscarEnTabla('MOD_MAGIA', CAR, 'CAR')
    );
  };
  
  export const calcularModConocimientos = (INT, POD) => {
    return (
      buscarEnTabla('MOD_CONOCIMIENTOS', INT, 'INT') +
      buscarEnTabla('MOD_CONOCIMIENTOS', POD, 'POD')
    );
  };
  
  export const calcularModManipulacion = (FUE, DES, INT, POD) => {
    return (
      buscarEnTabla('MOD_MANIPULACION', FUE, 'FUE') +
      buscarEnTabla('MOD_MANIPULACION', DES, 'DES') +
      buscarEnTabla('MOD_MANIPULACION', INT, 'INT') +
      buscarEnTabla('MOD_MANIPULACION', POD, 'POD')
    );
  };
  
  // NUEVAS FUNCIONES AÑADIDAS
  export const calcularModPercepcion = (INT, POD) => {
    return (
      buscarEnTabla('MOD_PERCEPCION', INT, 'INT') +
      buscarEnTabla('MOD_PERCEPCION', POD, 'POD')
    );
  };
  
  export const calcularModSigilo = (TAM, DES, INT, POD) => {
    return (
      buscarEnTabla('MOD_SIGILO', TAM, 'TAM') +
      buscarEnTabla('MOD_SIGILO', DES, 'DES') +
      buscarEnTabla('MOD_SIGILO', INT, 'INT') +
      buscarEnTabla('MOD_SIGILO', POD, 'POD')
    );
  };