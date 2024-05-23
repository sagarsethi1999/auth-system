const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = require('../middleware/auth.js');




router.post('/register', async (req, res) => {
  try {
    const { name, bio, phone, email, password, photo, isAdmin } = req.body;
   
    await User.create({ name, bio, phone, email, password, photo, isAdmin });
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Server error');
  }
});


// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && await user.validPassword(password)) {
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secretkey');
      res.status(200).json({ token, userId: user.id });
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server error');
  }
});
  

router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;

  try {
    let users;
    if (isAdmin) {
      users = await User.findAll({ attributes: ['id', 'name', 'photo'] });
    } else {
      users = await User.findAll({ where: { isPublic: true }, attributes: ['id', 'name', 'photo'] });
    }
    users = users.filter(user => user.id !== userId);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
});

// Get user details by ID
router.get('/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
      const user = await User.findByPk(userId);
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Server error');
  }
});



// Update user profile excluding password and email
router.put('/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;
  const { name, bio, phone, photo } = req.body;

  try {
    // Update user details excluding password and email
    await User.update(
      {
        name,
        bio,
        phone,
        photo
      },
      { where: { id: userId } }
    );

    res.status(200).send('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send('Server error');
  }
});


// Toggle user profile visibility
router.put('/:id/visibility', verifyToken, async (req, res) => {
  const userId = req.params.id;
  const { isPublic } = req.body;

  try {
    // Update profile visibility
    await User.update({ isPublic }, { where: { id: userId } });
    res.status(200).send(`User profile visibility set to ${isPublic}`);
  } catch (error) {
    console.error('Error toggling profile visibility:', error);
    res.status(500).send('Server error');
  }
});

// backend route for fetching user details by ID
router.get('/detail/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;

  try {
      // Find user by ID
      const user = await User.findByPk(userId, {
          attributes: { exclude: ['password'] } // Exclude password from the response
      });

      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).send('Server error');
  }
});






module.exports = router;
