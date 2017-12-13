
'use strict';
const chai = require('chai');
const expect = chai.expect;
const app = require('../../app');
const Movie = require('../../models/movie');
chai.use(require('chai-http'));

describe("Movies API", function(){
  let server;
  const port = 7010;

  before(function(){
    server = app.listen(port);
  });

  beforeEach(function(done) {
    Movie.create(
      {
        title: 'Legally Blonde1',
        yearReleased: 2001,
        comments: [{ body: 'very funny ' }]
      },
      done
    );
  });

  afterEach(function(done){
    Movie.remove({}, done)
  });

  it('should return a list of movies', function() {
    return chai.request(app)
    .get('/movies')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.length(1);
    });
  });

  it('should create a movie', function() {
    return chai.request(app)
    .post('/movies')
    .field('title','legally blonde')
    .field('yearReleased',2003)
    .then(function(res) {
      expect(res).to.have.status(201);
    });
  });

});
