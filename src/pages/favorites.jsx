import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Wrapper, FormInput, InputContainer, FormContainer } from '../components/styles/formComponents'
import { toast } from 'react-toastify';
import api from '../services/backend-api';
import jwt from 'jwt-decode';

export default function Login() {
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    api.get('/favorites').then((response) => {
      console.log(response.data)
      setFavorites(response.data)
    })
  }, [])

  return (
    <Wrapper>
      <Container>
        <FormContainer>
          <InputContainer>
            {favorites?.map((favorite) =>(
              <span>{favorite.movieId}</span>
            ))}
          </InputContainer>
        </FormContainer>
      </Container>
    </Wrapper>
  )
}