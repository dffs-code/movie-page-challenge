import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Wrapper, FormInput, InputContainer, FormContainer } from '../components/styles/formComponents'
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleRegister = () => {
    console.log({name, email, password, confirmPassword})
    toast.warn('Feature ainda não implementada')
  }

  return (
    <Wrapper>
      <Container>
        <FormContainer>
          <InputContainer>
            <h2>Cadastre-se</h2>
            <FormInput type='text' placeholder='Insira o nome' onChange={(e) => setName(e.target.value)} />
            <FormInput type='email' placeholder='Insira o email' onChange={(e) => setEmail(e.target.value)} />
            <FormInput type='password' placeholder='Insira a senha' onChange={(e) => setConfirmPassword(e.target.value)} />
            <FormInput type='password' placeholder='Confirme a senha' onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRegister()
              }
            }} />
            <Button variant='dark' onClick={() => handleRegister()} >
              Enviar
            </Button>
            <span>Já possui uma conta? <a href='/login'>Entre aqui!</a></span>
          </InputContainer>
        </FormContainer>
      </Container>
    </Wrapper>
  )
}