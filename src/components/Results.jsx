import { Box, Button, Heading } from "@chakra-ui/react";

export default function Results(props) {
    let correctAnswers = 0;

    function renderAnswers() {
        const answers = [];
        props.answers.forEach((answer, index) => {
            const isCorrect = props.questions[index].correct_answer === answer;

            if (isCorrect) {
                correctAnswers++;
            }

            answers.push(
                <Box key={index} backgroundColor={isCorrect ? '#a4dfa4' : '#f77e7e'}
                    padding={5}
                    margin={5}
                    borderRadius={5}>
                    <Box>Question: {props.questions[index].question}</Box>
                    <Box>Your answer: {props.questions[index].answers[answer]}</Box>
                    <Box>Correct answer: {props.questions[index].answers[props.questions[index].correct_answer]}</Box>
                </Box>
            );

        });
        return answers;

    }
    return (
        <Box textAlign='center'>
            {renderAnswers()}
            <Heading margin='2'>You got {correctAnswers} out of {props.questions.length} correct</Heading>
            <Button marginBottom={2} onClick={() => props.restartGame()}>Restart</Button>
        </Box>
    )
}