const express = require('express');
const authMiddleware = require('../middleware/auth.js');



const router = express.Router();

router.post('/register',
  authMiddleware.register,
  authMiddleware.signJWTForUser
//   (req, res) => {
//   res.json({ user: req.user })
// }
);

//Sign in User
router.post('/signin',
authMiddleware.signIn,
authMiddleware.signJWTForUser
// (req,res)=>{
//   res.json({ user: req.user })
// }
);

router.get('./movies',
  (req,res)=>{
    res.send({ movies: ['Movies!'] })
});


module.exports = router;
