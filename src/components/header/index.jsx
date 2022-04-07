import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

function Header() {
  const [login, setLogin] = useState(false);

  useEffect(()=>{
    if(window.location.pathname == '/login' || window.location.pathname == '/register') setLogin(true)
  }, [])

  console.log(window.location.pathname)
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MPC</Navbar.Brand>
        <Nav className="justify-content-end">
          {!login
          ?
          <>
            <Nav.Link href="/login">Entrar</Nav.Link>
            <Nav.Link href="/register">Cadastrar</Nav.Link>
          </>
          :
          ""
          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header