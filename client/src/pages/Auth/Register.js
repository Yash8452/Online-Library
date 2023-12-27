import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, name, email, password, contactNumber)
        try {
            const res = await axios.post(`http://localhost:5050/api/v1/auth/register`, { username, name, email, password, contactNumber })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout>
            <div className="form-container" style={{ minHeight: "85vh" }}>
                <form onSubmit={handleSubmit}>
                <h4 className="title">REGISTRATION FORM</h4>

                    <div>
                        <div className="mb-3">
                            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Enter a Username' className="form-control" />
                        </div>
                        <div className="mb-3">
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter your Name' className="form-control" />
                        </div>
                        <div className="mb-3">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your Email' className="form-control" />
                        </div>
                        <div className="mb-3">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter a Password' className="form-control" />
                        </div>
                        <div className="mb-3">
                            <input type="text" onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} placeholder='Enter your Mobile No.' className="form-control" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </Layout>
    )
}

export default Register