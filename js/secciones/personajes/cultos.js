function initCultos() {
    console.log('Inicializando Selector de Cultos...');
    
    const btnAleatorio = document.getElementById('btn-aleatorio');
    const btnMostrar = document.getElementById('btn-mostrar');
    const resultadosContainer = document.getElementById('resultados-container');
    const selectCulto = document.getElementById('culto');
    
    btnAleatorio.addEventListener('click', generarCultoAleatorio);
    btnMostrar.addEventListener('click', mostrarCulto);
    
    const cultos = [
        {
            nombre: "Argan Argar",
            descripcion: "Dios de la Oscuridad Superficial",
            habilidades: "Hablar Otro Idioma (Darktongue) +20%, Leer/Escribir (Darktongue) +15%, Cantar +10%",
            magiaRuna: "Crear Sombra, Caminar en la Oscuridad, Despedir Elemental de Oscuridad (pequeño o mediano), Encantar Plomo, Seguro, Invocar Elemental de Oscuridad (solo pequeño o mediano), y Suprimir Lodril",
            magiaEspiritual: "Muro Oscuro (2 pts.), Detectar Magia (1 pt.), Glamour (2 pts.), Protección (var.), y Vigor (2 pts.)",
            magiaProhibida: "Luz y Muro de Luz",
            pasiones: "Devoción (Argan Argar), Lealtad (templo)",
            notas: "Culto asociado con la oscuridad y lo subterráneo",
            cultosAsociados: "Emalda"
        },
        {
            nombre: "Babeester Gor",
            descripcion: "La Hija Vengadora",
            habilidades: "Hacha 1M +15%, Hacha 2M +20%, Intimidar +10%, Hablar Otro Idioma (Earthtongue) +10%",
            magiaRuna: "Trance de Hacha, Berserker, Despedir Elemental de Tierra (solo pequeño), Escudo de Tierra, Escudo, Tajo, e Invocar Elemental de Tierra (solo pequeño)",
            magiaEspiritual: "Afilar Arma (var.), Desmoralizar (2 pts.), Detectar Enemigos (1 pt.), Disrupción (1 pt.), Sanar (var.), Fuerza (2 pts.), y Vigor (2 pts.)",
            pasiones: "Devoción (Babeester Gor), Lealtad (templo), Odio (Rompejuramentos)",
            notas: "Solo mujeres pueden unirse",
            cultosAsociados: "Emalda, Maran Gor"
        },
        {
            nombre: "Chalana Arroy",
            descripcion: "Diosa de la Curación",
            habilidades: "Primeros Auxilios +20%, Tratar Enfermedad o Tratar Veneno +15%, Cantar +10%",
            magiaRuna: "Canción de Confort, Curar Todas las Enfermedades, Curar Herida del Caos, Curar Veneno, Armonía, Sanar Cuerpo, Trance de Curación, Regenerar Miembro, Restaurar Salud, Resucitar, e Invocar Espíritu Sanador",
            magiaEspiritual: "Confundir (2 pts.), Espada Oscura (var.), Sanar (var.), Luz (1 pt.), Brillo (var.), y Dormir (3 pts.)",
            pasiones: "Lealtad (templo)",
            notas: "Los cultistas de Chalana Arroy juran nunca dañar a una criatura inteligente o causar dolor innecesario a cualquier ser vivo",
            cultosAsociados: "Emalda, Eurnal, Issaries, Lhankor Mhy, Orlanth, Toro Tempestuoso , Yelm"
        },
        {
            nombre: "Daka Fal",
            descripcion: "Culto a los Ancestros",
            habilidades: "Hablar Otro Idioma (Spiritspeech) +20%, Combate Espiritual +15%, Cantar +10%",
            magiaRuna: "Axis Mundi, Discorporación, Liberar Fantasma, Encarnar Ancestro, Restaurar Salud, Resucitar (un solo uso), Guardián Espiritual, Fusión Espiritual, Invocar Ancestro, Invocar Ancestro Específico, e Invocar Maestro Espiritual",
            magiaEspiritual: "Todos los hechizos de magia espiritual",
            pasiones: "Amor (Familia), Lealtad (Chamán)",
            cultosAsociados: "Odayla, Yinkin"
        },
        {
            nombre: "Eiritha",
            descripcion: "Madre de la Manada",
            habilidades: "Entender Bestias de Manada +20%, Pastoreo +15%, Cantar +10%",
            magiaRuna: "Bendecir Animales, Despedir Elemental de Tierra (pequeño o mediano), Hablar con Bestias de Manada, e Invocar Elemental de Tierra (pequeño)",
            magiaEspiritual: "Visión Lejana (var.), Sanar (var.), Lentitud (1 pt.), y Pantalla Espiritual (var.). Todos los iniciados comienzan con el hechizo Encender como un hechizo adicional de magia espiritual que no cuenta contra sus 5 puntos iniciales",
            pasiones: "Amor (familia), Lealtad (templo), Lealtad (tribu)",
            notas: "Solo mujeres praxianas pueden unirse al culto de Eirtha",
            cultosAsociados: "Ernalda, Toro Tempestuoso, Waha"
        },
        {
            nombre: "Engizi",
            descripcion: "El Titán del Río del Cielo",
            habilidades: "Bote +20%, Hablar Otro Idioma (Boatspeech) +15%, Nadar +10%",
            magiaRuna: "Respirar Aire/Agua, Despedir Elemental de Agua (pequeño o mediano), Escudo de Fuego, Red Fuerte, Invocar Náyade, e Invocar Elemental de Agua (pequeño o mediano)",
            magiaEspiritual: "Coordinación (2 pts.), Extinguir (var.), Sanar (var.), Movilidad (1 pt.), Ojos de Río (1 pt.), y Brillo (var.)",
            pasiones: "Lealtad (templo), Devoción (dios del río)",
            cultosAsociados: "Orland Thunderous"
        },
        {
            nombre: "Ernalda",
            descripcion: "Reina de la Tierra",
            habilidades: "Danza +20%, Conocimiento Animal o Conocimiento de Plantas +15%, Cantar +10%, Hablar Otro Idioma (Earthtongue) +20%",
            magiaRuna: "Absorción, Despertar Pasión, Bendecir Campeón, Bendecir Cultivos, Bendecir Embarazo, Carisma, Comandar Serpiente, Comandar Cerdo, Despedir Elemental de Tierra (cualquier tamaño), Poder de la Tierra, Gnomo a Gárgola (un solo uso), Sanar Cuerpo, Inviolable, Regenerar Miembro, Reproducir, Restaurar Salud, Invocar Elemental de Tierra (cualquier tamaño), e Invocar Guardián del Hogar",
            magiaEspiritual: "Confundir (2 pts.), Desmoralizar (2 pts.), Sanar (var.), Segunda Vista (3 pts.), Brillo (var.), Lentitud (1 pt.), Fuerza (2 pts.), y Vigor (2 pts.). Todos los iniciados comienzan con el hechizo Encender como un hechizo adicional de magia espiritual que no cuenta contra sus 5 puntos iniciales",
            pasiones: "Devoción (Ernalda), Lealtad (templo), Lealtad (suma sacerdotisa)",
            cultosAsociados: "Argan Argar, Babcester Gor, Chalana Arroy, Eirtha, Maran Gor, Orlanth, Toro Tempestuoso, Yelm, Yelmallo"
        },
        {
            nombre: "Eurmal",
            descripcion: "El Embustero",
            habilidades: "Esquivar +20%, Hablar Rápido +15%, Encantar +10%",
            magiaRuna: "Movimiento Ilusorio, Olor Ilusorio, Vista Ilusoria, Sonido Ilusorio, Sustancia Ilusoria, Sabor Ilusorio, y Reflexión. Además, cada santuario tiene su propio hechizo especial de Runa",
            magiaEspiritual: "Varía con el santuario. Disrupción (1 pt.), Glamour (2 pts.), Encender (1 pt.), Brillo (var.), y Silencio (1 pt.) son los más comunes",
            pasiones: "Odio (Autoridad)",
            cultosAsociados: "Chalana Arroy, Issaries, Lhankor Mhy, Orlanth"
        },
        {
            nombre: "Foundchild",
            descripcion: "Dios de la Caza",
            habilidades: "Rastrear +15%, Corte Pacífico +20%, Cantar +10%",
            magiaRuna: "Maestro de Bestias, Atraer Bestia, y Disparo Certero",
            magiaEspiritual: "Disrupción (1 pt.), Movilidad (1 pt.), Multimisil (var.), Lentitud (1 pt.), y Disparo Rápido (1 pt.)",
            pasiones: "Amor (familia), Lealtad (templo)",
            cultosAsociados: "Odayla, Waha, Yinkin"
        },
        {
            nombre: "Humakt",
            descripcion: "Dios de la Muerte y la Guerra",
            habilidades: "Espada 1M (elegir tipo) +20%, Otra Arma (elegir tipo) +10%, Intimidar +15%",
            magiaRuna: "Atar Fantasma, Detectar Verdad, Moral, Juramento, Cortar Espíritu, Escudo, Trance de Espada, Espada Verdadera, y Rechazar No Muerto",
            magiaEspiritual: "Afilar Arma (var.), Coordinación (2 pts.), Desmoralizar (2 pts.), Detectar Enemigos (1 pt.), Detectar No Muertos (1 pt.), Disrupción (1 pt.), Espada de Fuego (4 pts.), Sanar (var.), Parada (var.), Protección (var.), Reparar (var.), Fuerza (2 pts.), y Vigor (2 pts.)",
            pasiones: "Honor, Lealtad (templo), Devoción (Humakt)",
            notas: "Los iniciados de Humakt deben tomar uno de los dones de Humakt y su geas correspondiente",
            cultosAsociados: "Ninguno"
        },
        {
            nombre: "Issaries",
            descripcion: "Dios de la Comunicación y el Comercio",
            habilidades: "Regatear +15%, Hablar Otro Idioma (Tradetalk) +20%, Cantar +10%",
            magiaRuna: "Crear Mercado, Cerrar, Paso, Vigía del Camino, y Comercio de Hechizos",
            magiaEspiritual: "Contramagia (var.), Detectar Enemigos (1 pt.), Visión Lejana (var.), Glamour (2 pts.), Pegamento (var.), Movilidad (1 pt.), y Reparar (var.)",
            pasiones: "Lealtad (templo)",
            cultosAsociados: "Chalana Arroy, Eurmal, Lhankor Mhy, Orlanth"
        },
        {
            nombre: "Lhankor Mhy",
            descripcion: "Señor del Conocimiento",
            habilidades: "Leer/Escribir (cualquiera) +20%, Saber (cualquiera) +15%, Cantar +10%",
            magiaRuna: "Analizar Magia, Clarividencia, Encontrar (sustancia), Conocimiento, Leer Mente, Reconstrucción, Traducir, y Hablar Verdad",
            magiaEspiritual: "Todos los hechizos de Detección (1 pt. cada uno) y Visión Lejana (var.)",
            pasiones: "Lealtad (templo)",
            notas: "Los cultistas de Lhankor Mhy pueden comenzar con hasta cinco puntos de magia espiritual del culto o hasta tres hechizos de hechicería del culto",
            cultosAsociados: "Chalana Arroy, Eurmal, Issaries, Orlanth"
        },
        {
            nombre: "Maran Gor",
            descripcion: "La Sacudidora de Tierra",
            habilidades: "Hacha 1M (elegir tipo) o Mazo +20%, Danza +20%, Intimidar +10%, Hablar Otro Idioma (Earthtongue) +10%",
            magiaRuna: "Explosión de Tierra, Comandar Dinosaurio, Crear Fisura, Despedir Elemental de Tierra (pequeño o mediano), Sacudir Tierra, e Invocar Elemental de Tierra (pequeño o mediano)",
            magiaEspiritual: "Confundir (2 pts.), Afilar Arma (var.), Mazazo (var.), Desmoralizar (2 pts.), Disrupción (1 pt.), Espada Oscura (var.), Sanar (var.), Mano de Hierro (var.), Fuerza (2 pts.), y Vigor (2 pts.)",
            pasiones: "Devoción (Maran Gor), Lealtad (templo)",
            notas: "Cualquiera puede unirse, aunque los hombres no pueden convertirse en Sacerdotisas Rúnicas, y solo los eunucos pueden convertirse en Habladores de Dios",
            cultosAsociados: "Babeester Gor, Emalda"
        },
        {
            nombre: "Odayla",
            descripcion: "Dios Oso",
            habilidades: "Rastrear +15%, Corte Pacífico +20%, Cantar +10%",
            magiaRuna: "Piel de Oso, Fuerza de Oso, y Garras",
            magiaEspiritual: "Detectar Vida (1 pt.), Disrupción (1 pt.), Sanar (var.), Movilidad (1 pt.), Protección (var.), Lentitud (1 pt.), Disparo Rápido (1 pt.), Pantalla Espiritual (var.), y Fuerza (2 pts.)",
            pasiones: "Amor (familia)",
            cultosAsociados: "Daka Fal, Foundchild, Orlanth, Yinkin"
        },
        {
            nombre: "Orlanth",
            descripcion: "Rey de la Tormenta, Dios de Agricultores, Guerreros y Reyes",
            habilidades: "Oratoria +15%, Hablar Otro Idioma (Stormspeech) +20%, Cantar +10%",
            magiaRuna: "Despedir Elemental de Aire (solo pequeño o mediano), Aumentar/Disminuir Viento, Invocar Elemental de Aire (solo pequeño o mediano), Convocatoria del Mal, y Torcedura del Viento disponibles para todos los subcultos. Cada subculto tiene hechizos especiales adicionales de magia rúnica",
            magiaEspiritual: "Afilar Arma (var.), Desmoralizar (2 pts.), Detectar Enemigos (1 pt.), Disrupción (1 pt.), Sanar (var.), Movilidad (1 pt.), Protección (var.), y Fuerza (2 pts.)",
            pasiones: "Devoción (Orlanth), Odio (Caos), Honor, Lealtad (templo)",
            notas: "Orlanth tiene dos subcultos principales: Aventurero y Atronador. El jugador debe elegir el subculto al que pertenece su aventurero",
            cultosAsociados: "Chalana Arroy, Ernalda, Eurnal, Issaries, Lhankor Mhy, Odayla, Toro Tempestuoso, Yinkin"
        },
        {
            nombre: "Siete Madres",
            descripcion: "Recreadoras de la Diosa Roja",
            habilidades: "Hablar Otro Idioma (New Pelorian) +20%, Leer/Escribir (New Pelorian) +15%, Cantar +10%",
            magiaRuna: "Despedir Elemental (tipo específico debe ser especificado: no elementales de aire, solo pequeños), Despedir Lune (cualquier tamaño), Locura, Explosión Mental, Reflexión, Regenerar Miembro, Invocar Lune (cualquier tamaño), e Invocar Elemental (tipo específico debe ser especificado: no elementales de aire, solo pequeños)",
            magiaEspiritual: "Confundir (2 pts.) y Glamour (2 pts.) al costo normal de puntos. Cualquier otro hechizo de magia espiritual al doble del costo normal",
            pasiones: "Lealtad (templo), Lealtad (Emperador Rojo)",
            cultosAsociados: "Diosa Roja"
        },
        {
            nombre: "Toro Tempestuoso",
            descripcion: "El Asesino del Caos",
            habilidades: "Arma Cultural (elegir tipo) +15%, Sentir Caos +20%, Intimidar +10%",
            magiaRuna: "Berserker, Despedir Elemental de Aire (solo pequeño), Enfrentar Caos, Impedir Caos, e Invocar Elemental de Aire (solo pequeño)",
            magiaEspiritual: "Desmoralizar (2 pts.), Detectar Enemigos (1 pt.), Disipar Magia (var.), Fanatismo (1 pt.), Sanar (var.), y Protección (var.)",
            pasiones: "Devoción (Toro Tempestuoso), Odio (Caos), Lealtad (Storm Khan)",
            notas: "Todos los cultistas de Toro Tempestuoso pueden aprender la habilidad Sentir Caos",
            cultosAsociados: "Chalana Arroy, Eiritha, Ernalda, Orlanth, Waha"
        },
        {
            nombre: "Waha",
            descripcion: "El Carnicero",
            habilidades: "Corte Pacífico +20%, Pastoreo +15%, Cantar +10%",
            magiaRuna: "Axis Mundi, Discorporación, Despedir Elemental de Tierra (solo pequeño), Escudo, Invocar Espíritu de Ley, e Invocar Elemental de Tierra (pequeño)",
            magiaEspiritual: "Contramagia (var.), Detectar Espíritu (1 pt.), Distracción (1 pt.), Sanar (1 pt.), Protección (var.), Segunda Vista (3 pts.), Lentitud (1 pt.), Disparo Rápido (1 pt.), Pantalla Espiritual (var.), y Vigor (2 pts.)",
            pasiones: "Devoción (Waha), Lealtad (khan)",
            notas: "Restringido a hombres praxianos. Los iniciados no pueden aprender más de un punto del Hechizo de Sanar",
            cultosAsociados: "Eiritha, Toro Tempestuoso"
        },
        {
            nombre: "Yelm",
            descripcion: "El Caballo Solar",
            habilidades: "Montar +20%, Hablar Otro Idioma (Firespeech) +20%, Cantar +10%",
            magiaRuna: "Despejar Nubes, Comandar Caballo, Despedir Elemental de Fuego (pequeño), Combatir Enfermedad, Escudo, Invocar Elemental de Fuego (pequeño), y Disparo Certero",
            magiaEspiritual: "Confundir (2 pts.), Coordinación (2 pts.), Detectar Enemigos (1 pt.), Disrupción (1 pt.), Extinguir (var.), Visión Lejana (var.), Flecha de Fuego (2 pts.), Espada de Fuego (4 pts.), Sanar (var.), Encender (1 pt.), Luz (1 pt.), Muro de Luz (4 pts.), Movilidad (1 pt.), Multimisil (var.), Lentitud (1 pt.), y Disparo Rápido (1 pt.)",
            pasiones: "Honor, Amor (Familia), Lealtad (templo), Devoción (Yelm)",
            notas: "Restringido a hombres del Pueblo Puro del Caballo. Los miembros del culto deben montar y pastorear solo caballos, y no pueden practicar la agricultura",
            cultosAsociados: "Chalana Arroy, Emalda, Yelmalio"
        },
        {
            nombre: "Yelmalio",
            descripcion: "Dios Solar de la Frontera",
            habilidades: "Saber Celestial +15%, Hablar Otro Idioma (Firespeech) +20%, Cantar +10%",
            magiaRuna: "Ojo de Gato y Brillar Sol",
            magiaEspiritual: "Coordinación (2 pts.), Detectar Oro (1 pt.), Visión Lejana (var.), Linterna (1 pt.), Luz (1 pt.), Muro de Luz (4 pts.), y Reparar (var.)",
            pasiones: "Honor, Lealtad (templo), Devoción (Yelmalio)",
            notas: "Un iniciado puede tomar un don y su geas de Yelmalio",
            cultosAsociados: "Emalda, Yelm"
        },
        {
            nombre: "Yinkin",
            descripcion: "Dios Gato Sombra",
            habilidades: "Hablar Otro Idioma (Beastspeech) +15%, Rastrear +20%",
            magiaRuna: "Ojo de Gato, Carisma, Garras, e Identificar Olor",
            magiaEspiritual: "Coordinación (2 pts.), Detectar Vida (1 pt.), Disrupción (1 pt.), Glamour (2 pts.), Sanar (var.), Movilidad (1 pt.), Silencio (1 pt.), Lentitud (1 pt.)",
            pasiones: "Amor (familia), Lealtad (tribu)",
            cultosAsociados: "Daka Fal, Foundchild, Odayla, Orlanth"
        }
    ];
    
    function generarCultoAleatorio() {
        const randomIndex = Math.floor(Math.random() * cultos.length);
        selectCulto.value = cultos[randomIndex].nombre;
        mostrarCulto();
    }
    
    function mostrarCulto() {
        const cultoSeleccionado = selectCulto.value;
        if (!cultoSeleccionado) {
            alert('Por favor, selecciona un culto o genera uno aleatorio.');
            return;
        }
        
        const culto = cultos.find(c => c.nombre === cultoSeleccionado);
        if (!culto) {
            alert('Culto no encontrado.');
            return;
        }
        
        resultadosContainer.style.display = 'block';
        let html = `
            <div class="ficha-profesion">
                <h2>${culto.nombre} - ${culto.descripcion}</h2>
                
                <div class="atributo-resultado">
                    <h3>Información del Culto</h3>
                    <table class="tabla-profesion">
                        <tr>
                            <th>Campo</th>
                            <th>Detalle</th>
                        </tr>
                        <tr>
                            <td>Habilidades Iniciales</td>
                            <td>${culto.habilidades}</td>
                        </tr>
                        <tr>
                            <td>Magia Rúnica Especial</td>
                            <td>${culto.magiaRuna}</td>
                        </tr>
                        <tr>
                            <td>Magia Espiritual del Culto</td>
                            <td>${culto.magiaEspiritual}</td>
                        </tr>`;
        
        if (culto.magiaProhibida) {
            html += `
                        <tr>
                            <td>Magia Prohibida</td>
                            <td>${culto.magiaProhibida}</td>
                        </tr>`;
        }
        
        html += `
                        <tr>
                            <td>Pasiones Favorecidas</td>
                            <td>${culto.pasiones}</td>
                        </tr>`;
        
        if (culto.notas) {
            html += `
                        <tr>
                            <td>Notas</td>
                            <td>${culto.notas}</td>
                        </tr>`;
        }
        
        if (culto.cultosAsociados) {
            html += `
                        <tr>
                            <td>Cultos Asociados</td>
                            <td>${culto.cultosAsociados}</td>
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
    initCultos();
} else {
    document.addEventListener('DOMContentLoaded', initCultos);
}