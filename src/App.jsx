import { useState } from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import UserForm from './components/UserForm';
import DifficultySelector from './components/DifficultySelector';
import Game from './components/Game';
import Results from './components/Results';

function App() {
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [currentPage, setCurrentPage] = useState('userForm');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  function confirmUserName(name) {
    setUserName(name)
    setCurrentPage('difficultySelector')
  }

  async function confirmDifficulty(difficulty) {
    setDifficulty(difficulty)
    const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=x5yYMkHgQ0xhz7Q7RD1CfTQESV5gXkBwlfcuNFed&limit=50&difficulty=${difficulty}`);
    const data = await response.json();

    const validQuestions = [];
    data.forEach(question => {

      if (validQuestions.length == 10) {
        return;
      }

      let answerCount = 0;
      const answerArr = Object.keys(question.answers);
      answerArr.forEach(answer => {
        if (question.answers[answer] != null) {
          answerCount++;
        }
      });

      if (answerCount >= 4 && question.correct_answer != null) {
        validQuestions.push(question);
      }

    });
    setQuestions(validQuestions);
    setCurrentPage('game');
  }

  function confirmAnswers(answers) {
    setAnswers(answers);
    setCurrentPage('results');
  }

  function restartGame() {
    setCurrentPage('difficultySelector');
    setQuestions([]);
    setAnswers([]);
    setDifficulty('');
  }

  function renderCurrentPage() {
    switch (currentPage) {
      case 'userForm':
        return (
          <UserForm onConfirm={confirmUserName} />
        )
      case 'difficultySelector':
        return (
          <DifficultySelector onSelect={confirmDifficulty} />
        )
      case 'game':
        return (
          <Game questions={questions} confirmAnswers={confirmAnswers} />
        )
      case 'results':
        return (
          <Results answers={answers} questions={questions} restartGame={restartGame} />
        )

      default:
        return null
    }
  }

  return (
    <Grid
      h='100vh'
      templateRows='15% auto'

    >
      <GridItem bg='#ffbf75' display='flex' alignItems='center'>
        <Heading>{userName ? `Hello, ${userName}` : 'Welcome to the quiz!'}</Heading>
      </GridItem>
      <GridItem bg='#f3dccc'>
        {renderCurrentPage()}
      </GridItem>

    </Grid>
  )
}

export default App
