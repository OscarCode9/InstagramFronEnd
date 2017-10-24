var page = require('page');
var empty = require('empty-element');
var temple = require('./temple');
var title = require('title');
var header = require('../header');
var yo = require('yo-yo');

page('/Triste9', header, asyncLoad, function (ctx, next) {
  title('O-events | Triste9');
  var main = document.getElementById('main-container');
  empty(main).appendChild(temple(ctx.pictures));
})

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}