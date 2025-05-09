// BASE DE DATOS COMPLETA DE ANIMALES
window.animalesDB = {
    domesticos: [
        { 
            nombre: "Caballo",
            atributos: {
                fuerza: "3D6+6",
                constitucion: "2D6+6",
                tamano: "2D6+12",
                poder: "3D6",
                destreza: "3D6",
                movimiento: 10,
                mrBase: 3,
                armadura: 1
            },
            localizaciones: [
                { nombre: "Cabeza", rango: "17-20", ar: 1 },
                { nombre: "Cuello", rango: "13-16", ar: 1 },
                { nombre: "Cuerpo", rango: "05-12", ar: 1 },
                { nombre: "Patas delanteras", rango: "01-04", ar: 1 },
                { nombre: "Patas traseras", rango: "01-04", ar: 1 }
            ],
            armas: [
                { nombre: "Coces", porcentaje: 30, dano: "1D6+MODA", mr: 5 },
                { nombre: "Mordisco", porcentaje: 25, dano: "1D3+MODA", mr: 5 }
            ],
            notas: "Animal de montura básico. Puede dar coces con las patas traseras."
        },
        { 
            nombre: "Perro",
            atributos: {
                fuerza: "2D6",
                constitucion: "2D6",
                tamano: "2D6",
                poder: "3D6",
                destreza: "3D6+6",
                movimiento: 10,
                mrBase: 4,
                armadura: 1
            },
            localizaciones: [
                { nombre: "Cabeza", rango: "17-20", ar: 1 },
                { nombre: "Cuerpo", rango: "01-16", ar: 1 }
            ],
            armas: [
                { nombre: "Mordisco", porcentaje: 40, dano: "1D4+MODA", mr: 6 }
            ],
            notas: "Animal de compañía o guardián. Ataca mordiendo."
        }
    ],
    salvajes: [
        { 
            nombre: "Oso",
            atributos: {
                fuerza: "3D6+15",
                constitucion: "2D6+6",
                tamano: "3D6+15",
                poder: "3D6",
                destreza: "3D6",
                movimiento: 8,
                mrBase: 3,
                armadura: 3
            },
            localizaciones: [
                { nombre: "Cabeza", rango: "17-20", ar: 3 },
                { nombre: "Patas delanteras", rango: "11-16", ar: 3 },
                { nombre: "Cuerpo", rango: "05-10", ar: 3 },
                { nombre: "Patas traseras", rango: "01-04", ar: 3 }
            ],
            armas: [
                { nombre: "Garras", porcentaje: 50, dano: "1D8+MODA", mr: 7 },
                { nombre: "Mordisco", porcentaje: 35, dano: "1D6+MODA", mr: 7 }
            ],
            notas: "Peligroso depredador. Puede atacar con garras y mordisco en el mismo turno."
        },
        { 
            nombre: "Lobo",
            atributos: {
                fuerza: "2D6+6",
                constitucion: "2D6",
                tamano: "2D6+6",
                poder: "3D6",
                destreza: "3D6+6",
                movimiento: 10,
                mrBase: 4,
                armadura: 2
            },
            localizaciones: [
                { nombre: "Cabeza", rango: "17-20", ar: 2 },
                { nombre: "Cuerpo", rango: "01-16", ar: 2 }
            ],
            armas: [
                { nombre: "Mordisco", porcentaje: 45, dano: "1D6+MODA", mr: 6 }
            ],
            notas: "Caza en manada. Mordisco potente."
        }
    ]
};

console.log("Base de datos de animales cargada correctamente");