import { useState } from "react"
import ChatMessage from "./components/ChatMessage";
import { io } from 'socket.io-client'
import { Container, Form } from "react-bootstrap";
import Chat from "./components/Chat";

const socket = io('http://127.0.0.1:5000', {
  autoConnect: false,
})

function App() {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isConnected, setIsConnected] = useState(socket.connected)

  const handleLogin = () => {
      if (userName === userName && password === 'password123') {
          alert('Login Successful')
          socket.connect();
          setIsConnected(true);

      } else {
          console.log('Login failed')
          alert('Invalid username or password')
      }
  }

  return (
    <>
      <div>

      { isConnected  ? (
        <div>
          <ChatMessage socket={socket} userName={userName}/>
          <Chat socket={socket} />
        </div>
      ) : (
        <div>
          <Container>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='username' placeholder='Enter Username' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <Form.Check type='checkbox' label='Remember Me'/>
                                <Form.Control type='submit' value='Login'/>
                </Form.Group>
            </Form>
        </Container>
        </div>
      )}
      </div>
    </>
  )
}

export default App
