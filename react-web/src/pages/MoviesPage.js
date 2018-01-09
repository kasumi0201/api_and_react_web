import React from 'react';
import MoviesList from '../components/MovieList.js'
import { Switch, Route } from 'react-router'
import Movie from '../components/Movie.js'


export default ({ movies }) => {
  return (
    !!movies ? (
    <Switch>
    <Route path="/movies/:id" render={
      ({match})=>{
        const id = match.params.id
        const movie = movies.find((m) => (m._id === id))
        console.log(movie)
        return (<Movie {...movie} /> )
      }
    }/>
    <Route path="/movies" render={
      () => (
        <div>
              <MoviesList movies={ movies }/>
        </div>
      )
    }/>
    </Switch>
  ):( 'loading...' )
  )
}
