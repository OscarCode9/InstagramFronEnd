var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var Webcam = require('webcamjs');
var picture = require('../picture-card');
var yo = require('yo-yo');

 

page('/', header,loading, loadPicturesFetch, function (ctx, next) {
  title('O-events');
  var main = document.getElementById('main-container');
    
    
  empty(main).appendChild(template(ctx.pictures));
    const picturePreview =$('#picture-preview');
    const camaraInpu = $('#camara-input');
    const shootButton =$('#shoot');
    const uploadButton =$('#uploadButton');
    const cancelPictures =$('#cancelPictures');
    
function resetCam(a){
        
        if(a==='on'){
        picturePreview.removeClass('hide');
        cancelPictures.removeClass('hide');
        uploadButton.removeClass('hide');
        shootButton.addClass('hide');
        camaraInpu.addClass('hide');
        }else if(a==='of'){
        picturePreview.addClass('hide');
        cancelPictures.addClass('hide');
        uploadButton.addClass('hide');
        shootButton.removeClass('hide');
        camaraInpu.removeClass('hide');
            
        }
        
    }
 
    $('.modal-trigger').leanModal({
        ready: function() { 
        Webcam.set({
        width: 420,
        height: 340
    });
        Webcam.attach( '#camara-input');
        shootButton.click((ev)=>{
            Webcam.snap( (data_uri)=> {
        picturePreview.html(`<img src="${data_uri}"/>`);
                resetCam('on');
            uploadButton.off('click');    
            uploadButton.click(()=>{
                const pic = {
                    src: data_uri,
                    likes:0,
                    liked: false,
                    createdAt: new Date(),
                    user: {
                        username: 'Triste9',
                        avatar: 'https://scontent.fgdl3-1.fna.fbcdn.net/v/t1.0-9/16195738_1474115189295368_8952897701717020980_n.jpg?oh=0c85aac218adf8002111d1ac9719c9d3&oe=5907C301'
                        
                    }
                }
               var ol = yo`<div class="col s12 m6 l4">${picture(pic)}</div>`;
                $('#picture-card').prepend(ol);
                resetCam('of');
                $('#modalCamara').closeModal();
                Webcam.reset();
            })
               
            })
        })
        cancelPictures.click((ev)=>{
            resetCam('of');
        });
        
      },
      complete: function() {  Webcam.reset(); resetCam('of');}
    })
})

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}
function loading(ctx, next){
    var el=document.createElement('div');
    el.classList.add('loader');
    var main = document.getElementById('main-container');
    main.appendChild(el);
    next();
    
}
function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    .then(function (res) {
      return res.json();
    })
    .then(function (pictures) {
      console.log(pictures)
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    console.log(ctx.pictures)
    next();
  } catch (err) {
    return console.log(err);
  }
}
