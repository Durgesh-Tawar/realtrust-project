const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// MySQL Connect
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vandurgesh18',
  database: 'userinfo'
});

db.connect((err) => {
  if (err) {
    console.log('❌ MySQL connection error:', err);
  } else {
    console.log('✅ MySQL connected');
  }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html at root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Form Data Route
app.post('/submit', (req, res) => {
  const { name, email, phone, city } = req.body;

  const sql = "INSERT INTO consultations (name, email, phone, city) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, city], (err, result) => {
    if (err) {
      console.error("❌ Error saving data:", err);
      res.status(500).send("❌ Error saving data");
    } else {
      res.send("✅ Form submitted successfully");
    }
  });
});
app.get('/submissions', (req, res) => {
  db.query("SELECT * FROM consultations ORDER BY submittedAt DESC", (err, results) => {
    if (err) {
      return res.status(500).send("❌ Error fetching data");
    }
    res.json(results);
  });
});


// Run Server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
