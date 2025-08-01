import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: '',
    description: '',
    category: '688cb08d04e4e73db1f4f331',
  });
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  
    const [token , setToken]=useState('')
  
  const fetchToken = () => {
    const storedToken = localStorage.getItem('token');  
  setToken(storedToken);
  }
  
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5600/api/categories", {
        headers: {
          Authorization: `${token}`,
        },
      });
      
      console.log(res.data.categories , "data")
      setCategories(res.data || []);
    
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

    useEffect(() => {
      fetchToken()
    fetchCategories();
    handleGetExpenses()
  }, []);

    const handleAddCategory = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5600/api/categories",
        { name: newCategory },
        {
          headers: {
            Authorization: `${token}`,
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
     handleCreate()
      setEditId(null);
    } else {
    //  handleUpdate()
      handleCreate()
    }
    setForm({ amount: '', description: '', category: '' });
  };

const handleGetExpenses = async () => {
  try {
    const res = await axios.get("http://localhost:5600/api/expenses", {
      params: {
        userId: "688c9eb69884e18a1a6440dd",
        status: "admin",
      },
      headers: {
        Authorization: `${token}`, // Token from localStorage or context
      },
    });
console.log(res.data, "Expenses fetched successfully");
    setExpenses(res.data);
  } catch (err) {
    console.error("Get Expenses Error:", err.response?.data || err.message);
  }
};


const handleCreate = async () => {

  try {
    const res = await axios.post(
      "http://localhost:5600/api/expenses",
      {
        user: { id: "688c53cdb78efc1b7d2eaea4" },
        title: form?.description,
        amount: parseFloat(form?.amount),
        category: { id: form?.category },
        date: new Date().toISOString().split("T")[0], // Current date
      },
      {
        headers: {
          Authorization: `${token}`, // Make sure token is defined
        },
      }
    );
     setForm({ amount: '', description: '', category: '' });
handleGetExpenses()
    console.log("Created:", res.data);
  } catch (err) {
    console.error("Create error:", err.response?.data || err.message);
  }
};


const handleUpdate = async () => {
  try {
    const res = await axios.put(
      "http://localhost:5600/api/expenses/688c7e1c4ae0a52f937c46ac",
      {
        title: "Grocery Shopping",
        amount: 1400,
        category: "688c7207ae61c94e71bdc273",
        date: "2025-07-31",
      },
      {
        headers: {
          Authorization: `${token}`, // Make sure token is defined
        },
      }
    );

    console.log("Updated:", res.data);
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
  }
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
          value={form.title}
          onChange={handleInputChange}
          style={{ marginRight: 10, padding: 5 }}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          style={{ marginRight: 10, padding: 5 }}
          // required
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx}  value={cat?.name}>{cat?.name}</option>
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
