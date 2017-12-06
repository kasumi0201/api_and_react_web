import React from 'react';
import Comment from './Comment';

export default function Movie(props){
  const { title, yearReleased, director, comments} = props;
  return(
    <div>
      <span>Title: {title}</span>
      <span>year: {yearReleased}</span>

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
      A Movie!
    </div>
  )
};
