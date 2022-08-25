
import { useRef } from "react";
import { Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import authAPI from '../api/authAPI';

function Login() {
	const emailInp = useRef();
	const passInp = useRef();
	
	const handleSubmit = (event) => {
		event.preventDefault();
		authAPI
			.login(emailInp.current.value, passInp.current.value)
			.then(ret => console.log(ret));
		/* // 위랑 동일
		const data ={email: emailInp.current.value , pw: passInp.current.value}
		fetch('http://192.168.4.123:8080/api/login', {
			method: 'post',
			body: JSON.stringify({data}),
			headers: {"Content-type" : "application/json"}
		})
			.then(response => response.json())
			.then(json=> {
				console.log(json)
			})
			.catch(e => console.log(e)) */
	}
	return ( <div className="d-flex justify-content-center align-items-center" style={{ height: '95vh' }}>
		<Form onSubmit={handleSubmit}>
			<Card style={{width: '300px'}}>
				<Card.Header className="bg-white border-0 px-4 pt-5 pb-0">
					<h2 className="pb-4 mb-0 border-bottom">쓰는 습관<i class="bi bi-calculator"></i></h2>
				</Card.Header>
				<Card.Body className="p-4">
						<FloatingLabel
							controlId="floatingInput"
							label="Email address"
							className="mb-4"
						>
							<Form.Control type="email" placeholder="name@example.com" name="email" ref={emailInp}  />
						</FloatingLabel>
						<FloatingLabel controlId="floatingPassword" label="Password">
							<Form.Control type="password" placeholder="Password" name="pswd" ref={passInp} />
						</FloatingLabel>
				</Card.Body>
				<Card.Footer className="bg-white p-4 pb-5 d-grid">
					<button type="submit" className="bnt-block p-3 fs-6" sytle={{borderColor: '#dddddd'}}>
						Login
					</button>
				</Card.Footer>
			</Card>
		</Form>
	</div>);
}

export default Login;