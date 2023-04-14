const express = require('express');
const mysql = require('mysql2');

const app = express();

// Set up the MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'form'
});

// Connect to the MySQL database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Set up the Express server
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handle GET request to show all data
app.get('/show', (req, res) => {
  // Select all the data from the MySQL database
  const query = 'SELECT * FROM users';
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { id, name, email, phone,location } = req.body;
  
    // Insert the form data into the MySQL database
    const query = `INSERT INTO users (id, name, email,phone,location) VALUES (?, ?, ?, ? ,?)`;
    connection.query(query, [id, name, email, phone, location], (err, result) => {
      if (err) throw err;
      console.log('Data inserted into MySQL database');
      res.redirect('/');
    });
  });

// Handle search request by email
app.get('/search', (req, res) => {
  const email = req.query.email;

  // Select data with the given email from the MySQL database
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
