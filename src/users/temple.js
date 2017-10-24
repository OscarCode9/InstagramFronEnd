var yo = require('yo-yo');
var translate = require('../translate');
var pictures =require('../picture-card');
module.exports = function (pictu) {
  var el = yo`
<div class="container">
  <div class="row backg" >
      <div class="col s12 m6 l4">
        <img class="perfil" src="https://scontent.fmex4-1.fna.fbcdn.net/v/t1.0-9/16195738_1474115189295368_8952897701717020980_n.jpg?oh=0c85aac218adf8002111d1ac9719c9d3&oe=5907C301">
      </div>
      <div class="col s12 m6 l8">
        <div class="row">
          <div class="col s6 m6 l6"><p class="flow-text-2"><big>Triste9</big></p></div>
          <div class="col s6 m6 l6"><p class="flow-text-2">Siguiendo</p></div>
        </div>
        <div class="row">
           
          <div class="col s4 m3 l4"><p class="flow-text-1"><big>10</big> Publicaciones</p></div>
          <div class="col s4 m6 l4"><p class="flow-text-1"><big>7</big> Seguidores</p></div>
          <div class="col s4 m3 l4"><p class="flow-text-1"><big>9</big> Seguidos</p></div>
        </div>
        <div class="row">
          <div class="col s12 m12 l12"><p class="flow-text-1" >No soy el tipo de persona que deseas conocer</p></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m6 l4">${pictu.map(function(pic){
        return pictures(pic);
      })}
      </div>
   </div>`;
   return el;
  // body...
}


   
