import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'

function Header({logon, setLogon}) {
	const navigator =useNavigate();

	const handelLogout = () => {	// 로그아웃 버튼 누르면
		// localStorage에서 token 지우기
		localStorage.removeItem("token");
		// logon은 null로 바꾸기
		setLogon(null);
		navigator('/login')
	}
	return ( <Navbar collapseOnSelect expand="lg" fixed="top" bg="white" variant="light" className="navbar-expand-lg">
		<Container>
			<Link to="/" className="navbar-brand"><i className="bi bi-calculator"></i>쓰는 습관</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" className='fs-6 p-1 me-2 border-0' />
					{/* {logon && <Navbar.Text className="fs-6 ms-auto">{logon}</Navbar.Text>} */}
			
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Link to="/history" className="nav-link">습관확인</Link>
				</Nav>
				<Nav>
					{/* router-dom Link */}
					{logon && <Button variant="light" className="p-1 ps-0 ms-2" onClick={handelLogout}>로그아웃 <i className="bi bi-box-arrow-in-right"></i></Button>}
					{!logon &&  <Link to="login" className="nav-link">로그인</Link>}
					{!logon &&  <Link to="register" className="nav-link">회원가입</Link>}
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar> );
}

export default Header;