import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Index() {    
	const navigate = useNavigate();
	const moveLogin = () => {
		navigate('/login');
	}
    return ( <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="https://images.unsplash.com/photo-1661156071757-b4c3aabe9cdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80https://images.unsplash.com/photo-1661156071757-b4c3aabe9cdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary" onClick={moveLogin}>로그인</Button>
    </Card.Body>
  </Card> );
}

export default Index;