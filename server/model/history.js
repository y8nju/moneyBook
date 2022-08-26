import mongoose from 'mongoose';
const historySchema = new mongoose.Schema({
    pattern: String,
    date: Date,
    useDesc: {
        type: String,
        required: true
    },
    cashAmt: Number, 
    cardAmt: Number,
    catefory: String,
    tag: String
})
export default mongoose.model('history', historySchema)