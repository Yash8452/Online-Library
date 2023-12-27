import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
const UserController = {
  async userLogin(req, res) {
    const { username } = req.body;

    try {
      const user = await userModel.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create and sign JWT token for user
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.USER_JWT_SECRET,
        { expiresIn: '4d' }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createUser(req, res) {
    const user = new userModel(req.body);
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (user === null) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default UserController;
