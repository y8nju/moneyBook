class HistoryAPI {
	constructor(baseURL) {
		const token = localStorage.getItem("token");	// token을 받아온다
		this.baseURL = baseURL;
		this.getOption = {
			method: 'get',
			headers: {
				"authorization" : "Bearer "+token
			}
		}
		this.postOption = {
			method : "POST",
			headers: {
				"Content-type" : "application/json", 
				"authorization" : "Bearer "+token
			}
		}
	}
	async history(dateMonth) {	// history에 원하는 달을 넘겨주기
		const response = await fetch(this.baseURL+"/api/hisory", {
			...this.postOption.headers,
			body: JSON.stringify({dateMonth})
		})
		return await response.json();
	}
}
export default HistoryAPI;