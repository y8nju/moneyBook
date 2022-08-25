import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt';
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
			res.status(201).json({result: true, message: getId})
		}else {
			throw new Error("invalid username / password");
		}
	}catch(e) {
		res.status(409).json({result: false, message: e.message})
	}
	
})

// signup
router.post('/register', async (req, res) =>{
	const salt = 10;
	let getId = await Account.findOne({email: req.body.email});
	const hash = bcrypt.hashSync(req.body.password, salt); // password 암호화
	let data = await Account.create({
		...req.body,
		password:  hash
	});
	try {
		res.status(201).json({result: true, message: data})
	} catch(e) {
		res.status(409).json({result: false, message: e.message})
	}
})

export default router;