const express = require('express');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

router.post('/register',
  authMiddleware.register,
  (req, res) => {
  res.json({ user: req.user })
});

//Sign in User
router.post('/signin',
authMiddleware.signIn,
(req,res)=>{
  res.json({ user: req.user })
});

module.exports = router;
