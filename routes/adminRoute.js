import express from 'express';
import AdminController from '../controllers/adminUserController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();


// Admin Login route
router.post('/register', AdminController.registerAdmin);

router.post('/login', AdminController.adminLogin);
// Endpoint for admin dashboard or profile
router.get('/dashboard', authenticateToken,(req,res)=>{
  res.status(200).send({ ok: true });
}) ;



export default router;
