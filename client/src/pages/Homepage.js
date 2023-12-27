import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';

const Homepage = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks(); 
  }, []);

  const getAllBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5050/api/v1/books/');
      setBooks(data); 
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  };

  const getColor = () => {
    const min = 100; // Minimum RGB value for a lighter color
    const max = 200; // Maximum RGB value for a lighter color

    const red = Math.floor(Math.random() * (max - min + 1)) + min;
    const green = Math.floor(Math.random() * (max - min + 1)) + min;
    const blue = Math.floor(Math.random() * (max - min + 1)) + min;

    return `rgb(${red}, ${green}, ${blue})`;
  };


  return (
    <>
       <Layout>
        <div className="container-fluid">
          <h3 className="text-center">All Books</h3>
          <div className="d-flex flex-wrap">
            {books?.map((book) => (
              <div className="card card-body m-2" style={{ backgroundColor: getColor() }}  key={book._id}>
                <div className="card-name-price">
                  <h5 className="card-title">{book.name}</h5>
                </div>
                <p className="card-text">Author: {book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Homepage