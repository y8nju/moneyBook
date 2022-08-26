class AccountAPI {
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.getOption = {
			method: 'get'
		}
		this.postOption = {
			method : "POST",
			headers: {"Content-type" : "application/json"}
		}
	}
	async auth(email, password) {
        const response = await fetch(this.baseURL+"/api/account/auth" , {
            ...this.postOption,
            body : JSON.stringify({email, password})
        })
        return await response.json();
    }
	async signup(email, password, name, gender, birth) {
        const response = await fetch(this.baseURL+"/api/account/register", {
			method : "POST",
			body : JSON.stringify({email, password, name, gender, birth}),
			headers: {"Content-type" : "application/json"}
        });
		return await response.json();
    }
	
}
 
export default AccountAPI;