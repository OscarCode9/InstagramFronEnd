var page = require('page');
var empty = require('empty-element');
var temple = require('./temple');
var title = require('title');

page('/signin', function (ctx, next) {
	title('O-events|Signin');
	var main = document.getElementById('main-container');
    empty(main).appendChild(temple);
})