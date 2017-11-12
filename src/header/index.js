var yo = require('yo-yo');
var translate = require('../translate');
var empty = require('empty-element');

var el =function (ctx){
  var auth;
  
if(ctx.auth) {
   auth= yo`
   <div class="col s2 m6 push-s10 push-m10">
     <a href="#!" class="btn btn-large btn-flat dropdown-button" data-activates="dropdown1">
        ${ctx.auth.name}
       <i class="fa fa-user" aria-hidden="true"></i>
     </a>
     <ul id="dropdown1" class="dropdown-content">
       <li><a href="/logout" rel="external">Salir</a></li>
     </ul>
   </div>`
}else{
  auth = yo`<div class="col s2 m6 push-s10 push-m10">
  <a href="/signin" class="btn btn-large btn-flat">
  ${translate.message('signin')}
  </a>
</div>`
}
  return yo`
<nav class="header">
  <div class="nav-wrapper">
    <div class="container">
      <div class="row">
        <div class="col s12 m6 offset-m1">
          <a href="/" class="brand-logo platzigram">O-events</a>
        </div>
        ${auth}
      </div>
    </div>
  </div>
</nav>`;}
module.exports = function header(ctx, next) {
  var cont = document.getElementById('header-container')
  empty(cont).appendChild(el(ctx));
  next();
  // body...
}
