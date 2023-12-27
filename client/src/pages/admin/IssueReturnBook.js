import axios from 'axios';
import React, { useState } from 'react';

const IssueReturnBook = ({ bookId, action }) => {
  const [userId, setUserId] = useState('');

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(bookId)
    setUserId(''); // Clear user ID field when toggling
    console.log(setUserId)
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (action === 'issue') {
        response = await axios.put(`http://localhost:5050/api/v1/books/issue/${bookId}/${userId}`);
      } else if (action === 'return') {
        response = await axios.put(`http://localhost:5050/api/v1/books/return/${bookId}/${userId}`);
      }

      if (response && response.status === 200) {
        console.log(response.data); // Log the response or update state accordingly
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error or display an error message
    }
  };

  return (
    <div>
      
        <button type="button" onClick={handleButtonClick} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          {action === 'issue' ? 'Issue' : 'Return'}
        </button>

        {/* // <button className='button-89' onClick={handleButtonClick}>{action === 'issue' ? 'Issue' : 'Return'} </button> */}


      {/* // <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
            <input
            className='form-control'
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleConfirm} data-bs-dismiss="modal" className="btn btn-success">{action === 'issue' ? 'Issue' : 'Return'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueReturnBook;
