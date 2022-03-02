import { useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

export default function Game(props) {
    const [currentQuestion, setCurrectQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [anwers, setAnswers] = useState([]);

    const questionData = props.questions[currentQuestion];

    function handleClick(answer) {
        setSelectedAnswer(answer);
    }

    function renderAnswers() {
        const answers = [];
        const answerArr = Object.keys(questionData.answers);
        answerArr.forEach(answer => {
            if (questionData.answers[answer] != null) {
                answers.push(
                    <Button marginTop='2'
                        key={answer}
                        onClick={() => handleClick(answer)}
                        border={selectedAnswer === answer ? '4px solid #ffbf75' : '2px solid #f3dccc'}
                        width='90%'
                    >
                        {questionData.answers[answer]}
                    </Button>
                );
            }
        });
        return answers;
    }

    function confirmAnswer() {
        if (!selectedAnswer) {
            return;
        }
        setAnswers([...anwers, selectedAnswer]);
        if (currentQuestion + 1 < props.questions.length) {
            setCurrectQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            return;
        }
        props.confirmAnswers(anwers);
    }

    return (
        <Box textAlign='center'>
            <Heading fontSize='25px'>{currentQuestion + 1} - {questionData.question}</Heading>
            <Flex flexDirection='column' alignItems='center'>
                {renderAnswers()}
            </Flex>
            <Button marginTop='5' onClick={() => confirmAnswer()}>Send</Button>
        </Box>
    )
}