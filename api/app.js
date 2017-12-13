const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(require('cookie-parser')());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// app.use(moviesRouter);

app.use(require('express-session')(
  {secret: 'secret', resave: false, saveUninitialized: false}
));
app.use(authMiddleware.initialize);

const moviesRouter = require('./routes/movies');
app.use('/movies',moviesRouter);
app.use('/auth',require('./routes/auth'));


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const middleware = {
  logger: function(req, res, next){
    console.log(new Date(), req.method, req.originalUrl, req.body);
    next();
  }
}

//ここがLogger。userがどんな動きをしてるか見れる。ex.ページを更新する度に日付、アクセスしたページなどが表示される。
app.get('/', (req,res)=>{
  res.json({
    resources: [{
      movies: '/movies'
    }]
  })
});

// app.post('/',(req,res)=>{
//   console.log(`req.url is: ${req.url}`);
//   console.log(`req.params is: ${JSON.stringify(req.params, null, 2)}`);
//   console.log(`req.body is: ${JSON.stringify(req.body, null, 2)}`);
//   res.status(200).json(req.body);
//   // res.status(200).send('Success!');
// });

module.exports = app;
