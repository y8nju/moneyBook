import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import History from '../model/history.js';


//auth token check middleware
// 기존에는 session으로 썼지만, ✨ 지금부터는 token으로 한다

router.use((req, res, next) => {
	// console.log(req.headers);
	const authorization = req.get("authorization");	// ✨ header에서 Authorization 뽑아오기
	if(!authorization || ! authorization.startsWith('Bearer')) {	// ✨ header에서 authorization이 없거나 Bearer token 방식이 아니라면
		return res.status(401).json({result: false, message: 'Not authorized'})	// 권한 없음 401
	}
		//authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijg5YXJ1Y0BnYW1pbC5jb20iLCJpYXQiOjE2NjE0MDQ5MzksImV4cCI6MTY2MTQ0ODEzOX0.d29W9oJsr8_9lIwD4stHC62c18GQmejmKWtBYJIL2P0'
	const token = authorization.split(' ')[1];	// 실제 토큰
	try{	// 토큰 유호성 확인
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		req.logonEmail = payload.email;	// ✨ req에 logonEmail로 payload안에 있는 이메일로 설정하기(👉사용자 계정_이메일)
	}catch(e) {	// ✨ 위조가 되거나 만료가 된 토큰 에러
		return res.status(401).json({result: false, message: 'Invalid token'});
	}
	next();
})

router.get('/', (req, res) => {
	console.log(req.logonEmail )
	return res.status(200).json({result: true, datas:[]});
})
router.get('/delete', (req, res) => {
	console.log(req.logonEmail )
	return res.status(200).json({result: false});
})
router.post('/write', async (req, res) =>{
	console.log({...req.body})
	try {
		let data = await History.create({...req.body});
		res.status(201).json({result: true, message: data});
		console.log(data);
	} catch(e) {
		res.status(409).json({result: false, message: e.message});
		console.log(e.message)
	}
})
export default router;