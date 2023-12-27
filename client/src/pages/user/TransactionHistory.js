import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';


const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [auth] = useAuth(); // Accessing authentication state

    useEffect(() => {
        async function fetchTransactions() {
            try {

                axios.defaults.headers.common['Authorization'] = auth?.token;
                const response = await axios.get('http://localhost:5050/api/v1/transactions/history'); 
                console.log({response})
                if (response.status === 200) {
                    setTransactions(response.data); // Use response.data directly
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error from catch fetching data:', error);
            }
        }

        fetchTransactions();
    }, [auth.token,setTransactions]);

    return (
       <>
         <Layout>
      <div className="transaction-container">
        <h1>Transaction History</h1>
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction._id} className="transaction-item">
                <p>
                  <strong>Transaction ID:</strong> {transaction._id}
                </p>
                <p>
                  <strong>Book:</strong>{' '}
                  {transaction.book ? (
                    `${transaction.book.name} by ${transaction.book.author}`
                  ) : (
                    'Book details not available'
                  )}
                </p>
              </div>
            ))
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </div>
    </Layout>
       </>

    );
};

export default TransactionHistory;
