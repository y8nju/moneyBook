
import { useRef } from "react";
import authAPI from '../api/authAPI';

function Login() {
	const emailInp = useRef();
	const passInp = useRef();
	
	const handleSubmit = (event) => {
		event.preventDefault();
		authAPI
			.login(emailInp.current.value, passInp.current.value)
			.then(ret => console.log(ret));
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
	return ( <>
		<h2 className="mt-5 mb-5">Login</h2>
		<form onSubmit={handleSubmit} className="mt-5">
			<div className="form-floating mb-3 mt-3">
			<input type="text" className="form-control" id="email" placeholder="Enter email" name="email" ref={emailInp} />
			<label htmlFor="email">Email</label>
			</div>
			<div className="form-floating mt-3 mb-3">
			<input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" ref={passInp} />
			<label htmlFor="pwd">Password</label>
			</div>
			<div className="mb-3 mt-3 d-grid">
				<button type="submit" className="btn btn-primary bnt-block">Submit</button>
			</div>
		</form>
		</> );
}

export default Login;