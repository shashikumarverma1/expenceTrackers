# 1. Clone the repo
git clone https://github.com/shashikumarverma1/expencetracker.git

# 2. Move to server directory
cd server

# 3. Install dependencies
npm install
# or
yarn


✨ Authentication APIs
🔐 Sign Up (Register)
Method: POST

Endpoint: http://localhost:5600/api/auth/register

Request Body:
{
  "name": "Alice Verma",
  "email": "test2@test.com",
  "password": "123456789"
}

🔑 Login
Method: POST

Endpoint: http://localhost:5600/api/auth/login

Request Body:

{
  "email": "test2@test.com",
  "password": "123456789"
}

📂 Category APIs
➕ Create Category
Method: POST

Endpoint: http://localhost:5600/api/categories

Request Body:

{
  "name": "Food"
}

📄 Get Categories
Method: GET

Endpoint: http://localhost:5600/api/categories

💸 Expense APIs
➕ Create Expense
Method: POST

Endpoint: http://localhost:5600/api/expenses

Request Body:
{
  "user": {
    "id": "688c53cdb78efc1b7d2eaea4"
  },
  "title": "Grocery Shopping",
  "amount": 1200,
  "category": {
    "id": "688c524257e120516ce284a1"
  },
  "date": "2025-07-31"
}

📄 Get Expenses
Method: GET

Endpoint: http://localhost:5600/api/expenses

Request Body (for filtered query):

{
  "user": {
    "id": "688c71bce9b1fb9e5f11423d",
    "status": "admin"
  }
}

🗑️ Delete Expense
Method: DELETE

Endpoint:
http://localhost:5600/api/expenses/:id

Example:
http://localhost:5600/api/expenses/688c75f2523728311724e892

✏️ Update Expense
Method: PUT

Endpoint:
http://localhost:5600/api/expenses/:id

Example:
http://localhost:5600/api/expenses/688c7e1c4ae0a52f937c46ac

Request Body:

{
  "title": "Grocery Shopping",
  "amount": 1400,
  "category": "688c7207ae61c94e71bdc273",
  "date": "2025-07-31"
}

📊 Statistics APIs
📆 Top Days
Method: GET

Endpoint:
http://localhost:5600/api/stats/top-days

📈 Monthly Change
Method: GET

Endpoint:
http://localhost:5600/api/stats/monthly-change


🔮 Predicted Spend
Method: GET

Endpoint:
http://localhost:5600/api/stats/predicted