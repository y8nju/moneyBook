import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

function Header() {
	return ( <Navbar sticky="top" bg="white" variant="light" className="navbar-expand-lg">
		<Container>
			<Navbar.Brand href="#home">Navbar</Navbar.Brand>
			<Nav className="me-auto">
				<Link to="/" className="nav-link">	Home</Link>
				{/* router-dom Link */}
				<Link to="login" className="nav-link">Log in</Link>
			</Nav>
		</Container>
	</Navbar> );
}

export default Header;