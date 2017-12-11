const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const server = express();

server.use(require('cookie-parser')());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
server.use(bodyParser.json());
// server.use(moviesRouter);

server.use(require('express-session')(
  {secret: 'secret', resave: false, saveUninitialized: false}
));
server.use(authMiddleware.initialize);

const moviesRouter = require('./routes/movies');
server.use('/movies',moviesRouter);
server.use('/auth',require('./routes/auth'));


server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const middleware = {
  logger: function(req, res, next){
    console.log(new Date(), req.method, req.originalUrl, req.body);
    next();
  }
}

//ここがLogger。userがどんな動きをしてるか見れる。ex.ページを更新する度に日付、アクセスしたページなどが表示される。
server.get('/', [middleware.logger], (req,res)=>{
  res.json({
    resources: [{
      movies: '/movies'
    }]
  })
});

server.post('/',(req,res)=>{
  console.log(`req.url is: ${req.url}`);
  console.log(`req.params is: ${JSON.stringify(req.params, null, 2)}`);
  console.log(`req.body is: ${JSON.stringify(req.body, null, 2)}`);
  res.status(200).json(req.body);
  // res.status(200).send('Success!');
});

const port = 7000;
server.listen(port,()=>{
  console.log(`Movies API server running ${port}`);
});
