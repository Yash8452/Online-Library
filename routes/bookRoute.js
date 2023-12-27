import express from 'express';
import BookController from '../controllers/bookController.js';
import formidable from "express-formidable";

const router = express.Router();

// View books (accessible to all users)
router.get('/', BookController.getAllBooks);

// Admin-only operations

router.put('/issue/:bookId/:userId',formidable(),BookController.issueABook)
router.put('/return/:bookId/:userId',formidable(),BookController.returnABook)
router.post('/addBook', formidable(), BookController.addBook);
router.delete('/remove/:id', BookController.removeBook);




export default router;
