import transactionModel from '../models/transactionModel.js';
import bookModel from '../models/bookModel.js'
import mongoose from 'mongoose';

const TransactionController = {
  
  async getTransactionById(req, res) {
    try {
      //const userId = req.params.id;
      const userId = req.user.userId;  //getting userId

      console.log('User ID:', userId);
  
      const transactions = await transactionModel
        .find({ user: userId })
        .populate('book', 'name author')
        .exec();
  
      if (!transactions || transactions.length === 0) {
        return res.status(404).json({ message: 'No transactions found for this user' });
      }
  
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
  }
  

};

export default TransactionController;
