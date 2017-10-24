
$(document).ready(function(){
    var cont = Math.round(Math.random()*2);
    console.log(cont)
    var aquino = ""+window.location+"";
    var sitio = "http://localhost:3000/signup";
    var sitio2 ="http://localhost:3000/signin";
    var imag = ["http://www.writingfordesigners.com/wp-content/uploads/2015/09/geometric_background_13.jpg",
    "https://d13yacurqjgara.cloudfront.net/users/343382/screenshots/1735730/20-low-poly-polygonal-geometrical-triangular-textures-backgrounds.gif",
    "https://s-media-cache-ak0.pinimg.com/originals/5b/12/cd/5b12cd6c7faaa4e29006d8357c9fde5d.gif"];
    var image = $('#fondos');
    console.log(!(sitio==aquino));
    if((sitio==aquino)||(sitio2==aquino)){
        setInterval(function(){
        image.addClass('fondito');
        image.css({"background-image":"url("+imag[cont]+")","background-repeat": "no-repeat",
    "background-size": "100% 100%"});
        cont= cont+1;
        if(cont == imag.length){
                cont=0;
    }

    },5000);

    }
    




});
