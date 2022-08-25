import mongoose from 'mongoose';
const accountSchema = new mongoose.Schema({
    email: {type: String, unique: true}, // unique 중복X
    password: String,
    name: String,
    gender: String,
    birth: Number // 탄생년도만 
})
export default mongoose.model('account', accountSchema)