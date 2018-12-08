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
var nvlDif = 1;
var umbral = 5;
var fuel = 100;
var stringDif = "Media";
var dks = false;

var nave = 2;

//var para almacenar contenido del json
var docJson;

//al cargar por completo la página...
$(document).ready(function () {
    velocidad = document.getElementById("velocidad");
    altura = document.getElementById("altura");
    combustible = document.getElementById("fuel");
    dif = 1; //leer desde el archivo json
    cargarConf();
    //definición de eventos

    //escucador btn carga conf
    $("#loadConf").click(function () {
        cargarConf();
    });
    
    $("#saveConf").click(function () {
        guardarConf();
    });
    
    $("#changeImgNave").click(function () {
        if(nave == 1){
            cargarNave(3);
            return;
        }
        cargarNave(1);  
    });


    document.getElementById("bmenu").onclick = function () {
        if (gameover === false) {
            if (pause === false) {
                pause = true;
                document.getElementsByClassName("menu2")[0].style.display = "block";
                stop();
            } else {
                pause = false;
                document.getElementsByClassName("menu2")[0].style.display = "none";
                start();
            }
        }
    };

//pc
    document.getElementById("Dif").onclick = function () {
        if (gameover === false) {
            switch (nvlDif) {
                case 4:
                    dks = false;
                    fuel = 100;
                    document.getElementById("Dif").innerHTML = "Fácil";
                    nvlDif = 1;
                    umbral = 5;
                    stringDif = "Fácil";
                    restart();
                    break;

                case 1:
                    fuel = 50;
                    document.getElementById("Dif").innerHTML = "Media";
                    nvlDif = 2;
                    umbral = 3;
                    stringDif = "Media";
                    restart();
                    break;

                case 2:
                    fuel = 35;
                    document.getElementById("Dif").innerHTML = "Difícil";
                    nvlDif = 3;
                    umbral = 1;
                    stringDif = "Difícil";
                    restart();
                    break

                case 3:
                    dks = true;
                    fuel = 10;
                    document.getElementById("Dif").innerHTML = "Dark Souls";
                    nvlDif = 4;
                    stringDif = "Dark Souls";
                    v = 30;
                    restart();
                    break;
            }
        }
    };

    ///////////////////////////////////

    document.getElementById("Dif3").onclick = function () {
        if (gameover === false) {
            switch (nvlDif) {
                case 1:
                    dks = false;
                    fuel = 100;
                    document.getElementById("Dif3").innerHTML = "Fácil";
                    nvlDif = 1;
                    umbral = 5;
                    stringDif = "Fácil";
                    restart();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    stop();
                    break;

                case 2:
                    fuel = 50;
                    document.getElementById("Dif3").innerHTML = "Media";
                    nvlDif = 2;
                    umbral = 3;
                    stringDif = "Media";
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;

                case 3:
                    fuel = 35;
                    document.getElementById("Dif3").innerHTML = "Difícil";
                    nvlDif = 3;
                    umbral = 1;
                    stringDif = "Difícil";
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;

                case 4:
                    dks = true;
                    fuel = 10;
                    document.getElementById("Dif3").innerHTML = "Dark Souls";
                    nvlDif = 4;
                    stringDif = "Dark Souls";
                    v = 30;
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
            }
        }
    };

    ////////////////////////////////// 
    $("#guardar").click(function () {
        var emess = "Error desconocido";
        console.log("boton guardar llamado");
        var dificultad = 2;
        var nave = 0;
        var url = "GetFileExc"; 
        alert("a ver si se mete o no");
        $.ajax({
            method: "POST",
            url: url,
            data: {dificultad: dificultad, nave: nave},
            success: function (rsp) {
                alert(rsp["mess"]);
                alert("pues esto si que ha ido bien la verdad");
            },
            error: function (e) {
                if (e["responseJSON"] === undefined)
                    alert(emess);
                else
                    alert(e["responseJSON"]["error"]);
            }
        });
    });

    document.getElementById("Dif").onmouseenter = function () {
        document.getElementById("Dif").innerHTML = stringDif;
    };
    document.getElementById("Dif").onmouseout = function () {
        document.getElementById("Dif").innerHTML = "Dificultad";
    };
    document.getElementById("Ab").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        };
    };
    document.getElementById("Ins").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        };
    };
    document.getElementById("Ab2").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        };
    };
    document.getElementById("Ins2").onclick = function () {
        window.onbeforeunload = function () {
            return "¿Quieres salir?";
        };
    };

    document.getElementsByClassName("bplay")[0].onclick = function () {
        if (gameover === false) {
            if (pause === false) {
                document.getElementById("bpause").src = "img/bPlay.png";
                pause = true;
                stop();
            } else {
                document.getElementById("bpause").src = "img/bPause.png";
                pause = false;
                start();
            }
        }
    };

    document.getElementById("brest1").onclick = function () {
        if (gameover === false) {
            restart();
        }
    };

    document.getElementById("reint").onclick = function () {
        restart();
        document.getElementsByClassName("gameov")[0].style.display = "none";
    };

    document.getElementById("showm").onclick = function () {
        document.getElementsByClassName("c")[0].style.display = "block";
        stop();
    };
    //ocultar menú móvil
    document.getElementById("hidem").onclick = function () {
        document.getElementsByClassName("c")[0].style.display = "none";
        start();
    };
    //encender/apagar el motor al hacer click en el botón
    document.getElementsByClassName("bot")[0].onmousedown = function () {
        if (pause === false && gameover === false) {
            if (a === g && c >= 0) {
                motorOn();
                document.getElementById("nau").src = "img/landerOn.png";
                nave = 2;
            }
        }
        document.onmouseup = function () {
            if (gameover === false) {
                document.getElementById("nau").src = "img/landerOff.png";
                nave = 1;
            }
            motorOff();
        };
    };

    ////////////////////////

    document.getElementsByClassName("bot2")[0].onclick = function () {
        if (bot2 === false) {
            if (pause === false && gameover === false) {
                bot2 = true;
                document.getElementById("bot2p").innerHTML = "ON";
                if (a === g && c >= 0) {
                    motorOn();
                    document.getElementById("nau").src = "img/landerOn.png";
                    nave = 2;
                }
            }
        } else {
            if (gameover === false) {
                bot2 = false;
                document.getElementById("bot2p").innerHTML = "OFF";
                document.getElementById("nau").src = "img/landerOff.png";
                nave = 1;
            }
            motorOff();
        }
    };
    //Empezar a mover la nave justo después de cargar la página
    start();
});

