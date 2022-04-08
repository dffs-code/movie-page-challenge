import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Wrapper, FormInput, InputContainer, FormContainer } from '../components/styles/formComponents'
import { toast } from 'react-toastify';
import api from '../services/backend-api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { tokenSetter } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(password !== confirmPassword){
      toast.error('As senhas precisam ser iguais')
      return
    } else {
      await api.post('/user', {name, email, password}).then(async (response) => {
        tokenSetter(response.data.token)
        var decodedToken = jwt(response.data.token);
        var date = new Date();
        
        date.setTime(date.getTime() + decodedToken.exp);
        document.cookie = 'token =' + response.data.token + ';expires=' + date.toGMTString() + '; SameSite=Strict; Secure; ';
        toast.success('Cadastrado com sucesso');
        navigate('/')
      }).catch((error)=>{
        console.log(error)
        if(error?.response?.status === 401){
          toast.error('Este email já está cadastrado')
        } else {
          toast.error('Oops! Ocorreu um erro, tente novamente mais tarde.');
        }
      })
    }
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