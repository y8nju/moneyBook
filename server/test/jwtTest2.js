import jwt from 'jsonwebtoken';
// 토큰 생성
const secret = "YZ4@Wx#df7XSxumuJq!24DoJK0wZJ2KX"
const token = jwt.sign({sub: 'backend'}, secret, {expiresIn: 5});   //5초 뒤면 토큰 만료
console.log(token);
setTimeout(()=>{
	const r = jwt.verify(token, secret);
	console.log(r);
}, 6000);	// TokenExpiredError: jwt expired