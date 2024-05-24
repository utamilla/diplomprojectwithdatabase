const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // Insert new user
        const user = { name: name || 'Guest', email, password };
        db.query('INSERT INTO users SET ?', user, (err, results) => {
            if (err) throw err;
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
