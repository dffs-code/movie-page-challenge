import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: var(--bs-gray-800);
  color: var(--bs-gray-400);
  height: 92vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.div`
  width: 35%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 2rem;
  border-radius: 1rem;
  border: 4px solid var(--bs-gray-700);

  a{
    color: var(--bs-gray-200);
    transition: all 0.2s ease-in-out;

    :hover{
      color: var(--bs-gray-500);
    }
  }

  .btn{
    background-color: var(--bs-gray-600);
    border-radius: 10px;border-radius: 10px;
    border: 1px solid var(--bs-gray-700);
    color: var(--bs-gray-200);
    font-weight: 600;
    height: 40px;
    width: 80%;

    :hover{
      background-color: var(--bs-gray-700);
    }
  }
`;

export const FormInput = styled.input`
  background-color: var(--bs-gray-300);
  border-radius: 10px;
  border: 1px solid transparent;
  color: var(--bs-gray-700);
  font-weight: 600;
  font-size: 1rem;
  height: 40px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  width: 80%;
  
  ::placeholder{
    color: var(--bs-gray-600);
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