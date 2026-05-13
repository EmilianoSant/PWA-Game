function jugar() {
    ponerBGTransicion();
    setTimeout(function () {
        window.location.assign("personaje.html");
    }, 2000);
    var audio = new Audio('audio/adriana-salte.mp3');
    audio.play();
}

function ponerBGTransicion() {
    document.querySelector('.bg-transicion').classList.add('bg-transicion-show');

}

function quitarBG() {
    document.querySelector('.bg-transicion').style.backgroundColor = 'transparent';
    setTimeout(function () {
        document.querySelector('.bg-transicion').classList.remove('bg-transicion-show');
    }, 1000);
}

let personajeSeleccionado = 1;

function siguiente() {
    personajeSeleccionado++;
    if (personajeSeleccionado === 7) {
        personajeSeleccionado = 1;
    }
    document.getElementById('personaje').src = 'imagenes/personaje' + personajeSeleccionado + '.png';

    var sfx = new Audio('audio/soy-tremendo.mp3');
    sfx.play();
}

function anterior() {
    personajeSeleccionado--;
    if (personajeSeleccionado === 0) {
        personajeSeleccionado = 6;
    }
    document.getElementById('personaje').src = 'imagenes/personaje' + personajeSeleccionado + '.png';

    var sfx = new Audio('audio/soy-tremendo.mp3');
    sfx.play();
}

//funcion para mostrar el mensaje de "¡Personaje seleccionado!" al hacer clic en el botón de selección de personaje
function seleccionarPersonaje() {
    localStorage.setItem('personaje1', personajeSeleccionado);
    localStorage.setItem('jugador1', document.getElementById('jugador 1').value);

    ponerBGTransicion();
    setTimeout(function () {
        window.location.assign("personaje2.html");
    }, 2000);
    var sfxSelect = new Audio('audio/rosa-gdlp.mp3');
    sfxSelect.play();
}

function comenzarJuego() {
    localStorage.setItem('personaje2', personajeSeleccionado);
    localStorage.setItem('jugador2', document.getElementById('jugador 2').value);

    ponerBGTransicion();

    setTimeout(function () {
        window.location.assign("juego.html");
    }, 2000);
    var sfxStart = new Audio('audio/rosa-gdlp.mp3');
    sfxStart.play();
}

//funcion para cargar el fondo del escenario y a los personajes seleccionados con el nombre del jugador
function cargarEscenario() {

    //inicializa el contador de muertes 
    if (!localStorage.getItem('marcador1')) {
        //inicializa el contador de muertes en 0 
        localStorage.setItem('marcador1', 0);
        localStorage.setItem('marcador2', 0);
        //cargar en el html el valor de las variables
        marcador1 = localStorage.getItem('marcador1');
        marcador2 = localStorage.getItem('marcador2');
    } else {
        marcador1 = localStorage.getItem('marcador1');
        marcador2 = localStorage.getItem('marcador2');
    }

    //contador de muertes
    if (marcador1 > 0) {
        for (i = 1; i <= marcador1; i++) {
            document.querySelector('.vidas2').innerHTML += "<img src='imagenes/calavera.png'>";
        }
    }
    if (marcador2 > 0) {
        for (i = 1; i <= marcador2; i++) {
            document.querySelector('.vidas1').innerHTML += "<img src='imagenes/calavera.png' >";
        }
    }

    if (marcador1 >= 3 || marcador2 >= 3) {
        document.querySelector('.bg-juego').style.backgroundImage = 'url("imagenes/bg_personaje.png")';
        if (marcador1 >= 3) {
            //si gana el jugador 1
            document.querySelector('#nomGanador').innerHTML = localStorage.getItem('jugador1');
            document.querySelector('#imgGanador').setAttribute('src', 'imagenes/personaje' + localStorage.getItem('personaje1') + '.png');
            document.querySelector('.left').style.display = 'none';
            document.querySelector('.right').style.display = 'none';
            document.querySelector('.ganador').style.display = 'block';

        } else if (marcador2 >= 3) {
            //si gana el jugador 2
            document.querySelector('.bg-juego').style.backgroundImage = 'url("imagenes/bg_personaje.png")';
            document.querySelector('#nomGanador').innerHTML = localStorage.getItem('jugador2');
            document.querySelector('#imgGanador').setAttribute('src', 'imagenes/personaje' + localStorage.getItem('personaje2') + '.png');
            document.querySelector('.left').style.display = 'none';
            document.querySelector('.right').style.display = 'none';
            document.querySelector('.ganador').style.display = 'block';
        }
    } else {
        listos();
        document.querySelector('.ganador').style.display = 'none';
        var bg = Math.floor(Math.random() * 3) + 1;
        document.querySelector('.bg-juego').style.backgroundImage = 'url("imagenes/bg' + bg + '.png")';
    }




    //poner en el documento un valor que obtenemos del localstorage
    //para las imagenes y para los nombres
    var j1 = localStorage.getItem('jugador1') || "Jugador 1";
    var p1 = localStorage.getItem('personaje1') || 1;
    document.getElementById('jugador1').textContent = j1;

    var img1 = document.createElement('img');
    img1.src = 'imagenes/personaje' + p1 + '.png';
    img1.classList.add('p1');
    document.querySelector('.left').appendChild(img1);

    //verifica en el localStorage que variable corresponde a cada cosa
    var j2 = localStorage.getItem('jugador2') || "Jugador 2";
    var p2 = localStorage.getItem('personaje2') || 2;
    document.getElementById('jugador2').textContent = j2;

    var img2 = document.createElement('img');
    img2.src = 'imagenes/personaje' + p2 + '.png';
    img2.classList.add('p2');
    document.querySelector('.right').appendChild(img2);

    listos();
}

