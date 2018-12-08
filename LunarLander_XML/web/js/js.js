//ENTORNO
var pause = false;
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var gameover = false;
var bot2 = false;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
//variables indicadores
var bartop = 5;
var barwidth = 39;
var barleft = 31;
var gasfil = 100;
//variables dificultad
var dificultad = 1;
//var nave = 2;
var umbral = 5;
var nave = 2;
var fuel = 100;
var dif = "Facil";
var dks = false;

var xml;


//al cargar por completo la página...

window.onload = function () {
    loadXml();
    document.getElementById("nau").src = "img/" + nave + "Off.png";
    velocidad = document.getElementById("velocidad");
    altura = document.getElementById("altura");
    combustible = document.getElementById("fuel");

    //definición de eventos
    document.getElementById("bmenu").onclick = function () {
        if (gameover == false) {
            if (pause == false) {
                pause = true;
                document.getElementsByClassName("menu2")[0].style.display = "block";
                stop();
            } else {
                pause = false;
                document.getElementsByClassName("menu2")[0].style.display = "none";
                start();
            }
        }
    }

    document.getElementById("SelNave").onclick = function () {
        if (gameover == false) {
            switch (nave) {
                case 1:
                    nave = 2;
                    break;
                case 2:
                    nave = 1;
                    break;
            }
        }
        restart();

    }

    document.getElementById("Dif").onclick = function () {
        if (gameover == false) {
            switch (dif) {
                case "Facil":
                    fuel = 50;
                    document.getElementById("Dif").innerHTML = "Media";
                    dificultad = 2
                    umbral = 3;
                    dif = "Media";
                    break;
                case "Media":
                    fuel = 35;
                    document.getElementById("Dif").innerHTML = "Difícil";
                    dificultad = 3
                    umbral = 1;
                    dif = "Dificil";
                    break;
                case "Dificil":
                    fuel = 100;
                    document.getElementById("Dif").innerHTML = "Fácil";
                    dificultad = 1
                    umbral = 5;
                    dif = "Facil";
                    break;
            }
        }
        restart();
    }

    ///////////////////////////////////

    document.getElementById("Dif3").onclick = function () {
        if (gameover == false) {
            switch (dificultad) {
                case 1:
                    fuel = 50;
                    document.getElementById("Dif3").innerHTML = "Media";
                    dificultad = 2
                    umbral = 3;
                    dif = "Media";
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
                case 2:
                    fuel = 35;
                    document.getElementById("Dif3").innerHTML = "Difícil";
                    dificultad = 3
                    umbral = 1;
                    dif = "Difícil";
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
                case 3:
                    dks = true;
                    fuel = 10;
                    document.getElementById("Dif3").innerHTML = "Dark Souls";
                    dificultad = 4;
                    dif = "Dark Souls";
                    v = 30;
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
                case 4:
                    dks = false;
                    fuel = 100;
                    document.getElementById("Dif3").innerHTML = "Fácil";
                    dificultad = 1
                    umbral = 5;
                    dif = "Fácil";
                    restart();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    stop();
                    break;
            }
        }

    }




    ////////////////////////////////// 
    document.getElementById("Dif").onmouseenter = function () {
        if (dif == "Media") {
            document.getElementById("Dif").innerHTML = dif;
        } else if(dif=="Facil"){
            document.getElementById("Dif").innerHTML = "Fácil";
        }else if(dif=="Dificil"){
            document.getElementById("Dif").innerHTML = "Difícil";
        }
    }
    document.getElementById("Dif").onmouseout = function () {
        document.getElementById("Dif").innerHTML = "Dificultad";
    }
    document.getElementById("Ab").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        }
    }
    document.getElementById("Ins").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        }
    }

    document.getElementById("Ab2").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        }
    }
    document.getElementById("Ins2").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        }
    }

    document.getElementsByClassName("bplay")[0].onclick = function () {
        if (gameover == false) {
            if (pause == false) {
                document.getElementById("bpause").src = "img/bPlay.png";
                pause = true;
                stop();
            } else {
                document.getElementById("bpause").src = "img/bPause.png";
                pause = false;
                start();
            }
        }

    }
    document.getElementById("brest1").onclick = function () {
        if (gameover == false) {
            restart();
        }
    }

    document.getElementById("reint").onclick = function () {
        restart();
        document.getElementsByClassName("gameov")[0].style.display = "none";
    }

    document.getElementById("showm").onclick = function () {
        document.getElementsByClassName("c")[0].style.display = "block";
        stop();
    }
    //ocultar menú móvil
    document.getElementById("hidem").onclick = function () {
        document.getElementsByClassName("c")[0].style.display = "none";
        start();
    }

    //encender/apagar el motor al hacer click en el botón
    document.getElementsByClassName("bot")[0].onmousedown = function () {
        if (pause == false && gameover == false) {
            if (a == g && c >= 0) {
                motorOn();
                document.getElementById("nau").src = "img/" + nave + "On.png";
            }
        }
        document.onmouseup = function () {
            if (gameover == false) {
                document.getElementById("nau").src = "img/" + nave + "Off.png";
            }
            motorOff();
        }
    }

    ////////////////////////

    document.getElementsByClassName("bot2")[0].onclick = function () {
        if (bot2 == false) {
            if (pause == false && gameover == false) {
                bot2 = true;
                document.getElementById("bot2p").innerHTML = "ON";
                if (a == g && c >= 0) {
                    motorOn();
                    document.getElementById("nau").src = "img/" + nave + "On.png";
                }
            }
        } else {
            if (gameover == false) {
                bot2 = false;
                document.getElementById("bot2p").innerHTML = "OFF";
                document.getElementById("nau").src = "img/" + nave + "Off.png";
            }
            motorOff();
        }
    }


    //Empezar a mover la nave justo después de cargar la página
    start();


    document.getElementById("load").onclick = function () {
        var id1 = $("#out option:selected").attr("id") - 1;
        dif = xml[id1][0];
        setDificultad();
        nave = (int)(xml[id1][1]);
        alert("Configuración cargada")
        restart();
    }

    document.getElementById("in").onclick = function () {
        var nombre11 = document.getElementById("confname").value;
        if (nombre11 != "") {
            writeXml(nombre11);
            setTimeout(loadXml(), 1000);


        } else {
            alert("Por favor introduce un nombre.");
        }
    }
}


