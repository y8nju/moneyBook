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
/* 조회 */
router.get('/', async (req, res) => {
	const month = req.query.month;   // 2022-08
    const parsed = month.split("-");
	const begin = new Date(`${parsed[0]}-${parsed[1]}-01`);      
    const end = new Date(parsed[0], parsed[1], 1);    
    console.log(begin, end);
	console.log(month)
	try{
		const histories =await History.find({
			user: req.logonEmail,
			date: {$gte : begin, $lt : end} 
		}).sort('-date').lean();
		return res.status(200).json({result: true, datas: histories});
	}catch(err) {
		console.log(err);
		res.status(500).send({result:false, message: err.message});
	}
})
/* 삭제 */
router.post('/delete', async (req, res) => {
	console.log(req.logonEmail )
	console.log( req.body.data)
	try {
		let deleteItem = await History.deleteMany({_id: req.body.data})
		res.status(200).json({result: false});
	} catch(e) {
		res.status(409).json({result: false, message: e.message});
		console.log(e.message)
	}
})
/* 입력 */
router.post('/write', async (req, res) =>{
	console.log({...req.body})
	try {
		let data = await History.create({...req.body, user: req.logonEmail});
		// ✨server에서 user 정보를 넘겨준다
		res.status(201).json({result: true, data: data});
		console.log(data);
	} catch(e) {
		res.status(409).json({result: false, message: e.message});
		console.log(e.message)
	}
})
export default router;