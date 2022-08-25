import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import api from './router/api.js'

const app = express();

app.use(cors());
app.use(morgan('[Server] :date[iso] :method :url :status (:response-time ms)' ))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', api)

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
*/