import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  transactionType: {
    type: String,
    enum: ['issued', 'returned'],
    required: true
  }
});


export default mongoose.model('Transaction', transactionSchema);

