import adminUserModel from '../models/adminUserModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();



const AdminController = {
  async registerAdmin(req, res) {
    const admin = new adminUserModel(req.body);
    try {
      const newAdmin = await admin.save();
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async adminLogin(req, res) {
    const { username, password } = req.body;
  
    try {
      const admin = await adminUserModel.findOne({ username });
  
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { adminId: admin._id, username: admin.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error in adminLogin:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  async getAllAdmins(req, res) {
    try {
      const admins = await adminUserModel.find();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createAdmin(req, res) {
    const admin = new adminUserModel(req.body);
    try {
      const newAdmin = await admin.save();
      res.status(201).json(newAdmin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getAdminById(req, res) {
    try {
      const admin = await adminUserModel.findById(req.params.id);
      if (admin === null) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.json(admin);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

 
};

export default AdminController;
