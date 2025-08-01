import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: '',
  });
  const [categories, setCategories] = useState([{name: 'Food'}, {name: 'Transport'}, {name: 'Utilities' }]);
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5600/api/categories", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data=[...categories , ...res.data.categories];
      console.log(res.data.categories , "data")
      setCategories(res.data.categories || []);
      console.log(res , "res122")
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
console.log(categories , "categories")
    useEffect(() => {
    fetchCategories();
  }, []);

    const handleAddCategory = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5600/api/categories",
        { name: newCategory },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data, "Category added successfully");
      setNewCategory("");
      setShowNewCategoryInput(false);
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      const updated = expenses.map((exp) =>
        exp.id === editId ? { ...exp, ...form } : exp
      );
      setExpenses(updated);
      setEditId(null);
    } else {
      setExpenses([
        ...expenses,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({ amount: '', description: '', category: '' });
  };

  const handleEdit = (exp) => {
    setForm(exp);
    setEditId(exp.id);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      // setCategories([...categories, newCategory]);
      handleAddCategory()
      setNewCategory('');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Expense Dashboard</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleInputChange}
          style={{ marginRight: 10, padding: 5 }}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          style={{ marginRight: 10, padding: 5 }}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          style={{ marginRight: 10, padding: 5 }}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat?.name}>{cat?.name}</option>
          ))}
        </select>
        <button type="submit" style={{ padding: '5px 10px' }}>
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />
        <button onClick={addCategory} style={{ padding: '5px 10px' }}>
          Add Category
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Amount</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Description</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Category</th>
            <th style={{ padding: 10, border: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp?.id}>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>{exp?.amount}</td>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>{exp?.description}</td>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>{exp?.category}</td>
              <td style={{ padding: 10, border: '1px solid #ccc' }}>
                <button onClick={() => handleEdit(exp)} style={{ marginRight: 10 }}>Edit</button>
                <button onClick={() => handleDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
