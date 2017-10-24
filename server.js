var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');
var ovents = require('clientplatzi');
var config = require('./config')
var client = ovents.createClient(config.client);

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

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'O-events ' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'O-events | Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'O-events | Signin' });
})


app.get('/Triste9', function (req, res) {
  res.render('index', { title: 'O-events | Triste9' });
})

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'Triste9',
        avatar: 'user1.jpg'
      },
      url: 'https://i.pinimg.com/originals/cd/44/70/cd4470fe5a92ebdf2748331168a7b421.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Triste9',
        avatar: 'https://i.pinimg.com/originals/cd/44/70/cd4470fe5a92ebdf2748331168a7b421.jpg'
      },
      url: 'user1.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    },{
      user: {
        username: 'Triste9',
        avatar: 'https://i.pinimg.com/originals/cd/44/70/cd4470fe5a92ebdf2748331168a7b421.jpg'
      },
      url: 'user1.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    }
  ];

  setTimeout(function () {
    res.send(pictures);  
  }, 2000)
});

app.post('/api/pictures', function (req, res) {
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

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('O-events  escuchando en el puerto 3000');
})