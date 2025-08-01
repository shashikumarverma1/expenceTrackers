import Expense from '../models/expense.js';

//  http://localhost:5600/api/categories

export const addExpense = async (req, res) => {
  const { category, amount, date, description , user } = req.body;
  const expense = await Expense.create({
    user: user.id,
    category:category.id,
    amount,
    date,
    description,
  });
  res.status(201).json(expense);
};

export const updateExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(403).json({ message: 'Not allowed' });
  const updated = await Expense.findByIdAndUpdate(req.params.id,req.body, { new: true });
  res.json(updated);
};

export const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(403).json({ message: 'Not allowed' });
  await expense.deleteOne();
  res.json({ message: 'Deleted' });
};

export const getExpenses = async (req, res) => {
  console.log(req.body.user, "user");
  const query = req.body.user?.status === 'admin' ? {} : { 
    user: req.body.user?.id
   };
   console.log(query , "query");
  const expenses = await Expense.find(query).populate('category');
  res.json(expenses);
};
