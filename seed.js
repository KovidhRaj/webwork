const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/charasmash', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  seedCharacters();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Character schema
const characterSchema = new mongoose.Schema({
  name: String,
  gender: String,
  vote_count: {
    type: Number,
    default: 0
  }
});

const Character = mongoose.model('Character', characterSchema);

// Seed function
async function seedCharacters() {
  try {
    await Character.deleteMany({}); // Clear previous character data

    await Character.insertMany([
      { name: 'LaraCroft', gender: 'Female' },
      { name: 'Aloy', gender: 'Female' },
      { name: 'Bayonetta', gender: 'Female' },
      { name: 'ChloeFrazer', gender: 'Female' },
      { name: 'Cortana', gender: 'Female' },
      { name: 'Ellie', gender: 'Female' },
      { name: 'FaithConnors', gender: 'Female' },
      { name: 'JillValentine', gender: 'Female' },
      { name: 'Kassandra', gender: 'Female' },
      { name: 'AmiciaDeRune', gender: 'Female' },
      { name: 'Nilin', gender: 'Female' },
      { name: 'CirillaFiona', gender: 'Female' },
      { name: 'TifaLockhart', gender: 'Female' },
      { name: 'Freya', gender: 'Female' },
      { name: 'YuffieKisaragi', gender: 'Female' },
      { name: 'JoelMiller', gender: 'Male' },
      { name: 'NathanDrake', gender: 'Male' },
      { name: 'CloudStrife', gender: 'Male' },
      { name: 'DeaconJohn', gender: 'Male' },
      { name: 'Atreus', gender: 'Male' },
      { name: 'EthanWinters', gender: 'Male' },
      { name: 'Dante', gender: 'Male' },
      { name: 'Virgil', gender: 'Male' },
      { name: 'ArthurMorgan', gender: 'Male' },
      { name: 'AlexMason', gender: 'Male' },
    ]);

    console.log('Characters seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close(); // Ensure connection closes even on error
  }
}
