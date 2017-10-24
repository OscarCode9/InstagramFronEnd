var yo = require('yo-yo');
var moment = require('moment');
var translate = require('../translate');
module.exports = function pictureCard(pic) {
  var el;
  function render(picture) {
    return yo`<div class="card ${picture.liked ? 'liked':''}  ${picture.megusta ? 'megusta':''}" >
    <div class="card-image">
      <img class="activator" src="${picture.url}">
    </div>
    <div class="card-content">
      <a href="/${picture.user.username}" class="card-title">
        <img src="${picture.user.avatar}" class="avatar"/>
        <span class="username">${picture.user.username}</span>
      </a>
      <small class="right time">${translate.date.format(picture.createdAt)}</small>
      <p>
        <a class="left" href="#" onclick=${like.bind(null,true)}><i class="fa fa-heart-o" aria-hidden="true"> </i></a>
        <a class="left" href="#" onclick=${like.bind(null,false)}><i class="fa fa-heart" aria-hidden="true"> </i></a>
        <a class="left" href="#" onclick=${megust.bind(null,false)}><i class="fa fa-thumbs-o-up" aria-hidden="true"> </i></a>
        <a class="left" href="#" onclick=${megust.bind(null,true)}><i class="fa fa-thumbs-o-down" aria-hidden="true"> </i></a>
        <span class="left likes">${translate.message('likes', { likes: picture.likes })}</span>
      </p>
    </div>
  </div>`

  }


function compro(comp){
  if(comp === true){
      comp=false;
      pic.likes--;
    }
    return comp;
}
 function like(lik){
    pic.liked = lik;
    pic.megusta=compro(pic.megusta);
    pic.likes+=lik?1:-1;
    var newEl =render(pic);
    yo.update(el,newEl);
    return false;
  }

 function megust(lik){
    pic.megusta =lik;
    pic.liked =compro(pic.liked);
    pic.likes+=lik?1:-1;
    var newEl =render(pic);
    yo.update(el,newEl);
    return false;
 }

  if(pic.liked == true){
    pic.megusta =false;
  }
  el = render(pic);
  return el;
}
