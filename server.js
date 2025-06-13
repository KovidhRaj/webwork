const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/charasmash', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password_hash: String
});
const User = mongoose.model('User', userSchema);

// Character schema and model
const characterSchema = new mongoose.Schema({
  name: String,
  gender: String,
  vote_count: {
    type: Number,
    default: 0
  }
});
const Character = mongoose.model('Character', characterSchema);

// Login + Register route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists → verify password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) return res.status(401).send('Invalid email or password');
      return res.send('Login successful!');
    } else {
      // User doesn't exist → register them
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password_hash: hashedPassword });
      await newUser.save();
      return res.status(201).send('User registered and logged in!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Voting API
app.post('/api/vote', async (req, res) => {
  const { characterName } = req.body;

  try {
    const result = await Character.findOneAndUpdate(
      { name: characterName },
      { $inc: { vote_count: 1 } },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: 'Character not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Vote failed' });
  }
});

// Rankings API
app.get('/api/rankings', async (req, res) => {
  try {
    const rankings = await Character.find().sort({ vote_count: -1 });
    res.json(rankings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rankings' });
  }
});

// Get all female characters
app.get('/api/female-characters', async (req, res) => {
  try {
    const females = await Character.find({ gender: 'female' });
    res.json(females);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch female characters' });
  }
});
// Get all male characters
app.get('/api/male-characters', async (req, res) => {
  try {
    const males = await Character.find({ gender: 'male' });
    res.json(males);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch male characters' });
  }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
