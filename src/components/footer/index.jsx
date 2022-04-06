import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--bs-dark);
  color: var(--bs-light);
`;

function Footer() {
  return (
    <FooterWrapper>
      Movie Page Challenge © {new Date().getFullYear()}
    </FooterWrapper>
  )
}

export default Footer