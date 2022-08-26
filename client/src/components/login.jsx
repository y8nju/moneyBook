
import { useRef } from "react";
import { Alert, Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AccountAPI from '../api/AccountAPI';

function Login() {
	const emailInp = useRef();
	const passInp = useRef();
	const navigator =useNavigate();
	
	const handleSubmit = (event) => {
		event.preventDefault();
		AccountAPI('192.168.4.123:8080')
			.login(emailInp.current.value, passInp.current.value)
				.then(ret => {
					console.log(ret)
					if(ret.result) {
						navigator('/history');
					}else {
						navigator('/login')
					}
				})
				.catch(e => {
					console.log(e)
				})
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
	return ( <div className="d-flex flex-column justify-content-center align-items-center" id="login">
		<Form onSubmit={handleSubmit}>
			<Card style={{width: '300px'}}>
				<Card.Header className="bg-white border-0 px-4 pt-5 pb-0">
					<h2 className="pb-4 mb-0 border-bottom">쓰는 습관<i className="bi bi-calculator"></i></h2>
				</Card.Header>
				<Card.Body className="p-4">
						<FloatingLabel
							controlId="floatingInput"
							label="이메일"
							className="mb-4"
						>
							<Form.Control type="email" placeholder="name@example.com" name="email" ref={emailInp}  />
						</FloatingLabel>
						<p></p>
						<FloatingLabel controlId="floatingPassword" label="비밀번호">
							<Form.Control type="password" placeholder="Password" name="pswd" ref={passInp} />
						</FloatingLabel>
				</Card.Body>
				<Card.Footer className="bg-white p-4 pb-5 d-grid">
					<Button type="submit" className="bnt-block p-3 fs-6 btnPrimary">
						로그인
					</Button>
				</Card.Footer>
			</Card>
		</Form>
        {/* <Alert  variant="dark">계정을 확인하세요</Alert> */}
	</div>);
}

export default Login;