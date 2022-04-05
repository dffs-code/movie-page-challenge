import { useState } from 'react';
import { Container, Button, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import api from '../services/omdb-api';
import styled from 'styled-components';

const PageHead = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #e5e5e5;
  text-align: center;
`;

const FormWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

function Index() {
  const [movie, setMovie] = useState();

  const handleCallApi = () => {
    api.get('?apiKey=e8f4d82f&t=spider man').then((response) => {
      setMovie(response.data);
    })
  }

  return (
    <>
      <Container>
        <PageHead>
          <h2>Pesquise Filmes!</h2>
          <p>Bem vindo ao MPC (Movie Page Challenge), aqui você poderá pesquisar filmes e suas características através do seu nome!</p>
          <Container fluid>
            <Form>
              <Row className="justify-content-md-center">
                <Col xs={8}>
                  <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    Name
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Movie Name"
                  />
                </Col>
                <Col xs='auto'>
                  <Button variant='dark' onClick={() => handleCallApi()} className="mb-2">
                    Submit
                  </Button>
                </Col>
                <Col xs='auto'>
                  <Button variant='dark' onClick={() => setMovie(false)} className="mb-2">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </PageHead>
        <h2>{movie ? movie.Title : 'Olá Mundo'}</h2>
      </Container>
    </>
  )
}

export default Index