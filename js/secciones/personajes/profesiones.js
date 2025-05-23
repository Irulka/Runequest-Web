function initProfesiones() {
    console.log('Inicializando Selector de Profesiones...');
    
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnMostrar = document.getElementById('btn-mostrar');
    const resultadosContainer = document.getElementById('resultados-container');
    const selectProfesion = document.getElementById('profesion');
    
    btnAleatorio.addEventListener('click', generarProfesionAleatoria);
    btnMostrar.addEventListener('click', mostrarProfesion);
    
    const profesiones = [
        {
            nombre: "Asistente de Chamán",
            skills: "Hablar Lengua de Espíritus +20%, Cantar +10%, Combate Espiritual +30%, Conocimiento Animal +15%, Danza Espiritual +10%, Primeros Auxilios +15%, Saber de Espíritus +20%, Saber de Plantas +20%, Viaje Espiritual +20%, Meditar +20%",
            living: "Pobre",
            income: "20 L",
            cults: "Daka Fal, Waha, Yelm (Estepas)",
            passions: "Lealtad (chamán)",
            ransom: "250 L",
            equipment: "Un conjunto de hierbas y polvos locales usados para sanación y rituales, varias estatuillas relacionadas con el animal de poder del chamán o ancestros, bienes artesanales por valor de 25 L, 5 L en monedas, taparrabos y túnica, armas culturales apropiadas."
        },
        {
            nombre: "Bandido",
            skills: "Intimidar +10%, Esconderse +30%, Primeros Auxilios +10%, Arma Principal (elegir un arma cultural) +30%, Saber (Animal o Planta) +10%, Arma Secundaria (elegir otra arma cultural) +10%, Supervivencia +30%, Escudo (elegir tipo) +10%, Rastrear +10%",
            living: "Indigente",
            income: "Ninguno",
            cults: "Babcester Gor, Colmillo Negro, Eurmal, Maran Gor, Odayla, Orlanth, Siete Madres, Toro de la Tormenta",
            passions: "Amor (familia), Lealtad (banda), u Odio (autoridad)",
            ransom: "Ninguno",
            equipment: "Armas culturales, falda de cuero (1 pt. protección), coraza de cuero pesado (2 pts. protección), saco de dormir, botín por valor de 1D100 L."
        },
        {
            nombre: "Conductor de Carro",
            skills: "Batalla +20%, Primeros Auxilios +10%, Conducir Carro +40%, Látigo +25%, Arma Cultural (elegir tipo) +20%, Danza +15%, Arma a Distancia Cultural (elegir tipo) +20%, Escudriñar +15%",
            living: "Libre",
            income: "60 L",
            cults: "Orlanth Aventurero, Siete Madres (en Tarsh Lunar)",
            passions: "Honor, Lealtad (líder), o Lealtad (templo)",
            ransom: "500 L",
            equipment: "Armas culturales, látigo, linotorax (3 pts. protección), grebas y brazales de cuero (1 pt. protección), casco compuesto (2 pts. protección), 1D6 cicatrices distintivas, odre de vino, regalos del líder o templo por valor de 150 L. El carro en sí pertenece al líder o templo."
        },
        {
            nombre: "Artesano",
            skills: "Arte +10%, Evaluar +10%, Regatear +10%, Oficio (principal) +30%, Perspicacia (Humana) +10%, Oficio (secundario) +20%, Saber (cualquiera) +10%, Diseñar +15%, Administrar Hogar +30%, Arma Cultural (elegir tipo) +15%",
            living: "Libre",
            income: "Depende del Oficio",
            cults: "Depende del oficio - Ernalda (alfareros y tejedores), Issaries (todos), Gustbrun (broncistas)",
            passions: "Amor (familia), Lealtad (gremio), o Lealtad (patrón)",
            ransom: "500 L",
            equipment: "Un conjunto de herramientas necesarias para el oficio, bienes artesanales por valor de 100 L, 20 L en monedas, armas culturales."
        },
        {
            nombre: "Artista",
            skills: "Danza +30%, Costumbres (cualquiera) +10%, Oratoria +10%, Perspicacia (humana) +10%, Cantar +30%, Saber (cualquiera) +10%, Hablar (propio) +30%, Arma Cultural (elegir tipo) +15%, Tocar (instrumento) +30%",
            living: "Libre",
            income: "Depende de la habilidad usada: Cantar = 100 L; Danza o Tocar instrumento = 80 L",
            cults: "Donandar, Ernalda, Eurmal, Orlanth, Siete Madres",
            passions: "Amor (persona), Lealtad (patrón), o Lealtad (tribu)",
            ransom: "500 L",
            equipment: "Un instrumento musical, 50 L en monedas, 70 L en bienes, armas culturales, traje si es apropiado."
        },
        {
            nombre: "Granjero",
            skills: "Saber (local) +15%, Saltar o Escalar +10%, Agricultura +30%, Oficio (cualquiera) +15%, Primeros Auxilios +10%, Escudriñar +10%, Pastoreo +15%, Arma Cultural (elegir tipo) +15%, Administrar Hogar +30%, Escudo (elegir tipo) +15%",
            living: "Libre",
            income: "80 L (para granjero libre, 40 L para arrendatario)",
            cults: "Ernalda, Orlanth, Siete Madres (Tarsh Lunar), Yelmallo",
            passions: "Amor (familia), Lealtad (clan), o Lealtad (tribu)",
            ransom: "500 L",
            equipment: "Alimentos y ganado por valor de 120 L, armas culturales, hoz, martillo, dos bueyes de tiro, casco compuesto (3 pts. protección)."
        },
        {
            nombre: "Pescador",
            skills: "Bote +30%, Jabalina, Arco Simple, o Red de Lanzar (elegir uno) +20%, Nadar +30%, Lanza Corta +10%, Primeros Auxilios +10%, Escudo (elegir tipo) +10%, Saber del Río +30%, Escudriñar +10%",
            living: "Pobre",
            income: "60 L",
            cults: "Engizi, Orlanth",
            passions: "Amor (familia) o Lealtad (clan)",
            ransom: "200 L",
            equipment: "Armas culturales, 200 metros de cuerda o sedal, carrete, bote pequeño, líneas de pesca o redes, anzuelos, cestas, gancho, pescado salado o seco por valor de 60 L."
        },
        {
            nombre: "Sanador",
            skills: "Oratoria +10%, Tratar Enfermedad +30%, Alquimia +10%, Tratar Veneno +10%, Primeros Auxilios +30%, Diseñar +10%, Saber de Plantas +30%, Perspicacia (Humana) +10%",
            living: "Libre",
            income: "80 L",
            cults: "Chalana Arroy, Eiritha, Ernalda, Siete Madres",
            passions: "Amor (familia), Lealtad (clan), o Lealtad (tribu)",
            ransom: "500 L",
            equipment: "Kit de sanador (con lociones, ungüentos, sales, hierbas, jabones, navaja, pinzas, vendas), 20 L en monedas, varios objetos por valor de 100 L."
        },
        {
            nombre: "Pastor",
            skills: "Saltar o Escalar +10%, Escudriñar +10%, Conocimiento Animal +10%, Rastrear +10%, Saber (local) +10%, Arma a Distancia Cultural (elegir tipo) +30%, Primeros Auxilios +10%, Arma Cultural (elegir tipo) +10%, Pastoreo +30%, Escudo (elegir tipo) +10%, Corte Pacífico +30%",
            living: "Pobre",
            income: "60 L",
            cults: "Eiritha, Orlanth, Waha, Yelm, Yinkin",
            passions: "Amor (familia), Lealtad (clan), o Lealtad (tribu)",
            ransom: "500 L",
            equipment: "Armas culturales (incluyendo arma a distancia apropiada), animales de rebaño por valor de 120 L, bastón, animal pastor (típicamente un gato sombra o perro)."
        },
        {
            nombre: "Cazador",
            skills: "Conocimiento Animal +30%, Escudriñar +10%, Saber (local) +10%, Rastrear +30%, Ocultar +10%, Esconderse +10%, Escuchar +10%, Arma a Distancia Cultural (elegir tipo) +30%",
            living: "Pobre",
            income: "40 L",
            cults: "Foundchild, Odayla, Orlanth, Waha, Yelm (Estepas), Yinkin",
            passions: "Amor (familia) o Lealtad (clan)",
            ransom: "250 L",
            equipment: "Armas culturales (incluyendo arma a distancia apropiada), animal de caza (típicamente un gato sombra o perro), trampas, pieles por valor de 120 L."
        },
        {
            nombre: "Mercader",
            skills: "Montar +10%, Costumbres (cualquiera) +10%, Regatear +30%, Perspicacia (Humana) +10%, Hablar Otro Idioma (cualquiera) +10%, Leer/Escribir (cualquiera) +10%, Hablar Otro Idioma (Lengua Común) +30%, Administrar Hogar +30%, Evaluar +30%",
            living: "Libre",
            income: "Especial (basado en bienes comerciales)",
            cults: "Issaries, Argan Argar, Epyies, Siete Madres",
            passions: "Amor (familia), Lealtad (clan), o Lealtad (tribu)",
            ransom: "500 L",
            equipment: "Equipo de escritura, ropa fina por valor de 40 L, armas culturales, 500 L en bienes, 150 L en monedas, pequeña estatuilla del dios del comercio, sombrero de ala ancha de cuero (1 pt. protección), grebas de cuero (1 pt. protección), brazales de cuero (1 pt. protección), linotorax (3 pts. protección), bastón."
        },
        {
            nombre: "Noble",
            skills: "Montar (cualquiera) o Conducir Carro +10%, Perspicacia (Humana) +10%, Intriga +10%, Leer/Escribir (propio) +10%, Oratoria +30%, Administrar Hogar +30%, Hablar Idioma Propio +10%, Arma Cultural (elegir tipo) +30%, Costumbres (propias) +10%, Escudo (elegir tipo) +30%",
            living: "Noble",
            income: "Variable (la mayoría tienen al menos cinco hides de tierra)",
            cults: "Ernalda, Orlanth, Siete Madres, Waha, Yelm",
            passions: "Honor, Lealtad (líder) o Lealtad (tribu)",
            ransom: "1000 L",
            equipment: "Coraza de bronce (6 pts. protección), grebas y brazales de bronce (6 pts. protección), casco cerrado (5 pts. protección), armas culturales, dos animales de monta, ropa noble por valor de 60 L, 200 L en monedas, 450 L en joyas, vasijas y otros bienes de lujo."
        },
        {
            nombre: "Filósofo",
            skills: "Leer/Escribir (cualquiera) +50%, (Hechizo de Hechicería) +10%, Oratoria +25%, Saber (cualquiera) +30%, (Hechizo de Hechicería) +20%, Uso de Biblioteca +10%, (Hechizo de Hechicería) +10%, Saber (cualquiera) +10%, Meditar +20%",
            living: "Libre",
            income: "60 L",
            cults: "Lhankor Mhy, Siete Madres, Eolianismo, Dios Invisible",
            passions: "Amor (Sabiduría)",
            ransom: "150 L",
            equipment: "Implementos y materiales de escritura (con estuche de madera pequeño), pergaminos en blanco por valor de 50 L, una o dos obras filosóficas, una daga de bronce, bastón de caminar, pequeña plataforma portátil, túnicas, 50 L en monedas."
        },
        {
            nombre: "Sacerdote",
            skills: "Cualquier habilidad de culto +10%, Saber (Culto) +30%, Danza +10%, Leer/Escribir (propio) +10%, Oratoria +10%, Administrar Hogar +10%, Cantar +30%, Adorar (deidad) +30%, Meditar +10%",
            living: "Noble",
            income: "Variable (depende de los recursos del templo, pero la mayoría tienen al menos cinco hides de tierra)",
            cults: "Todos (excepto Daka Fal, Eurmal, y Waha)",
            passions: "Devoción (deidad) o Lealtad (templo)",
            ransom: "1000 L",
            equipment: "Casco abierto (4 pts. protección), cota de escamas pesada (5 pts. protección), grebas y brazales de cuero hervido (3 pts. protección), artefactos y regalías de la deidad, ropa noble por valor de 60 L, armas culturales, un animal de monta, 160 L en monedas, 450 L en joyas, vasijas y otros bienes de lujo."
        },
        {
            nombre: "Escriba",
            skills: "Hablar (cualquiera) +10%, Saber (cualquiera) +30%, Burocracia +30%, Saber (cualquiera) +10%, Costumbres (cualquiera) +30%, Leer/Escribir (cualquiera) +30%, Uso de Biblioteca +10%, Leer/Escribir (idioma propio) +50%, Evaluar +10%",
            living: "Libre",
            income: "Depende de la habilidad usada: Burocracia = 200 L; Alquimia o Costumbres = 160 L; Leer/Escribir = 120 L",
            cults: "Lhankor Mhy, Siete Madres",
            passions: "Lealtad (templo) o Lealtad (tribu)",
            ransom: "1000 L",
            equipment: "Implementos y materiales de escritura (con estuche de madera pequeño), tres paquetes de informes y notas por valor de 100 L, pergaminos en blanco por valor de 50 L, un disco de estaño grabado con el calendario, una antigua carta de presentación de un escriba superior, una daga de bronce, 80 L en monedas."
        },
        {
            nombre: "Ladrón",
            skills: "Escalar +10%, Diseñar +10%, Disfraz +30%, Juego de Manos +30%, Hablar Rápido +30%, Esconderse +10%, Saber (local) +10%, Moverse Silenciosamente +30%, Arma Cultural (elegir tipo) +15%",
            living: "Pobre",
            income: "30 L",
            cults: "Eurmal, Orlanth, Lanbril",
            passions: "Amor (familia) o Lealtad (pandilla)",
            ransom: "250 L o ninguno",
            equipment: "Ganzúas, palanca, otras herramientas apropiadas, arma ligera de una mano apropiada, máscara, 20 metros de cuerda con garfio, saco, linterna con capucha, 30 L en monedas, marca secreta de ladrón."
        },
      {
            nombre: "Guerrero (Infantería Pesada)",
            skills: "Cantar +10%, Escudriñar +10%, Batalla +30%, Todas las Armas de Unidad (incluyendo escudo) +25%, Primeros Auxilios +15%, Otra Arma (elegir tipo) +25%, Escuchar +10%, Arma Terciaria +15%",
            living: "Libre",
            income: "60 L",
            cults: "Argan Argar, Babeester Gor, Humakt, Siete Madres, Yelmallo",
            passions: "Honor, Lealtad (líder) o Lealtad (unidad)",
            ransom: "500 L",
            equipment: "Cota de escamas pesada (5 pts. protección) o coraza de placas (5 pts. protección) y falda de cuero tachonado (3 pts. protección), grebas y brazales de placas (6 pts. protección), casco cerrado (5 pts. protección), armas apropiadas, 1D3 cicatrices distintivas, saco de dormir, ropa buena, 20 L en monedas, botín de guerra por valor de 2×D100 L.",
            notas: "Armas de unidad: 1-4: Arma a una mano (elegir tipo) y Escudo Grande; 5-6: Arma a dos manos (elegir tipo). Los cultistas de Yelmallo pueden usar pica y escudo."
        },
        {
            nombre: "Guerrero (Infantería Ligera)",
            skills: "Batalla +30%, Esconderse +10%, Primeros Auxilios +15%, Moverse Silenciosamente +10%, Supervivencia +10%, Todas las Armas de Unidad (incluyendo escudo) +25%, Escuchar +10%, Otra Arma (elegir tipo) +25%, Escudriñar +10%",
            living: "Libre",
            income: "60 L",
            cults: "Babeester Gor, Humakt, Maran Gor, Orlanth Aventurero, Orlanth Trueno, Toro de la Tormenta",
            passions: "Honor, Lealtad (líder) o Lealtad (unidad)",
            ransom: "500 L",
            equipment: "Linotorax (3 pts. protección), grebas y brazales de cuero hervido (3 pts. protección), casco compuesto (3 pts. protección), armas apropiadas, 1D3 cicatrices distintivas, saco de dormir, ropa buena, botín de guerra por valor de 2×D100 L.",
            notas: "Armas de unidad: 1-2: Honda, Arma a una mano (elegir tipo), Escudo Pequeño; 3-4: Jabalina, Arma a una mano (elegir tipo), Escudo Mediano; 5: Arco Simple, Arma a una mano (elegir tipo), Escudo Mediano; 6: Hacha Arrojadiza, Arma a una mano (elegir tipo), Escudo Mediano."
        },
        {
            nombre: "Guerrero (Caballería Pesada)",
            skills: "Batalla +30%, Primeros Auxilios +10%, Montar (cualquiera) +35%, Escuchar +10%, Todas las Armas de Unidad +25%, Escudriñar +10%, Otra Arma (elegir tipo) +20%, Cantar +10%",
            living: "Libre",
            income: "60 L",
            cults: "Humakt, Orlanth Aventurero, Orlanth Trueno, Siete Madres, Toro de la Tormenta, Waha, Yelm (Estepas)",
            passions: "Honor, Lealtad (líder) o Lealtad (unidad)",
            ransom: "500 L",
            equipment: "Cota de escamas pesada (5 pts. protección) o coraza de placas (5 pts. protección) y falda de cuero tachonado (3 pts. protección), grebas y brazales de placas (6 pts. protección), casco cerrado (5 pts. protección), armas apropiadas, animal de monta, 1D3 cicatrices distintivas, saco de dormir, ropa buena, 20 L en monedas, botín de guerra por valor de 2×D100 L.",
            notas: "Armas de unidad: 1: Arco Compuesto, Lanza, Arma a una mano (elegir tipo); 2-5: Lanza, Arma a una mano (elegir tipo), y Escudo Mediano; 6: Jabalina, Lanza, Arma a una mano (elegir tipo)."
        },
        {
            nombre: "Guerrero (Caballería Ligera)",
            skills: "Montar +35%, Escuchar +10%, Cantar +10%, Escudriñar +10%, Batalla +30%, Todas las Armas de Unidad (incluyendo escudo) +25%, Primeros Auxilios +10%, Otra Arma (elegir tipo) +20%",
            living: "Libre",
            income: "60 L",
            cults: "Humakt, Orlanth Aventurero, Orlanth Trueno, Siete Madres, Toro de la Tormenta, Waha, Yelm (Estepas), Yelmallo",
            passions: "Honor, Lealtad (líder) o Lealtad (unidad)",
            ransom: "500 L",
            equipment: "Linotorax (3 pts. protección), grebas y brazales de cuero hervido (3 pts. protección), casco abierto (4 pts. protección), animal de monta, armas apropiadas, 1D3 cicatrices distintivas, saco de dormir, ropa buena, botín de guerra por valor de 2×D100 L.",
            notas: "Armas de unidad: 1: Arco Compuesto, Arma a una mano (elegir tipo), Escudo Pequeño; 2-3: Arco Compuesto, Lanza, Arma a una mano (elegir tipo); 4: Jabalina, Arma a una mano (elegir tipo), Escudo Mediano; 5: Lanza, Arma a una mano (elegir tipo), Escudo Pequeño; 6: Lanza, Arma a una mano (elegir tipo), Escudo Mediano."
        }
    ];
    
    function generarProfesionAleatoria() {
        const randomIndex = Math.floor(Math.random() * profesiones.length);
        selectProfesion.value = profesiones[randomIndex].nombre;
        mostrarProfesion();
    }
    
    function mostrarProfesion() {
        const profesionSeleccionada = selectProfesion.value;
        if (!profesionSeleccionada) {
            alert('Por favor, selecciona una profesión o genera una aleatoria.');
            return;
        }
        
        const profesion = profesiones.find(p => p.nombre === profesionSeleccionada);
        if (!profesion) {
            alert('Profesión no encontrada.');
            return;
        }
        
        resultadosContainer.style.display = 'block';
        let html = `
            <div class="ficha-profesion">
                <h2>${profesion.nombre}</h2>
                
                <div class="atributo-resultado">
                    <h3>Información de la Profesión</h3>
                    <table class="tabla-profesion">
                        <tr>
                            <th>Campo</th>
                            <th>Detalle</th>
                        </tr>
                        <tr>
                            <td>Habilidades</td>
                            <td>${profesion.skills}</td>
                        </tr>
                        <tr>
                            <td>Nivel de Vida</td>
                            <td>${profesion.living}</td>
                        </tr>
                        <tr>
                            <td>Ingreso Base</td>
                            <td>${profesion.income}</td>
                        </tr>
                        <tr>
                            <td>Cultos</td>
                            <td>${profesion.cults}</td>
                        </tr>
                        <tr>
                            <td>Pasiones Favorecidas</td>
                            <td>${profesion.passions}</td>
                        </tr>
                        <tr>
                            <td>Rescate</td>
                            <td>${profesion.ransom}</td>
                        </tr>
                        <tr>
                            <td>Equipo</td>
                            <td>${profesion.equipment}</td>
                        </tr>`;
        
        if (profesion.notas) {
            html += `
                        <tr>
                            <td>Notas</td>
                            <td>${profesion.notas}</td>
                        </tr>`;
        }
        
        html += `
                    </table>
                </div>
                
                <button class="btn-magia" onclick="document.getElementById('resultados-container').style.display='none'">Volver</button>
            </div>
        `;
        
        document.getElementById('resultado-principal').innerHTML = html;
    }
}

if (document.readyState === 'complete') {
    initProfesiones();
} else {
    document.addEventListener('DOMContentLoaded', initProfesiones);
}