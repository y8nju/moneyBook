class HistoryAPI {
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
}
export default HistoryAPI;