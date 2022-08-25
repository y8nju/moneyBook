import { Button, Form, Row, Col } from "react-bootstrap";

function Signup() {
	return ( <div className="w-50 d-flex flex-column align-items-center pt-5 mx-auto" id="singup">
		<h2 className="align-self-start">회원가입</h2>
		<Form className="mt-3 w-100">
			<Form.Group className="mb-3" controlId="formGroupEmail">
				<Form.Label className="mb-1">이메일</Form.Label>
				<Form.Control type="email" placeholder="abc@email.com" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formGroupPassword">
				<Form.Label className="mb-1">비밀번호</Form.Label>
				<Form.Control type="password" placeholder="****" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formGroupName">
				<Form.Label className="mb-1">이름</Form.Label>
				<Form.Control type="text" placeholder="돈쓰다" />
			</Form.Group>
			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGroupGender">
				<Form.Label>성별</Form.Label>
				<Form.Select defaultValue="여">
					<option>여</option>
					<option>남</option>
				</Form.Select>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridBirth">
				<Form.Label>생일년도</Form.Label>

				</Form.Group>
			</Row>
		</Form>
	</div> );
}

export default Signup;