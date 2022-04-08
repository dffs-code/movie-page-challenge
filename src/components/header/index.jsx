import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const [login, setLogin] = useState(false);
  const { user } = useAuth();

  console.log(user)

  useEffect(()=>{
    if(window.location.pathname == '/login' || window.location.pathname == '/register') setLogin(true)
  }, [])

  console.log(window.location.pathname)
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MPC</Navbar.Brand>
        <Nav className="justify-content-end">
          {!login && !user
          ?
          <>
            <Nav.Link href="/login">Entrar</Nav.Link>
            <Nav.Link href="/register">Cadastrar</Nav.Link>
          </>
          :
          user
          ?
          <>
            <Nav.Link href="/favorites">Favoritos</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>Olá, {user?.name.split(' ')[0]}!</Nav.Link>
          </>
          : ""
          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header