var LocalStrategy = require('passport-local').Strategy;
var ovents = require('clientplatzi');
var config = require('../config');
var FacebookStrategy = require('passport-facebook').Strategy;
var client = ovents.createClient(config.client);
var jwt = require('jsonwebtoken')


exports.LocalStrategy = new LocalStrategy((username, password, done) => {
  client.auth(username, password, (err, token) => {
    if (err) {
      return done(null, false, { message: 'Username and password not found' })
    }
    console.log(token)
    client.getUser(username, (err, user) => {
      if (err) {
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }
      user.token = token;
      console.log(user)
      return done(null, user);
    })
  })

})
exports.facebookStrategy = new FacebookStrategy({
  clientID: config.auth.facebook.clientID,
  clientSecret: config.auth.facebook.clientSecret,
  callbackURL: config.auth.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'email']

}, function (accessToken, refreshToken, profile, done) {
  var userProfile = {
    username: profile._json.id,
    name: profile._json.name,
    email: profile._json.email,
    facebook: true
  }
  findOrCreate(userProfile, (err, user) =>{
    if (err) return done(err)
    jwt.sign({userId: user.username}, config.secret, {}, (e, toke) =>{
      if (e) return done(e)
        user.token = toke
      return done(null, user);
    })
  })
  function findOrCreate(user, callbackU){
    client.getUser(user.username, (err, usr) =>{
      if(err){
        return client.saveUser(user, callbackU)
      }else{
        callbackU(null, usr)
      }
    })
  }

});

exports.serializeUser = function (user, done) {
  done(null, {
    username: user.username,
    token: user.token
  })

}

exports.deserializeUser = function (user, done) {
  client.getUser(user.username, (err, usr) => {
    usr.token = user.token;
    done(err, usr)
  })

}
