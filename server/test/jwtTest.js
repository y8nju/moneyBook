import jwt from 'jsonwebtoken';
// 토큰 생성
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
const secret = "YZ4@Wx#df7XSxumuJq!24DoJK0wZJ2KX"
const w_secret = "YZ4@Wx#df7XSxumuJq!24DoJK0wZJ2K2"
const token = jwt.sign({sub: 'backend', title: 'jwt'}, secret)
console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWNrZW5kIiwidGl0bGUiOiJqd3QiLCJpYXQiOjE2NjE0MDM1Njh9.NAdl93ofFJYkwow_AJt3ZqiwP4nCBdDbelCz7oY-Iq0

// 유효성 검사
const result = jwt.verify(token, secret);
console.log(result); 
//{ sub: 'backend', title: 'jwt', iat: 1661403768 }

// secret key가 같지 않으면 오류가 뜬다
// const w_result = jwt.verify(token, w_secret);
// console.log(w_result); 
//JsonWebTokenError: invalid signature

// 값을 변조하게되면 오류가 뜬다(권한을 가진 사용자만 유효성 검사를 통과할 수 있다)
const v_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcm9udGVuZCIsInRpdGxlIjoiand0IiwiaWF0IjoxNjYxNDAzNTY4fQ.I8b3YDaO3Nz4SO7PGSVwaBHLjSzh65Otn9oV3JWJzbM'
console.log(jwt.verify(v_token, secret));
//JsonWebTokenError: invalid signature

// // 원상복구
// jwt.decode()