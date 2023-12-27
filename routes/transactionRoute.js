import express from 'express';
import TransactionController from '../controllers/transactionController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();


// View transaction history (for users)
router.get('/history',requireSignIn, TransactionController.getTransactionById);

//
//router.get('/test',requireSignIn, TransactionController.getTransactionHistory);




export default router;
