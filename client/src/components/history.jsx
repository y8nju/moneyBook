import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import Write from "./write";

function History({datas, historyAPI}) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const monthRef = useRef();
	useEffect(()=> {
		const month = new Date().toISOString().slice(0, 7);
		monthRef.current.value = month;
	}, [])

	return ( <div>
		<Container>
			<InputGroup className="mb-3">
				<InputGroup.Text id="basic-addon1">날짜</InputGroup.Text>
				<Form.Control
				type="month"
				aria-label="Username"
				aria-describedby="basic-addon1"
				name="useDate"
				ref={monthRef}
				/>
		</InputGroup>
		</Container>
		<Container>
			<Button variant="primary" onClick={handleShow}>
				<i className="bi bi-pencil-square"></i> 입력
			</Button>
		</Container>
		<Modal show={show}>
		{/* <Modal show={show} onHide={handleClose}> */}
		<Modal.Header closeButton onHide={handleClose}>
			<Modal.Title>내역 입력</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Write  historyAPI={historyAPI }></Write>
		</Modal.Body>
		</Modal>
	</div> );
}

export default History;