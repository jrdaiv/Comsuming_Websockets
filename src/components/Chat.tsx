import { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap';
import { Socket } from 'socket.io-client';

interface SocketProps {
    socket: Socket;
}
interface Message {
    text: string;
    user: string;
}


const Chat = ({ socket }: SocketProps) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const handleMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        socket.on('message', handleMessage);
        return () => {
            socket.off('message', handleMessage);
        };
    }, [socket]);
    
    


  return (


    <Container className='mt-3'>
        
        {messages.map((message, index) => (
            <Card key={index} className="mb-2">
                <Card.Body className=''>
                    <Card.Title>{message.user}</Card.Title>
                    <Card.Text>{message.text}</Card.Text>
                </Card.Body>
            </Card>
        ))}
    </Container>


  )


}

export default Chat