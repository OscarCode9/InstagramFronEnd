var page = require('page');
var empty = require('empty-element');
var main = document.getElementById('main-container');
var temple = require('./template');
var title = require('title')

page('/signup', function (ctx, next) {
	title('O-events|Signup');
    empty(main).appendChild(temple);
})