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
	refreshToken() {
		this.postOption.headers.authorization = "Bearer "+ localStorage.getItem("token");
		this.getOption.headers.authorization = "Bearer "+ localStorage.getItem("token");
	}
	async history(dateMonth) {	// history에 특정 월의 데이터 조회
		this.refreshToken();
		const response = await fetch(this.baseURL+"/api/history?month="+dateMonth, {
			...this.getOption
			// get으로 요청을 보낼 때는 body가 있으면 오류가 뜬다!! 주의!!
		})
		return await response.json();
	}
	async addHistory(pattern, date, useDesc, cashAmt, cardAmt, category, tag) {
		// user는 server historyRoute에서 전송한다
		const response = await fetch(this.baseURL+"/api/history/write", {
			...this.postOption,
			body: JSON.stringify({pattern, date, useDesc, cashAmt, cardAmt, category, tag})
		});
		return await response.json();
	}
	async delete(data) {
		const response = await fetch(this.baseURL+"/api/history/delete", {
			...this.postOption,
			body: JSON.stringify({data})
		});
		return await response.json();
	}
	async search(begin, end) {
        this.refreshToken();
        const response =await fetch(this.baseURL+"/api/history/search?begin="+begin+"&end="+end , {
            ...this.getOption
        })
        return await response.json();
    }
}
export default HistoryAPI;