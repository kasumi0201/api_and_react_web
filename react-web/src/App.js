import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import './App.css';
import AboutPage from './pages/AboutPage'
import MoviesPage from './pages/MoviesPage'
import MovieForm from './components/MovieForm'
import SignInForm from './components/SignInForm'
import SignOut from './components/SignOut'

import * as moviesAPI from './api/movies'
import { signIn } from './api/auth'

class App extends Component {
  state = { movies: null, token: null }

  componentDidMount() {
    moviesAPI.all()
      .then(movies => {
        this.setState({ movies })
      })
  }

  handleMovieSubmission = (movie) => {
    moviesAPI.save(movie);
    this.setState(({ movies }) => (
      { movies: [movie].concat(movies) }
    ));
}

  handleSignIn = ({ email, password }) => {
    console.log("App received", { email, password })
    signIn({ email, password })
      .then((data) => {
        console.log('signed in', data)
        if (data) {
        const token = data.token
        if (token) {
          moviesAPI.all(token)
            .then(movies => {
              this.setState({ movies, token })
            })
        }
      }
      })
  }

  handleSignOut = () => {
    this.setState({ movies: null, token: null })
  }

  render() {
    const { movies } = this.state;
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to='/about'>About</Link>
            &nbsp;
            <Link to='/movies'>Movies</Link>
            &nbsp;
            <Link to='/movies/new'>Create</Link>
            &nbsp;
            <Link to='/signin'>Sign In</Link>
            &nbsp;
            <Link to='/signout'>Sign Out</Link>
          </nav>
          <hr/>
          <Switch>
            <Route path='/about' component={AboutPage} />
            <Route path='/movies/new' render={() => (
                <MovieForm onSubmit={ this.handleMovieSubmission }/>
              )
            }/>
            <Route path='/movies' render={() => (
                <MoviesPage movies={ movies }/>
              )
            }/>
            <Route path='/signin' render={() => (
                <SignInForm token={ this.state.token } onSignIn={ this.handleSignIn } />
              )
            }/>
            <Route path='/signout' render={() => (
              <SignOut onSignOut={ this.handleSignOut }/>
              )
            }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
