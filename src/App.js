import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import CentralCard from './components/CentralCard';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import axios from 'axios';


function App() {
  const initialUserInput = {
    estado_emocional: '',
    tempo_disponivel: '',
    preferencias_genero: [],
    intensidade: '',
    prefere_filmes: false,
    novidade: 0,
    quantidade: 1,
  };

  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState(initialUserInput);
  const [recommendation, setRecommendation] = useState('');

  const handleStart = () => {
    setStep(1);
  };

  const handleNext = () => {
    if (step === 5 && !userInput.prefere_filmes) {
      setStep(step + 2); 
    } else {
      setStep(step + 1);
    }
  };

  const handleChange = (name, value) => {
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://backend-escolhacerta.onrender.com/recommend', { user_input: userInput });
      setRecommendation(response.data.recommendation);
      setStep(step + 1);
    } catch (error) {
      console.error('Erro ao obter recomendação:', error);
    }
  };

  const handleRetry = () => {
    setStep(1); 
    setUserInput(initialUserInput); 
    setRecommendation(''); 
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        {step === 0 && (
          <CentralCard onStart={handleStart} />
        )}
        {step >= 1 && step <= 7 && (
          <QuestionCard
            step={step}
            userInput={userInput}
            handleChange={handleChange}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        )}
        {step === 8 && (
          <ResultCard
            recommendation={recommendation}
            onRetry={handleRetry}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
