import React from 'react'
import Container from '../shared/Container'
import LoginForm from '../forms/Login'

const Login = () => {
  return (
    <Container className='w-full h-screen flex flex-col items-center mt-24 p-0 mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-12'>Login to your account</h2>
      <LoginForm />
    </Container>
  )
}

export default Login