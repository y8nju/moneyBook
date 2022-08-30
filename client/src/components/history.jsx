import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, ListGroup, Modal, Row, Table } from "react-bootstrap";
import HistoryChart from "./historyChart";
import HIstoryTable from "./historyTable";
import Write from "./write";

function History({datas, historyAPI, logon}) {
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [show, setShow] = useState(false);
	const [items, setItems] = useState([]);
	const [chkItems, setChkItems] = useState([]);
	const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // month값 변경
	const [lastAccess, setLastAccess] = useState();	// 리스트가 변경 됐을 때(write, delete)
	const monthRef = useRef();

	useEffect(() => {
		monthRef.current.value = month;
		historyAPI.history(month).then(received => {
			if (received.result) {
				setItems(received.datas);
			}
		});
	}, [month, lastAccess])	// month와 lastAccess가 변경될 때마다 작동
	
	const handleChecked= (checked, id) => {	// 체크박스가 선택된 아이템 처리하기
		if(checked) {
			setChkItems([...chkItems, id])
		} else {
			// 체크해제
			setChkItems(chkItems.filter(chk=>chk!==id))
		}
	}
	const handleDelete = () => {
		historyAPI.delete(chkItems)
			.then(received => {
				if(received.result) { 
					console.log('삭제')
				}
			})
			console.log(chkItems);
			setLastAccess(Date.now());
	}
	return ( <Container>
		<Row>
			<Col sm={3}>
				<Container>
				<ListGroup as="ul" style={{cursor:'pointer'}}>
					<ListGroup.Item variant="light" active onClick={handleShow}>
						<i className="bi bi-pencil-square"></i> 입력
					</ListGroup.Item>
					<ListGroup.Item variant="light">Dapibus ac facilisis in</ListGroup.Item>
					<ListGroup.Item variant="light" disabled>
						Morbi leo risus
					</ListGroup.Item>
					<ListGroup.Item variant="light">Porta ac consectetur ac</ListGroup.Item>
				</ListGroup>
				</Container>
				<Modal show={show}>
				{/* <Modal show={show} onHide={handleClose}> */}
				<Modal.Header closeButton onHide={handleClose}>
					<Modal.Title>내역 입력</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Write  historyAPI={historyAPI } setLastAccess={setLastAccess} setShow={setShow}></Write>
				</Modal.Body>
				</Modal>
			</Col>
			<Col sm={9}>
				<Container>
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1">날짜</InputGroup.Text>
						<Form.Control
							type="month"
							aria-label="Username"
							aria-describedby="basic-addon1"
							name="month"
							ref={monthRef}
							onChange={(e) => setMonth(e.target.value)}
							/>
					</InputGroup>
				</Container>
				<HistoryChart  historyAPI={historyAPI } datas={items} />
				<Container>
					<Table striped className="border-top text-center">
						<thead className="w-100">
							<tr>
								<th>
									<Form.Check 
										type="checkbox"
										id="default-checkbox"
									/>
								</th>
								<th>날짜</th>
								<th>유형</th>
								<th>사용내역</th>
								<th>현금</th>
								<th>카드</th>
								<th>카테고리</th>
							</tr>
						</thead>
						<tbody>
							{
								items.map(one => {
									return <HIstoryTable data={one} key={one._id} setItems={setItems} onChecked={handleChecked}/>
								})
							}
						</tbody>
					</Table>					
					<Button onClick={handleDelete} >삭제</Button>
				</Container>
			</Col>
		</Row>
	</Container>);
}

export default History;