//Definición de funciones

function pedirConf() {
    var configElegida = parseInt(prompt("Elige id de la configuracion: ", "escribe aqui"));
    var confExist = false;

    for (i = 0; i < docJson.length; i++) {
        var id = docJson[i].id;
        var nave = docJson[i].nave;
        var dificultad = docJson[i].dificultad;
        if (id === configElegida) {
            nvlDif = dificultad;
            confExist = true;
            changeConfDif();
            cargarNave(nave);
        }
    }

    if (!confExist) {
        alert("Esta configuracion no existe");
    }
}

function changeConfDif() {
       switch (nvlDif) {
        case 1:
            dks = false;
            fuel = 100;
            document.getElementById("Dif").innerHTML = "Fácil";
            nvlDif = 1;
            umbral = 5;
            stringDif = "Fácil";
            restart();
            break;

        case 2:
            fuel = 50;
            document.getElementById("Dif").innerHTML = "Media";
            nvlDif = 2;
            umbral = 3;
            stringDif = "Media";
            restart();
            break;

        case 3:
            fuel = 35;
            document.getElementById("Dif").innerHTML = "Difícil";
            nvlDif = 3;
            umbral = 1;
            stringDif = "Difícil";
            restart();
            break

        case 4:
            dks = true;
            fuel = 10;
            document.getElementById("Dif").innerHTML = "Dark Souls";
            nvlDif = 4;
            stringDif = "Dark Souls";
            v = 30;
            restart();
            break;
    }
}

