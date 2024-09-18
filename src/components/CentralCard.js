// src/components/CentralCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(145deg, #1e1e1e, #232323);
  border-radius: 20px;
  box-shadow:  10px 10px 20px #0e0e0e,
               -10px -10px 20px #2e2e2e;
  padding: 40px;
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 0.2em;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1.5em;
  font-weight: normal;
  color: #BBBBBB;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #FFFFFF;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
  box-shadow:  4px 4px 8px #0e0e0e,
               -4px -4px 8px #2e2e2e;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const CentralCard = ({ onStart }) => {
  return (
    <Card>
      <Title>Recomendador de Filmes e Séries</Title>
      <SubTitle>Encontre a sugestão perfeita para você</SubTitle>
      <Button onClick={onStart}>Iniciar</Button>
    </Card>
  );
};

export default CentralCard;
