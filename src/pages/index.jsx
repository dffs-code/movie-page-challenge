import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import api from '../services/omdb-api';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import MovieCard from '../components/movieCard';

const Wrapper = styled.div`
  background-color: var(--bs-gray-800);
  color: var(--bs-gray-400);
  height: 100%;
  width: 100%;
`;

const PageHead = styled.div`
  color: var(--bs-gray-400);
  height: auto;
  min-height: 10rem;
  padding: 2rem;
  text-align: center;
  width: 100%;
  &>p{
    margin: 0 auto;
    max-width: 60%;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  
  @media (max-width: 768px){
    flex-direction: column;
    gap: 1rem;
  }

  .btn{
    background-color: var(--bs-gray-700);
    border-radius: 10px;border-radius: 10px;
    border: 1px solid var(--bs-gray-700);
    color: var(--bs-gray-200);
    font-weight: 600;
    height: 40px;
    min-width: 8rem;
  }
`;

const Input = styled.input`
  background-color: var(--bs-gray-600);
  border-radius: 10px;
  border: 1px solid transparent;
  color: var(--bs-gray-200);
  font-size: 1rem;
  height: 40px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  width: 60%;
  
  ::placeholder{
    color: var(--bs-gray-500);
  }
  :focus-visible{
    outline: none;
  }
  
  :focus{
    box-shadow: 2px 2px 4px 1px rgb(0 0 0 / 25%);
  }

  @media (max-width: 768px){
    width: 95%;
  }
`;

function Index() {
  const [movie, setMovie] = useState();
  const [movieName, setMovieName] = useState();

  const handleCallApi = () => {
    if (movieName) {
      api.get(`?apiKey=e8f4d82f&t=${movieName}&type=movie`).then((response) => {
        setMovie(response.data);
      })
    } else {
      toast.warn('Ops! Você precisa inserir um filme para realizar a busca!')
    }
  }

  return (
    <Wrapper>
      <Container>
        <PageHead>
          <h2>Pesquise Filmes!</h2>
          <p>Bem vindo ao MPC (Movie Page Challenge), aqui você poderá pesquisar filmes e suas características através do seu nome!</p>
          <FormContainer>
            <Input type="text" placeholder="Insira o nome do filme" value={movieName} onChange={(e) => setMovieName(e.target.value)} onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                handleCallApi()
              }
            }}/>
            <Button variant='dark' onClick={() => handleCallApi()} >
              Pesquisar
            </Button>
            <Button variant='dark' onClick={() => {
              setMovie(false);
              setMovieName('');
            }} >
              Limpar
            </Button>
          </FormContainer>
        </PageHead>
        {movie
        ?
        <MovieCard
          title={movie.Title} 
          plot={movie.Plot}
          poster={movie.Poster}
          actors={movie.Actors}
          rating={movie.imdbRating}
          />
        :
        <MovieCard
          title="'Filme' de exemplo" 
          plot="Insira um filme na barra de pesquisa acima e estas informações serão preenchidas. Aqui ficará a descrição do filme encontrado. A imagem atual vem do site Lorem Picsum, um gerador de imagens aleatórias."
          poster="https://picsum.photos/200"
          actors="ex: Johnny Depp, Helena Bonham Carter, Dwayne Johnson"
          rating="7.4"
          />
        }
      </Container>
    </Wrapper>
  )
}

export default Index