function cargarConf() {
    $.ajax({
        url: "GSonServlet",
        dataType: "json",
        success: function (json) {
            //pasamos la respuesta a la variable global
            docJson = json;
            //funcion solicitar canfiguracion deseadae
            pedirConf();
        },
        error: function (e) {
            if (e["responseJSON"] === undefined) {
                alert("Error desconocido");
            } else {
                alert(e["responseJSON"]["error"]);
            }
        }
    });
}

function guardarConf() {
    
    var id = (docJson[docJson.length - 1].id) + 1;
    var idNave = nave;
    var dificultad = nvlDif;
    
    var url = "GSonServlet";
    $.ajax({
        method: "POST",
        url: url,
        data: {id: id, nave: idNave, dificultad : dificultad},
        success: function (rsp) {
            alert(rsp["mess"]);
        },
        error: function (e) {
            if (e["responseJSON"] === undefined)
                alert("Error desconocido");
            else
                alert(e["responseJSON"]["error"]);
        }
    });
}

function cargarNave(idNave) {
    nave = idNave;
    
    switch (idNave) {
        case 1:
            document.getElementById("nau").src = "img/landerOff.png";
            nave = 1;
            break;
        case 2:
            document.getElementById("nau").src = "img/landerOn.png";
            nave = 2;
            break;
        case 3:
            document.getElementById("nau").src = "img/landerOff2.png";
            nave = 3;
            break;
        case 4:
            document.getElementById("nau").src = "img/landerOn2.png";
            nave = 4;
            break;
        default:
            document.getElementById("nau").src = "img/landerOff.png";
            nave = 1;
            break;
    }

}

function getDificultad(url) {
    console.log("getDificultad llamado");
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (jsnConf) {
            nvlDif = jsnConf.dificultad;

            switch (nvlDif) {
                case 1:
                    dks = false;
                    fuel = 100;
                    document.getElementById("Dif").innerHTML = "Fácil";
                    nvlDif = 1;
                    umbral = 5;
                    stringDif = "Fácil";
                    restart();
                    break;
                case 2:
                    dks = false;
                    fuel = 50;
                    document.getElementById("Dif").innerHTML = "Media";
                    nvlDif = 2;
                    umbral = 3;
                    stringDif = "Media";
                    restart();
                    break;
                case 3:
                    dks = false;
                    fuel = 35;
                    document.getElementById("Dif").innerHTML = "Difícil";
                    nvlDif = 3;
                    umbral = 1;
                    stringDif = "Difícil";
                    restart();
                    break;
                case 4:
                    dks = true;
                    fuel = 10;
                    document.getElementById("Dif").innerHTML = "Dark Souls";
                    nvlDif = 4;
                    stringDif = "Dark Souls";
                    v = 30;
                    restart();
                    break;
            }

            alert("Dificultad cargada: " + nvlDif);
        },
        error: function (e) {
            if (e["responseJSON"] === undefined)
                alert("Dificultad no cambiada");
            else
                alert(e["responseJSON"]["error"]);
        }
    });
}

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
    if (dks) {
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
    document.getElementById("nau").src = "img/landerOff.png";
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
            barwidth += (v * dt) * 1.9;
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
            document.getElementById("nau").src = "img/landerDestroyed.png";
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
    if (timerFuel === null)
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
    if (pause === false) {
        c -= 0.1;
        gasfil = c;
        if (c <= 0) {
            c = 0;
            document.getElementById("nau").src = "img/landerOff.png";
            motorOff();
        }
        document.getElementById("fondo-ind-bot-fil").style.height = gasfil + "%";
        if (bot2 === true) {
            document.getElementById("fondo-ind-bot-fil2").style.height = (100 - gasfil) + "%";
        }
    }
}
