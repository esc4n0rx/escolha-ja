// src/components/ResultCard.js
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(145deg, #1e1e1e, #232323);
  border-radius: 20px;
  box-shadow:  10px 10px 20px #0e0e0e,
               -10px -10px 20px #2e2e2e;
  padding: 30px;
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const RecommendationText = styled.p`
  font-size: 1.2em;
  line-height: 1.5em;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: #FFFFFF;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
  margin-top: 1em;
  box-shadow:  4px 4px 8px #0e0e0e,
               -4px -4px 8px #2e2e2e;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ResultCard = ({ recommendation, onRetry }) => {
  return (
    <Card>
      <Title>Recomendação:</Title>
      <RecommendationText>{recommendation}</RecommendationText>
      <Button onClick={onRetry}>Tentar de Novo</Button>
    </Card>
  );
};

export default ResultCard;
