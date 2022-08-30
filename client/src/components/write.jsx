import { useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Write({historyAPI, setLastAccess, setShow}) {
	const navigator =useNavigate();

	const pattern = useRef();
	const date = useRef();
	const useDesc = useRef();
	const cashAmt = useRef();
	const cardAmt = useRef();
	const category = useRef();
	const tag = useRef();
	const today = new Date().toISOString().slice(0, 10)
	
	const handleSubmit = (evnet) => {
		evnet.preventDefault();
		historyAPI
			.addHistory(pattern.current.value, date.current.value, useDesc.current.value, cashAmt.current.value, cardAmt.current.value, category.current.value, tag.current.value)
			.then(received => {
				if(received.result) {
					if(setShow) {
						setShow(false);
						evnet.target.reset();
						setLastAccess(Date.now());
					}
					navigator('/history')
				}
			})
			.catch(e => {
				console.log(e)
			})
		console.log(pattern.current.value, date.current.value, useDesc.current.value, cashAmt.current.value, cardAmt.current.value, category.current.value, tag.current.value)
	}
	return ( <Form className="d-flex flex-column align-items-center mx-auto" id="write" onSubmit={handleSubmit}>
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">유형</InputGroup.Text>
			<Form.Select ref={pattern} name="pattern" defaultValue="지출">
				<option>지출</option>
				<option>수입</option>
			</Form.Select>
	  </InputGroup>
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">날짜</InputGroup.Text>
			<Form.Control ref={date}
			type="date"
			aria-label="Username"
			aria-describedby="basic-addon1"
			name="useDate"
			defaultValue={today}	// 오늘 날짜를 default로 설정
			/>
	  </InputGroup>
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">사용내역</InputGroup.Text>
			<Form.Control ref={useDesc}
			aria-label="Username"
			aria-describedby="basic-addon1"
			name="useDesc"
			/>
	  </InputGroup>
	  <InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1" className="">현금</InputGroup.Text>
			<Form.Control ref={cashAmt}
			type="number"
			aria-label="Username"
			aria-describedby="basic-addon1"
			name="cashAmt"
			/>
			<InputGroup.Text id="basic-addon1">카드</InputGroup.Text>
			<Form.Control ref={cardAmt}
			type="number"
			aria-label="Username"
			aria-describedby="basic-addon1"
			name="cardAmt"
			/>
	  </InputGroup>
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">카테고리</InputGroup.Text>
			<Form.Select ref={category} defaultValue="미분류">
				<option value="미분류">미분류</option>
				<option value="식비">식비</option>
				<option value="주거/통신">주거/통신</option>
				<option value="생활용품">생활용품</option>
				<option value="의복/미용">의복/미용</option>
				<option value="건강/문화">건강/문화</option>
				<option value="교통/차량">교통/차량</option>
				<option value="용돈/기타">용돈/기타</option>
			</Form.Select>
	  </InputGroup>
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">태그</InputGroup.Text>
			<Form.Control ref={tag}
			aria-label="Username"
			aria-describedby="basic-addon1"
			name="tag"
			/>
	  </InputGroup>
	  <Button type="submit" className="bnt-block fs-6 btnPrimary">
						등록
					</Button>
	</Form>
	);
}

export default Write;