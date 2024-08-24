import { FormEvent, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Socket } from 'socket.io-client';

interface SocketProps {
    socket: Socket;
    userName: string;
}



const ChatMessage = ({ socket, userName }: SocketProps) => {
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = (event: FormEvent) => {
        event.preventDefault();
        socket.emit('message', {user: userName, text: message });
        console.log(message);
        setMessage('');
    
    }


  return (


    <div>
        <Container>
            <Form onSubmit={handleSendMessage}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Message</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Message" 
                    autoComplete='off'
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>
        </Container>
    </div>


  )


}



export default ChatMessage