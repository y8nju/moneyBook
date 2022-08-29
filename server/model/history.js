import mongoose from 'mongoose';
const historySchema = new mongoose.Schema({
    user: String,
    pattern: String,
    date: Date,
    useDesc: {
        type: String,
        required: true
    },
    cashAmt: Number, 
    cardAmt: Number,
    category: String,
    tag: String
})
export default mongoose.model('history', historySchema)