import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueReturnBook from './IssueReturnBook';
import Layout from '../../components/layout/Layout';
import AdminMenu from './AdminMenu';
import toast from 'react-hot-toast';

const BookList = ({ userId }) => {
    const [books, setBooks] = useState([]);
    const [showAvailableOnly, setShowAvailableOnly] = useState(true); //  filtering
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // Fetch all books from the backend
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/v1/books/');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Filter books based on availability and search term
    const filteredBooks = books.filter((book) => {
        const matchesSearchTerm = book.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (showAvailableOnly) {
            return book.currentAvailability && matchesSearchTerm;
        }
        return !book.currentAvailability && matchesSearchTerm;
    });

    // Handle input change for search term
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    //Delete a book
    const handleDeleteBook = async (bookId) => {
        try {
            // Send a DELETE request to your backend API to delete the book
            await axios.delete(`http://localhost:5050/api/v1/books/remove/${bookId}`);

            // After successful deletion, update the state to reflect the changes
            setBooks(books.filter((book) => book._id !== bookId));
            toast.success("Book removed")
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };
    return (

        <Layout>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className=' p-3'>
                            <h2>All Books</h2>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by book name"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Author</th>
                                        <th onClick={() => setShowAvailableOnly(!showAvailableOnly)} style={{ cursor: "pointer" }}>Availability +</th>
                                        <th className='d-flex justify-content-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBooks.map((book) => (
                                        <tr key={book._id}>
                                            <td>{book.name}</td>
                                            <td>{book.author}</td>
                                            <td>{book.currentAvailability ? 'Available' : 'Not Available'}</td>
                                            <td className='d-flex  justify-content-around'>
                                                {book.currentAvailability ? (
                                                    <IssueReturnBook bookId={book._id} userId={userId} action="issue" />
                                                ) : (
                                                    <IssueReturnBook bookId={book._id} action="return" />
                                                )}
                                                <button className='btn btn-outline-danger' onClick={() => handleDeleteBook(book._id)}>Delete</button>

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >



    );
};

export default BookList;
