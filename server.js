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
const AWS = require('aws-sdk');


var knox = require('knox');
var clientAws = knox.createClient({
  key: config.AWSconfig.key,
  secret: config.AWSconfig.secret,
  bucket: config.AWSconfig.bucket
});
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
app.get('/logout', function (req, res){
  req.logout();
  res.redirect('/')

})
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

app.get('/whoami', function (req,res){
  if (req.isAuthenticated()) {
    return res.json(req.user)
  }
  res.json({auth: false})
})

app.get('/Triste9', function (req, res) {
  res.render('index', { title: 'O-events | Triste9' });
})

app.get('/api/pictures', function (req, res, next) {
  client.listPictures(function(err, pictures){
    
    console.log(pictures) 
    res.send(pictures); 
  })
});
function getUrl(path, ext) {
  const promise = new Promise(function (resolve, reject) {
    clientAws.putFile(path, `${Date.now()}.${ext}`, { 'x-amz-acl': 'public-read' }, function (err, response) {
      if (err) reject(err);
      resolve(response.req.url);
    })
  })
  return promise
}
app.post('/api/pictures',ensureAuth,function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    var ext = req.file.filename.split('.').pop()
    var name = `${Date.now()}.${ext}`;
    getUrl(req.file.path,ext).then(function(url){
      var user = req.user;
      var token = req.user.token;
      var username = req.user.username;
      var src = url;
      var datosUserPicture = {
        liked: false,
        likes: 0,
        src: src,
        userId: username,
        user: {
          username: username,
          avatar: user.avatar,
          name: user.name
        }
      }
      client.savePicture(datosUserPicture,token, function (err, img) {
        if (err) {
          return res.status(500).send(err.message)
        }else{
          res.send(url)
        }
      })
    })
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