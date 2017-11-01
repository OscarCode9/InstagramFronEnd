'use strict'
const config = {
  client: {
    endpoints: {
      pictures: 'http://localhost:5000',
      users: 'http://localhost:5001',
      auth: 'http://localhost:5002'
    }
  },
  auth: {
    facebook: {
      clientID:process.env.FACEBOOK_CLIENT_ID,
      clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:'http://ovents.test:5050/auth/facebook/callback'
      //callbackURL:'http://ovents.com/auth/facebook/callback'
    }

  },
  secret: process.env.PLATZIGRAM_SECRET || 'pla4tzi'

}
module.exports = config