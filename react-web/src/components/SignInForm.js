import React from 'react'
import { Redirect } from 'react-router-dom'

export default function SignInForm({ token, onSignIn }) {
  return (
    <div>
      { token && <Redirect to='/movies'/> }
      <form onSubmit={ (event) => {
        event.preventDefault()
        const form = event.target
        const elements = form.elements
        const email = elements.email.value
        const password = elements.password.value
        onSignIn({ email, password })
      }}>
        <label>
          Email
          &nbsp;
          <input type="email" name="email" />
        </label>

        <label>
          Password
          &nbsp;
          <input type="password" name="password" />
        </label>

        <button>
          Sign In
        </button>
      </form>
    </div>
  )
}
