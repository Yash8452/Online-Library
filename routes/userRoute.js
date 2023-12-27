import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();


//routes
router.post('/register', UserController.createUser);
// User Login route
router.post('/login', UserController.userLogin);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
