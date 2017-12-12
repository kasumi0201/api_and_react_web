import React from 'react';

export default function Login({ onSubmit }){
  function handleFormSubmission(event){
    const {elements}=event.target;
    const email=elements["email"].value;
    const password=elements["password"].value;
    onSubmit({email, password});
  }

  return(
    <div>
      <form onSubmit={handleFormSubmission}>
        <label>
          email
          <input type="text" name="email"/>
        </label>
        <label>
          password
          <input type="password" name="password"/>
        </label>
        <button type="submit">Login</button>
      </form>
      </div>
  )
}
