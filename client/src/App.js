// import logo from './logo.svg';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import AccountAPI from "./api/AccountAPI";
import HistoryAPI from "./api/HistoryAPI";
import './App.css';
import Main from "./components/main";
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";
import Write from "./components/write";
import History from "./components/history";

const accountAPI = new AccountAPI('http://192.168.4.123:8080');
const historyAPI = new HistoryAPI('http://192.168.4.123:8080');
// const accountAPI = new AccountAPI('http://127.0.0.1:8080');
// const historyAPI = new HistoryAPI('http://127.0.0.1:8080');

function App() {
	// Link 는 특정 주소로 이동해주는 태그였다면, Navigate 는 특정 행동을 했을 때 해당 주소로 이동해줄 수 있게 만들어줍니다.
	// logon 상태 관리(로그인이 되면 setLogon은 true가 된다)
	const [logon, setLogon] = useState(null);
	useEffect(()=> {	// 새로고침을 하더라도 token 유지하기
		if(localStorage.getItem('token')) {
			accountAPI.valid(localStorage.getItem('token'))
				.then(received => {
					if(received.result) {
						setLogon(received.user);
					}
				})
		}
	}, []);
	return (
			<BrowserRouter>
				<Header logon={logon} setLogon={setLogon}/>
				<Container className="d-flex flex-column align-items-center" style={{paddingTop: "86px", minHeight: "85vh"}}>
					<Routes>
						<Route >
							{/* 로그온 일 때 인덱스, 아닐 때 인덱스 다르게 처리하기 */}
							<Route path="/" element={<Main historyAPI={historyAPI } logon={logon}/>} />
							<Route path="/history" element={<History historyAPI={historyAPI } logon={logon}/>} />
							<Route path="/write" element={<Write historyAPI={historyAPI } />} />
							<Route path="/login" element={<Login accountAPI={accountAPI} setLogon={setLogon}/>} />
							<Route path="/register" element={<Signup accountAPI={accountAPI} />} />
						</Route>
					</Routes>  
				</Container>
			</BrowserRouter>
	);
}

export default App;
