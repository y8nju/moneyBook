import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env);   // 환경변수
console.log(process.cwd())  // 현재 working directory

console.log(process.env.MONGODB_URI);
console.log(process.env.SECRET_KEY);