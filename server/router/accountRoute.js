import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Account from '../model/account.js';

/* 
	password 암호화를 위해, bcrypt 모듈을 이용한다
*/
// login
router.post('/auth',async(req, res) =>{
	try {
		const {email, password} =  req.body;
		let getId = await Account.findOne({email});
		const check = bcrypt.compareSync(password, getId.password)	// 암호화 한 password 체크
		if(getId && check) {
			// 12시간만 유지되는 토큰 생성
			const token = jwt.sign({email: getId.email}, process.env.SECRET_KEY, {expiresIn: 60*60*12 });
			// 응답 보낼 때, token도 같이 보낸다
			res.status(201).json({result: true, message: getId, token});
		}else {
			// throw new Error("invalid username / password");
			res.status(401).json({result: false, message: '아이디 혹은 비밀번호가 유효하지 않습니다'})
		}
	}catch(e) {
		res.status(409).json({result: false, message: e.message})
		console.log(e.message)
	}
	
})

// signup
router.post('/register', async (req, res) =>{
	try {
		const salt = 10;
		let getId = await Account.findOne({email: req.body.email});
		const hash = bcrypt.hashSync(req.body.password, salt); // password 암호화
		let data = await Account.create({
			...req.body,
			password:  hash
		});
		res.status(201).json({result: true, message: data})
	} catch(e) {
		res.status(409).json({result: false, message: e.message})
	}
})

// id Check
// router.post('/idChk', async )

export default router;