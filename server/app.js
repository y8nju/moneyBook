import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import account from './router/accountRoute.js'
import history from './router/historyRoute.js'

dotenv.config()
mongoose.connect(process.env.MONGODB_URI, {dbName: 'moneybook'}).catch((err) => {
	console.log('failed' + err.message);
});

const app = express();

app.use(cors());
app.use(morgan('[Server] :date[iso] :method :url :status (:response-time ms)' ))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/account', account)
app.use('/api/history', history)

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