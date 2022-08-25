import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import account from './router/account.js'

const app = express();
dotenv.config()
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {dbName: 'moneybook'}).catch((err) => {
	console.log('failed' + err.message);
});

app.use(cors());
app.use(morgan('[Server] :date[iso] :method :url :status (:response-time ms)' ))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/account', account)

app.listen(8080, ()=> {
	console.log('server start')
})

/* 
	[설치한 모듈]
	cors
	morgan
	express
	mongodb
	mongoose
	dotenv: npm i dotenv
	jsonwebtoken: npm i jsonwebtoken
	bcrypt: npm i bcryp(암호화 모듈)
*/