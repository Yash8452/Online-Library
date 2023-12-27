import bookModel from '../models/bookModel.js';
import transactionModel from '../models/transactionModel.js';

const BookController = {


  async getAllBooks(req, res) {
    try {
      const books = await bookModel.find({}).sort({ createdAt: -1 });;
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },


  async issueABook(req, res) {
    const { bookId, userId } = req.params;
    try {
      const book = await bookModel.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      if (!book.currentAvailability) {
        return res.status(400).json({ message: 'Book is already issued' });
      }

      // Update book's availability status and associate with the user
      book.currentAvailability = false;
      book.issuedTo = userId;
      await book.save();

      // Create a transaction record for the issuance
      const newTransaction = new transactionModel({
        user: userId,
        book: bookId,
        transactionType: 'issued'
      });
      await newTransaction.save();
      res.status(200).json({ message: 'Book issued successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Return a book
  // async returnABook(req, res) {
  //   const { bookId } = req.params;
  //   try {
  //     const book = await bookModel.findById(bookId);
  //     if (!book) {
  //       return res.status(404).json({ message: 'Book not found' });
  //     }
  //     if (book.currentAvailability) {
  //       return res.status(400).json({ message: 'Book is already available' });
  //     }
  //     // Update book's availability status and remove association with the user
  //     book.currentAvailability = true;
  //     book.issuedTo = null;
  //     await book.save();
  //     res.status(200).json({ message: 'Book returned successfully' });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  async returnABook(req, res) {
    const { bookId, userId } = req.params;
    try {
      const book = await bookModel.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      if (book.currentAvailability) {
        return res.status(400).json({ message: 'Book is already available' });
      }
  
      // Check if the book is issued to the specified user
      if (book.issuedTo.toString() !== userId) {
        return res.status(400).json({ message: 'Book is not issued to this user' });
      }
  
      // Update book's availability status and remove association with the user
      book.currentAvailability = true;
      book.issuedTo = null;
      await book.save();
      res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },




  async addBook(req, res) {
    try {
      console.log('Request Fields:', req.fields); // Log the contents of req.fields
  
      const newBook = new bookModel({
        name: req.fields.name,
        author: req.fields.author,
      });
  
      await newBook.save();
      res.status(200).json(newBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async removeBook(req, res) {
    try {
      await bookModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Book deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default BookController;
