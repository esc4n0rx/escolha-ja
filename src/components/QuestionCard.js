// src/components/QuestionCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Card = styled.div`
  background: linear-gradient(145deg, #1e1e1e, #232323);
  border-radius: 20px;
  box-shadow:  10px 10px 20px #0e0e0e,
               -10px -10px 20px #2e2e2e;
  padding: 30px;
  max-width: 600px;
  margin: 50px auto;
`;

const Question = styled.h2`
  font-size: 1.8em;
  margin-bottom: 1em;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  background-color: #1f1f1f;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 5px;
  margin-bottom: 1em;
  font-size: 1em;
  color: #FFFFFF;
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

const Emoji = styled.span`
  font-size: 2em;
  margin-left: 0.5em;
`;

const IntensityBar = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  margin-bottom: 1em;
  overflow: hidden;
`;

const IntensityLevel = styled.div`
  width: ${(props) => props.level}%;
  background-color: ${({ theme }) => theme.primary};
  height: 20px;
  transition: width 0.3s;
`;

const Comment = styled.p`
  font-style: italic;
  margin-top: 0.5em;
  color: #BBBBBB;
`;

const QuestionCard = ({ step, userInput, handleChange, handleNext, handleSubmit }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const estadosEmocionais = [
    { value: 'Triste', emoji: '😢' },
    { value: 'Feliz', emoji: '😃' },
    { value: 'Animada', emoji: '😁' },
    { value: 'Doente', emoji: '🤒' },
    { value: 'Depressiva', emoji: '😔' },
    { value: 'Ansiosa', emoji: '😰' },
  ];

  const generos = [
    'Ação', 'Comédia', 'Drama', 'Fantasia', 'Terror', 'Romance', 'Ficção Científica', 'Thriller', 'Animação',
  ];

  const intensidades = ['Leve', 'Mediana', 'Alta', 'Altíssima'];

  const quantidadeComentarios = {
    1: 'Uma escolha única para você!',
    2: 'Duas é melhor que uma!',
    3: 'Três é um bom número.',
    4: 'Quatro recomendações chegando!',
    5: 'Cinco? Você gosta de opções!',
  };

  const generateCommentBasedOnTime = (totalMinutes) => {
    if (totalMinutes <= 30) {
      return 'Você tem pouco tempo, vamos encontrar algo rápido!';
    } else if (totalMinutes <= 60) {
      return 'Uma hora livre! Temos boas opções para esse tempo.';
    } else if (totalMinutes <= 120) {
      return 'Duas horas disponíveis! Perfeito para um filme completo.';
    } else {
      return 'Tem bastante tempo! Que tal uma maratona de séries?';
    }
  };

  const questionText = () => {
    switch (step) {
      case 1:
        return 'Como você está se sentindo?';
      case 2:
        return 'Quanto tempo você tem disponível?';
      case 3:
        return 'Quais gêneros você prefere?';
      case 4:
        return 'Qual intensidade você prefere?';
      case 5:
        return 'Prefere filmes?';
      case 6:
        return 'Quer algo novo?';
      case 7:
        return 'Quantas recomendações você quer?';
      default:
        return '';
    }
  };

  const renderQuestionContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Select
              name="estado_emocional"
              value={userInput.estado_emocional}
              onChange={(e) => handleChange('estado_emocional', e.target.value)}
            >
              <option value="">Selecione seu estado emocional</option>
              {estadosEmocionais.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.value}
                </option>
              ))}
            </Select>
            {userInput.estado_emocional && (
              <Emoji>
                {estadosEmocionais.find((estado) => estado.value === userInput.estado_emocional)?.emoji}
              </Emoji>
            )}
            <Button onClick={handleNext}>Próximo</Button>
          </>
        );
        case 2:
            return (
              <>
                <p>Quanto tempo você tem disponível para assistir?</p>
                <TimeContainer>
                  <TimeInputContainer>
                    <Label htmlFor="horas">Horas:</Label>
                    <Input
                      type="number"
                      id="horas"
                      name="horas"
                      min="0"
                      value={hours}
                      onChange={(e) => {
                        const h = e.target.value;
                        setHours(h);
                        const hNum = parseInt(h) || 0;
                        const mNum = parseInt(minutes) || 0;
                        const totalMinutes = hNum * 60 + mNum;
                        handleChange('tempo_disponivel', totalMinutes);
                      }}
                    />
                  </TimeInputContainer>
                  <TimeInputContainer>
                    <Label htmlFor="minutos">Minutos:</Label>
                    <Input
                      type="number"
                      id="minutos"
                      name="minutos"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => {
                        const m = e.target.value;
                        setMinutes(m);
                        const hNum = parseInt(hours) || 0;
                        const mNum = parseInt(m) || 0;
                        const totalMinutes = hNum * 60 + mNum;
                        handleChange('tempo_disponivel', totalMinutes);
                      }}
                    />
                  </TimeInputContainer>
                </TimeContainer>
                {userInput.tempo_disponivel > 0 && (
                  <Comment>
                    {generateCommentBasedOnTime(userInput.tempo_disponivel)}
                  </Comment>
                )}
                <Button onClick={handleNext}>Próximo</Button>
              </>
            );
      case 3:
        return (
          <>
            <p>Selecione seus gêneros preferidos:</p>
            {generos.map((genero) => (
              <Label key={genero}>
                <Input
                  type="checkbox"
                  name="preferencias_genero"
                  value={genero}
                  checked={userInput.preferencias_genero.includes(genero)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleChange('preferencias_genero', [...userInput.preferencias_genero, genero]);
                    } else {
                      handleChange('preferencias_genero', userInput.preferencias_genero.filter((g) => g !== genero));
                    }
                  }}
                />
                {genero}
              </Label>
            ))}
            {userInput.preferencias_genero.length > 0 && (
              <Comment>
                {`Você tem bom gosto por ${userInput.preferencias_genero.join(', ')}!`}
              </Comment>
            )}
            <Button onClick={handleNext}>Próximo</Button>
          </>
        );
      case 4:
        return (
          <>
            <p>Escolha a intensidade desejada:</p>
            <Select
              name="intensidade"
              value={userInput.intensidade}
              onChange={(e) => handleChange('intensidade', e.target.value)}
            >
              <option value="">Selecione a intensidade</option>
              {intensidades.map((intensidade) => (
                <option key={intensidade} value={intensidade}>
                  {intensidade}
                </option>
              ))}
            </Select>
            {userInput.intensidade && (
              <>
                <IntensityBar>
                  <IntensityLevel
                    level={((intensidades.indexOf(userInput.intensidade) + 1) / intensidades.length) * 100}
                  />
                </IntensityBar>
              </>
            )}
            <Button onClick={handleNext}>Próximo</Button>
          </>
        );
      case 5:
        return (
          <>
            <p>Prefere filmes?</p>
            <Select
              name="prefere_filmes"
              value={userInput.prefere_filmes ? 'Sim' : 'Não'}
              onChange={(e) => handleChange('prefere_filmes', e.target.value === 'Sim')}
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Select>
            <Button onClick={handleNext}>Próximo</Button>
          </>
        );
      case 6:
        return (
          <>
            <p>Quer algo novo?</p>
            <Select
              name="novidade"
              value={userInput.novidade ? 'Sim' : 'Não'}
              onChange={(e) => handleChange('novidade', e.target.value === 'Sim' ? 1 : 0)}
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Select>
            <Button onClick={handleNext}>Próximo</Button>
          </>
        );
      case 7:
        return (
          <>
            <p>Quantas recomendações você quer?</p>
            <Select
              name="quantidade"
              value={userInput.quantidade}
              onChange={(e) => handleChange('quantidade', parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>
            {userInput.quantidade && (
              <Comment>
                {quantidadeComentarios[userInput.quantidade]}
              </Comment>
            )}
            <Button onClick={handleSubmit}>Obter Recomendação</Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <Question>{questionText()}</Question>
      {renderQuestionContent()}
    </Card>
  );
};

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;

const TimeInputContainer = styled.div`
  margin: 0 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 60px;
  padding: 5px;
  background-color: #1f1f1f;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 1em;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
  font-size: 1em;
`;

export default QuestionCard;
