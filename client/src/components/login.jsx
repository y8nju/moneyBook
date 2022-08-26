
import { useRef, useState } from "react";
import { Alert, Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({accountAPI, setLogon}) {
	const emailInp = useRef();
	const passInp = useRef();
	const navigator =useNavigate();
	
	const [error, setError] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		accountAPI
			.auth(emailInp.current.value, passInp.current.value)
				.then(received => {
					console.log(received)
					if(received.result) {
						setLogon(emailInp.current.value);	// 로그온되면, 이메일을 넣어준다
						localStorage.setItem('token', received.token);	// ✨localStorage에 토큰을 저장한다
						setError(false);	// 통신 성공 시 에러 없음
						navigator('/');	// 페이지 전환
					}else {
						setError(true);	// 통신 실패시 에러 있음
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
	return ( <Container className="my-auto" id="login">
		<Form onSubmit={handleSubmit}>
			<Card className="mx-auto" style={{width: '300px'}}>
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
	</Container>);
}

export default Login;