// import logo from './logo.svg';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import AccountAPI from "./api/AccountAPI";
import './App.css';
import Main from "./components/main";
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";

const accountAPI = new AccountAPI('http://192.168.4.123:8080');
function App() {
	// Link 는 특정 주소로 이동해주는 태그였다면, Navigate 는 특정 행동을 했을 때 해당 주소로 이동해줄 수 있게 만들어줍니다.
	// logon 상태 관리(로그인이 되면 setLogon은 true가 된다)
	const [logon, setLogon] = useState(false);
	return (
			<BrowserRouter>
				<Header logon={logon}/>
				<Container>
					<Routes>
						<Route >
							<Route path="/" element={<Main />} />
							<Route path="/history" element={<Main />} />일단 history를 인덱스로 잡아놓기
							<Route path="/login" element={<Login accountAPI={accountAPI} setLogon={setLogon}/>} />
							<Route path="/register" element={<Signup accountAPI={accountAPI} />} />
						</Route>
					</Routes>
				</Container>
			</BrowserRouter>
	);
}

export default App;
