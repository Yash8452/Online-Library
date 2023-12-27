import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  currentAvailability: {
    type: Boolean,
    default: true // Indicates whether the book is available for borrowing
  },
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // If associating with a User model for who the book is issued to
  }
});

export default mongoose.model('Book', bookSchema);

