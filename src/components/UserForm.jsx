
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Flex
} from '@chakra-ui/react'
import { useState } from 'react';

export default function UserForm(props) {
    const [name, setName] = useState('');

    function handleNameInput(event) {
        setName(event.target.value)
    }
    function submitName() {
        props.onConfirm(name)
    }
    return (
        <Box width='80%' margin='auto' >
            <FormControl marginTop='5'>
                <FormLabel textAlign='center' fontSize='lg' htmlFor='name'>Write your name</FormLabel>
                <Input variant='filled' onChange={handleNameInput} id='name' placeholder="Write your name" type='text' />
            </FormControl>
            <Box textAlign='center' marginTop='5'>
                <Button size='md' onClick={submitName}>Send</Button>
            </Box>
        </Box>
    )

}
