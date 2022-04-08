import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

function Header() {
  const [login, setLogin] = useState(false);
  const { user, token, tokenSetter } = useAuth();

  useEffect(() => {
    if (window.location.pathname == '/login' || window.location.pathname == '/register') setLogin(true)
  }, [])

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
            token
              ?
              <>
                <Nav.Link eventKey="disabled" disabled>Olá, {user?.name.split(' ')[0]}!</Nav.Link>
                <Nav.Link href="/favorites">Favoritos</Nav.Link>
                <Nav.Link eventKey="disabled" onClick={() => {
                  document.cookie = `token=${token}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                  localStorage.removeItem('token');
                  sessionStorage.removeItem('token');

                  tokenSetter();
                  toast.warn('🙁 Poxa que pena, volte logo!')
                }}>Logout</Nav.Link>
              </>
              : ""
          }
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header