//Definición de funciones
function start() {
    pause = false;
    //cada intervalo de tiempo mueve la nave
    timer = setInterval(function () {
        moverNave();
    }, dt * 1000);
}

function restart() {
    gameover = false;
    bartop = 5;
    barwidth = 39;
    barleft = 31;
    gasfil = fuel;
    y = 10;
    bot2 = false;
    if (dks == true) {
        v = 30;
    } else {
        v = 0;
    }
    a = g;
    c = fuel;

    document.getElementById("fondo-ind-bot-fil2").style.height = (100 - fuel) + "%";
    document.getElementsByClassName("menu2")[0].style.display = "none";


    document.getElementById("bot2p").innerHTML = "OFF";
    document.getElementById("bpause").src = "img/bPause.png";
    document.getElementById("nau").src = "img/" + nave + "Off.png"
    document.getElementById("fondo-ind-bot-fil").style.height = gasfil + "%";
    stop();
    start();
}

function stop() {
    pause = true;
    clearInterval(timer);
}

function moverNave() {
    //cambiar velocidad y posicion
    v += a * dt;
    y += v * dt;
    if (y > 9) {
        bartop += (v * dt) * 1.5;
        if (barleft > 13 && y > 9) {
            barwidth += (v * dt) * 1.9
        }
        if (barleft < 13 && barleft > 0.8) {
            barwidth += (v * dt) * 0.8;
        }
    }

    if (barleft > 13 && y > 9) {
        barleft -= (v * dt) * 1;
    }
    if (barleft < 13 && barleft > 0.8) {
        barleft -= (v * dt) * 0.4;
    }

    //actualizar marcadores
    velocidad.innerHTML = v.toFixed(1);
    altura.innerHTML = y.toFixed(0);
    document.getElementById("fondo-ind-top-bar").style.top = (bartop) + "%";
    document.getElementById("fondo-ind-top-bar").style.width = (barwidth) + "%";
    document.getElementById("fondo-ind-top-bar").style.left = (barleft) + "%";
    document.getElementById("fondo-ind-top-bar2").style.top = (bartop) + "%";

    //mover hasta que top sea un 70% de la pantalla
    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        if (v <= umbral) {
            gameover = true;
            stop();
            document.getElementsByClassName("gameov")[0].style.display = "block";
            document.getElementById("lose").style.display = "none";
            document.getElementById("win").style.display = "block";
        } else {
            document.getElementById("nau").src = "img/" + nave + "Destroyed.png"
            gameover = true;
            stop();
            document.getElementsByClassName("gameov")[0].style.display = "block";
            document.getElementById("lose").style.display = "block";
            document.getElementById("win").style.display = "none";
        }
    }
}

