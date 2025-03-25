const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');  
const app = express();

// MongoDB connection URL 
const mongoURI = 'mongodb+srv://bagamsaichandu321:chandu@cluster0.okdfq.mongodb.net/userdb?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// GET endpoint to fetch a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Query the database for the user with the given ID and age > 21
    const user = await User.findOne({ _id: req.params.id, age: { $gt: 21 } });

    if (!user) {
      return res.status(404).json({ message: 'User not found or age <= 21' });
    }

    // Return the user details in JSON format
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
