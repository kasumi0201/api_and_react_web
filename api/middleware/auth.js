const passport = require('passport');
const User = require('../models/user');
const JWT = require('jsonwebtoken');

// var LocalStrategy = require('passport-local').Strategy;

 passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// passport.use(new LocalStrategy(
//     {
//         emailField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     function (req, name, password, done) {
//         process.nextTick(function () {
//             var Account = mongoose.model('Account');
//             Account.findOne({ "id": name }, function (err, account) {
//                 if (err) return done(err);
//                 if (!account) {
//                     req.flash('error', 'user can not find');
//                     req.flash('input_id', email);
//                     req.flash('input_password', password);
//                     return done(null, false);
//                 }
//                 var hashedPassword = getHash(password);
//                 if (account.password != hashedPassword
//                     && account.password != password) {
//                     req.flash('error', 'passport is wrong');
//                     req.flash('input_id', email);
//                     req.flash('input_password', password);
//                     return done(null, false);
//                 }
//                 return done(null, account);
//             });
//         })
//     }
//));
//
// // 暗号化
// var getHash = function(value) {
//     var sha = crypto.createHmac('sha256', 'secretKey');
//     sha.update(value);
//     return sha.digest('hex');
// };
//
// // passport
// passport.serializeUser(function (account, done) {
//     done(null, account.id);
// });
// passport.deserializeUser(function (serializedAccount, done) {
//     var Account = mongoose.model('Account');
//     Account.findOne({ "id": serializedAccount }, function (err, account) {
//         done(err, account.id);
//     });
// });


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
  signIn: passport.authenticate('local',{session: true})
}
