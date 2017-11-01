var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');
var ovents = require('clientplatzi');
var config = require('./config')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var passport = require('passport')
var client = ovents.createClient(config.client);
var auth = require('./auth')
var port = process.env.PORT || 5050

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();
app.set(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug');

app.use(express.static('public'));
passport.use(auth.LocalStrategy);
passport.use(auth.facebookStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);



app.get('/', function (req, res) {
  res.render('index', { title: 'O-events ' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'O-events | Signup' });
})
app.post('/signup', function (req, res) {
  var user = req.body;
  client.saveUser(user, function (err, usr) {
    if (err) return res.status(500).send(err.message);
    res.redirect('/signin')
  })
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'O-events | Signin' });
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}))
app.get('/auth/facebook/callback', passport.authenticate('facebook',{
  successRedirect: '/',
  failureRedirect: '/signin'
}))
function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ error: 'not auntenticado'})
}


app.get('/Triste9', function (req, res) {
  res.render('index', { title: 'O-events | Triste9' });
})

app.get('/api/pictures', function (req, res, next) {
  client.listPictures(function(err, pictures){
    console.log(pictures) 
    res.send(pictures); 
  })
});

app.post('/api/pictures',ensureAuth, function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username', function(req, res){
  var username = req.params.username
    client.getUser(username, function (err, user){
      if(err) return res.status(404).send({ error: 'user not found'})
      res.send(user);
    })
});

app.get('/:username', function(req,res){
    res.render('index',{title: `O-events|${req.params.username} `});
    
});
app.get('/:username/:id', function(req,res){
    res.render('index',{title: `O-events|${req.params.username} `});
    
});

app.listen(port, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('O-events  escuchando en el puerto: ' + port);
})