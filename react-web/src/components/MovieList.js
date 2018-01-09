import React from 'react';
import { Link } from 'react-router-dom';


function Movie({ _id,title, yearReleased }){
  return(
    <div className="movie" >
      <br/>
      <span>Title: </span>
      <Link to = {`/movies/${_id}`}>{title}</Link>
      <br/>
      <span>Year: {yearReleased}</span>
    </div>
  )
}


export default function MovieList({ movies }) {
  return (
    <div>
      <h1>Movie List!</h1>
      {
        movies.map((movie) => (
          <Movie key = {movie._id} {...movie}/>
        ))
      }
     </div>
  )
}
