import express from 'express';
import dotenv from 'dotenv';
import library_db from './library_db.js'
import cors from 'cors'

import authRoute from './routes/authRoute.js'
import bookRoute from './routes/bookRoute.js'
import transactionRoute from './routes/transactionRoute.js'

const app = express()
dotenv.config();

const PORT = process.env.PORT;




//middlewares
app.use(cors());
app.use(express.json())


//routes
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/books',bookRoute)
app.use('/api/v1/transactions',transactionRoute)

//protected routes


//
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Online Library</h1>")
})
app.listen(PORT,()=>{
    console.log(`Server running on the port ${PORT}`)
})