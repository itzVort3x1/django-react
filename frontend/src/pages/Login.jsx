import React from 'react'
import Form from '../components/Form'

const Login = () => {
  return (
     <Form route="/api/user/token/" method="login"/>
  )
}

export default Login