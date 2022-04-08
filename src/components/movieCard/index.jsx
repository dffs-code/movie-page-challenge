import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { IoHeartOutline } from 'react-icons/io5'
import api from '../../services/backend-api';
import { useAuth } from '../../hooks/useAuth';

const MovieWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 5rem 0;

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
  max-height: 20rem;
  width: auto;
  object-fit: contain;
  @media (max-width: 500px){
    margin: 1rem 0;
  }
`;

function MovieCard({ title, plot, actors, rating, poster, id }) {
  const { user } = useAuth();

  const handleFavorite = async () => {
    api.post('/favorite', { movieId: id }).then((response) => {
      console.log(response.data)
      toast.success('Filme favoritado com sucesso!')
    }).catch((error) => {
      console.log(error)
      toast.error('Oops! Algo deu errado. ')
    })
  }

  return (
    <MovieWrapper>
      <MovieContent>
        <h2>{title}</h2>
        <p>{plot}</p>
        <ItemContainer>
          <Label>Actors:</Label> {actors}
        </ItemContainer>
        <ItemContainer>
          <Label>Review:</Label>
          <StarRatings
            rating={parseFloat(rating) / 2}
            starRatedColor="var(--bs-gray-900)"
            starEmptyColor="var(--bs-gray-600)"
            numberOfStars={5}
            name='rating'
            starDimension="2rem"
            starSpacing="0.2rem"
          />
        </ItemContainer>
        <Button variant='dark' onClick={() => id ? handleFavorite() : toast.warn('Pesquise um filme para favoritar')} >
          Favoritar
          <IoHeartOutline />
        </Button>
      </MovieContent>
      <PosterContainer src={poster} alt={`${title} poster`} />
    </MovieWrapper>
  )
}

export default MovieCard