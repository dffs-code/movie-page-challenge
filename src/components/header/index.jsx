import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">MPC</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="#">Entrar</Nav.Link>
          <Nav.Link href="#">Cadastrar</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header