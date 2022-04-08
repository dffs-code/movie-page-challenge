import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/omdb-api';
import backendApi from '../../services/backend-api';
import { TailSpin } from 'react-loader-spinner'

const MovieWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 5rem 0;
  border-radius: 20px;
  border: 5px solid var(--bs-gray-700);
  margin: 2rem 0;
  padding: 1rem;

  @media (max-width: 500px){
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

const MovieContent = styled.div`
  width: 60%;

  @media (max-width: 768px){
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn{
    background-color: var(--bs-gray-700);
    border-radius: 10px;border-radius: 10px;
    border: 1px solid var(--bs-gray-700);
    color: var(--bs-gray-200);
    font-weight: 600;
    height: 40px;
    min-width: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 1rem;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const PosterContainer = styled.img`
  max-height: 15rem;
  width: auto;
  border-radius: 20px;
  object-fit: contain;
  @media (max-width: 500px){
    margin: 1rem 0;
  }
`;

const LoaderWrapper = styled.div`
  margin: 10rem auto;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: var(--main-font);
`;

function MovieCard({ id }) {
  const [movie, setMovie] = useState();

  useEffect(() => {
    console.log(id)
    api.get(`?apiKey=e8f4d82f&i=${id}`).then((response) => {
      console.log(response.data.Response);
      if (response.data.Response === 'True') {
        setMovie(response.data);
      } else {
        toast.error('Que pena! Filme não encontrado.')
      }
    })
  }, [])

  const handleUnfavorite = async () => {
    backendApi.delete(`/unfavorite/${id}`).then((response) => {
      console.log(response.data)
      toast.success('Filme removido com sucesso!')
      window.location.reload(false);
    }).catch((error) => {
      console.log(error)
      toast.error('Oops! Algo deu errado. ')
    })
  }

  return (
    <>
      {movie
        ?

        <MovieWrapper>
          <MovieContent>
            <h2>{movie?.Title}</h2>
            <p>{movie?.Plot}</p>
            <ItemContainer>
              <Label>Actors:</Label> {movie?.Actors}
            </ItemContainer>
            <ItemContainer>
              <Label>Review:</Label>
              <StarRatings
                rating={parseFloat(movie?.imdbRating) / 2}
                starRatedColor="var(--bs-gray-900)"
                starEmptyColor="var(--bs-gray-600)"
                numberOfStars={5}
                name='rating'
                starDimension="2rem"
                starSpacing="0.2rem"
              />
            </ItemContainer>
            <Button variant='dark' onClick={() => id ? handleUnfavorite() : toast.warn('Pesquise um filme para favoritar')} >
              Remover
            </Button>
          </MovieContent>
          <PosterContainer src={movie?.Poster} alt={`${movie?.Title} poster`} />
        </MovieWrapper>
        :
        <LoaderWrapper>
          <TailSpin
            color='var(--bs-gray-900)'
            ariaLabel='Carregando Informações'
          />
          <h1>Carregando Informações</h1>
        </LoaderWrapper>
      }
    </>
  )
}

export default MovieCard