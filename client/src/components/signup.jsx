import { useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import registerAPI from "../api/registerAPI";

function Signup() {
	const navigator = useNavigate();
	const rows =[]
	const birthArr = () => {
		for(let i = 1945; i<2022; i++) {
			rows.push(<option key={i}>{i}</option>)
		}
		return rows;
	}
	const email = useRef();
	const password = useRef();
	const name = useRef();
	const gender = useRef();
	const birth = useRef();
	
	const handleSubmit = (event) => {
		event.preventDefault();
		registerAPI
			.signup(email.current.value, password.current.value, name.current.value, gender.current.value, Number(birth.current.value))
			.then(ret => {
				console.log(ret);
				navigator('/');
			})
	}

	return ( <div className="w-50 d-flex flex-column align-items-center pt-5 mx-auto" id="signup">
		<h2 className="align-self-start">회원가입</h2>
		<Form className="mt-4 w-100" onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formGroupEmail">
				<Form.Label className="mb-1">이메일</Form.Label>
				<Form.Control type="email" placeholder="abc@email.com" name="email" ref={email} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formGroupPassword">
				<Form.Label className="mb-1">비밀번호</Form.Label>
				<Form.Control type="password" placeholder="****" name="password" ref={password} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formGroupName">
				<Form.Label className="mb-1">이름</Form.Label>
				<Form.Control type="text" placeholder="돈쓰다" name="name" ref={name} />
			</Form.Group>
			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGroupGender">
					<Form.Label>성별</Form.Label>
					<Form.Select defaultValue="여" name="gender" ref={gender}>
						<option>여</option>
						<option>남</option>
					</Form.Select>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridBirth">
				<Form.Label>생일년도</Form.Label>
					<Form.Select defaultValue="1985" name="birth" ref={birth}>
						{birthArr()}
					</Form.Select>
				</Form.Group>
			</Row>
			<Row className="d-grid w-100 mx-0 mt-4">
				<Button type="submit" className="bnt-block p-3 fs-6 btnPrimary" sytle={{borderColor: '#dddddd'}}>
					회원가입
				</Button>
			</Row>
		</Form>
	</div> );
}

export default Signup;