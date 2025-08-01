import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  amount: Number,
  date: Date,
  description: String,
}, { timestamps: true });


export default mongoose.model('Expense', expenseSchema);
