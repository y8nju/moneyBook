class AuthAPI {
	constructor() {
		this.baseURL = "http://127.0.0.1:8080";
	}
	async login(email, password) {
		const response = await fetch(`${this.baseURL}/api/account/auth`, {
			method : "POST",
			body : JSON.stringify({email, password}),
			headers: {"Content-type" : "application/json"}
		});
		const json = await response.json();
		return json;
	}
	
}
 
export default new AuthAPI();