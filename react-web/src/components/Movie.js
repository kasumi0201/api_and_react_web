import React from 'react';
import Comment from './Comment';

export default function Movie(props){
  const { title, yearReleased, director, comments } = props;
  return(
<div className="movie" >
    <div>
      <span>Title: {title}</span>
      <span>year: {yearReleased}</span>
      {director && <span>Director: {director.firstName} {director.lastName}
      </span>}
      <div>
        {
          comments
          ? comments.map(comment => (
              <Comment key={comment._id}>
                {comment.body}
              </Comment>
            ))
          : 'no comments'
        }

      </div>

    </div>
    </div>
  )
};
