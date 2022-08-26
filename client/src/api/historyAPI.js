class HistoryAPI {
	constructor(baseURL) {
		const token = localStorage.getItem("token");	// token을 받아온다
		this.baseURL = baseURL;
		this.getOption = {
			method: 'get',
			headers: {
				"authorization" : "Bearer "+token	// header에 토큰 설정
			}
		}
		this.postOption = {
			method : "POST",
			headers: {
				"Content-type" : "application/json", 
				"authorization" : "Bearer "+token	// header에 토큰 설정
			}
		}
	}
	async history(dateMonth) {	// history에 원하는 달을 넘겨주기
		const response = await fetch(this.baseURL+"/api/history", {
			...this.postOption.headers,
			body: JSON.stringify({dateMonth})
		})
		return await response.json();
	}
	async addHistory(pattern, date, useDesc, cashAmt, cardAmt, catefory, tag) {
		const response = await fetch(this.baseURL+"/api/history/write", {
			...this.postOption,
			body: JSON.stringify({pattern, date, useDesc, cashAmt, cardAmt, catefory, tag})
		});
		return await response.json();
	}
}
export default HistoryAPI;