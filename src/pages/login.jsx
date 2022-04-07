import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Wrapper, FormInput, InputContainer, FormContainer } from '../components/styles/formComponents'
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    console.log({email, password})
    toast.warn('Feature ainda não implementada')
  }

  return (
    <Wrapper>
      <Container>
        <FormContainer>
          <InputContainer>
            <h2>Login</h2>
            <FormInput type='email' placeholder='Insira o email' onChange={(e) => setEmail(e.target.value)} />
            <FormInput type='password' placeholder='Insira a senha' onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin()
              }
            }} />
            <Button variant='dark' onClick={() => handleLogin()} >
              Entrar
            </Button>
            <span>Não possui uma conta? <a href='/register'>Registre-se aqui!</a></span>
          </InputContainer>
        </FormContainer>
      </Container>
    </Wrapper>
  )
}