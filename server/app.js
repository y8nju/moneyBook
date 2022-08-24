import express from 'express'
import api from './router/api.js'
import morgan from 'morgan'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('[Server] :date[iso] :method :url :status (:response-time ms)' ))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', api)

app.listen(8080, ()=> {
    console.log('server start')
})