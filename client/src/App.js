// import logo from './logo.svg';
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import {  BrowserRouter,  Routes,  Route, useNavigate } from "react-router-dom";
import './App.css';
import Index from "./components";
import Header from "./components/header";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
	//Link 는 특정 주소로 이동해주는 태그였다면, Navigate 는 특정 행동을 했을 때 해당 주소로 이동해줄 수 있게 만들어줍니다.
	useEffect(()=> {

	}, [])
	return (
			<BrowserRouter>
				<Header />
				<Container>
					<Routes>
						<Route >
							<Route path="/" element={<Index />} />
							<Route path="/history" element={<Index />} />{/* 일단 history를 인덱스로 잡아놓기 */}
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Signup />} />
						</Route>
					</Routes>
				</Container>
			</BrowserRouter>
	);
}

export default App;