function motorOn() {
    //el motor da aceleración a la nave siempre que haya fuel
    if (c > 0) {
        a = -g;
    }
    //mientras el motor esté activado gasta combustible
    if (timerFuel == null)
        timerFuel = setInterval(function () {
            actualizarFuel();
        }, 10);
}

function motorOff() {
    a = g;
    clearInterval(timerFuel);
    timerFuel = null;
}

function actualizarFuel() {
    //Restamos combustible hasta que se agota
    if (pause == false) {
        c -= 0.1;
        gasfil = c;
        if (c <= 0) {
            c = 0;
            document.getElementById("nau").src = "img/" + nave + "Off.png";
            motorOff();
        }
        document.getElementById("fondo-ind-bot-fil").style.height = gasfil + "%";
        if (bot2 == true) {
            document.getElementById("fondo-ind-bot-fil2").style.height = (100 - gasfil) + "%";
        }
    }
}

function setDificultad() {
    if (gameover == false) {
        switch (dif) {
            case "Media":
                fuel = 50;
                dificultad = 2
                umbral = 3;
                break;
            case "Dificil":
                fuel = 35;
                dificultad = 3
                umbral = 1;
                break;
            case "Facil":
                fuel = 100;
                dificultad = 1
                umbral = 5;
                break;
        }
        restart();
    }
}


function loadXml() {
    var emess = "Error desconocido";
    var url = "XmlServlet";

    $.ajax({
        type: "get",
        url: url, //canviar al Servlet després de comprovar que funciona.
        dataType: "xml",
        success: function (dataXml) {
            $("#out").empty();
            xml = [];
            var length = $(dataXml).find('config').length;

            xml.length = length;

            var k = 0;

            for (k = 0; k < length; k++) {
                xml[k] = [];
            }


            $(dataXml).find('config').each(function (i)
            {
                //  alert(i); //i = index
                var nombre = $(this).find('name').text();
                var dif1 = $(this).find('dif').text();
                var nav1 = $(this).find('nav').text();
                var id = $(this).attr('id');
                xml[i][0] = dif1;
                xml[i][1] = nav1;
                $("#out").append("<option id='" + id + "'>" + nombre + "</option>");

            });
        },
        error: function (e) {
            if (e["responseJSON"] === undefined)
                alert("Error");
            else
                alert(e["responseJSON"]["error"]);
        }
    });

}


function writeXml(name) {

    var url = "XmlServlet"; //doPost->SaveFile
    $.ajax({
        method: "POST",
        url: url,
        data: {name: name, dif: dif, nav: nave},
        success: function (rsp) {
            alert("Configuración guardada");
        },
        error: function (e) {
            if (e["responseJSON"] === undefined)
                alert(emess);
            else
                alert(e["responseJSON"]["error"]);
        }
    });
}

