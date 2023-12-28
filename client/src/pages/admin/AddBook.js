import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const AddBook = () => {
  //  const navigate = useNavigate();
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");



    //add book function
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const bookData = new FormData();
            bookData.append("name", name);
            bookData.append("author", author);

            const response = await axios.post(
                "http://localhost:5050/api/v1/books/addBook",
                bookData
            );

            console.log(response)

           // Check if the response indicates success
        if (response.data.success) {
           // navigate("/dashboard/admin/books");
            toast.success("Book Added Successfully", {
                duration: 5000
            });
            setName("")
            setAuthor("")
        } else {
            toast.error("Failed to add book. Please try again.");
        }

        } catch (error) {
            // Log the error for debugging purposes
            console.error("Error adding book:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Add a book</h1>
                        <div className="m-1 w-75">

                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter the bookname"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={author}
                                    placeholder="Enter the author"
                                    className="form-control"
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>


                            <div className="mb-3">
                                <button className="btn btn-outline-success" onClick={handleAdd}>
                                    Add A Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddBook;
