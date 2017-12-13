const passport = require('passport');
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const PassportJWT = require('passport-jwt');

passport.use(User.createStrategy());

passport.use(new PassportJWT.Strategy(
   {
     jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: 'topsecret',
     algorithms: ['HS256']
   },
   (payload, done)=> {
     User.findById(payload.sub)
     .then((user)=>{
       if(user){
                   done(null, user);
              } else {
                   done(null, false);
              }
     })
     .catch((error)=>{
       done(null, false);
     })
   }
 ));

function register(req, res, next){
  const user = new User({
    // attributes coming in from the wire
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  User.register(user, req.body.password, (error,user)=>{
    if (error){
      next(error);
      return;
    }
    // store user in the req
    req.user = user;
    next();
  })
}

//JWTの部分
function signJWTForUser(req,res){
  const user = req.user;
  const token = JWT.sign({
    email: user.email
  },
  'topsecret',
  {
    algorithm: 'HS256',
    expiresIn: '7 days',
    subject: user._id.toString()
  });
  res.json({ token })
}

module.exports = {
  initialize: [passport.initialize(),passport.session()],
  register,
  signJWTForUser,
  signIn: passport.authenticate('local',{session: false}),
  requireJWT: passport.authenticate('jwt',{session: false}),
}
