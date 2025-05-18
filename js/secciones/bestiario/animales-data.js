// Datos base de animales
const animalesBase = {
    domesticos: [
        {
            nombre: "Alticamellos",
            atributos: {
                fuerza: "3D6+6",
                constitucion: "2D6+6",
                tamano: "3D6+12",
                poder: "2D6",
                destreza: "2D6+6",
                puntosGolpe: "CON+1D6",
                puntosMagia: "POD",
                movimiento: "10",
                mrBase: "5",
                armadura: "1D3"
            },
            localizaciones: [
                { nombre: "Cabeza", d20: "1", arpg: "3" },
                { nombre: "Brazo derecho", d20: "2-3", arpg: "2" },
                { nombre: "Brazo izquierdo", d20: "4-5", arpg: "2" },
                { nombre: "Cuerpo", d20: "6-12", arpg: "4" },
                { nombre: "Pierna derecha", d20: "13-15", arpg: "3" },
                { nombre: "Pierna izquierda", d20: "16-18", arpg: "3" },
                { nombre: "Cola", d20: "19-20", arpg: "1" }
            ],
            armas: [
                { nombre: "Mordisco", porcentaje: "25", dano: "1D6", mr: "1" },
                { nombre: "Pisotón", porcentaje: "30", dano: "1D4", mr: "0" }
            ],
            notas: "Animal de carga resistente. Puede patear hacia atrás cuando se siente amenazado."
        }
        // ... (otros animales domésticos)
    ],
    salvajes: [
        {
            nombre: "Lobo",
            atributos: {
                fuerza: "2D6+3",
                constitucion: "2D6+3",
                tamano: "2D6",
                poder: "2D6+3",
                destreza: "3D6",
                puntosGolpe: "CON",
                puntosMagia: "POD",
                movimiento: "10",
                mrBase: "10",
                armadura: "1"
            },
            localizaciones: [
                { nombre: "Cabeza", d20: "1", arpg: "2" },
                { nombre: "Cuerpo", d20: "2-15", arpg: "2" },
                { nombre: "Patas delanteras", d20: "16-18", arpg: "1" },
                { nombre: "Patas traseras", d20: "19-20", arpg: "1" }
            ],
            armas: [
                { nombre: "Mordisco", porcentaje: "40", dano: "1D6", mr: "1" }
            ],
            notas: "Cazan en manada. +20% a ataques cuando rodean a la presa."
        }
        // ... (otros animales salvajes)
    ]
};

// Función para calcular atributos
function calcularAtributo(formula, atributos) {
    if (!formula || typeof formula !== 'string') return "-";
    
    try {
        let formulaProcesada = formula;
        if (atributos) {
            formulaProcesada = formulaProcesada.replace(/CON/g, atributos.constitucion?.valor || 0);
            formulaProcesada = formulaProcesada.replace(/POD/g, atributos.poder?.valor || 0);
            formulaProcesada = formulaProcesada.replace(/TAM/g, atributos.tamano?.valor || 0);
        }
        
        if (window.Dados && typeof window.Dados.tirarFormula === 'function') {
            return window.Dados.tirarFormula(formulaProcesada);
        }
        return "-";
    } catch (e) {
        console.error('Error calculando atributo:', e);
        return "-";
    }
}

// Función para procesar un animal
function procesarAnimal(animal) {
    const atributosBase = {};
    
    // Primera pasada para atributos básicos
    Object.entries(animal.atributos).forEach(([key, formula]) => {
        atributosBase[key] = {
            formula: formula,
            valor: calcularAtributo(formula)
        };
    });
    
    // Segunda pasada para dependencias
    Object.entries(atributosBase).forEach(([key, attr]) => {
        if (attr.valor === "-" && attr.formula) {
            attr.valor = calcularAtributo(attr.formula, atributosBase);
        }
    });
    
    return {
        ...animal,
        atributos: atributosBase
    };
}

// Crear y exportar la base de datos completa
const animalesDB = {
    domesticos: animalesBase.domesticos.map(procesarAnimal),
    salvajes: animalesBase.salvajes.map(procesarAnimal)
};

// Exportar para navegador
if (typeof window !== 'undefined') {
    window.animalesDB = animalesDB;
    console.log('Bestiario: Datos de animales cargados correctamente');
}