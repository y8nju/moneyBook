import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

function Header() {
	return ( <Navbar sticky="top" bg="white" variant="light" className="navbar-expand-lg">
		<Container>
			<Link to="/" className="navbar-brand"><i className="bi bi-calculator"></i>쓰는 습관</Link>
			<Nav className="me-auto">
				<Link to="/" className="nav-link">쓰다</Link>
				{/* router-dom Link */}
				<Link to="login" className="nav-link">로그인</Link>
				<Link to="register" className="nav-link">회원가입</Link>
			</Nav>
		</Container>
	</Navbar> );
}

export default Header;