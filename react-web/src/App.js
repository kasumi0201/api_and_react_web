import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import { Switch } from 'react-router';
import './App.css';
// import MoviesList from './components/MovieList.js'
import MovieForm from './components/MovieForm'
import MoviesPage from './pages/MoviesPage'
import * as moviesAPI from './api/movies'
// import Login from './users/Login'
// import AboutPage from './pages/AboutPage'


class App extends Component {
  state = {movies: null}

  componentDidMount(){
    moviesAPI.all()
    .then(movies => {
      this.setState({ movies })
    })
  }

  handleMovieSubmission = (movie)=>{
    this.setState(({movies})=>(
      { movies: [movie].concat(movies)}
    ));
    moviesAPI.save(movie);
  }


  render() {
    const { movies } = this.state;
    // console.log(movies);
    return (
      <Router>
      <div>

      <ul className="menu">
        <li><Link to="/movies">movies</Link></li>
        <li><Link to="/movies/new">movies new</Link></li>
        </ul>


        <div className = "container">

        <Route path="/" render={() => (<div>Hello Kasumi!</div>)}/>
        <br/>
        <Route path="/movies/new" render={
          () => (
            <MovieForm onSubmit={this.handleMovieSubmission}/>
          )
          }/>
        <Route path="/movies" render={
          () => (
            <MoviesPage movies = {movies}/>
          )
        }/>
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
