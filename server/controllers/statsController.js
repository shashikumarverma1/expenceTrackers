import Expense from '../models/expense.js';
import mongoose from 'mongoose';

export const top3Days = async (req, res) => {
  const data = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: '$date', total: { $sum: '$amount' } } },
    { $sort: { total: -1 } },
    { $limit: 3 },
  ]);
  res.json(data);
};

export const monthlyChange = async (req, res) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const lastMonth = currentMonth - 1;

  const expenses = await Expense.find({ user: req.user.id });

  const current = expenses.filter(e => new Date(e.date).getMonth() === currentMonth)
                          .reduce((sum, e) => sum + e.amount, 0);
  const previous = expenses.filter(e => new Date(e.date).getMonth() === lastMonth)
                          .reduce((sum, e) => sum + e.amount, 0);
  const percent = previous === 0 ? 0 : ((current - previous) / previous) * 100;
  res.json({ percent });
};

export const predictedNextMonth = async (req, res) => {
  const now = new Date();
  const expenses = await Expense.find({ user: req.user.id });

  const last3Months = [...Array(3)].map((_, i) => now.getMonth() - i);
  const total = last3Months.map(month =>
    expenses.filter(e => new Date(e.date).getMonth() === month)
            .reduce((sum, e) => sum + e.amount, 0)
  );
  const avg = total.reduce((a, b) => a + b, 0) / 3;
  res.json({ predicted: avg });
};
