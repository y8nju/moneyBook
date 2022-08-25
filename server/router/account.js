import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt';
import Account from '../model/account.js';

/* 
	password 암호화를 위해, bcrypt 모듈을 이용한다
*/
// login
router.post('/auth',async(req, res) =>{
	console.log(req.body);
	let getId = await Account.findOne({id: req.body.email});
	if(getId) {	// id의 유무를 체크하고
		const check = await bcrypt.compare(req.body.password, getId.password)	// 암호화 한 password 체크
		if(check) {	// id가 있을 때 password의 동일여부를 확인해준다
			res.json({result: true});
		}else {
			res.json({result: false});
		}
	}else {
		res.json({result: false});
	}
})

// signup
router.post('/register', async (req, res) =>{
	const salt = 10;
	const hash = await bcrypt.hash(req.body.password, salt); // password 암호화
	let getId = await Account.findOne({email: req.body.email});
	if(!getId) {
		await Account.create({
			...req.body,
			password:  hash
		});
		res.json({result: true})
	}else {
		res.json({result: false})
	}
})

export default router;