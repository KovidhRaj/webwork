const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'codemonkey',
  password: 'root',
  database: 'charasmash'
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(401).send('Invalid email or password');

    const user = results[0];

    // If password is stored hashed, use bcrypt.compare
     bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) return res.status(500).send('Error checking password');
      if (isMatch) {
        res.send('Login successful!');
      } else {
        res.status(401).send('Invalid email or password');
      }
    if (user.password_hash === password) {
      res.send('Login successful!');
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});
});

// Voting API
app.post('/api/vote', (req, res) => {
  const { characterName } = req.body;
  db.query("UPDATE characters SET vote_count = vote_count + 1 WHERE name = ?", [characterName], (err, result) => {
    if (err) return res.status(500).json({ error: 'Vote failed' });
    return res.json({ success: true });
  });
});

// Rankings API
app.get('/api/rankings', (req, res) => {
  db.query("SELECT name, gender, vote_count FROM characters ORDER BY vote_count DESC", (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch rankings' });
    return res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
