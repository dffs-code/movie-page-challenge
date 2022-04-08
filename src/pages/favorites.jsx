import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Wrapper, InputContainer, FormContainer } from '../components/styles/formComponents'
import { toast } from 'react-toastify';
import api from '../services/backend-api';
import FavoriteCard from '../components/favoriteCard'

export default function Login() {
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    api.get('/favorites').then((response) => {
      setFavorites(response.data)
    })
  }, [])

  return (
    <Wrapper>
      <Container>
            {favorites?.length?
            favorites?.map((favorite) =>(
              <FavoriteCard
                id={favorite.movieId}
                key={favorite.movieId}
              />
            ))
          :
          <FormContainer>
            <InputContainer className='text-center'>
              <h3>Oops! Parece que você não tem favoritos salvos. Pesquise um filme e favorite-o!</h3>
            </InputContainer>
          </FormContainer>
            }
      </Container>
    </Wrapper>
  )
}