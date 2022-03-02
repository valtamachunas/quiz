import {
    Button,
    Flex,
    Box,
    Heading
} from '@chakra-ui/react';
import { useState } from 'react';

export default function DifficultySelector(props) {
    const [difficulty, setDifficulty] = useState('easy');
    const [isLoading, setIsLoading] = useState(false);

    function handleDifficultyChange(event) {
        setDifficulty(event.target.value)
    }

    function confirmSelection() {
        setIsLoading(true);
        props.onSelect(difficulty);
    }

    return (
        <Box textAlign='center'>
            <Heading>Select the difficulty:</Heading>
            <Flex justifyContent='space-around' marginTop='5' marginBottom='5' marginX='auto' width='30%'>
                <Button borderRadius='50px'
                    border={difficulty == 'easy' ? '4px' : 'none'}
                    onClick={handleDifficultyChange}
                    value='easy'
                    size='lg'>
                    Easy
                </Button>
                <Button borderRadius='50px'
                    border={difficulty == 'hard' ? '4px' : 'none'}
                    onClick={handleDifficultyChange}
                    value="hard"
                    size='lg'>
                    Hard
                </Button>
            </Flex>
            <Flex justifyContent='center'>
                <Button onClick={confirmSelection}>{isLoading ? 'Loading...' : "Confirm"}</Button>
            </Flex>
        </Box>
    )

}