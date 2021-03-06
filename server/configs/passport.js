const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Account } = require('../models/Account');

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_PRIVATE_KEY;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    Account.findById({ _id: jwt_payload.sub }, function (err, user) {
      if (err) return done(err, false);
      if (user) return done(null, user);
      else return done(null, false);
    });
  }),
);