function listos() {
    setTimeout(function () {
        document.querySelector('.msj').style.opacity = '1';
    }, 500);
}

function conteo() {
    var sfxclick = new Audio('audio/pew-pew-disparo.mp3');
    document.querySelector('.msj').style.opacity = '0';
    document.querySelector('.no3').style.opacity = '1';
    sfxclick.play();

    setTimeout(function () {
        document.querySelector('.no3').style.opacity = '0';
        document.querySelector('.no2').style.opacity = '1';
        sfxclick.play();

        setTimeout(function () {
            document.querySelector('.no2').style.opacity = '0';
            document.querySelector('.no1').style.opacity = '1';
            sfxclick.play();
            timeporandom = Math.floor(Math.random() * 10) + 1; // tiempo aleatorio entre 1 y 3 segundos
            timeporandom = timeporandom * 1000; // convertir a milisegundos

            setTimeout(function () {
                document.querySelector('.no1').style.opacity = '0';
                document.querySelector('.conteo').style.display = 'none';
                sfxclick.play();
            }, timeporandom);
        }, 1000);
    }, 1000);
}

function disparo1() {
    console.log('disparo1');
    document.querySelector('.left').setAttribute('onclick', '');
    document.querySelector('.right').setAttribute('onclick', '');
    document.querySelector('.p2').style.right = "-800px";
    document.querySelector('.p1').style.left = "10px";
    setTimeout(function () {
        document.querySelector('.p1').style.left = "30px";
    }, 150);

    marcador1++;
    localStorage.setItem('marcador1', marcador1);

    setTimeout(function () {
        window.location.assign("juego.html");
    }, 2000);

    var sfxdisparo = new Audio('audio/rosa-gdlp.mp3');
    sfxdisparo.play();

}

function disparo2() {
    console.log('disparo2');
    document.querySelector('.left').setAttribute('onclick', '');
    document.querySelector('.right').setAttribute('onclick', '');
    document.querySelector('.p1').style.left = "-800px";
    document.querySelector('.p2').style.right = "10px";
    setTimeout(function () {
        document.querySelector('.p2').style.right = "30px";
    }, 150);


    marcador2++;
    localStorage.setItem('marcador2', marcador2);
    setTimeout(function () {
        window.location.assign("juego.html");
    }, 2000);

    var sfxdisparo = new Audio('audio/rosa-gdlp.mp3');
    sfxdisparo.play();

}


function reiniciarJuego() {
    localStorage.setItem('marcador1', 0);
    localStorage.setItem('marcador2', 0);
    marcador1 = localStorage.getItem('marcador1');
    marcador2 = localStorage.getItem('marcador2');
    setTimeout(function () {
        window.location.assign("personaje.html");
    }, 1000);
}