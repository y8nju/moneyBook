import { useEffect, useRef, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import HistoryChart from "./historyChart";
import ReportBarChart from "./reportBarChart";

function Report({historyAPI, logon}) {
	const [range, setRange] = useState({});
	const [datas, setDatas] = useState([]);	// 조회 정보를 받아옴: 배열
	const beginRef = useRef();
	const endRef = useRef();

	const handleChange = (evt) => {
		setRange({...range, [evt.target.name] : evt.target.value}); // date value에 따라서 setRange 변경
	}
	useEffect(()=> {	// date defult value 세팅
        endRef.current.value = new Date().toISOString().slice(0, 10);
        beginRef.current.value = new Date(Date.now()-1000*60*60*24*30).toISOString().slice(0, 10);
		setRange({begin :beginRef.current.value, end : endRef.current.value });	// setRange 세팅
	}, [])
	useEffect(()=> {
        if(! (range.begin && range.end)) {
            return;
        }
		historyAPI.search(range.begin, range.end)
			.then(recv => {
				if(recv.result) {
					setDatas(recv.datas);
				}
			})
	}, [range])
	console.log(datas)
	return ( <Container>
		<InputGroup className="mb-3 text-center">
			<InputGroup.Text id="basic-addon1">기간</InputGroup.Text>
			<Form.Control
				type="date"
				aria-label="Username"
				aria-describedby="basic-addon1"
				ref={beginRef}
				name="begin"
				onChange={handleChange}
				/>
			<InputGroup.Text id="basic-addon1">~</InputGroup.Text>
			<Form.Control
				type="date"
				aria-label="Username"
				aria-describedby="basic-addon1"
				ref={endRef}
				name="end"
				onChange={handleChange}
				/>
		</InputGroup>
		<ReportBarChart datas={datas} />
		<HistoryChart  historyAPI={historyAPI } datas={datas} />
	</Container>);
}

export default Report;