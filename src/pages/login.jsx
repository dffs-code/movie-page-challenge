import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Wrapper, FormInput, InputContainer, FormContainer } from '../components/styles/formComponents'
import { toast } from 'react-toastify';
import api from '../services/backend-api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { tokenSetter } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    await api.post('/auth', {email, password}).then(async (response) => {
      tokenSetter(response.data.token)
      var decodedToken = jwt(response.data.token);
      var date = new Date();
      
      date.setTime(date.getTime() + decodedToken.exp);
      document.cookie = 'token =' + response.data.token + ';expires=' + date.toGMTString() + '; SameSite=Strict; Secure; ';
      toast.success('Login com sucesso');
      navigate('/')
    }).catch((error)=>{
      console.log(error)
      toast.error('Credenciais incorretas');
    })
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